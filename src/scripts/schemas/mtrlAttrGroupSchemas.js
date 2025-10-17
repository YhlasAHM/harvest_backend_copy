const joi = require('joi');
const { uuidReq, dateOpt, uuidOpt, arrReq } = require('../helpers/validationSchemasHelpers');

const addMtrlAttrGroupSchema = joi.object({
  mtrl_guid: uuidReq,
  attr_guid: uuidReq,
  group_guid: uuidReq,
  modified_dt: dateOpt,
});

const updateMtrlAttrGroupSchema = joi.object({
  mag_guid: uuidReq,
  mtrl_guid: uuidOpt,
  attr_guid: uuidOpt,
  group_guid: uuidOpt,
  modified_dt: dateOpt,
});

const deleteMtrlAttrGroupsSchema = joi.object({
  mag_guid: arrReq,
});

module.exports = {
  addMtrlAttrGroupSchema,
  updateMtrlAttrGroupSchema,
  deleteMtrlAttrGroupsSchema,
};
