'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Currency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Currency.init({
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    currency_name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    selling_rate: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    buying_rate: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Currency',
    tableName: 'Currencies',
  });
  return Currency;
};