const profileCommsRouter = require('express').Router();
const profileCommsController = require('../controller/profileCommsController')
const { userCheckforComms, userAndItemIdCheck, checkForCommDelete  } = require('../middleware/authMiddleware')
//get one
profileCommsRouter.get('/:id', profileCommsController.profileComment_getOne)
//
profileCommsRouter.post('/', userCheckforComms, profileCommsController.profileComment_post)
//
profileCommsRouter.put('/:id', userCheckforComms, profileCommsController.profileComment_put, checkForCommDelete, profileCommsController.comment_delete)
//delete one comment

//delete one profileComment
profileCommsRouter.delete('/:id', userAndItemIdCheck, profileCommsController.profileComment_delete)


module.exports = profileCommsRouter