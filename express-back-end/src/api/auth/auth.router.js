const express = require('express');
const { SignupSchema, LoginSchema } = require('./schemas');

const router = express.Router();
const { AuthController } = require('./controllers/');
const { ensureLoggedIn } = require('./middlewares');
const { validateBody } = require('../middlewares');

router.get('/', AuthController.home);

router.post('/signup', validateBody(SignupSchema), AuthController.signup);

router.post('/login', validateBody(LoginSchema), AuthController.login);

router.get('/user', ensureLoggedIn, AuthController.getUser);

module.exports = router;
