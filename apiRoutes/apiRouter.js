const apiRouter = require('express').Router();
//
const bandsRouter = require('./bandsRouter')
const labelsRouter = require('./labelsRouter');
const fansRouter = require('./fansRouter')
const authRouter  = require('./authRoutes');
//
apiRouter.use(authRouter);
apiRouter.use('/bands', bandsRouter);
apiRouter.use('/labels', labelsRouter);
apiRouter.use('/fans', fansRouter);




module.exports = apiRouter;