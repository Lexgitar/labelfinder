const express = require('express');
require('dotenv').config();
const cookieParser = require ('cookie-parser');
const cors = require ('cors')
//const corsOptions = require ('./config/corsOptions')
//

const allowedOrigins = [
  'https://bandnott.com/'
]

const corsOptions = {
  
      origin: (origin, callback) => {
          if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
              callback(null, true)
          } else {
              callback(new Error('Not allowed by CORS'))
          }
      },
  credentials: true,
  optionsSuccessStatus: 200
}


//
const mongoose = require('mongoose');
const app = express();
const dbURI = process.env.DB_URI;
//
const apiRouter = require ('./apiRoutes/apiRouter');

const PORT = 3000 || 5000;
//
app.use(cors(corsOptions))
//
app.use(express.json());
app.use(cookieParser());
app.use('/api', apiRouter);

// app.listen(PORT, ()=>{
//     console.log('alex listening on ', PORT);
// });
mongoose.connect(dbURI)
  .then((result) => app.listen(PORT, ()=>{
    console.log('@ listening');
  }))
  .catch((err) => console.log('@ error', err));

  //console.log(dbURI);