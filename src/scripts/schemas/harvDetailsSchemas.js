const joi = require('joi');
const { dateReq, numReq, uuidReq, arrReq, timeReq, strOpt } = require('../helpers/validationSchemasHelpers');

const addHarvestDetailsSchema = joi.object({
  harvest_guid: uuidReq,
  arch_guid: uuidReq,
  start_time: timeReq,
  end_time: timeReq,
  harv_det_weight: numReq,
  harv_det_desc: strOpt,
  grade_guid: uuidReq,
  material_guid: uuidReq,
  employee_guid: uuidReq,
});

const updateHarvestDetailsSchema = joi.object({
  harv_det_guid: uuidReq,
  arch_guid: uuidReq,
  start_time: timeReq,
  end_time: timeReq,
  harv_det_weight: numReq,
  harv_det_desc: strOpt,
  grade_guid: uuidReq,
  material_guid: uuidReq,
  employee_guid: uuidReq,
});

const deleteHarvestDetailsSchema = joi.object({
  harv_det_guids: arrReq,
});

module.exports = {
  addHarvestDetailsSchema,
  updateHarvestDetailsSchema,
  deleteHarvestDetailsSchema,
};