const jwt = require('jsonwebtoken');

function getTokenFromBearer(header) {
  const tokenSplit = header.split(' ');
  return tokenSplit.length > 1 ? tokenSplit[1] : tokenSplit[0];
}

function getTokenFromRequest(req) {
  const bearer = req.get('Authorization');
  if (bearer) {
    return getTokenFromBearer(bearer);
  }
  return false;
}

function checkTokenSetUser(req, res, next) {
  const token = getTokenFromRequest(req);
  if (token) {
    try {
      const user = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = user;
      // Ignore errors as we are just trying to set the user on the request
      // eslint-disable-next-line no-empty
    } catch (_) {}
  }
  next();
}

module.exports = checkTokenSetUser;
