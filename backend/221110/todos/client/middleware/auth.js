const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

exports.generateToken = (user) => {
  const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '2h' });
  return token;
};

exports.verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const verified = jwt.verify(token, secretKey);
    req.userData = verified.id;
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Access restricted, please login'
    });
  }
};
