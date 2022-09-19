import express from 'express';
import { isLoggedIn } from '../middleware/isAuthenticated.js';

const root = express.Router()

root.get('/', isLoggedIn, (req, res) => {
  res.render('homepage', {
    home: 'The Home Page'
  })
})

root.get('/login', (req, res) => {
  res.render('login')
})

root.get('/logout', (req, res) => {
  res.render('logout')
})

export { root }