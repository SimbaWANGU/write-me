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

function getPost(req, res) {
  Post.find({}, function(err, result) {
    if(err) {
      res.json({
        error: err
      })
    } else {
      res.json({
        posts: result,
        status: 200
      })
    }
  })
}

function deletePost(req, res) {}

function updatePost(req, res) {}

function likePost(req, res) {
  const postId = req.body.id
  const username = req.body.username
  
  Post.findByIdAndUpdate(
    postId,
    {$push: {'likes': username}},
    {safe: true, upsert: true, new: true},
    function (err, docs) {
    if (err){
        console.log(err);
    }
    else{
        res.json({
          success: 'post was liked'
        })
    }
  });
}

module.exports = {
  createPost, getPost, deletePost, updatePost, likePost
}