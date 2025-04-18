const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader || !authHeader?.startsWith("Token ") || !authHeader.split(" ")[1].length) {
    req.user = { isAuthenticated: false };
    return next();
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      req.user = { isAuthenticated: false };
      return next();
    }
    req.user = decoded.user;
    req.user.isAuthenticated = true;
    next();
  });
};

module.exports = auth;
