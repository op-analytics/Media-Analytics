const express = require('express');
const router = express.Router();
const UserController = require('./controllers/users.controller');

router.get('/', (_, res) => {
  res.json({ message: 'You reached auth' });
});

router.post('/signup', UserController.Signup); 
router.post('/login', UserController.Login); 
module.exports = router; 