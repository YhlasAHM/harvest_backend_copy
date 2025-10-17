'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);

const config = require(__dirname + '/../config/index.js');
const db = {};

let sequelize;

sequelize = new Sequelize(config.DB_NAME, config.DB_USERNAME, config.DB_PASSWORD, {
  host: config.DB_HOST,
  port: config.DB_PORT,
  dialect: config.DB_DIALECT,
  logging: false,
  ...config
});


/* sequelize.sync({ force: true })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  }); */
// // Add reconnection logic
// const connectWithRetry = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Database connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//     console.log('Retrying connection in 5 seconds...');
//     setTimeout(connectWithRetry, 5000);
//   }
// };

// // Initial connection attempt
// connectWithRetry();

// sequelize.afterDisconnect(async () => {
//   console.log('Database connection lost. Attempting to reconnect...');
//   await connectWithRetry();
// });

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;