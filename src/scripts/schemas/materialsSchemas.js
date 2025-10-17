const joi = require('joi');
const {
  numReq,
  strMax100Opt,
  uuidReq,
  uuidOpt,
  arrReq,
  objWithLangsOpt,
  boolOpt
} = require('../helpers/validationSchemasHelpers');

const addMaterialSchema = joi.object({
  mtrl_name: objWithLangsOpt,
  mtrl_code: strMax100Opt,
  mtrl_desc: objWithLangsOpt,
  category_guid: uuidReq,
  mark_guid: uuidOpt,
  unit_guid: uuidReq,
  is_weight_use: boolOpt,
  is_mtrl_enabled: boolOpt,
  use_variants: boolOpt,
  owner_is_group: boolOpt,
  mtrl_type_id: numReq
});

const updateMaterialSchema = joi.object({
  mtrl_guid: uuidReq,
  mtrl_name: objWithLangsOpt,
  mtrl_code: strMax100Opt,
  mtrl_desc: objWithLangsOpt,
  category_guid: uuidReq,
  mark_guid: uuidOpt,
  unit_guid: uuidReq,
  is_weight_use: boolOpt,
  is_mtrl_enabled: boolOpt,
  use_variants: boolOpt,
  owner_is_group: boolOpt,
  mtrl_type_id: numReq
});

const deleteMaterialsSchema = joi.object({
  mtrl_guids: arrReq,
})

module.exports = {
  addMaterialSchema,
  updateMaterialSchema,
  deleteMaterialsSchema,
};
