const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {

  let token = null;
  
  // 1. First check query parameter (for page loads)
  if (req.query.token) {
    token = req.query.token;
  }
  
  // 2. Then check Authorization header (for API calls)
  if (!token) {
    const authHeader = req.headers['authorization'];
    token = authHeader && authHeader.split(' ')[1];
  }
  
  if (!token) {
    return res.status(401).json({ 
      status: false,
      error: 'Access token required' 
    });
  }
  
  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ 
        status: false,
        error: 'Invalid or expired token' 
      });
    }
    
    // Attach user info to request object
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;