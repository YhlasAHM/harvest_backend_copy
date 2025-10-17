const joi = require('joi');
const {
    arrReq,
    uuidOpt,
    numeric18_4SchemaOpt,
    numReq,
    arrIdReq
} = require('../helpers/validationSchemasHelpers');

const addOrderLineSchema = joi.object({
    order_guid: uuidOpt,
    material_guid: uuidOpt,
    variant_guid: uuidOpt,
    unit_det_guid: uuidOpt,
    ord_line_amount: numeric18_4SchemaOpt,
    ord_line_price: numeric18_4SchemaOpt,
    ord_line_total: numeric18_4SchemaOpt
});

const updateOrderLineSchema = joi.object({
    order_line_id: numReq,
    order_guid: uuidOpt,
    material_guid: uuidOpt,
    variant_guid: uuidOpt,
    unit_det_guid: uuidOpt,
    ord_line_amount: numeric18_4SchemaOpt,
    ord_line_price: numeric18_4SchemaOpt,
    ord_line_total: numeric18_4SchemaOpt
});

const deleteOrderLineSchema = joi.object({
    order_line_ids: arrIdReq,
});

module.exports = {
    addOrderLineSchema,
    updateOrderLineSchema,
    deleteOrderLineSchema
};