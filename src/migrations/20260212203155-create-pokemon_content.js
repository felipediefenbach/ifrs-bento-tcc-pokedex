'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pocket_content', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pocket_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'pocket',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      trainer_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'trainer',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      pokemon_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'pokemon',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      slot_number: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      moves: {
        type: Sequelize.STRING(200),
        allowNull: true,
        defaultValue: 'none,none,none,none'
      },
      rm_moves: {
        type: Sequelize.STRING(200),
        allowNull: true,
        defaultValue: 'none'
      },
      full_hp: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      curr_hp: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      attack: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      defense: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      curr_xp: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      level: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 1
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
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