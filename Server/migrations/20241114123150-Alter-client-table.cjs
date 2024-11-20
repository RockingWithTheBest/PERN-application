'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    //change passport_number to column to STRING(8)
    await queryInterface.changeColumn('Clients', 'passport_number', 
      { 
          type: Sequelize.STRING(8),
          allowNull:false
       });

    await queryInterface.sequelize.query(
      "ALTER TABLE \"Clients\" ADD CONSTRAINT passport_start_PN CHECK (passport_number LIKE \'PN%\')"
    )

    await queryInterface.sequelize.query(
      "ALTER TABLE \"Clients\" ADD CONSTRAINT passport_start_PN CHECK (full_name ~ '\^[A-Za-z ]+$'\)"
    )
  },

  async down (queryInterface, Sequelize) {
      //Rollback constraint
      await queryInterface.removeConstraint('Clients', 'passport_start_PN');

      //Rollback column changes
      await queryInterface.changeColumn('Clients', 'passport_number', 
        { 
            type: Sequelize.STRING,
            allowNull: true
       });
  }
};  
