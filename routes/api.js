var express = require('express');
var router = express.Router();
var Note = require('../model/note.js');

/* GET users listing. */
router.get('/notes', function(req, res, next) {
  var opts = {raw: true};

  if(req.session && req.session.user) {
    opts.where = {uid: req.session.user.id}
  }
  Note.findAll(opts).then(function(notes) {
    res.send({status: 0, data: notes});
  }).catch(function() {
    res.send({status: 1, errorMsg: '数据库异常'});
  });
});

router.post('/notes/add', function(req, res, next) {

  if(!req.session || !req.session.user) {
    return res.send({status: 1, errorMsg: '请先登录'})
  }
  if(!req.body.note) {
    return res.send({status: 2, errorMsg: '内容不能为空'})
  }

  Note.create({text: req.body.note, uid: req.session.user.id}).then(function() {
    res.send({status: 0})
  }).catch(function() {
    res.send({status: 1, errorMsg: '数据库异常或你没有权限'})
  })
});

router.post('/notes/edit', function(req, res, next) {

  if(!req.session || !req.session.user) {
    return res.send({status: 1, errorMsg: '请先登录'})
  }

  Note.update({text: req.body.note}, {where: {id: req.body.id, uid: req.session.user.id}}).then(function() {
    res.send({status: 0})
  }).catch(function() {
    res.send({status: 1, errorMsg: '数据库异常或你没有权限'})
  })
});

router.post('/notes/delete', function(req, res, next) {

  if(!req.session || !req.session.user) {
    return res.send({status: 1, errorMsg: '请先登录'})
  }

  Note.destroy({where: {id: req.body.id, uid: req.session.user.id}}).then(function(deleteLen) {
    if(deleteLen === 0) {
      return res.send({status: 1, errorMsg: '你没有权限'})
    }
    res.send({status: 0})
  }).catch(function() {
    res.send({status: 1, errorMsg: '数据库异常或你没有权限'})
  })
});

module.exports = router;
