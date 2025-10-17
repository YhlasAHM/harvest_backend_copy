const joi = require('joi');
const { uuidReq, dateReq, numReq, arrReq, numOptAlwNull, objArray, strOpt, dateOpt, numOpt, uuidOpt } = require('../helpers/validationSchemasHelpers');

const addHarvestSchema = joi.object({
  harvest_datetime: dateReq,
  sector_guid: uuidOpt,
  harvest_weight: numReq,
  harvest_empl_count: numOptAlwNull,
  harv_employees: objArray,
  harvest_desc: strOpt,
  harv_status_id: numOpt,
});

const updateHarvestSchema = joi.object({
  harvest_guid: uuidReq,
  harvest_datetime: dateReq,
  harvest_desc: strOpt,
  harv_status_id: numOpt,
});

const deleteHarvestsSchema = joi.object({
  harvest_guids: arrReq,
});

const updateHarvAndHarvDetSchema = joi.object({
  harvest_guid: uuidReq,
  harv_employees: objArray,
  sector_guid: uuidReq,
  harvest_datetime: dateOpt,
  harvest_desc: strOpt,
  harv_status_id: numReq
})

module.exports = {
  addHarvestSchema,
  updateHarvestSchema,
  deleteHarvestsSchema,
  updateHarvAndHarvDetSchema
};