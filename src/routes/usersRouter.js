const router = require('express').Router();
const {
  getAllUsers,
  addUser,
  updateUser,
  deleteUsers,
  getUserPassword,
  verifyApi,
} = require('../controllers/usersController');
const {
  addUserSchema,
  updateUserSchema,
  deleteUsersSchema,
} = require('../scripts/schemas/usersSchemas');
const { validateBody } = require('../scripts/helpers/schemaValidate');
const { authenticate } = require('../scripts/helpers/authenticate');

router.get('/get-all-users', getAllUsers);

router.post('/add-user', validateBody(addUserSchema), addUser);

router.put('/update-user', validateBody(updateUserSchema), updateUser);

router.delete('/delete-users', validateBody(deleteUsersSchema), deleteUsers);

router.get('/get-user-password/:user_guid', getUserPassword);

router.get('/verify', authenticate, verifyApi)

module.exports = router;