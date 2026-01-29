const AuthService = require("../services/AuthService");

class AuthController {

  static async login(req, res) {

    try {
      const userInfo = await AuthService.userFound(req.body);
      const loginInfo = await AuthService.login(req.body);
      if ( userInfo ) {
        if( loginInfo ) {
          res.status(200).json(
            { 
              status: true,
              result: "Access Granted"
            }
          );
          } else {
            res.status(200).json(
              { 
                status: false,
                result: "Wrong password !!"
              }
            );
          }

        } else {
          res.status(200).json(
            { 
              status: false,
              result: "User no Found !!"
            }
          );
        }
    

    } catch (error) {
      res.status(500).json({ error: error.message });

    }
  }
  
  static async register(req, res) {
    try {

      const { passFirst, passSecond } = req.body;

      if ( passFirst.length > 8 ) {
        res.status(200).json(
          { 
            status: false,
            result: "Password too short !!"
          }
        );
      }

      if ( passFirst !== passSecond ) {
        res.status(200).json(
          { 
            status: false,
            result: "Passwords Don't match !!"
          }
        );
      }

      const registerInfo = await AuthService.register(req.body);
      if(registerInfo) {
        res.status(200).json(
          { 
            status: true,
            result: "User Created with success !!"
          }
        );
      } else {
        res.status(200).json(
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
