const router = require('express').Router();
const {
  getAllSensorTypes,
  addSensorType,
  updateSensorType,
  deleteSensorTypes,
  verifyApi,
} = require('../controllers/sensorTypesController');
const { validateBody } = require('../scripts/helpers/schemaValidate');
const { authenticate } = require('../scripts/helpers/authenticate');

router.get('/get-all-sensor-types', authenticate, getAllSensorTypes);

router.post('/add-sensor-type', authenticate, addSensorType);

router.put('/update-sensor-type', authenticate, updateSensorType);

router.delete('/delete-sensor-types', authenticate, deleteSensorTypes);

router.get('/verify', authenticate, verifyApi)

module.exports = router;