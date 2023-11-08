const apiRouter = require('express').Router();
//
const bandsRouter = require('./bandsRouter')
const labelsRouter = require('./labelsRouter');
const authRouter  = require('./authRoutes');
//
apiRouter.use(authRouter);
apiRouter.use('/bands', bandsRouter);
apiRouter.use('/labels', labelsRouter);



module.exports = apiRouter;