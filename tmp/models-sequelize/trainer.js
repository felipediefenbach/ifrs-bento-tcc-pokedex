'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Trainer extends Model {
    static associate(models) {
      // define association here
    }

    // Find all trainer names
    static async allTrainerNames() {
      const trainers = await this.findAll({
        attributes: ['name']
      });
      return trainers;
    }

    // Find trainer by name
    static async findTrainerByName(fulldata) {
      const { trainerName } = fulldata;
      const trainer = await this.findOne({
        where: { name: trainerName },
        attributes: ['name']
      });
      return trainer ? [trainer] : [];
    }

    // Find trainer ID by name
    static async findTrainerIdByName(fulldata) {
      const { trainerName } = fulldata;
      const trainer = await this.findOne({
        where: { name: trainerName },
        attributes: ['id']
      });
      return trainer ? trainer.id : null;
    }

    // Add new trainer
    static async addTrainer(fulldata) {
      const { trainerName } = fulldata;
      const trainer = await this.create({
        name: trainerName
      });
      return trainer.id;
    }
  }

  Trainer.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Trainer',
    tableName: 'trainers',
    timestamps: false
  });

  return Trainer;
};