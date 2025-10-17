const router = require('express').Router();
const {
  getAllAlerts,
  addAlert,
  updateAlert,
  deleteAlerts,
  verifyApi,
} = require('../controllers/alertsController');
const { authenticate } = require('../scripts/helpers/authenticate');

router.get('/get-all-alerts', authenticate, getAllAlerts);

router.post('/add-alert', authenticate, addAlert);

router.put('/update-alert', authenticate, updateAlert);

router.delete('/delete-alerts', authenticate, deleteAlerts);

router.get('/verify', authenticate, verifyApi)

module.exports = router;