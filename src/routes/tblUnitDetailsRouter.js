const router = require('express').Router();
const { validateBody } = require('../scripts/helpers/schemaValidate')
const { authenticate } = require('../scripts/helpers/authenticate');
const { addUnitDetSchema, updateUnitDetSchema, deleteUnitsDetSchema } = require('../scripts/schemas/tblUnitDetailsSchemas');
const { getAllUnitDetails, addUnitDetail, updateUnitDetail, deleteUnitDetail, verifyApi } = require('../controllers/tblUnitDetailsController');

router.get('/get-all-unit-details', getAllUnitDetails);

router.post('/add-unit-detail', validateBody(addUnitDetSchema), addUnitDetail);

router.put('/update-unit-detail', validateBody(updateUnitDetSchema), updateUnitDetail);

router.delete('/delete-unit-details', validateBody(deleteUnitsDetSchema), deleteUnitDetail);

router.get('/verify', authenticate, verifyApi)

module.exports = router;