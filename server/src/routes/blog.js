const router = require('express').Router()
const blogController = require('../controllers/blogs')

router.post('/create', (req, res) => {
  if(req.isAuthenticated) {
    blogController.createBlog(req, res)
  } else {
    res.json({
      error: 'You need to login'
    })
  }
})

router.get('/get', (req, res) => {
  if(req.isAuthenticated) {
    blogController.getBlog(req, res)
  } else {
    res.json({
      error: 'You need to login'
    })
  }
})

router.post('/like', (req, res) => {
  if (req.isAuthenticated) {
    blogController.likeBlog(req, res) 
  } else {
    res.json({
      error: 'You need to login'
    })
  }
})

router.post('/unlike', (req, res) => {
  if (req.isAuthenticated) {
    blogController.unlikeBlog(req, res) 
  } else {
    res.json({
      error: 'You need to login'
    })
  }
})

router.get('/:id/likes', (req, res) => {
  if (req.isAuthenticated) {
    blogController.getLikes(req, res) 
  } else {
    res.json({
      error: 'You need to login'
    })
  }
})

router.get('/:id/comments', (req, res) => {
  if (req.isAuthenticated) {
    blogController.getComments(req, res) 
  } else {
    res.json({
      error: 'You need to login'
    })
  }
})

router.post('/:id/comment', (req, res) => {
  if (req.isAuthenticated) {
    blogController.addComment(req, res) 
  } else {
    res.json({
      error: 'You need to login'
    })
  }
})

module.exports = router