const router = require('express').Router();
const {
  getAllDevices,
  addDevice,
  updateDevice,
  deleteDevices,
  verifyApi,
} = require('../controllers/devicesController');
const {
  addDeviceSchema,
  updateDeviceSchema,
  deleteDevicesSchema,
} = require('../scripts/schemas/devicesSchemas');
const { validateBody } = require('../scripts/helpers/schemaValidate');
const { authenticate } = require('../scripts/helpers/authenticate');

router.get('/get-all-devices', authenticate, getAllDevices);

router.post('/add-device', authenticate, validateBody(addDeviceSchema), addDevice);

router.put('/update-device', authenticate, validateBody(updateDeviceSchema), updateDevice);

router.delete('/delete-devices', authenticate, validateBody(deleteDevicesSchema), deleteDevices);

router.get('/verify', authenticate, verifyApi)

module.exports = router;