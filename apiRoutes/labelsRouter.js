const labelsRouter = require ('express').Router();
const labelsController = require('../controller/labelsController')
const {checkRole }= require ('../middleware/authMiddleware')

//

labelsRouter.get('/', labelsController.labels_get )
labelsRouter.get('/:id', labelsController.labels_getById )
labelsRouter.post('/', checkRole, labelsController.labels_post)
labelsRouter.put('/:id',  labelsController.labels_put)
labelsRouter.delete('/:id', checkRole, labelsController.labels_delete)




module.exports = labelsRouter;