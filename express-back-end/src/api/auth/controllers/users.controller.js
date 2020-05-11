const { SignupSchema, LoginSchema } = require('../schemas');
const User = require('../models/user.model');
const config = require('../../../config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createValidationError = (message, type = ['general']) => ({
  type,
  message,
});

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
  return await User.findOne({ email: UserData.email }).exec();
}

async function EmailTaken(email) {
  return await User.findOne({ email });
}

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(UserData.password, salt);
}

async function PasswordsMatch(password1, password2) {
  return await bcrypt.compare(password1, password2);
}

async function Signup(name, email, password) {
  const hashedPassword = await hashedPassword();

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  const result = await user.save();

  // Tokenize data
  return TokenizeUser(result);
}

module.exports = {
  Signup,
  GetUser,
  PasswordsMatch,
  EmailTaken,
};
