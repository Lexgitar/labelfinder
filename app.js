const express = require('express');
require('dotenv').config();
const cookieParser = require ('cookie-parser');
//
const mongoose = require('mongoose');
const app = express();
const dbURI = process.env.DB_URI;
//
const apiRouter = require ('./apiRoutes/apiRouter');

const PORT = 3000;
//
app.use(express.json());
app.use(cookieParser());
app.use('/api', apiRouter);

// app.listen(PORT, ()=>{
//     console.log('alex listening on ', PORT);
// });
mongoose.connect(dbURI)
  .then((result) => app.listen(PORT, ()=>{
    console.log('alex listening');
  }))
  .catch((err) => console.log('alex', err));

  //console.log(dbURI);