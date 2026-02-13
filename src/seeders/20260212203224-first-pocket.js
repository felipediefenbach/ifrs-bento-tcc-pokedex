'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Pockets', [
      {
        trainer_id: 1,
        name: 'default',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        trainer_id: 1,
        name: 'laboratory',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        trainer_id: 2,
        name: 'default',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        trainer_id: 2,
        name: 'laboratory',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('pocket', null, {});
  }
};