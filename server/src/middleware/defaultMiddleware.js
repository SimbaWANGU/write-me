import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv'
import { testMe } from '../../views/test.js';

const app = express();

function myMiddleware () {
  dotenv.config()
  app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
  }))
  app.use(express.urlencoded({
    extended: true,
  }))
  app.use(express.json())
}

export { myMiddleware }