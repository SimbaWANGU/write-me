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
  }).sort({createdAt: -1})
}

function getPostCount(req, res) {
  const name = req.params.author
  Post.find({author: name}, function(err, result) {
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
      } else {
        res.json({
          success: 'post was liked'
        })
      }
    }
  );
}

function unlikePost(req, res) {
  const postId = req.body.id
  const username = req.body.username
  
  Post.findByIdAndUpdate(
    postId,
    {$pull: {'likes': username}},
    {safe: true, upsert: true, new: true},
    function (err, docs) {
      if (err){
        console.log(err);
      } else {
        res.json({
          success: 'post was liked'
        })
      }
    }
  );
}

function getLikes(req, res) {
  const id = req.params.id
  Post.findById(id, 'likes', function (err, docs) {
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
  Post.findById(id, 'comments', function (err, docs) {
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
  const postId = req.params.id
  const newComment = {
    comment: req.body.comment,
    username: req.body.author
  }
  
  Post.findByIdAndUpdate(
    postId,
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
  createPost,
  getPost,
  getPostCount,
  deletePost,
  updatePost,
  likePost,
  unlikePost,
  getLikes,
  getComments,
  addComment
}