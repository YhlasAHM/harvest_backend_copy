const router = require('express').Router();
const { getAllBarcodes, addBarcode, updateBarcode, deleteBarcode, verifyApi } = require('../controllers/tblBarcodeController');
const { validateBody } = require('../scripts/helpers/schemaValidate')
const { authenticate } = require('../scripts/helpers/authenticate');
const { addBarcodeSchema, updateBarcodeSchema, deleteBarcodeSchema } = require('../scripts/schemas/tblBarcodesSchemas');

router.get('/get-all-barcodes', getAllBarcodes);

router.post('/add-barcode', validateBody(addBarcodeSchema), addBarcode);

router.put('/update-barcode', validateBody(updateBarcodeSchema), updateBarcode);

router.delete('/delete-barcodes', validateBody(deleteBarcodeSchema), deleteBarcode);

router.get('/verify', authenticate, verifyApi)

module.exports = router;