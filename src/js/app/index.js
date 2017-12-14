require('less/index.less');

var NoteManager = require('mod/note-manager.js').NoteManager;
var WaterFall = require('mod/water-fall.js');
var Event = require('../mod/event.js');

NoteManager.load();

$('.add-note').on('click', function() {
  NoteManager.add();
})

$('.sort').on('click', function() {
  Event.fire('waterfall');
})

Event.on('waterfall', function() {
  WaterFall.init($('#content'));
});