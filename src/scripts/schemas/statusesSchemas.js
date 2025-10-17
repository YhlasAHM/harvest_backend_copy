const joi = require('joi');
const {
  objWithLangsReq,
  boolOpt,
  uuidReq,
  arrReq,
} = require('../helpers/validationSchemasHelpers');

const addStatusSchema = joi.object({
  status_name: objWithLangsReq,
  status_is_enabled: boolOpt,
});

const updateStatusSchema = joi.object({
  status_guid: uuidReq,
  status_name: objWithLangsReq,
  status_is_enabled: boolOpt,
});

const deleteStatusesSchema = joi.object({
  status_guids: arrReq,
});

module.exports = {
  addStatusSchema,
  updateStatusSchema,
  deleteStatusesSchema,
};