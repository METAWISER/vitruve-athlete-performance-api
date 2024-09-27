'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.addColumn(
        'athletes', 
        'password', 
        {
          type: Sequelize.STRING,
          allowNull: false,
        },
        { transaction }
      );
    });
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeColumn('athletes', 'password', { transaction });
    });
  }
};
