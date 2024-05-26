const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const util = require('util');
const User = require('../model/user');
const { generateToken } = require('../middleware/userAuth');

const rename = util.promisify(fs.rename);

const userSignupService = async (data, file) => {
  try {
    // Generate a UUID for the new user
    data.userId = uuidv4();

    // Hash the password using bcrypt with a salt round of 10
    const saltRounds = 10;
    data.password = await bcrypt.hash(data.password, saltRounds);

    const user = await User.create(data); // Create the user in the database

    if (file) {
      const oldPath = file.path;
      const newPath = path.join('uploads/profilePictures', `${data.userId}${path.extname(file.originalname)}`);
      await rename(oldPath, newPath); // Rename the file after user is created
      data.profilePicture = newPath; // Update data object with new file path
      await user.update({ profilePicture: newPath });
    }

    const token = await generateToken(data.userId);

    const result = {
      name: user.name,
      token,
    };

    return { status: 201, message: 'User created successfully', data: result };
  } catch (err) {
    // Handle specific error cases, possibly including errors from renaming the file
    console.error('Signup Service Error:', err);
    return { status: 500, message: 'Internal server error', data: err.errors };
  }
};

const userLoginService = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return { status: 404, message: 'User not found' };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { status: 401, data: 'Invalid credentials' };
    }

    const token = await generateToken(user.userId);

    const data = {
      name: user.name,
      token,
    };

    return { status: 200, message: 'Login successful', data };
  } catch (err) {
    return { status: 500, message: 'Internal server error', data: err.errors };
  }
};

module.exports = {
  userSignupService,
  userLoginService,
};
