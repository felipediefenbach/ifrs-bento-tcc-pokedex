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

        const refreshToken = jwt.sign(
          { sub: fullUser["id"] },
          process.env.JWT_REFRESH,
          { expiresIn: '7d' }
        );

        return res.status(200).json(
          {
            status: true,
            result: "Access Granted",
            accessToken: token,
            refreshToken: refreshToken,
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

  static async refresh(req, res) {
    
    try {
      const { refreshToken } = req.body;
      
      if(refreshToken) {
        jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err, decoded) => {
          if (err) {
            return res.status(400).json({
              error: "Invalid Refresh token !!"
            });    
          }

          const payload = {
            sub: decoded.sub,
          }

          const newAccessToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '15m'
          });

          res.json({
            accessToken: newAccessToken
          });

        });

      } else {
        return res.status(400).json({
          error: "Refresh token required !!"
        });
      }

    } catch (error) {
      res.status(500).json({ error: error.message });

    }
  }

}

module.exports = AuthController;
