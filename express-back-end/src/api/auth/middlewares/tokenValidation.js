const jwt = require('jsonwebtoken');

function getTokenFromBearer(header) {
  const tokenSplit = header.split(' ');
  return tokenSplit.length > 0 ? tokenSplit[1] : tokenSplit[0];
}

function getTokenFromRequest(req) {
  const bearer = req.get('Authorization');
  if (bearer) {
    return getTokenFromBearer(bearer);
  }
  return false;
}

function verifyJWT(token) {
  return new Promise(resolve => {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) return resolve();
      return resolve(decoded);
    });
  });
}

function getUserFromBearer(bearer) {
  const token = getTokenFromBearer(bearer);

  if (token) {
    return verifyJWT(token).then(user => {
      return user;
    });
  }
  return Promise.resolve();
}

function checkTokenSetUser(req, res, next) {
  const token = getTokenFromRequest(req);

  if (token) {
    verifyJWT(token).then(user => {
      req.user = user;
      next();
    });
  } else {
    next();
  }
}

module.exports = {
  verifyJWT,
  checkTokenSetUser,
  getUserFromBearer,
};
