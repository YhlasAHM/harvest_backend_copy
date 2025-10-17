const joi = require('joi');
const {
    boolOpt,
    uuidOpt,
    strReq,
    barcode_val,
} = require('../helpers/validationSchemasHelpers');

const addBarcodeSchema = joi.object({
    barcode_value: strReq,
    material_guid: uuidOpt,
    variant_guid: uuidOpt,
    unit_det_guid: uuidOpt,
    is_barcode_enabled: boolOpt,
});

const updateBarcodeSchema = joi.object({
    barcode_value: strReq,
    material_guid: uuidOpt,
    variant_guid: uuidOpt,
    unit_det_guid: uuidOpt,
    is_barcode_enabled: boolOpt,
});

const deleteBarcodeSchema = joi.object({
    barcode_values: barcode_val,
});

module.exports = {
    addBarcodeSchema,
    updateBarcodeSchema,
    deleteBarcodeSchema
};