'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaction.init({
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sold_currency_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bought_currency_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cashier_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Cashiers',
        key: 'id',
      },
      onDelete: 'CASCADE'
    },
    client_id:{
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Clients',
        key: 'id',
      },
      onDelete: 'CASCADE'
    },
    transaction_date:{
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      validate: {
        isDate: true,
      }
    } ,
    transaction_time: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      validate: {
        isTime: true,
      }
    },
    sold_amount:{
      type: DataTypes.DECIMAL,
      validate: {
        min: 1,
      }
    } ,
    bought_amount: {
      type: DataTypes.DECIMAL,
      validate: {
        min: 1,
    }}
  }, {
    sequelize,
    modelName: 'Transaction',
    tableName: 'transactions',

  });
  return Transaction;
};