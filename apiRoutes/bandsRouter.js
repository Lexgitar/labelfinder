const bandsRouter = require ('express').Router();
const bandsController = require('../controller/bandsController')
const { checkAuthAndRole } = require ('../middleware/authMiddleware')

bandsRouter.get('/', bandsController.bands_get )
bandsRouter.get('/:id', bandsController.bands_getById )
bandsRouter.post('/', checkAuthAndRole, bandsController.bands_post)
bandsRouter.put('/:id', checkAuthAndRole, bandsController.bands_put)
bandsRouter.delete('/:id', checkAuthAndRole, bandsController.bands_delete)

module.exports = bandsRouter;