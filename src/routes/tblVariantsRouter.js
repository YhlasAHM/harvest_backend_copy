const router = require('express').Router();
const { getAllVariants, addVariant, updateVariant, deleteVariant, verifyApi } = require('../controllers/tblVariantsController');
const { validateBody } = require('../scripts/helpers/schemaValidate')
const { authenticate } = require('../scripts/helpers/authenticate');
const { addVariantSchema, updateVariantSchema, deleteVariantSchema } = require('../scripts/schemas/tblVariantsSchemas');

router.get('/get-all-variants', getAllVariants);

router.post('/add-variant', validateBody(addVariantSchema), addVariant);

router.put('/update-variant', validateBody(updateVariantSchema), updateVariant);

router.delete('/delete-variants', validateBody(deleteVariantSchema), deleteVariant);

router.get('/verify', authenticate, verifyApi)

module.exports = router;