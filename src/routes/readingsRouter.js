const router = require('express').Router();
const {
  getAllReadings,
  addReading,
  updateReading,
  deleteReadings,
  verifyApi,
} = require('../controllers/readingsController');
const { authenticate } = require('../scripts/helpers/authenticate');

router.get('/get-all-readings', authenticate, getAllReadings);

router.post('/add-reading', authenticate, addReading);

router.put('/update-reading', authenticate, updateReading);

router.delete('/delete-readings', authenticate, deleteReadings);

router.get('/verify', authenticate, verifyApi)

module.exports = router;