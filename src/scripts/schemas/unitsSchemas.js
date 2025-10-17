const joi = require('joi');
const {
  objWithLangsReq,
  objOpt,
  uuidReq,
  arrReq,
  objWithLangsOpt,
} = require('../helpers/validationSchemasHelpers');

const addUnitSchema = joi.object({
  unit_name: objWithLangsOpt,
});

const updateUnitSchema = joi.object({
  unit_guid: uuidReq,
  unit_name: objWithLangsOpt,
});

const deleteUnitsSchema = joi.object({
  unit_guids: arrReq,
});

module.exports = {
  addUnitSchema,
  updateUnitSchema,
  deleteUnitsSchema,
};