import express from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt'
import { Strategy } from 'passport-local';
import { User } from '../models/user.js';

const app = express()

function myPassport() {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function (id, done) {
    User.findById(id, function(err, user) {
      done(err, user)
    })
  })

  passport.use(new Strategy (function (username, password, done) {
    User.findOne({
      username: username,
      function (err, user) {
        if (err) { return done(err); }
        if(!user) {
          return done(null, false, { message: 'Incorrect Username'})
        }
        bcrypt.compare(password, user.password, function (err, res) {
          if (err) { return done(err) }
          if (res === false) {
            return done(null, false, { message: 'Incorrect Password'})
          }
          if (res == true) {
            return done(null, user);
          }
        })
      }
    })
  }))
}

export { myPassport }