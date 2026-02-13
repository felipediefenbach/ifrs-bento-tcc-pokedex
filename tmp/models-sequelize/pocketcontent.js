'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PocketContent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PocketContent.init({
    pocket_id: DataTypes.INTEGER,
    trainer_id: DataTypes.INTEGER,
    pokemon_id: DataTypes.INTEGER,
    slot_number: DataTypes.INTEGER,
    moves: DataTypes.STRING,
    rm_moves: DataTypes.STRING,
    full_hp: DataTypes.INTEGER,
    curr_hp: DataTypes.INTEGER,
    attack: DataTypes.INTEGER,
    defense: DataTypes.INTEGER,
    curr_xp: DataTypes.INTEGER,
    level: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PocketContent',
  });
  return PocketContent;
};