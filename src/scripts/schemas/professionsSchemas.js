const joi = require('joi');
const { objWithLangsReq, uuidReq, arrReq, boolOpt } = require('../helpers/validationSchemasHelpers');

const addProfessionSchema = joi.object({
  prof_name: objWithLangsReq,
  prof_is_enabled: boolOpt,
});

const updateProfessionSchema = joi.object({
  prof_guid: uuidReq,
  prof_name: objWithLangsReq,
  prof_is_enabled: boolOpt,
});

const deleteProfessionsSchema = joi.object({
  prof_guids: arrReq,
})

module.exports = {
  addProfessionSchema,
  updateProfessionSchema,
  deleteProfessionsSchema,
};