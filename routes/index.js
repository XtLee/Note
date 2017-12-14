var express = require('express');
var router = express.Router();
var Note = require('../model/note.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  var login;
  if(req.session.user) {
    login = {
      isLogin: true,
      user: req.session.user
    }
  } else {
    login = {
      isLogin: false
    }
  }
  res.render('index', login);
});

module.exports = router;
