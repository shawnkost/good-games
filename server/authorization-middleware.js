const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');

function authorizationMiddleware(req, res, next) {
  const headers = req.headers;
  const token = headers['x-access-token'];
  if (!token) {
    throw new ClientError(401, 'authentication required');
  }
  req.user = jwt.verify(token, process.env.TOKEN_SECRET);
  next();
}

module.exports = authorizationMiddleware;
