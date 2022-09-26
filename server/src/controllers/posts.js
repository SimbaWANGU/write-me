const Post = require('../models/post')

function createPost(req, res) {
  const postInfo = req.body
  if(!postInfo.text || !postInfo.author) {
    res.json({
      error: 'No text available',
    })
  } else {
    const newPost = new Post({
      body: postInfo.text,
      author: postInfo.author,
    })
    if(newPost.save()) {
      res.json({
        success: 'Post created'
      })
    } else {
      res.json({
        error: 'Post not created'
      })
    }
  }
}

function getPost(req, res) {}

function deletePost(req, res) {}

function updatePost(req, res) {}

module.exports = {
  createPost, getPost, deletePost, updatePost
}