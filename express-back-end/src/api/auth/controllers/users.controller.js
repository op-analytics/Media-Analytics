const User = require('../models/user.model');
const config = require('../../../config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function TokenizeUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    config.secret,
    {
      expiresIn: '4h',
    },
  );
}

async function GetUser(email) {
  return User.findOne({ email }).exec();
}

async function EmailTaken(email) {
  return Boolean(await GetUser(email));
}

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

async function PasswordsMatch(password1, password2) {
  return bcrypt.compare(password1, password2);
}

async function Signup(name, email, password) {
  const hashedPassword = await hashPassword(password);

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  const result = await user.save();

  // Tokenize data
  return TokenizeUser(result);
}

export default {
  Signup,
  GetUser,
  PasswordsMatch,
  EmailTaken,
};
