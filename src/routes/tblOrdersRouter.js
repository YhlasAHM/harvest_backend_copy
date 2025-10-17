const router = require('express').Router();

const { validateBody } = require('../scripts/helpers/schemaValidate')
const { authenticate } = require('../scripts/helpers/authenticate');
const { addOrderSchema, updateOrderSchema, deleteOrdersSchema } = require('../scripts/schemas/tblOrdersSchemas');
const { addOrder, updateOrder, deleteOrders, getAllOrders } = require('../controllers/tblOrdersController');

router.get('/get-all-orders', getAllOrders);

router.post('/add-order', validateBody(addOrderSchema), addOrder);

router.put('/update-order', validateBody(updateOrderSchema), updateOrder);

router.delete('/delete-order', validateBody(deleteOrdersSchema), deleteOrders);

module.exports = router;