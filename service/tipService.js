const { v4: uuidv4 } = require('uuid');
const { Op } = require('sequelize');

const Tip = require('../model/tip');

const calculateTipService = async (totalAmount, tipPercentage, place, userId) => {
  const tipAmount = (totalAmount * tipPercentage) / 100;

  const tipId = uuidv4();

  const res = await Tip.create({
    userId, tipId, totalAmount, tipAmount, place,
  });

  const result = {
    status: 200,
    message: 'Tip calculated successfully',
    data: {
      tip: tipAmount,
    },
  };
  return result;
};

const getTipService = async (startDate, endDate, userId) => {
  const adjustedEndDate = new Date(endDate);
  adjustedEndDate.setHours(23, 59, 59, 999);

  const res = await Tip.findAll({
    where: {
      createdAt: {
        [Op.between]: [new Date(startDate), adjustedEndDate],
      },
      userId,
    },
  });

  // Remove unnecessary fields
  res.forEach((tip) => {
    delete tip.dataValues.userId;
    delete tip.dataValues.tipId;
    delete tip.dataValues.createdAt;
    delete tip.dataValues.updatedAt;
    delete tip.dataValues.deletedAt;
  });

  const result = {
    status: 200,
    message: 'Tips fetched successfully',
    data: res,
  };
  return result;
};

module.exports = { calculateTipService, getTipService };
