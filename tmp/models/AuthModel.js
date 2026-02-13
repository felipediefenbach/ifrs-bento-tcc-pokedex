const db = require("../config/Database");

class AuthModel {

  static async checkUserByName(fulldata) {
    const { username } = fulldata;
    const [rows] = await db.query(
      `SELECT 
          id as trainerId,
          name as userName, 
          password as userPass
        FROM trainer
        WHERE
          name = ?`,
      [username]
    );
    return rows[0];
  
  }

  static async getUser(fulldata) {
    const { username } = fulldata;
    const [rows] = await db.query(
      `SELECT 
          id, name
        FROM trainer
        WHERE
          name = ?`,
      [username]
    );
    return rows[0];
  
  }

  static async register(fulldata) {
    const { username, password } = fulldata;
    const [rows] = await db.query(
      `INSERT INTO trainer (name, password) 
        VALUES (?, ?)`,
      [username, password]
    );

    return rows.affectedRows;
  }

  static async registerPockets(fulldata) {
    const { trainerId, pocketName } = fulldata;
    const [rows] = await db.query(
      `INSERT INTO pocket (trainer_id, name) 
        VALUES (?, ?)`,
      [trainerId, pocketName]
    );

    return rows.affectedRows;
  }
}

module.exports = AuthModel;
