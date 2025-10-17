const joi = require('joi');
const {
    arrReq,
    uuidReq,
    objWithLangsOpt,
    boolOpt,
    numReq,
} = require('../helpers/validationSchemasHelpers');

const addVariantSchema = joi.object({
    variant_name: objWithLangsOpt,
    category_guid: uuidReq,
    material_guid: uuidReq,
    is_variant_enabled: boolOpt,
    index_number: numReq,
});

const updateVariantSchema = joi.object({
    variant_guid: uuidReq,
    variant_name: objWithLangsOpt,
    category_guid: uuidReq,
    material_guid: uuidReq,
    is_variant_enabled: boolOpt
});

const deleteVariantSchema = joi.object({
    variant_guids: arrReq,
});

module.exports = {
    addVariantSchema,
    updateVariantSchema,
    deleteVariantSchema
};