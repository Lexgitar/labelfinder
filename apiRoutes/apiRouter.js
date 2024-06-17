const apiRouter = require('express').Router();
//
const bandsRouter = require('./bandsRouter')
const labelsRouter = require('./labelsRouter');
const artistsRouter = require('./artistsRouter')
const fansRouter = require('./fansRouter')
const profileCommsRouter = require('./profileCommsRouter')
const authRouter  = require('./authRoutes');
//
apiRouter.use(authRouter);
apiRouter.use('/bands', bandsRouter);
apiRouter.use('/labels', labelsRouter);
apiRouter.use('/artists', artistsRouter)
apiRouter.use('/fans', fansRouter);
apiRouter.use('/comment', profileCommsRouter);





module.exports = apiRouter;