const jwt = require("jsonwebtoken");
const database = require("../config/database");

//function get the user by getting the token value from the request header/body/url
const verifyToken = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    // TODO: Verified token!
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.status(400).send("A token is required for authentication");
    }
    if(!database.check_token(token)){
      return res.status(404).send("Invalid token");
    }
    try {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
        if(err) return res.status(403).send("Invalid token verify");
        req.user = user;
        next();
      });
    } catch (err) {
      return res.status(400).send("Invalid Token");
    }
};

module.exports = verifyToken;