const db = require("../config/Database");

class BattleModel {

  static async getCyclePokemonBySlot(fulldata) {
    const { battleCycle, battlePlayer } = fulldata;
    const [rows] = await db.query(
      ``,
      [battleCycle, battlePlayer]
    );
    return rows;
  }

}

module.exports = BattleModel;
