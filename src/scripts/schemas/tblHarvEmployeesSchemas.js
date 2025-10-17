const joi = require('joi');
const {
    uuidReq,
    arrReq,
} = require('../helpers/validationSchemasHelpers');

const addHarvEmployeesSchema = joi.object({
    harvest_guid: uuidReq,
    employee_guid: uuidReq,
});

const updateHarvEmployeesSchema = joi.object({
    harv_empl_guid: uuidReq,
    harvest_guid: uuidReq,
    employee_guid: uuidReq,
});

const deleteHarvEmployeesSchema = joi.object({
    harv_empl_guids: arrReq,
});

module.exports = {
    addHarvEmployeesSchema,
    updateHarvEmployeesSchema,
    deleteHarvEmployeesSchema
};