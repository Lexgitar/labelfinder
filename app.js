const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors')
//const corsOptions = require ('./config/corsOptions')
//

const allowedOrigins = [
  'https://bandnott.com/'
]

const corsOptions = {

  origin: 'https://bandnott.com/',

  credentials: true,
  Vary: 'Origin',
  optionsSuccessStatus: 200
}


//
const mongoose = require('mongoose');
const app = express();
const dbURI = process.env.DB_URI;
//
const apiRouter = require('./apiRoutes/apiRouter');

const PORT = 3000 || 5000;
//
// app.use(cors(corsOptions))

app.use(cors(
  {
    origin: ["https://bandnott.com", 'http://localhost:3001'],
     credentials: true,
    Vary: 'Origin',
    optionsSuccessStatus: 200
  }
))

// app.options('*', cors(
//   {
//     origin: "https://bandnott.com",
//      credentials: true,
//     Vary: 'Origin',
//     optionsSuccessStatus: 200
//   }
// ))


//
app.use(express.json());
app.use(cookieParser());
app.use('/api', apiRouter);

// app.listen(PORT, ()=>{
//     console.log('alex listening on ', PORT);
// });
mongoose.connect(dbURI)
  .then((result) => app.listen(PORT, () => {
    console.log('@ listening');
  }))
  .catch((err) => console.log('@ error', err));

//console.log(dbURI);