var Sequelize = require('sequelize');
var path = require('path');

var sequelize = new Sequelize(undefined, undefined, undefined, {
  host: 'localhost',
  dialect: 'sqlite',

  // SQLite only
  storage: path.join(__dirname, '../database/database.sqlite')
});


// sequelize
//   .authenticate()
//   .then(function(err) {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(function(err) {
//     console.log('Unable to connect to the database:', err);
//   })


var Note = sequelize.define('note', {
  text: {
    type: Sequelize.STRING
  },
  uid: {
    type: Sequelize.STRING
  }
});





// Note.sync({force: true}).then(function () {
//   // Table created
//   return Note.create({
//     text: 'hello world'
//   });
// })

// Note.findAll({raw: true}).then(function(notes) {
//   console.log(notes)
// });

// Note.destroy({where: {text:'hello world'}},function() {
//   console.log('destroy ...')
//   console.log(arguments)
// })

Note.sync();

module.exports = Note;