const { SignupSchema, LoginSchema } = require('../schemas');
const User = require('../models/user.model');
const config = require('../../../config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createValidationError = (message, type = ['general']) => ({
  type,
  message,
});

function tokenizeUser(user) {
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

async function EmailTaken(email) {
  return await User.findOne({ email });
}

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(UserData.password, salt);
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
  return tokenizeUser(result);
}

async function Login(req, res) {
  // Validate against schema
  const { error, value: UserData } = LoginSchema.validate(req.body, {
    abortEarly: false,
    allowUnknown: true,
  });
  if (error) {
    res.status(422).json({
      errors: error.details.map(error =>
        createValidationError(error.message, error.path),
      ),
    });
    return;
  }
  UserData.email = UserData.email.toLowerCase();

  // Try get user with email
  const user = await User.findOne({ email: UserData.email });
  if (!user) {
    res.status(400).json({
      errors: [createValidationError('Incorrect information')],
    });
    return;
  }

  // Check passwords match
  const validPass = await bcrypt.compare(UserData.password, user.password);
  if (!validPass) {
    res.status(400).json({
      errors: [createValidationError('Incorrect information')],
    });
    return;
  }

  //tokenise users data and return it
  const token = tokenizeUser(user);

  res.json({
    token,
  });
}

module.exports = {
  Signup,
  Login,
  GetUserData,
  CheckEmailTaken: EmailTaken,
};
