const joi = require('joi');
const {
  objWithLangsReq,
  dateOpt,
  uuidReq,
  objOpt,
  objOptAlwNull,
  numOptAlwNull,
  arrReq,
  boolOpt,
} = require('../helpers/validationSchemasHelpers');

const addBlockSchema = joi.object({
  object_guid: uuidReq,
  block_name: objWithLangsReq,
  block_desc: objOptAlwNull,
  block_width: numOptAlwNull,
  block_length: numOptAlwNull,
  block_params: objOpt,
  block_is_enabled: boolOpt
});

const updateBlockSchema = joi.object({
  object_guid: uuidReq,
  block_guid: uuidReq,
  block_name: objWithLangsReq,
  block_desc: objOptAlwNull,
  block_width: numOptAlwNull,
  block_length: numOptAlwNull,
  block_params: objOpt,
  block_is_enabled: boolOpt
});

const deleteBlocksSchema = joi.object({
  block_guids: arrReq,
});

module.exports = {
  addBlockSchema,
  updateBlockSchema,
  deleteBlocksSchema,
};