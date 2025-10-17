const router = require('express').Router();
const { getAllOrderLines, addOrderLine, updateOrderLine, deleteOrderLine } = require('../controllers/tblOrderLinesController');
const { validateBody } = require('../scripts/helpers/schemaValidate')
const { authenticate } = require('../scripts/helpers/authenticate');
const { addOrderLineSchema, updateOrderLineSchema, deleteOrderLineSchema } = require('../scripts/schemas/tblOrderLinesSchemas');

router.get('/get-all-order-lines', getAllOrderLines);

router.post('/add-order-line', validateBody(addOrderLineSchema), addOrderLine);

router.put('/update-order-line', validateBody(updateOrderLineSchema), updateOrderLine);

router.delete('/delete-order-line', validateBody(deleteOrderLineSchema), deleteOrderLine);

module.exports = router;