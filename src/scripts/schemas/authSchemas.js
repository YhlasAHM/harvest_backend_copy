const joi = require('joi');
const { userName, userPassword } = require('../../scripts/helpers/validationSchemasHelpers');

const loginSchema = joi.object({
  user_name: userName,
  user_password: userPassword,
});

module.exports = {
  loginSchema,
};