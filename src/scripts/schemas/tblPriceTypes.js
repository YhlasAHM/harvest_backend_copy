const joi = require('joi');
const {
    boolOpt,
    objWithLangsReq,
    uuidReq,
    arrReq
} = require('../helpers/validationSchemasHelpers');

const addPriceTypesSchema = joi.object({
    price_type_name: objWithLangsReq,
    price_type_is_enabled: boolOpt
});

const updatePriceTypesSchema = joi.object({
    price_type_guid: uuidReq,
    price_type_name: objWithLangsReq,
    price_type_is_enabled: boolOpt
});

const deletePriceTypesSchema = joi.object({
    price_type_guids: arrReq,
});

module.exports = {
    addPriceTypesSchema,
    updatePriceTypesSchema,
    deletePriceTypesSchema
};