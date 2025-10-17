const joi = require('joi');
const {
    uuidReq,
    arrReq,
} = require('../helpers/validationSchemasHelpers');

const addAstCombsSchema = joi.object({
    arch_guid: uuidReq,
    stand_guid: uuidReq,
    track_guid: uuidReq
});

const updateAstCombsSchema = joi.object({
    ast_guid: uuidReq,
    arch_guid: uuidReq,
    stand_guid: uuidReq,
    track_guid: uuidReq,
});

const deleteAstCombsSchema = joi.object({
    ast_combs_guids: arrReq,
});

module.exports = {
    addAstCombsSchema,
    updateAstCombsSchema,
    deleteAstCombsSchema
};