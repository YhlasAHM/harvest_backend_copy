const joi = require('joi');
const {
  objWithLangsReq,
  objOpt,
  objOptAlwNull,
  uuidReq,
  numOptAlwNull,
  arrReq,
  boolOpt,
  uuidOpt,
} = require('../helpers/validationSchemasHelpers');

const addStandSchema = joi.object({
  sector_guid: uuidReq,
  stand_name: objWithLangsReq,
  stand_desc: objOptAlwNull,
  stand_params: objOptAlwNull,
  stand_height: numOptAlwNull,
  stand_is_enabled: boolOpt,
});

const updateStandSchema = joi.object({
  stand_guid: uuidReq,
  sector_guid: uuidOpt,
  stand_name: objWithLangsReq,
  stand_desc: objOptAlwNull,
  stand_params: objOpt,
  stand_height: numOptAlwNull,
  stand_is_enabled: boolOpt,
});

const deleteStandsSchema = joi.object({
  stand_guids: arrReq,
});

module.exports = {
  addStandSchema,
  updateStandSchema,
  deleteStandsSchema,
};