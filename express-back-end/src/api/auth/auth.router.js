const { SignupSchema, LoginSchema } = require('./schemas');
const User = require('../models/user.model');
const express = require('express');
const router = express.Router();
const UserController = require('./controllers/users.controller');
const { ensureLoggedIn } = require('./middlewares');
const { validateBody } = require('../middlewares/validation');

const createValidationError = (message, type = ['general']) => ({
  type,
  message,
});

router.get('/', (_, res) => {
  res.json({ message: 'You reached auth' });
});

router.post('/signup', validateBody(SignupSchema), async (req, res) => {
  const { email, name, password } = req;
  email = email.toLowerCase();

  // Check email is not already taken
  if (await UserController.EmailTaken(req.email)) {
    return res.status(422).json({
      errors: [createValidationError('Email already taken', ['email'])],
    });
  }

  // Try signup user but responed with an error if it fails
  try {
    const token = await UserController.Signup(name, email, password);
    res.json({
      token,
    });
  } catch (e) {
    res
      .status(500)
      .json(createValidationError('There was an error creating your user'));
  }
});

router.post('/login', UserController.Login);

router.get('/user', ensureLoggedIn, (req, res) => {
  res.json({
    data: { ...req.user },
  });
});

module.exports = router;
