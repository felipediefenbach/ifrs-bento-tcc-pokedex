'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('Pockets', {
      fields: ['trainer_id'],
      type: 'foreign key',
      name: 'fk_pocket_trainer',
      references: {
        table: 'Trainers',
        field: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('PokemonBaseInfos', {
      fields: ['pokemon_id'],
      type: 'foreign key',
      name: 'fk_pokemon_base_info_pokemon',
      references: {
        table: 'Pokemons',
        field: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('PokemonTypes', {
      fields: ['pokemon_id'],
      type: 'foreign key',
      name: 'fk_pokemon_type_pokemon',
      references: {
        table: 'Pokemons',
        field: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('PokemonMoves', {
      fields: ['pokemon_id'],
      type: 'foreign key',
      name: 'fk_pokemon_move_pokemon',
      references: {
        table: 'Pokemons',
        field: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('PokemonStats', {
      fields: ['pokemon_id'],
      type: 'foreign key',
      name: 'fk_pokemon_stat_pokemon',
      references: {
        table: 'Pokemons',
        field: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('PokemonEvolutions', {
      fields: ['pokemon_id'],
      type: 'foreign key',
      name: 'fk_pokemon_evolution_pokemon',
      references: {
        table: 'Pokemons',
        field: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('PocketContents', {
      fields: ['pocket_id'],
      type: 'foreign key',
      name: 'fk_pocket_content_pocket',
      references: {
        table: 'Pockets',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('PocketContents', {
      fields: ['trainer_id'],
      type: 'foreign key',
      name: 'fk_pocket_content_trainer',
      references: {
        table: 'Trainers',
        field: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('PocketContents', {
      fields: ['pokemon_id'],
      type: 'foreign key',
      name: 'fk_pocket_content_pokemon',
      references: {
        table: 'Pokemons',
        field: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Pockets', 'fk_pocket_trainer');
    await queryInterface.removeConstraint('PokemonBaseInfos', 'fk_pokemon_base_info_pokemon');
    await queryInterface.removeConstraint('PokemonTypes', 'fk_pokemon_type_pokemon');
    await queryInterface.removeConstraint('PokemonMoves', 'fk_pokemon_move_pokemon');
    await queryInterface.removeConstraint('PokemonStats', 'fk_pokemon_stat_pokemon');
    await queryInterface.removeConstraint('PokemonEvolutions', 'fk_pokemon_evolution_pokemon');
    await queryInterface.removeConstraint('PocketContents', 'fk_pocket_content_pocket');
    await queryInterface.removeConstraint('PocketContents', 'fk_pocket_content_trainer');
    await queryInterface.removeConstraint('PocketContents', 'fk_pocket_content_pokemon');
  }
};