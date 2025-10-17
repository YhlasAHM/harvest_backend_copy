const joi = require('joi');
const {
    boolOpt,
    uuidReq,
    arrReq,
    objOptAlwNull
} = require('../helpers/validationSchemasHelpers');

const addMarkSchema = joi.object({
    mark_name: objOptAlwNull,
    is_marked_enabled: boolOpt
});

const updateMarkSchema = joi.object({
    mark_guid: uuidReq,
    mark_name: objOptAlwNull,
    is_marked_enabled: boolOpt
});

const deleteMarkSchema = joi.object({
    mark_guids: arrReq,
});

module.exports = {
    addMarkSchema,
    updateMarkSchema,
    deleteMarkSchema
};