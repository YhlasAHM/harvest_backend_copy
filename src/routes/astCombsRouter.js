const router = require('express').Router();
const { addAstComb, verifyApi } = require('../controllers/astCombsController');
const { authenticate } = require('../scripts/helpers/authenticate');

router.post('/add-ast-comb', addAstComb);

router.get('/verify', authenticate, verifyApi)

module.exports = router;