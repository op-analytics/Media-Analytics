function ensureLoggedIn(req, res, next) {
  if (req.user && req.user._id) next();
  else {
    res.status(401);
    res.json({ message: 'UnAuthorized' });
  }
}

module.exports = {
  ensureLoggedIn,
};
