const { tbl_mtrl_types, sequelize } = require('../models');
const { handlePostPutDelMtdRes, hdlGetMtdResNoCont, handleError } = require('../scripts/helpers/generalHelpers');

// Get material types
const getAllMaterialTypes = async (req, res) => {
  try {
    const materialTypes = await tbl_mtrl_types.findAll();

    hdlGetMtdResNoCont(materialTypes, 'Material types retrieved successfully.', res);
  } catch (error) {
    handleError(error, res, 'retrieving the material types');
  };
};

// Add material type
const addMaterialType = async (req, res) => {
  const { mtrl_type_name } = req.body;

  try {
    const newMaterialType = await tbl_mtrl_types.create({
      mtrl_type_name,
      modified_dt: new Date(),
    });

    handlePostPutDelMtdRes(newMaterialType, 'Material type successfully created.', 'Material type creation failed.', res);
  } catch (error) {
    handleError(error, res, 'creating the material type');
  };
};

// Update material type
const updateMaterialType = async (req, res) => {
  const t = await sequelize.transaction()
  const { mtrl_type_guid, mtrl_type_name } = req.body;

  try {
    const [updatedMaterialType] = await tbl_mtrl_types.update({
      mtrl_type_name,
      modified_dt: new Date(),
    }, {
      where: { mtrl_type_guid },
      transaction: t
    });

    if (updatedMaterialType > 0) {
      await tbl_mtrl_types.increment('update_count', { by: 1, where: { mtrl_type_guid }, transaction: t });
    }

    await t.commit()

    const getFullRes = await tbl_mtrl_types.findOne({
      where: { mtrl_type_guid: mtrl_type_guid }
    })

    handlePostPutDelMtdRes(getFullRes, 'Material type successfully updated.', 'Material type update failed.', res);
  } catch (error) {
    await t.rollback()
    handleError(error, res, 'updating the material type');
  }
};

// Delete material types
const deleteMaterialTypes = async (req, res) => {
  const { mtrl_type_guids } = req.body;

  try {
    const deletingResult = await tbl_mtrl_types.destroy({
      where: { mtrl_type_guid: mtrl_type_guids },
    });

    handlePostPutDelMtdRes(deletingResult, 'Material types successfully deleted.', 'Material types deletion failed.', res);
  } catch (error) {
    handleError(error, res, 'deleting the material types');
  };
};

const verifyApi = async (req, res) => {
  const { guid } = req.query;

  try {
    const result = await tbl_mtrl_types.findOne({
      where: { mtrl_type_guid: guid }
    })

    handlePostPutDelMtdRes(result, 'verify success', 'verify success', res)
  } catch (error) {
    handleError(error, res, 'getting edit for data')
  }

}

module.exports = {
  verifyApi,
  getAllMaterialTypes,
  addMaterialType,
  updateMaterialType,
  deleteMaterialTypes,
};