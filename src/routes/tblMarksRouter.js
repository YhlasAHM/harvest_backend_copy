const router = require('express').Router();
const { getAllMarks, addMark, updateMark, deleteMarks, verifyApi } = require('../controllers/tblMarkController');
const { validateBody } = require('../scripts/helpers/schemaValidate')
const { authenticate } = require('../scripts/helpers/authenticate');
const { addMarkSchema, updateMarkSchema, deleteMarkSchema } = require('../scripts/schemas/tblMarksSchemas');

router.get('/get-all-marks', getAllMarks);

router.post('/add-mark', validateBody(addMarkSchema), addMark);

router.put('/update-mark', validateBody(updateMarkSchema), updateMark);

router.delete('/delete-marks', validateBody(deleteMarkSchema), deleteMarks);

router.get('/verify', authenticate, verifyApi)

module.exports = router;