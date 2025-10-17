const joi = require('joi');
const {
    boolOpt,
    uuidReq,
    arrReq,
    objOptAlwNull,
    uuidOpt,
    objWithLangsOpt,
    numReq,
} = require('../helpers/validationSchemasHelpers');

const addCategorySchema = joi.object({
    group_guid: uuidReq,
    group_name: objOptAlwNull,
    category_name: objWithLangsOpt,
    is_category_enabled: boolOpt,
    index_number: numReq,
});

const updateCategorySchema = joi.object({
    category_guid: uuidReq,
    group_guid: uuidOpt,
    category_name: objWithLangsOpt,
    group_name: objWithLangsOpt,
    is_category_enabled: boolOpt,
});

const deleteCategorySchema = joi.object({
    category_guids: arrReq,
});

module.exports = {
    addCategorySchema,
    updateCategorySchema,
    deleteCategorySchema
};