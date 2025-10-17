const joi = require('joi');
const {
  objWithLangsReq,
  strOpt,
  objOptAlwNull,
  uuidReq,
  arrReq,
  uuidOpt,
  boolReq,
  boolOpt,
} = require('../helpers/validationSchemasHelpers');

const addEmployeeSchema = joi.object({
  empl_name: objWithLangsReq,
  prof_guid: uuidReq,
  empl_contact: objOptAlwNull,
  user_guid: uuidOpt,
  empl_is_enabled: boolOpt,
  is_specialist: boolReq
});

const updateEmployeeSchema = joi.object({
  empl_guid: uuidReq,
  empl_name: objWithLangsReq,
  prof_guid: strOpt,
  empl_contact: objOptAlwNull,
  user_guid: uuidOpt,
  empl_is_enabled: boolReq,
  is_specialist: boolReq
});

const deleteEmployeesSchema = joi.object({
  empl_guids: arrReq,
});

module.exports = {
  addEmployeeSchema,
  updateEmployeeSchema,
  deleteEmployeesSchema,
};