
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
  Blog.find({ status: 'public'}, function(err, result) {
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
  }).sort({createdAt: -1})
}

function getBlogCount(req, res) {
  console.log('I\'m called')
  Blog.find({ status: 'public'}, function(err, result) {
    if(err) {
      res.json({
        error: err
      })
    } else {
      res.json({
        length: result.length,
        status: 200
      })
    }
  })
}

function getPrivateBlogCount(req, res) {
  console.log('I\'m called')
  Blog.find({ status: 'private'}, function(err, result) {
    if(err) {
      res.json({
        error: err
      })
    } else {
      console.log(result.length)
      res.json({
        length: result.length,
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
      } else {
        res.json({
          success: 'blog was liked'
        })
      }
    }
  );
}

function unlikeBlog(req, res) {
  const blogId = req.body.id
  const username = req.body.username
  
  Blog.findByIdAndUpdate(
    blogId,
    {$pull: {'likes': username}},
    {safe: true, upsert: true, new: true},
    function (err, docs) {
      if (err){
        console.log(err);
      } else {
        res.json({
          success: 'blog was liked'
        })
      }
    }
  );
}

function getLikes(req, res) {
  const id = req.params.id
  Blog.findById(id, 'likes', function (err, docs) {
    if(err) {
        res.json({
          error: err
        })
    } else {
        res.json(docs)
    }
  })
}

function getComments(req, res) {
  const id = req.params.id
  Blog.findById(id, 'comments', function (err, docs) {
    if (err){
        res.json({
          error: err
        })
    } else {
        res.send(docs)
    }
  })
}

function addComment(req, res) {
  const blogId = req.params.id
  const newComment = {
    comment: req.body.comment,
    username: req.body.author
  }
  
  Blog.findByIdAndUpdate(
    blogId,
    {$push: {'comments': newComment}},
    {safe: true, upsert: true, new: true},
    function (err, docs) {
      if (err){
        console.log(err);
      } else {
        res.json({
          success: 'comment was added'
        })
      }
    }
  );
}

module.exports = {
  createBlog,
  getBlog,
  getBlogCount,
  getPrivateBlogCount,
  deleteBlog,
  updateBlog,
  likeBlog,
  unlikeBlog,
  getLikes,
  getComments,
  addComment,
}