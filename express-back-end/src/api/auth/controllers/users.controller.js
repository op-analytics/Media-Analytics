const { SignupSchema, LoginSchema } = require('../schemas');
const User = require('../models/user.model');
const config = require('../../../config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (function() {
  const createValidationError = (message, type = ['general']) => ({
    type,
    message,
  });

  const tokenizeUser = user =>
    jwt.sign(
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

  const GetUserData = (req, res) => {
    res.json({
      data: {...req.user}
    });
  };

  const Signup = async (req, res) => {
    // Validate against schema
    const { error, value: UserData } = SignupSchema.validate(req.body, {
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

    // Check email is not already taken
    const emailAlreadyTaken = await User.findOne({ email: UserData.email });
    if (emailAlreadyTaken) {
      res.status(422).json({
        errors: [createValidationError('Email already taken', ['email'])],
      });
      return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(UserData.password, salt);

    // Try save and tokenize the user return error if it doesn't work
    const user = new User({
      ...UserData,
      password: hashedPassword,
    });

    try {
      const result = await user.save();

      // Tokenize data
      const token = tokenizeUser(result);

      // return the tokenized user
      res.json({
        token,
      });
    } catch (err) {
      res
        .status(500)
        .json(createValidationError('There was an error creating your user'));
      return;
    }
  };

  const Login = async (req, res) => {
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

    // Try get user with email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).json({
        errors: [createValidationError('Incorrect information')],
      });
      return;
    }

    // Check passwords match
    const validPass = await bcrypt.compare(req.body.password, user.password);
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
  };
  return {
    Signup,
    Login,
    GetUserData,
  };
})();
