const mongoose = require('mongoose');

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

module.exports = mongoose.model('Blog', blogSchema)