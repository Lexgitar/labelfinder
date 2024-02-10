const bandsRouter = require('express').Router();
const bandsController = require('../controller/bandsController')
const { checkAuthAndRole, requireAuth, validateId, clearSubmitArray } = require('../middleware/authMiddleware')
const labelController = require('../controller/labelsController')
bandsRouter.get('/', bandsController.bands_get)
bandsRouter.get('/:id', validateId, bandsController.bands_getById)
bandsRouter.post('/', checkAuthAndRole, bandsController.bands_post)

bandsRouter.put('/:id', validateId, requireAuth, bandsController.bands_put_query)
bandsRouter.put('/:id', checkAuthAndRole, bandsController.bands_put)
bandsRouter.delete('/:id', validateId, checkAuthAndRole, clearSubmitArray, bandsController.bands_delete)

module.exports = bandsRouter;