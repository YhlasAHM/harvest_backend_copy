const router = require('express').Router();
const { register, login, renewAccessToken } = require('../controllers/authController');
const { validateBody } = require('../scripts/helpers/schemaValidate');
const { loginSchema } = require('../scripts/schemas/authSchemas');

router.post('/register', register);

router.post('/login', validateBody(loginSchema), login);

router.get('/renew-access-token', renewAccessToken);

module.exports = router;