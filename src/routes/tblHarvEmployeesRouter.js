const router = require('express').Router();
const { getAllHarvEmployees, addHarvEmployee, updateHarvEmployee, deleteHarvEmployee, verifyApi } = require('../controllers/tblHarvEmployeesController');
const { validateBody } = require('../scripts/helpers/schemaValidate')
const { authenticate } = require('../scripts/helpers/authenticate');
const { addHarvEmployeesSchema, updateHarvEmployeesSchema, deleteHarvEmployeesSchema } = require('../scripts/schemas/tblHarvEmployeesSchemas');

router.get('/get-all-harv-employees', getAllHarvEmployees);

router.post('/add-harv-employee', validateBody(addHarvEmployeesSchema), addHarvEmployee);

router.put('/update-harv-employee', validateBody(updateHarvEmployeesSchema), updateHarvEmployee);

router.delete('/delete-harv-employee', validateBody(deleteHarvEmployeesSchema), deleteHarvEmployee);

router.get('/verify', authenticate, verifyApi)

module.exports = router;