const router = require('express').Router();
const { getAllSuppliers, updateSupplier, deleteSuppliers, addSupplier } = require('../controllers/tblSuppliersController');
const { validateBody } = require('../scripts/helpers/schemaValidate')
const { authenticate } = require('../scripts/helpers/authenticate');
const {
    addSupplierSchema,
    updateSupplierSchema,
    deleteSuppliersSchema
} = require('../scripts/schemas/tblSuppliersSchemas');

router.get('/get-all-suppliers', getAllSuppliers);

router.post('/add-supplier', validateBody(addSupplierSchema), addSupplier);

router.put('/update-supplier', validateBody(updateSupplierSchema), updateSupplier);

router.delete('/delete-suppliers', validateBody(deleteSuppliersSchema), deleteSuppliers);

module.exports = router;