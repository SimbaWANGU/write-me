const Post = require('../models/post')

function createPost(req, res) {
  const personInfo = req.body
  if(!personInfo.text || !personInfo.author) {
    console.log(personInfo)
    res.json({
      error: 'No text available',
      username: req.body.author,
      text: req.body.text
    })
  } else {
    const newPost = new Post({
      body: personInfo.text,
      author: personInfo.author,
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