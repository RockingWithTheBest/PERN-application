'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.sequelize.query(
      "ALTER TABLE \"Cashiers\" ADD CONSTRAINT chck_alphabet CHECK(full_name ~ '\[^A-Za-z ]+$'\)"
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Cashiers', 'chck_alphabet');
  }
};
