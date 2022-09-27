const router = require('express').Router()
const postController = require('../controllers/posts')


router.post('/create', (req, res) => {
  if(req.isAuthenticated) {
    postController.createPost(req, res)
  } else {
    res.json({
      error: 'You need to login'
    })
  }
})

router.get('/get', (req, res) => {
  if(req.isAuthenticated) {
    postController.getPost(req, res)
  } else {
    res.json({
      error: 'You need to login'
    })
  }
})

router.post('/update_post', (req, res) => {})
router.delete('/delete_post', (req, res) => {})

module.exports = router