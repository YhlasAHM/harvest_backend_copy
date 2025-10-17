const joi = require('joi');
const { objWithLangsReq, uuidReq, arrReq, boolOpt, numReq } = require('../helpers/validationSchemasHelpers');

const addGroupSchema = joi.object({
  group_name: objWithLangsReq,
  is_group_enabled: boolOpt,
  index_number: numReq
});

const updateGroupSchema = joi.object({
  group_guid: uuidReq,
  group_name: objWithLangsReq,
  is_group_enabled: boolOpt,
});

const deleteGroupsSchema = joi.object({
  group_guids: arrReq,
});

module.exports = {
  addGroupSchema,
  updateGroupSchema,
  deleteGroupsSchema,
};
