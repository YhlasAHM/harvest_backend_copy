const joi = require('joi');
const {
  objWithLangsReq,
  objOpt,
  objOptAlwNull,
  uuidReq,
  arrReq,
  boolOpt,
} = require('../helpers/validationSchemasHelpers');

const addValveSchema = joi.object({
  sector_guid: uuidReq,
  valve_name: objWithLangsReq,
  valve_desc: objOptAlwNull,
  valve_params: objOpt,
  valve_is_enabled: boolOpt
});

const updateValveSchema = joi.object({
  valve_guid: uuidReq,
  sector_guid: uuidReq,
  valve_name: objWithLangsReq,
  valve_desc: objOptAlwNull,
  valve_params: objOpt,
  valve_is_enabled: boolOpt
});

const deleteValvesSchema = joi.object({
  valve_guids: arrReq,
});

module.exports = {
  addValveSchema,
  updateValveSchema,
  deleteValvesSchema,
};