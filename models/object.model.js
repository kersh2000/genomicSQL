const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../db/db');

class Object extends Model { }

Object.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  genome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mRNA: {
    type: DataTypes.STRING
  },
  proteinSequence: {
    type: DataTypes.STRING
  }
}, { sequelize: db, modelName: 'Object'});

module.exports = Object;