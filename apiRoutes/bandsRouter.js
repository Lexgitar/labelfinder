const bandsRouter = require ('express').Router();

bandsRouter.get('/', (req, res, next)=>{
    res.send('all bands')
})

module.exports = bandsRouter;