const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'data/database.sqlite'
})

// sequelize.authenticate()
//   .then(() => {
//     console.log('Connection to the MySQL database has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the MySQL database:', err);
//   });

module.exports = sequelize;
