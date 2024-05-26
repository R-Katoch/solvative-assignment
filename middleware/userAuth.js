const jwt = require('jsonwebtoken');
const User = require('../model/user');

const generateToken = async (userId) => {
  const sessionId = new Date().getTime().toString();

  await updateUserSession(userId, sessionId);

  const token = jwt.sign({ userId, sessionId }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
  return token;
};

const verifyToken = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = header.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const currentSessionId = await getCurrentUserSession(decoded.userId);
    if (decoded.sessionId !== currentSessionId) {
      return res.status(401).json({ message: 'Token is no longer valid' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    // Differentiating between types of JWT errors
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired' });
    } if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: 'Token is invalid' });
    }
    return res.status(500).json({ message: 'Failed to authenticate token', error: error.message });
  }
};

async function updateUserSession(userId, sessionId) {
  // Update the user's session ID in the database
  await User.update({ sessionId }, { where: { userId } });
}

async function getCurrentUserSession(userId) {
  // Retrieve the current session ID from the database
  const user = await User.findOne({ where: { userId } });
  return user.sessionId;
}

module.exports = {
  generateToken,
  verifyToken,
  updateUserSession,
  getCurrentUserSession,
};
