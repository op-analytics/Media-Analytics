const Auth = require('../lib/auth');

const createValidationError = (message, type = ['general']) => ({
  type,
  message,
});

exports.home = (_, res) => {
  res.json({ message: 'You reached auth' });
};

exports.signup = async (req, res) => {
  const { email: emailDirty, name, password } = req.body;
  const email = emailDirty.toLowerCase();

  // Check email is not already taken
  if (await Auth.EmailTaken(req.email)) {
    return res.status(422).json({
      errors: [createValidationError('Email already taken', ['email'])],
    });
  }

  // Try signup user but responed with an error if it fails
  try {
    const user = await Auth.Signup(name, email, password);
    return res.json({ token: Auth.TokenizeUser(user) });
  } catch (e) {
    return res
      .status(500)
      .json(createValidationError('There was an error creating your user'));
  }
};

exports.login = async (req, res) => {
  const { email: emailDirty, password } = req.body;
  const email = emailDirty.toLowerCase();

  // Try get user with the given email
  const user = await Auth.GetUser(email);

  if (!user || !(await Auth.PasswordsMatch(password, user.password))) {
    return res
      .status(400)
      .json({ errors: [createValidationError('Incorrect information')] });
  }

  return res.json({ token: Auth.TokenizeUser(user) });
};

exports.getUser = (req, res) => {
  res.json({ data: { ...req.user } });
};
