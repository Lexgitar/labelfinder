const labelsRouter = require('express').Router();
const labelsController = require('../controller/labelsController')
const { checkAuthAndRole, requireAuth } = require('../middleware/authMiddleware')


//

labelsRouter.get('/', labelsController.labels_get)
labelsRouter.get('/:id', labelsController.labels_getById)
labelsRouter.post('/', checkAuthAndRole, labelsController.labels_post)
//could also add auth-band
labelsRouter.put('/:id', requireAuth, labelsController.labels_put_query)
labelsRouter.put('/:id', checkAuthAndRole, labelsController.labels_put)

labelsRouter.delete('/:id', checkAuthAndRole, labelsController.labels_delete)




module.exports = labelsRouter;