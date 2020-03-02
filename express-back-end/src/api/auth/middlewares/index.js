const auth = require('./auth');
const tokenValidation = require('./tokenValidation');

module.exports = {
  ...auth,
  ...tokenValidation,
};
