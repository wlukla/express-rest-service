const jwt = require('jsonwebtoken');
const ErrorHandler = require('../common/ErrorHandler');

const NO_AUTH_URLS = ['/', '/login', '/doc'];

const tokenChecker = (req, res, next) => {
  try {
    const { url, headers } = req;
    if (NO_AUTH_URLS.includes(url)) return next();

    const token = headers.authorization.replace('Bearer ', '');
    jwt.verify(token, process.env.JWT_SECRET_KEY);
    return next();
  } catch {
    throw new ErrorHandler(401, 'Unauthorized');
  }
};

module.exports = { tokenChecker };
