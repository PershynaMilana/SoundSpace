
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = 'MyKey';

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized. Token not found.' });
  }

  jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized. Invalid token.' });
    }

    req.userId = user.id;
    next();
  });
};

module.exports = {
  verifyToken,
};
