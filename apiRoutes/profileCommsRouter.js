const profileCommsRouter = require('express').Router();
const profileCommsController = require('../controller/profileCommsController')
const { userCheckforComms  } = require('../middleware/authMiddleware')
//get one

//
profileCommsRouter.post('/', userCheckforComms, profileCommsController.profileComment_post)
//
profileCommsRouter.put('/:id', userCheckforComms, profileCommsController.profileComment_put)
//delete one comment

//delete one profileComment
profileCommsRouter.delete('/:id', userCheckforComms, profileCommsController.profileComment_delete)


module.exports = profileCommsRouter