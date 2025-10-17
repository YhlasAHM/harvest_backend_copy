const joi = require('joi');
const {
    objOpt,
    arrReq,
    strOpt,
    uuidReq,
    objWithLangsReq
} = require('../helpers/validationSchemasHelpers');

const addSupplierSchema = joi.object({
    supplier_name: objWithLangsReq,
    supplier_address: objOpt,
    supplier_phones: strOpt
});

const updateSupplierSchema = joi.object({
    supplier_guid: uuidReq,
    supplier_name: objWithLangsReq,
    supplier_address: objOpt,
    supplier_phones: strOpt
});

const deleteSuppliersSchema = joi.object({
    supplier_guids: arrReq,
});

module.exports = {
    addSupplierSchema,
    updateSupplierSchema,
    deleteSuppliersSchema,
};