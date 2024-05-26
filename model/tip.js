const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tip = sequelize.define('tip', {
  tipId: {
    type: DataTypes.UUID, // UUID type for the tip ID
    defaultValue: DataTypes.UUIDV4, // Automatically generate UUIDs
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID, // Matching the UUID type from the users table
    allowNull: false,
    references: {
      model: 'users', // This references the users table
      key: 'id', // This is the column name in users table to which it refers
    },
    onDelete: 'CASCADE', // If a user is deleted, delete their tips
    onUpdate: 'CASCADE', // If a user ID is updated, reflect it in the tips
  },
  place: {
    type: DataTypes.STRING,
    allowNull: true, // Allowing null if no place is provided
  },
  totalAmount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tipAmount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'tip',
  timestamps: true, // Enable automatic timestamps
  paranoid: true, // Enable soft delete (manages deletedAt column)
});

module.exports = Tip;
