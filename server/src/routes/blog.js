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

module.exports = router