const profileCommsRouter = require('express').Router();
const profileCommsController = require('../controller/profileCommsController')
const { checkAuthAndRole, requireAuth, validateId,  } = require('../middleware/authMiddleware')

profileCommsRouter.post('/', requireAuth, profileCommsController.profileComment_post)
profileCommsRouter.put('/:id', requireAuth, profileCommsController.profileComment_put)

module.exports = profileCommsRouter