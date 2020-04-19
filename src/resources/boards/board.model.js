const mongoose = require('mongoose');
const uuid = require('uuid');

const boardSchema = new mongoose.Schema({
  title: {
    type: String,
    default: 'Title'
  },
  columns: {
    type: Array,
    default: []
  },
  id: {
    type: String,
    default: uuid
  }
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
