var mongoose = require('mongoose');
var bookSchema = require('./bookSchema')

var BookModel = mongoose.model('book',bookSchema,'book');

module.exports = BookModel;