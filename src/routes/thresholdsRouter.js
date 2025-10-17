const router = require('express').Router();
const {
  getAllThresholds,
  addThreshold,
  updateThreshold,
  deleteThresholds,
  verifyApi,
} = require('../controllers/thresholdsController');
const { authenticate } = require('../scripts/helpers/authenticate');

router.get('/get-all-thresholds', authenticate, getAllThresholds);

router.post('/add-threshold', authenticate, addThreshold);

router.put('/update-threshold', authenticate, updateThreshold);

router.delete('/delete-thresholds', authenticate, deleteThresholds);

router.get('/verify', authenticate, verifyApi)

module.exports = router;