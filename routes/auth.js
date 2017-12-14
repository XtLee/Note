var express = require('express');
var router = express.Router();

var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;

/* GET users listing. */
passport.serializeUser(function(user, done) {
  console.log('--serializeUser--')
  console.log(user)
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log('--deserializeUser--')
  done(null, obj);
});

passport.use(new GithubStrategy({
  clientID: 'a9af9e6c1705071b0b0e',
  clientSecret: 'b00883d6f7e25a1e63f055ad0365b92a375a6cbe',
  callbackURL: 'http://127.0.0.1:3000/auth/github/callback'
},
function(accessToken, refreshToken, profile, done) {
  done(null, profile);
}));

router.get('/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/');
});


router.get('/github', passport.authenticate('github'));

router.get('/github/callback', passport.authenticate('github', {failureRedirect: '/login'}),
  function(req, res) {
    req.session.user = {
      id: req.user.id,
      username: req.user.displayName || req.user.username,
      avatar: req.user._json.avatar_url,
      provider: req.user.provider
    };
    res.redirect('/');
  });

  module.exports = router;