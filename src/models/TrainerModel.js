const db = require("../config/Database");

class TrainerModel {

  static async allTrainerNames() {
    const [rows] = await db.query(
      `SELECT
        name 
      FROM trainer`
    );
    return rows;
  }

  static async findTrainerByName(fulldata){
    const { trainerName } = fulldata;
    const [rows] = await db.query(
      `SELECT 
        name 
      FROM trainer 
      WHERE 
        name = ?`,
      [trainerName]
    );
    return rows;
  }

  static async findTrainerIdByName(fulldata){
    const { trainerName } = fulldata;
    const [rows] = await db.query(
      `SELECT 
        id 
      FROM trainer 
      WHERE 
        name = ?`,
      [trainerName]
    );
    return rows[0]['id'];
  }

  static async addTrainer(fulldata) {
      const { trainerName } = fulldata;
      const [rows] = await db.query(
        `INSERT INTO trainer (name)
          VALUES (?)`, 
        [trainerName]
      );
      return rows.insertId;
  }

}

module.exports = TrainerModel;
