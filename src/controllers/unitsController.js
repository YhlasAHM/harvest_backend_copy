const { tbl_units, tbl_unit_details, sequelize } = require('../models');
const {
  hdlGetMtdResNoCont,
  handlePostPutDelMtdRes,
  handleError
} = require('../scripts/helpers/generalHelpers');

// Get units
const getAllUnits = async (req, res) => {
  try {
    const units = await tbl_units.findAll({
      include: [
        {
          model: tbl_unit_details,
          as: "tbl_unit_details",
        }
      ]
    });

    hdlGetMtdResNoCont(units, 'Units retrieved successfully.', res);
  } catch (error) {
    handleError(error, res, 'retrieving the units');
  };
};

// Add unit
const addUnit = async (req, res) => {
  const { unit_name } = req.body;

  try {
    const newUnit = await tbl_units.create({
      unit_name, modified_dt: new Date()
    });

    handlePostPutDelMtdRes(newUnit, 'Unit successfully created.', 'Unit creation failed.', res);
  } catch (error) {
    handleError(error, res, 'creating the unit');
  };
};

// Update unit
const updateUnit = async (req, res) => {
  const t = await sequelize.transaction()
  const { unit_guid, unit_name } = req.body;

  try {
    const [updatedUnit] = await tbl_units.update(
      {
        unit_name, modified_dt: new Date()
      },
      {
        where: { unit_guid },
        transaction: t
      }
    );

    if (updatedUnit > 0) {
      await tbl_units.increment('update_count', { by: 1, where: { unit_guid }, transaction: t });
    }

    await t.commit()

    const getFullRes = await tbl_units.findOne({
      where: { unit_guid: unit_guid }
    })

    handlePostPutDelMtdRes(getFullRes, 'Unit successfully updated.', 'Unit update failed.', res);
  } catch (error) {
    await t.rollback()
    handleError(error, res, 'updating the unit');
  }
};

// Delete units
const deleteUnits = async (req, res) => {
  const { unit_guids } = req.body;

  try {
    const deletingResult = await tbl_units.destroy({
      where: { unit_guid: unit_guids },
    });

    handlePostPutDelMtdRes(deletingResult, 'Units successfully deleted.', 'Units was not found.', res);
  } catch (error) {
    handleError(error, res, 'deleting the units');
  };
};

const verifyApi = async (req, res) => {
  const { guid } = req.query;

  try {
    const result = await tbl_units.findOne({
      where: { unit_guid: guid }
    })

    handlePostPutDelMtdRes(result, 'verify success', 'verify success', res)
  } catch (error) {
    handleError(error, res, 'getting edit for data')
  }
}

module.exports = {
  verifyApi,
  getAllUnits,
  addUnit,
  updateUnit,
  deleteUnits,
};