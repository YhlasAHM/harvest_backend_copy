const joi = require('joi');
const {
  objWithLangsReq,
  objOpt,
  objOptAlwNull,
  uuidReq,
  arrReq,
  numOptAlwNull,
  boolOpt,
  strOpt,
  objWithLangsOpt,
  numReq,
} = require('../helpers/validationSchemasHelpers');

const addArchSchema = joi.object({
  sector_guid: uuidReq,
  arch_name: objWithLangsReq,
  arch_desc: objOptAlwNull,
  arch_width: numOptAlwNull,
  arch_length: numOptAlwNull,
  arch_number: numReq,
  arch_params: objOpt,
  arch_is_enabled: boolOpt
});

const updateArchSchema = joi.object({
  arch_guid: uuidReq,
  sector_guid: uuidReq,
  arch_name: objWithLangsReq,
  arch_desc: objOptAlwNull,
  arch_width: numOptAlwNull,
  arch_length: numOptAlwNull,
  arch_params: objOpt,
  arch_is_enabled: boolOpt
});

const deleteArchsSchema = joi.object({
  arch_guids: arrReq,
});

const autoGenerateSchema = joi.object({
  sector_guid: uuidReq,
  arch_name: objWithLangsOpt,
  arch_desc: objOptAlwNull,
  arch_width: numOptAlwNull,
  arch_length: numOptAlwNull,
  generateCount: numReq,
})

module.exports = {
  autoGenerateSchema,
  addArchSchema,
  updateArchSchema,
  deleteArchsSchema,
};