const fansRouter = require ('express').Router();
const fansController = require('../controller/fansController')
const {checkRole }= require ('../middleware/authMiddleware')

//

fansRouter.get('/', fansController.fans_get )
fansRouter.get('/:id', fansController.fans_getById )
fansRouter.post('/', checkRole, fansController.fans_post)
fansRouter.put('/:id',  fansController.fans_put)
fansRouter.delete('/:id', checkRole, fansController.fans_delete)




module.exports = fansRouter;