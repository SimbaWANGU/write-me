import express from 'express';

// initialize app
const app = express();

// middleware

// routes
app.get('/', (req, res) => {
  res.send("<h1>Hello World</h1>")
})

// listen
app.listen(3000)