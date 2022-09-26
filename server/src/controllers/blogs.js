const Blog = require('../models/blog')

function createBlog(req, res) {
  const blogInfo = req.body
  if(!blogInfo.text || !blogInfo.author || !blogInfo.title || !blogInfo.status) {
    res.json({
      error: 'Incomplete blog',
    })
  } else {
    const newBlog = new Blog({
      title: blogInfo.title,
      body: blogInfo.text,
      author: blogInfo.author,
      status: blogInfo.status,
    })
    if(newBlog.save()) {
      res.json({
        success: 'Blog created'
      })
    } else {
      res.json({
        error: 'Blog not created'
      })
    }
  }
}
function getBlog(req, res) {
  Blog.find({}, function(err, result) {
    if(err) {
      res.json({
        error: err
      })
    } else {
      res.json({
        blogs: result,
        status: 200
      })
    }
  })
}

//{
//  id: result._id,
//  author: result.author,
//  title: result.title,
//  text: result.body,
//  status: result.status,
//  created_at: result.created_at,
//  updated_at: result.updated_at,
//  likes: result.likes,
//  comments: result.comments
//}

function updateBlog(req, res) {}
function deleteBlog(req, res) {}

module.exports = {
  createBlog, getBlog, deleteBlog, updateBlog
}