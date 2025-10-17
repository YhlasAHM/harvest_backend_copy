const joi = require('joi');
const { objWithLangsReq, objOpt, uuidReq, arrReq, objOptAlwNull } = require('../helpers/validationSchemasHelpers');

const addGradeSchema = joi.object({
  grade_name: objWithLangsReq,
  grade_desc: objOptAlwNull,
  grade_is_enabled: objOptAlwNull,
});

const updateGradeSchema = joi.object({
  grade_guid: uuidReq,
  grade_name: objWithLangsReq,
  grade_desc: objOptAlwNull,
  grade_is_enabled: objOptAlwNull,
});

const deleteGradesSchema = joi.object({
  grade_guids: arrReq,
});

module.exports = {
  addGradeSchema,
  updateGradeSchema,
  deleteGradesSchema,
};