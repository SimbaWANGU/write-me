const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  body: {
    require: true,
    type: String
  },
  author: {
    require: true,
    type: String,
  },
  likes: {
    type: Array,
    default: []
  },
  comments: {
    type: Array,
    default: []
  }
}, {timestamps: true})

module.exports = mongoose.model('Post', postSchema)