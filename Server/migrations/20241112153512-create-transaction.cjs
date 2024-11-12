'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sold_currency_code: {
        type: Sequelize.STRING,
        allowNull: true
      },
      bought_currency_code: {
        type: Sequelize.STRING,
        allowNull: true
      },
      cashier_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Cashiers',
          key: 'id',
        }
      },
      client_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Clients',
          key: 'id',
        }
      },
      transaction_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      transaction_time: {
        type: Sequelize.TIME,
        allowNull: false
      },
      sold_amount: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      bought_amount: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
  }
};