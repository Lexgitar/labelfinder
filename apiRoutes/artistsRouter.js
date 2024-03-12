const artistsRouter = require('express').Router()
const artistsController = require('../controller/artistsController')

const { checkAuthAndRole, requireAuth, validateId, clearSubmitArray } = require('../middleware/authMiddleware')

artistsRouter.get('/', artistsController.artists_get)
artistsRouter.get('/:id', validateId, artistsController.artists_getById)
artistsRouter.post('/', checkAuthAndRole, artistsController.artists_post)

artistsRouter.put('/:id', validateId, requireAuth, artistsController.artists_put_query)
artistsRouter.put('/:id', checkAuthAndRole, artistsController.artists_put)
artistsRouter.delete('/:id', validateId, checkAuthAndRole, clearSubmitArray, artistsController.artists_delete)

module.exports = artistsRouter