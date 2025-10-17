const router = require('express').Router();
const { addPriceType, updatePriceType, deletePriceTypes, getAllPriceTypes } = require('../controllers/tblPriceTypesController');
const { validateBody } = require('../scripts/helpers/schemaValidate')
const { authenticate } = require('../scripts/helpers/authenticate');
const {
    addPriceTypesSchema,
    updatePriceTypesSchema,
    deletePriceTypesSchema,
} = require('../scripts/schemas/tblPriceTypes');

router.get('/get-all-price-types', getAllPriceTypes);

router.post('/add-price-type', validateBody(addPriceTypesSchema), addPriceType);

router.put('/update-price-type', validateBody(updatePriceTypesSchema), updatePriceType);

router.delete('/delete-price-types', validateBody(deletePriceTypesSchema), deletePriceTypes);

module.exports = router;