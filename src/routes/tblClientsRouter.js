const router = require('express').Router();

const { validateBody } = require('../scripts/helpers/schemaValidate')
const { authenticate } = require('../scripts/helpers/authenticate');
const { addClientSchema, updateClientSchema, deleteClientSchema } = require('../scripts/schemas/tblClientsSchemas');
const { getAllClients, addClient, updateClient, deleteClients } = require('../controllers/tblClientsController');
router.get('/get-all-clients', getAllClients);

router.post('/add-client', validateBody(addClientSchema), addClient);

router.put('/update-client', validateBody(updateClientSchema), updateClient);

router.delete('/delete-client', validateBody(deleteClientSchema), deleteClients);

module.exports = router;