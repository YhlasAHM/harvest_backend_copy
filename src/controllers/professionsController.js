const { tbl_professions, sequelize } = require('../models');
const { resSend, hdlGetMtdResNoCont, handlePostPutDelMtdRes, handleError } = require('../scripts/helpers/generalHelpers');
const httpSts = require('../scripts/helpers/static');

// Get professions
const getAllProfessions = async (req, res) => {
  try {
    const professions = await tbl_professions.findAll({
      order: [['prof_number', 'ASC']],
    });

    hdlGetMtdResNoCont(professions, 'Professions retrieved successfully.', res);
  } catch (error) {
    handleError(error, res, 'retrieving the professions');
  }
};

// Add profession
const addProfession = async (req, res) => {
  const { prof_name, prof_is_enabled } = req.body;

  try {
    const newProfession = await tbl_professions.create({
      prof_name,
      prof_is_enabled
    });

    handlePostPutDelMtdRes(newProfession, 'Profession successfully created.', 'Profession creation failed.', res);
  } catch (error) {
    handleError(error, res, 'creating the profession');
  };
};

// Update profession
const updateProfession = async (req, res) => {
  const t = await sequelize.transaction()
  const { prof_guid, prof_name, prof_is_enabled } = req.body;

  try {
    const [updatedProfession] = await tbl_professions.update(
      { prof_name, prof_is_enabled },
      {
        where: { prof_guid },
        transaction: t
      }
    );

    if (updatedProfession > 0) {
      await tbl_professions.increment('update_count', { by: 1, where: { prof_guid }, transaction: t });
    }

    await t.commit()

    const getFullRes = await tbl_professions.findOne({
      where: { prof_guid: prof_guid }
    })

    handlePostPutDelMtdRes(getFullRes, 'Profession successfully updated.', 'Profession update failed.', res);
  } catch (error) {
    await t.rollback()
    handleError(error, res, 'updating the profession');
  };
};

// Delete professions
const deleteProfessions = async (req, res) => {
  const { prof_guids } = req.body;

  try {
    const deletingResult = await tbl_professions.destroy({ where: { prof_guid: prof_guids } });

    handlePostPutDelMtdRes(deletingResult, 'Professions successfully deleted.', 'Professions deletion failed.', res);
  } catch (error) {
    handleError(error, res, 'deleting the professions');
  };
};

const verifyApi = async (req, res) => {
  const { guid } = req.query;

  try {
    const result = await tbl_professions.findOne({
      where: { prof_guid: guid }
    })

    handlePostPutDelMtdRes(result, 'verify success', 'verify success', res)
  } catch (error) {
    handleError(error, res, 'getting edit for data')
  }

}

module.exports = {
  verifyApi,
  getAllProfessions,
  addProfession,
  updateProfession,
  deleteProfessions,
};