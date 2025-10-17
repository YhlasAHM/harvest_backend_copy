const joi = require('joi');
const {
  objWithLangsReq,
  objOpt,
  objOptAlwNull,
  uuidReq,
  dateOpt,
  arrReq,
  numOptAlwNull,
} = require('../helpers/validationSchemasHelpers');

const addSectorSchema = joi.object({
  block_guid: uuidReq,
  sector_name: objWithLangsReq,
  sector_desc: objOptAlwNull,
  sector_width: numOptAlwNull,
  sector_length: numOptAlwNull,
  road_width: numOptAlwNull,
  road_length: numOptAlwNull,
  sector_params: objOpt,
  sector_is_enabled: objOptAlwNull
});

const updateSectorSchema = joi.object({
  sector_guid: uuidReq,
  block_guid: uuidReq,
  sector_name: objWithLangsReq,
  sector_desc: objOptAlwNull,
  sector_width: numOptAlwNull,
  sector_length: numOptAlwNull,
  road_width: numOptAlwNull,
  road_length: numOptAlwNull,
  sector_params: objOpt,
  modified_dt: dateOpt,
  sector_is_enabled: objOptAlwNull
});

const deleteSectorsSchema = joi.object({
  sector_guids: arrReq,
});

module.exports = {
  addSectorSchema,
  updateSectorSchema,
  deleteSectorsSchema,
};