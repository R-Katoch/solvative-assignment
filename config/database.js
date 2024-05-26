require('dotenv').config();

const { Sequelize } = require('sequelize');

const {
  DB_NAME = 'tip_management',
  DB_USER = 'root',
  DB_PASSWORD = 'Rohit@2112',
  DB_HOST = 'localhost',
  DB_PORT = '3306',
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST || 'localhost',
  port: DB_PORT || 3306,
  dialect: 'mysql',
  logging: console.log,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    timestamps: true,
    paranoid: true,
  },
  retry: {
    max: 3,
  },
});

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});

module.exports = sequelize;
