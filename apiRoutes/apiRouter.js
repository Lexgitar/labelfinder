const apiRouter = require('express').Router();
//
const bandsRouter = require('./bandsRouter')

apiRouter.use('/bands', bandsRouter);

module.exports = apiRouter;