const joi = require('joi');
const {
    arrReq,
    uuidReq,
    dateOpt,
    uuidOpt,
    numeric18_4SchemaOpt
} = require('../helpers/validationSchemasHelpers');

const addPriceSchema = joi.object({
    price_datetime: dateOpt,
    material_guid: uuidOpt,
    variant_guid: uuidOpt,
    unit_det_guid: uuidOpt,
    price_type_guid: uuidOpt,
    price_value: numeric18_4SchemaOpt
});

const updatePriceSchema = joi.object({
    price_guid: uuidReq,
    price_datetime: dateOpt,
    material_guid: uuidOpt,
    variant_guid: uuidOpt,
    unit_det_guid: uuidOpt,
    price_type_guid: uuidOpt,
    price_value: numeric18_4SchemaOpt
});

const deletePriceSchema = joi.object({
    price_guids: arrReq,
});

module.exports = {
    addPriceSchema,
    updatePriceSchema,
    deletePriceSchema
};