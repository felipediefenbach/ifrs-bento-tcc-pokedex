const db = require("../config/Database");

class InfoModel {

  static async addBasicInfo(fulldata) {
    const { pokemon_id, height, weight, base_exp } = fulldata;
    const result = await db.query(
      "INSERT INTO pokemon_base_info values (?, ?, ?, ?)",
      [pokemon_id, height, weight, base_exp]
    );

    return result.affectedRows;
  }
}

module.exports = InfoModel;