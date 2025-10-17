const joi = require('joi');
const {
  userName,
  userPassword,
  boolReq,
  uuidReq,
  arrReq,
} = require('../helpers/validationSchemasHelpers');

const addUserSchema = joi.object({
  user_name: userName,
  user_password: userPassword,
  user_is_admin: boolReq,
  user_is_login: boolReq,
});

const updateUserSchema = joi.object({
  user_guid: uuidReq,
  user_name: userName,
  user_password: userPassword,
  user_is_admin: boolReq,
  user_is_login: boolReq,
});

const deleteUsersSchema = joi.object({
  user_guids: arrReq,
});

module.exports = {
  addUserSchema,
  updateUserSchema,
  deleteUsersSchema,
};