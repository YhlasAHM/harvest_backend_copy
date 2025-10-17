const router = require('express').Router();
const {

    getAllOrderStatuses,
    addOrderStatuses,
    updateOrderStatuses,
    deleteOrderStatuses
} = require('../controllers/tbOrderStatusesController');
const { validateBody } = require('../scripts/helpers/schemaValidate')
const { authenticate } = require('../scripts/helpers/authenticate');
const {
    addOrderStatusesSchema,
    updateOrderStatusesSchema,
    deleteOrderStatusesSchema,
} = require('../scripts/schemas/tblOrderStatusesSchemas');

router.get('/get-all-order-statuses', getAllOrderStatuses);

router.post('/add-order-status', validateBody(addOrderStatusesSchema), addOrderStatuses);

router.put('/update-order-status', validateBody(updateOrderStatusesSchema), updateOrderStatuses);

router.delete('/delete-order-statuses', validateBody(deleteOrderStatusesSchema), deleteOrderStatuses);

module.exports = router;