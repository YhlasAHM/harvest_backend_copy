const joi = require('joi');
const { objWithLangsReq, uuidReq, arrReq, objOptAlwNull, numOptAlwNull, boolOpt } = require('../helpers/validationSchemasHelpers');

const addObjectSchema = joi.object({
  object_name: objWithLangsReq,
  object_desc: objOptAlwNull,
  object_width: numOptAlwNull,
  object_length: numOptAlwNull,
  object_contact: objOptAlwNull,
  object_is_enabled: boolOpt,
});

const updateObjectSchema = joi.object({
  object_guid: uuidReq,
  object_name: objWithLangsReq,
  object_desc: objOptAlwNull,
  object_width: numOptAlwNull,
  object_length: numOptAlwNull,
  object_contact: objOptAlwNull,
  object_is_enabled: boolOpt,
});

const deleteObjectSchema = joi.object({
  object_guid: uuidReq,
});

const deleteMultipleObjectsSchema = joi.object({
  object_guids: arrReq,
});

module.exports = {
  addObjectSchema,
  updateObjectSchema,
  deleteObjectSchema,
  deleteMultipleObjectsSchema,
};