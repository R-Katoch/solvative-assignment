const { userSignupService, userLoginService } = require('../service/userService');

const userSignup = async (req, res) => {
  try {
    const { body, file } = req;
    const result = await userSignupService(body, file);
    res.status(result.status).json(result.data);
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
      error: err.message,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userLoginService(email, password);
    res.status(result.status).json(result.data);
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
      error: err.message,
    });
  }
};

module.exports = { userSignup, userLogin };
