const router = require('express').Router();
const {
  getAllStatuses,
  addStatus,
  updateStatus,
  deleteStatuses,
  verifyApi,
} = require('../controllers/statusesController');
const { validateBody } = require('../scripts/helpers/schemaValidate')
const { authenticate } = require('../scripts/helpers/authenticate');
const {
  addStatusSchema,
  updateStatusSchema,
  deleteStatusesSchema,
} = require('../scripts/schemas/statusesSchemas');

router.get('/get-all-statuses', getAllStatuses);

router.post('/add-status', validateBody(addStatusSchema), addStatus);

router.put('/update-status', validateBody(updateStatusSchema), updateStatus);

router.delete('/delete-statuses', validateBody(deleteStatusesSchema), deleteStatuses);

router.get('/verify', authenticate, verifyApi)

module.exports = router;