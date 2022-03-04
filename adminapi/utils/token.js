const jwt = require('jsonwebtoken');
// .env configration
require('dotenv').config();

module.exports = {
  validateToken: (req, res, next) => {
    const authorizationAdmin = req.headers.authorization;
    let result;
    if (authorizationAdmin) {
      const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
      try {
        result = jwt.verify(token, process.env.ADMIN_JWT_KEY);
        req.user = result;
        req.token = token;
        next();
      } catch (err) {
        throw new Error(err);
      }
    } else {
      result = { 
        error: `Authentication error. Token required.`,
        status: 401
      };
      res.status(401).send(result);
    }
  }
};