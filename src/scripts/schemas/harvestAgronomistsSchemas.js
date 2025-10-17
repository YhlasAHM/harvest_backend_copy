const joi = require("joi");
const { uuidReq, arrReq } = require("../helpers/validationSchemasHelpers");

const addAgronomistSchema = joi.object({
  harvest_guid: uuidReq,
  agronome_guid: uuidReq,
});

const updateAgronomistSchema = joi.object({
  harv_empl_guid: uuidReq,
  harvest_guid: uuidReq,
  agronome_guid: uuidReq,
});

const deleteAgronomistsSchema = joi.object({
  harv_empl_guid: arrReq,
});

module.exports = {
  addAgronomistSchema,
  updateAgronomistSchema,
  deleteAgronomistsSchema,
};