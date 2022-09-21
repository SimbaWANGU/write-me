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
        res.redirect('/');
      })
    } else {
      res.redirect('/register')
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
        res.redirect('/')
      })
    }
  })
})

router.get("/auth/logout", (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
})

router.get('/', (req, res) => {
  if(req.isAuthenticated()) {
    res.render('home')
  } else {
    res.redirect('/login')
  }
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

module.exports = router