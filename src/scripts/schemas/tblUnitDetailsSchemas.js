const joi = require('joi');
const {
    uuidReq,
    arrReq,
    objWithLangsOpt,
    uuidOpt,
    numOptAlwNull,
} = require('../helpers/validationSchemasHelpers');

const addUnitDetSchema = joi.object({
    unit_guid: uuidOpt,
    unit_det_name: objWithLangsOpt,
    unit_det_numerator: numOptAlwNull,
    unit_det_denominator: numOptAlwNull,
});

const updateUnitDetSchema = joi.object({
    unit_det_guid: uuidReq,
    unit_guid: uuidOpt,
    unit_det_name: objWithLangsOpt,
    unit_det_numerator: numOptAlwNull,
    unit_det_denominator: numOptAlwNull,
});

const deleteUnitsDetSchema = joi.object({
    unit_det_guids: arrReq,
});

module.exports = {
    addUnitDetSchema,
    updateUnitDetSchema,
    deleteUnitsDetSchema
};