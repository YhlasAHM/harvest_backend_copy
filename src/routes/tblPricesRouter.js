const router = require('express').Router();
const { getAllPrices, addPrice, updatePrice, deletePrice } = require('../controllers/tblPriceController');
const { validateBody } = require('../scripts/helpers/schemaValidate')
const { authenticate } = require('../scripts/helpers/authenticate');
const { addPriceSchema, updatePriceSchema, deletePriceSchema } = require('../scripts/schemas/tblPricesSchemas');

router.get('/get-all-prices', getAllPrices);

router.post('/add-price', validateBody(addPriceSchema), addPrice);

router.put('/update-price', validateBody(updatePriceSchema), updatePrice);

router.delete('/delete-price', validateBody(deletePriceSchema), deletePrice);

module.exports = router;