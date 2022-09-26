const mongoose = require('mongoose');

const d = Date(Date.now())
const a = d.toString()

const blogSchema = new mongoose.Schema({
  title: {
    require: true,
    type: String
  },
  body: {
    require: true,
    type: String
  },
  status: {
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

module.exports = mongoose.model('Blog', blogSchema)