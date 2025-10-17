const joi = require('joi');
const { objWithLangsReq, dateOpt, uuidReq, boolOpt, arrReq } = require('../helpers/validationSchemasHelpers');

const addAttributeSchema = joi.object({
  attribute_name: objWithLangsReq,
  attribute_desc: objWithLangsReq,
  mark_for_deletion: boolOpt,
  modified_dt: dateOpt,
});

const updateAttributeSchema = joi.object({
  attribute_guid: uuidReq,
  attribute_name: objWithLangsReq,
  attribute_desc: objWithLangsReq,
  mark_for_deletion: boolOpt,
  modified_dt: dateOpt,
});

const deleteAttributesSchema = joi.object({
  attribute_guids: arrReq,
});

module.exports = {
  addAttributeSchema,
  updateAttributeSchema,
  deleteAttributesSchema,
};