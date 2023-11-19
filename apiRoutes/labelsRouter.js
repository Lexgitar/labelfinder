const labelsRouter = require ('express').Router();
const labelsController = require('../controller/labelsController')
const {checkAuthAndRole}= require ('../middleware/authMiddleware')


//

labelsRouter.get('/', labelsController.labels_get )
labelsRouter.get('/:id', labelsController.labels_getById )
labelsRouter.post('/', checkAuthAndRole, labelsController.labels_post)
labelsRouter.put('/:id', checkAuthAndRole, labelsController.labels_put)
labelsRouter.delete('/:id', checkAuthAndRole, labelsController.labels_delete)




module.exports = labelsRouter;