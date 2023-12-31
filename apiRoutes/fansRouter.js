const fansRouter = require('express').Router();
const fansController = require('../controller/fansController')
const { checkAuthAndRole } = require('../middleware/authMiddleware')

//

fansRouter.get('/', fansController.fans_get)
fansRouter.get('/:id', fansController.fans_getById)
fansRouter.post('/', checkAuthAndRole, fansController.fans_post)
fansRouter.put('/:id', checkAuthAndRole, fansController.fans_put)
fansRouter.delete('/:id', checkAuthAndRole, fansController.fans_delete)




module.exports = fansRouter;