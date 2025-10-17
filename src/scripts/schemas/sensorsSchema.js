const joi = require('joi');
const {
    uuidReq,
    dateOpt,
    arrReq,
    strMax100Req,
} = require('../helpers/validationSchemasHelpers');

const addSensorSchema = joi.object({
    device_guid: uuidReq,
    sensor_type_guid: uuidReq,
    s_serial_number: strMax100Req,
    installed_dt: dateOpt,
    status_guid: uuidReq,
    arch_guid: uuidReq,
});

const updateSensorSchema = joi.object({
    sensor_guid: uuidReq,
    device_guid: uuidReq,
    sensor_type_guid: uuidReq,
    s_serial_number: strMax100Req,
    installed_dt: dateOpt,
    status_guid: uuidReq,
    arch_guid: uuidReq,
});

const deleteSensorsSchema = joi.object({
    sensor_guids: arrReq,
});

module.exports = {
    addSensorSchema,
    updateSensorSchema,
    deleteSensorsSchema
};