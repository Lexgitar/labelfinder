const express = require('express');
const app = express();
//
const apiRouter = require ('./apiRoutes/apiRouter');

const PORT = 3000;

app.use('/api', apiRouter);

app.listen(PORT, ()=>{
    console.log('alex listening on ', PORT);
});