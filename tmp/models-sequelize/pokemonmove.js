'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PokemonMove extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PokemonMove.init({
    pokemon_id: DataTypes.INTEGER,
    level: DataTypes.INTEGER,
    moves: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PokemonMove',
  });
  return PokemonMove;
};