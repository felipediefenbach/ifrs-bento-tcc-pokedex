'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pocket_content', {
      pocket_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'pocket',
          key: 'id'
        }
      },
      trainer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'trainer',
          key: 'id'
        }
      },
      pokemon_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'pokemon',
          key: 'id'
        }
      },
      slot_number: {
        type: Sequelize.INTEGER
      },
      moves: {
        type: Sequelize.STRING,
        defaultValue: "none,none,none,none"
      },
      rm_moves: {
        type: Sequelize.STRING,
        defaultValue: "none"
      },
      full_hp: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      curr_hp: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      attack: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      defense: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      curr_xp: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      level: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pocket_content');
  }
};