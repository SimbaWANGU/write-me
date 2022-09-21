require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const authRoutes = require('./src/routes/auth');

// initialize app
const app = express();

// middleware
app.set('view engine', 'pug')
app.set('views', './views')
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
}))
app.use(passport.initialize())
app.use(passport.session())

try {
  mongoose.connect(
    process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
} catch (err) {
  console.log(err)
}

// routes
app.use('/', authRoutes)

app.listen(5500)