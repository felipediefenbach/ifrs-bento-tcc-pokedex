const AuthModel = require("../models/AuthModel");
const bcrypt = require("bcryptjs");

class AuthService {

  static async userFound(fulldata) {
    
    const checkUserExists = await AuthModel.checkUserByName(fulldata);
    return checkUserExists ? true : false 

  }

  static async login(fulldata) {

    const checkUserExists = await AuthModel.checkUserByName(fulldata);
    const { passFirst } = fulldata;  
    const { password } = checkUserExists;
    
    const hashedPassword = await bcrypt.hash(passFirst, 8);
    return hashedPassword === password;

  }

  static async register(fulldata) {
    
    const checkUserExists = await AuthModel.checkUserByName(fulldata);
    
    if ( checkUserExists ) {
      return false
    
    } else {
      
      const { passFirst } = fulldata;  
      const hashedPassword = await bcrypt.hash(passFirst, 8);
      fulldata['passFirst'] = hashedPassword;

      const addedUser = await AuthModel.register(fulldata);
      return addedUser === 1
    
    }
  }

}

module.exports = AuthService;
