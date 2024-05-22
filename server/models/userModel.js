const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

// const User = sequelize.define('User', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   fullName: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true
//   },
//   birthDate: {
//     type: DataTypes.DATE,
//   },
//   referralSource: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   }
//
//   // event: {
//   //
//   // }
// });
//
// module.exports = User;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    birthDate: {
      type: DataTypes.DATE,
    },
    referralSource: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  return User;
};
