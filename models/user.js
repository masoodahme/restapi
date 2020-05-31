var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  
    admin:   {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', User);