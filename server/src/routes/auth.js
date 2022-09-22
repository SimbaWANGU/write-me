const router = require('express').Router()
const passport = require('passport')
const User = require('../models/user');

passport.use(User.createStrategy())

passport.serializeUser(function(user, done) {
  done(null, user.id)
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user)
  })
})

router.post("/auth/register", async (req, res) => {
  try {
    const registerUser = await User.register({username: req.body.username}, req.body.password)
    if(registerUser) {
      passport.authenticate('local')(req, res, function () {
        res.json({
          lmao: 'You\'re not in'
        })
      })
    } else {
      res.json({
        lmao: 'You\'re not in'
      })
    }
  } catch (err) {
    res.send(err)
  }
})

router.post("/auth/login", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  })

  req.login(user, (err) => {
    if(err) {
      console.log(err)
    } else {
      passport.authenticate('local')(req, res, function() {
        console.log(req.session.passport.user)
        res.json({
          username: req.body.username,
          message: 'You have access',
          status: 200,
          session: req.session.passport.user
        })
      })
    }
  })
})

router.get("/auth/logout", (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.json({
      lmao: 'You\'re not in'
    })
  });
})

router.get('/', (req, res) => {
  if(req.isAuthenticated()) {
    res.json({
      lmao: 'You\'re in'
    })
  } else {
    res.json({
      lmao: 'lmao bro, try again'
    })
  }
})

router.get('/login', (req, res) => {
  res.json({
    lmao: 'You\'re not in'
  })
})

router.get('/register', (req, res) => {
  res.json({
    lmao: 'You\'re not in'
  })
})

module.exports = router