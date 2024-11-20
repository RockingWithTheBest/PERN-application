'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      "ALTER TABLE \"Currencies\" ADD CONSTRAINT chck_currency CHECK(currency_name in('USD') or currency_name in('EUR') or currency_name in('RUB') or currency_name in('CNY'))"
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.removeConstraint('Currencies','chck_currency')
  }
};
  