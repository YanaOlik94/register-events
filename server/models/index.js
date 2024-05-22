const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const User = require('./userModel')(sequelize, Sequelize.DataTypes);
const Event = require('./eventModel')(sequelize, Sequelize.DataTypes);

User.belongsToMany(Event, { through: 'UserEvents' });
Event.belongsToMany(User, { through: 'UserEvents' });

module.exports = {
  User,
  Event,
  sequelize
};
