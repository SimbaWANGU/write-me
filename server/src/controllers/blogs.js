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

function updateBlog(req, res) {}
function deleteBlog(req, res) {}

function likeBlog(req, res) {
  const blogId = req.body.id
  const username = req.body.username
  
  Blog.findByIdAndUpdate(
    blogId,
    {$push: {'likes': username}},
    {safe: true, upsert: true, new: true},
    function (err, docs) {
    if (err){
        console.log(err);
    }
    else{
        res.json({
          success: 'blog was liked'
        })
    }
  });
}

module.exports = {
  createBlog, getBlog, deleteBlog, updateBlog
}