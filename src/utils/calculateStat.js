function calculateStat(stat, level) {
  return Math.floor((stat * 2 * level) / 100) + 5;
}

module.exports = calculateStat;