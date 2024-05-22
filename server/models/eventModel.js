const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    eventDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    organizer: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });

  return Event;
};
// const Event = sequelize.define('Event', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   title: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   description: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   eventDate: {
//     type: DataTypes.DATE,
//     allowNull: false
//   },
//   organizer: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   // participants: {
//   //   type: DataTypes.STRING
//   // },
// }, {
//   timestamps: true
// });
//
//
// module.exports = Event;
