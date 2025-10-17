const joi = require('joi');
const {
    uuidReq,
    arrReq,
    strOpt,
    uuidOpt,
    numeric18_4SchemaOpt,
    dateOpt,
    numOpt,
} = require('../helpers/validationSchemasHelpers');

const addOrderSchema = joi.object({
    group_guid: uuidOpt,
    order_datetime: dateOpt,
    order_code: strOpt,
    client_guid: uuidOpt,
    delivery_address: strOpt,
    price_type_guid: uuidOpt,
    order_desc: strOpt,
    order_status_id: numOpt,
    order_total_sum: numeric18_4SchemaOpt,
    supplier_guid: uuidOpt,
});

const updateOrderSchema = joi.object({
    order_guid: uuidReq,
    group_guid: uuidOpt,
    order_datetime: dateOpt,
    order_code: strOpt,
    client_guid: uuidOpt,
    delivery_address: strOpt,
    price_type_guid: uuidOpt,
    order_desc: strOpt,
    order_status_id: numOpt,
    order_total_sum: numeric18_4SchemaOpt,
    supplier_guid: uuidOpt,
});

const deleteOrdersSchema = joi.object({
    order_guids: arrReq,
});

module.exports = {
    addOrderSchema,
    updateOrderSchema,
    deleteOrdersSchema
};