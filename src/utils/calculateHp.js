function calculateHp(hp, level) {
  return Math.floor((hp * 2 * level) / 100) + level + 10;
}

module.exports = calculateHp;