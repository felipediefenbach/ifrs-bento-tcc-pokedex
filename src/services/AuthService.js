const AuthModel = require("../models/AuthModel");
const bcrypt = require("bcryptjs");

class AuthService {

  static async userFound(fulldata) {
    
    const checkUserExists = await AuthModel.checkUserByName(fulldata);
    return checkUserExists ? true : false 

  }

  static async userPass(fulldata) {

    const checkUserPass = await AuthModel.checkUserByName(fulldata);
    const { password } = fulldata;  
    const { userPass } = checkUserPass;
    
    const passMatch = await bcrypt.compare(String(password.trim()), String(userPass.trim()));
    return passMatch;

  }

  static async getUser(fulldata) {
    const gettedUser = await AuthModel.getUser(fulldata);
    return gettedUser ? gettedUser : false 
  }

  static async register(fulldata) {
    
    const checkUserExists = await AuthModel.checkUserByName(fulldata);
    
    if ( checkUserExists ) {
      return false
    
    } else {
      
      const { password } = fulldata;  
      const hashedPassword = await bcrypt.hash(String(password.trim()), 8);
      fulldata["password"] = hashedPassword;

      const addedUser = await AuthModel.register(fulldata);
  
      const checkUserExists = await AuthModel.checkUserByName(fulldata);
      const { trainerId } = checkUserExists;
      const pocket1 = await AuthModel.registerPockets({trainerId, pocketName: "default"});
      const pocket2 = await AuthModel.registerPockets({trainerId, pocketName: "laboratory"});
      
      return addedUser === 1 && pocket1 === 1 && pocket2 === 1;
    
    }
  }

}

module.exports = AuthService;
