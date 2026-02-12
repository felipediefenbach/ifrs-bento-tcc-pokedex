'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('pocket', [
      {
        trainer_id: 1,
        name: 'default',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        trainer_id: 1,
        name: 'laboratory',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        trainer_id: 2,
        name: 'default',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        trainer_id: 2,
        name: 'laboratory',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('pocket', null, {});
  }
};