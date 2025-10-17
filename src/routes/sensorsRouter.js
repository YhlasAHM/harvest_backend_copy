const router = require('express').Router();
const {
  getAllSensors,
  addSensor,
  updateSensor,
  deleteSensors,
  verifyApi,
} = require('../controllers/sensorsController');
const { validateBody } = require('../scripts/helpers/schemaValidate');
const { authenticate } = require('../scripts/helpers/authenticate');
const { addSensorSchema, updateSensorSchema, deleteSensorsSchema } = require('../scripts/schemas/sensorsSchema');

router.get('/get-all-sensors', authenticate, getAllSensors);

router.post('/add-sensor', authenticate, validateBody(addSensorSchema), addSensor);

router.put('/update-sensor', authenticate, validateBody(updateSensorSchema), updateSensor);

router.delete('/delete-sensors', authenticate, validateBody(deleteSensorsSchema), deleteSensors);

router.get('/verify', authenticate, verifyApi)

module.exports = router;