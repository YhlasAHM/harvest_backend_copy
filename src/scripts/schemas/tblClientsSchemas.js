const joi = require('joi');
const {
    boolOpt,
    uuidReq,
    arrReq,
    objWithLangsOpt,
    strOpt,
    uuidOpt,
} = require('../helpers/validationSchemasHelpers');

const addClientSchema = joi.object({
    client_name: objWithLangsOpt,
    client_address: objWithLangsOpt,
    client_phones: strOpt,
    price_type_guid: uuidOpt,
    client_gps_latitude: strOpt,
    client_gps_longitude: strOpt,
    is_client_enabled: boolOpt,
});

const updateClientSchema = joi.object({
    client_guid: uuidReq,
    client_name: objWithLangsOpt,
    client_address: objWithLangsOpt,
    client_phones: strOpt,
    price_type_guid: uuidOpt,
    client_gps_latitude: strOpt,
    client_gps_longitude: strOpt,
    is_client_enabled: boolOpt,
});

const deleteClientSchema = joi.object({
    client_guids: arrReq,
});

module.exports = {
    addClientSchema,
    updateClientSchema,
    deleteClientSchema
};