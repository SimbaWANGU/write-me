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

router.post('/like', (req, res) => {
  if (req.isAuthenticated) {
    postController.likePost(req, res) 
  } else {
    res.json({
      error: 'You need to login'
    })
  }
})

router.post('/unlike', (req, res) => {
  if (req.isAuthenticated) {
    postController.unlikePost(req, res) 
  } else {
    res.json({
      error: 'You need to login'
    })
  }
})

router.get('/:id/likes', (req, res) => {
  if (req.isAuthenticated) {
    postController.getLikes(req, res) 
  } else {
    res.json({
      error: 'You need to login'
    })
  }
})

router.get('/:id/comments', (req, res) => {
  if (req.isAuthenticated) {
    postController.getComments(req, res) 
  } else {
    res.json({
      error: 'You need to login'
    })
  }
})

router.post('/:id/comment', (req, res) => {
  if (req.isAuthenticated) {
    postController.addComment(req, res) 
  } else {
    res.json({
      error: 'You need to login'
    })
  }
})


module.exports = router