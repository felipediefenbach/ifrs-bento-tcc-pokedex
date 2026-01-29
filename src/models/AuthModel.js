const db = require("../config/Database");

class AuthModel {

  static async checkUserByName(fulldata) {
    const { userName } = fulldata;
    const [rows] = await db.query(
      `SELECT 
          name, password
        FROM trainer
        WHERE
          name = ?`,
      [userName]
    );
    return rows[0];
  
  }

  static async register(fulldata) {
    const { userName, passFirst } = fulldata;
    const [rows] = await db.query(
      `INSERT INTO trainer (name, password) 
        VALUES (?, ?)`,
      [userName, passFirst]
    );

    return rows.affectedRows;
  }

}

module.exports = AuthModel;
