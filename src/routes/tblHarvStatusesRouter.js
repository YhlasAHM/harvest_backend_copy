const router = require('express').Router();
const { addHarvStatus, getAllHarvStatuses, updateHarvStatus, deleteHarvStatuses, getInitHarvStatus, getNotInitHarvStatus, verifyApi } = require('../controllers/tblHarvStatusesController');
const { validateBody } = require('../scripts/helpers/schemaValidate')
const { authenticate } = require('../scripts/helpers/authenticate');
const { addHarvStatusesSchema, updateHarvStatusesSchema, deleteHarvStatusesSchema } = require('../scripts/schemas/tblHarvStatusesSchemas');

router.get('/get-all-harvStatuses', getAllHarvStatuses);

router.post('/add-harvStatus', validateBody(addHarvStatusesSchema), addHarvStatus);

router.put('/update-harvStatus', validateBody(updateHarvStatusesSchema), updateHarvStatus);

router.delete('/delete-harvStatuses', validateBody(deleteHarvStatusesSchema), deleteHarvStatuses);

router.get('/get-init-harvStatus', getInitHarvStatus);

router.get('/get-harvStatus-not-initial', getNotInitHarvStatus);

router.get('/verify', authenticate, verifyApi)

module.exports = router;