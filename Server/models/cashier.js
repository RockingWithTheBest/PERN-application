'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cashier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cashier.init({
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    full_name:{
      type: DataTypes.STRING,
      allowNull: false,
    } 
  }, {
    sequelize,
    modelName: 'Cashier',
    tableName: 'Cashiers'
  });
  return Cashier;
};