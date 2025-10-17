const joi = require('joi');
const { objWithLangsReq, dateOpt, uuidReq, arrReq } = require('../helpers/validationSchemasHelpers');

const addMaterialTypeSchema = joi.object({
  mtrl_type_name: objWithLangsReq,
  modified_dt: dateOpt,
});

const updateMaterialTypeSchema = joi.object({
  mtrl_type_guid: uuidReq,
  mtrl_type_name: objWithLangsReq,
  modified_dt: dateOpt,
});

const deleteMaterialTypesSchema = joi.object({
  mtrl_type_guids: arrReq,
})

module.exports = {
  addMaterialTypeSchema,
  updateMaterialTypeSchema,
  deleteMaterialTypesSchema,
};