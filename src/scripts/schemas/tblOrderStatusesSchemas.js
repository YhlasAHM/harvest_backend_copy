const joi = require('joi');
const {
    objOpt,
    arrIdReq,
    boolOpt,
    numReq
} = require('../helpers/validationSchemasHelpers');

const addOrderStatusesSchema = joi.object({
    is_edit_allowed: boolOpt,
    ord_status_name: objOpt
});

const updateOrderStatusesSchema = joi.object({
    ord_status_id: numReq,
    is_edit_allowed: boolOpt,
    ord_status_name: objOpt
});

const deleteOrderStatusesSchema = joi.object({
    order_statuses_ids: arrIdReq,
});

module.exports = {
    addOrderStatusesSchema,
    updateOrderStatusesSchema,
    deleteOrderStatusesSchema,
};