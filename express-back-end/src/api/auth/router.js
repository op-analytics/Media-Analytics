const express = require('express');
const router = express.Router();
const UserController = require('./controllers/users.controller');
const { ensureLoggedIn } = require('./middlewares');

router.get('/', (_, res) => {
  res.json({ message: 'You reached auth' });
});

router.post('/signup', UserController.Signup);
router.post('/login', UserController.Login);
router.get('/user', ensureLoggedIn, UserController.GetUserData);

module.exports = router;
