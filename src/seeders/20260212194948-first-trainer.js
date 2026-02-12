'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    const hashedPassword = await bcrypt.hash('qwer12334', 8);

    await queryInterface.bulkInsert('trainer', [
      {
        name: 'felipedie',
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'machine',
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('trainer', null, {});
  }

};
