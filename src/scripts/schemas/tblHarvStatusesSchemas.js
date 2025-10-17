const joi = require('joi');
const {
    boolReq,
    objWithLangsReq,
    boolOpt,
    numReq,
    arrIdReq,
} = require('../helpers/validationSchemasHelpers');

const addHarvStatusesSchema = joi.object({
    harv_status_name: objWithLangsReq,
    is_allow_edit: boolReq,
    is_allow_delete: boolReq,
});

const updateHarvStatusesSchema = joi.object({
    harv_status_id: numReq,
    harv_status_name: objWithLangsReq,
    is_allow_edit: boolOpt,
    is_allow_delete: boolOpt,
});

const deleteHarvStatusesSchema = joi.object({
    harv_status_ids: arrIdReq,
});

module.exports = {
    addHarvStatusesSchema,
    updateHarvStatusesSchema,
    deleteHarvStatusesSchema
};