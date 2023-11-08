const bandsRouter = require ('express').Router();
const bandsController = require('../controller/bandsController')
const {checkRole }= require ('../middleware/authMiddleware')
bandsRouter.get('/', bandsController.bands_get )
bandsRouter.get('/:id', bandsController.bands_getById )
bandsRouter.post('/', checkRole, bandsController.bands_post)
bandsRouter.put('/:id', bandsController.bands_put)
bandsRouter.delete('/:id', bandsController.bands_delete)

module.exports = bandsRouter;