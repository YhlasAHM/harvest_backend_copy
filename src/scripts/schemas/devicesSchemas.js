const joi = require('joi');
const {
  strReq,
  uuidReq,
  arrReq,
} = require('../helpers/validationSchemasHelpers');

const addDeviceSchema = joi.object({
  d_serial_num: strReq,
  installed_dt: joi.any().optional(),
});

const updateDeviceSchema = joi.object({
  device_guid: uuidReq,
  d_serial_num: strReq,
  installed_dt: joi.any().optional(),
});

const deleteDevicesSchema = joi.object({
  device_guids: arrReq,
})

module.exports = {
  addDeviceSchema,
  updateDeviceSchema,
  deleteDevicesSchema,
};