import express from 'express';
import passport from 'passport';
import { Strategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { connectDB } from './src/config/db.js';
import { myMiddleware } from './src/middleware/defaultMiddleware.js';
import { myPassport } from './src/middleware/passportMiddleware.js';

const app = express();
connectDB();

// middleware
myMiddleware();
myPassport();

// routes

app.listen(3000);