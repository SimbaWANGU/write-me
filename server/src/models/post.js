const mongoose = require('mongoose');

const d = Date(Date.now())
const a = d.toString()

const postSchema = new mongoose.Schema({
  body: {
    require: true,
    type: String
  },
  created_at: {
    type: String,
    default: a
  },
  updated_at: {
    type: String,
    default: a
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
})

module.exports = mongoose.model('Post', postSchema)