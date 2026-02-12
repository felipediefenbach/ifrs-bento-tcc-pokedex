const AuthService = require("../services/AuthService");
const jwt = require("jsonwebtoken");

class AuthController {

  static async login(req, res) {

    try {
    
      const userFound = await AuthService.userFound(req.body);
      if (!userFound) {
        return res.status(200).json({
          status: false,
          result: "User not Found !!"
        });
      }

      const userPass = await AuthService.userPass(req.body);
      if(!userPass) {
        return res.status(200).json({
          status: false,
          result: "Wrong password !!"
        });
      }

      const fullUser = await AuthService.getUser(req.body);

      if(fullUser) {

        const payload = {
          sub: fullUser["id"],
          username: fullUser["name"]
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: '15m'
        });

        return res.status(200).json(
          {
            status: true,
            result: "Access Granted",
            accessToken: token,
            username: fullUser["name"]            
          }
        );
      }
      
    } catch (error) {
      res.status(500).json({ error: error.message });

    }
  }

  static async register(req, res) {
    try {

      const { password, passConfirm } = req.body;

      if ( password.length < 8 ) {
        return res.status(200).json(
          { 
            status: false,
            result: "Password too short !!"
          }
        );
      }

      if ( password !== passConfirm ) {
        return res.status(200).json(
          { 
            status: false,
            result: "Passwords Don't match !!"
          }
        );
      }

      const registerInfo = await AuthService.register(req.body);

      if(registerInfo) {
        return res.status(200).json(
          { 
            status: true,
            result: "User Created with success !!"
          }
        );
      
      } else {
        return res.status(200).json(
          { 
            status: false,
            result: "User Alredy Exists !!"
          }
        );
      
      }

    } catch (error) {
      res.status(500).json({ error: error.message });

    }
  }

}

module.exports = AuthController;
