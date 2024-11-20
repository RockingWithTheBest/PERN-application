'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Client.init({
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    full_name:{
      type: DataTypes.STRING,
      allowNull: false
    } ,
    passport_number:{
      type: DataTypes.STRING(8),
      allowNull: false,
    } 
  }, {
    sequelize,
    modelName: 'Client',
    tableName: 'Clients',
  });
  return Client;
};