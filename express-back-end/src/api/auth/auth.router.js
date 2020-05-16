const express = require('express');
const { SignupSchema, LoginSchema } = require('./schemas');

const router = express.Router();
const UserController = require('./controllers/auth.controller');
const { ensureLoggedIn } = require('./middlewares');
const { validateBody } = require('../middlewares/validation');

router.get('/', UserController.home);

router.post('/signup', validateBody(SignupSchema), UserController.signup);

router.post('/login', validateBody(LoginSchema), UserController.login);

router.get('/user', ensureLoggedIn, UserController.getUser);

module.exports = router;
