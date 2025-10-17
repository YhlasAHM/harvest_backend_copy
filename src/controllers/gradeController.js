const { tbl_grades, sequelize } = require('../models');
const { resSend, hdlGetMtdResNoCont, handlePostPutDelMtdRes, handleError } = require('../scripts/helpers/generalHelpers');
const httpSts = require('../scripts/helpers/static');

// Get grades
const getAllGrades = async (req, res) => {
  try {
    const grades = await tbl_grades.findAll({
      order: [['grade_number', 'ASC']],
    });

    hdlGetMtdResNoCont(grades, 'Grades retrieved successfully.', res);
  } catch (error) {
    handleError(error, res, 'retrieving the grades');
  };
};

// Add grade
const addGrade = async (req, res) => {
  const { grade_name, grade_desc, grade_is_enabled } = req.body;

  try {
    const newGrade = await tbl_grades.create({
      grade_name,
      grade_desc,
      grade_is_enabled,
      modified_dt: new Date()
    });

    handlePostPutDelMtdRes(newGrade, 'Grade successfully created.', 'Grade creation failed.', res);
  } catch (error) {
    handleError(error, res, 'creating the grade');
  };
};

// Update grade
const updateGrade = async (req, res) => {
  const t = await sequelize.transaction()
  const { grade_guid, grade_name, grade_desc, grade_is_enabled } = req.body;

  try {
    const [updatedGrade] = await tbl_grades.update({
      grade_name,
      grade_desc,
      grade_is_enabled,
      modified_dt: new Date()
    }, {
      where: { grade_guid },
      transaction: t
    });

    if (updatedGrade > 0) {
      await tbl_grades.increment('update_count', { by: 1, where: { grade_guid }, transaction: t });
    }
    await t.commit()

    const getFullRes = await tbl_grades.findOne({
      where: { grade_guid: grade_guid }
    })

    handlePostPutDelMtdRes(getFullRes, 'Grade successfully updated.', 'Grade update failed.', res);

  } catch (error) {
    await t.rollback()
    handleError(error, res, 'updating the grade');
  };
};

// Delete grades
const deleteGrades = async (req, res) => {
  const { grade_guids } = req.body;

  try {
    const result = await tbl_grades.destroy({
      where: { grade_guid: grade_guids }
    });

    handlePostPutDelMtdRes(result, 'Grades successfully deleted.', 'No Grades found to delete.', res);
  } catch (error) {
    handleError(error, res, 'deleting the grades');
  }
};

const verifyApi = async (req, res) => {
  const { guid } = req.query;

  try {
    const result = await tbl_grades.findOne({
      where: { grade_guid: guid }
    })

    handlePostPutDelMtdRes(result, 'verify success', 'verify success', res)
  } catch (error) {
    handleError(error, res, 'getting edit for data')
  }

}

module.exports = {
  verifyApi,
  getAllGrades,
  addGrade,
  updateGrade,
  deleteGrades,
};