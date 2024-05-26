const { calculateTipService, getTipService } = require('../service/tipService');

const calculateTip = async (req, res) => {
  try {
    const { totalAmount, tipPercentage, place } = req.body;
    const result = await calculateTipService(totalAmount, tipPercentage, place, req.user.userId);
    res.status(result.status).json(result.data);
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
      error: err.message,
    });
  }
};

const getTip = async (req, res) => {
  try {
    const { userId } = req.user;
    const { startDate, endDate } = req.query;
    const result = await getTipService(startDate, endDate, userId);
    res.status(result.status).json(result.data);
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
      error: err.message,
    });
  }
};

module.exports = {
  calculateTip,
  getTip,
};
