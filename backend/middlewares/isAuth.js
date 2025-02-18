const jwt = require('jsonwebtoken');
const { AUTH_COOKIE_NAME } = require('../constants.js');

module.exports = (req, res, next) => {
  console.log(req.headers);

  const token = req.cookies[AUTH_COOKIE_NAME];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
