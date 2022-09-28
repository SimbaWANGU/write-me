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
    postController.likeBlog(req, res) 
  } else {
    res.json({
      error: 'You need to login'
    })
  }
})

module.exports = router