function levelUpFormula(fulldata) {
  
  const { currentLevel } = fulldata;
  return (((currentLevel + 1 ) ** 3) - (currentLevel ** 3))

}

module.exports = levelUpFormula;