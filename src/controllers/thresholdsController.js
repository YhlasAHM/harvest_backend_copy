const { tbl_thresholds, sequelize } = require('../models');
const {
  hdlGetMtdResNoCont,
  handlePostPutDelMtdRes,
  handleError,
} = require('../scripts/helpers/generalHelpers');

// Get all thresholds
const getAllThresholds = async (req, res) => {
  try {
    const thresholds = await tbl_thresholds.findAll({
      order: [['threshold_number', 'ASC']],
    });

    hdlGetMtdResNoCont(thresholds, 'Thresholds retrieved successfully.', res);
  } catch (error) {
    handleError(error, res, 'retrieving the thresholds');
  }
};

// Add threshold
const addThreshold = async (req, res) => {
  const {
    sensor_type_guid,
    threshold_min_value,
    threshold_max_value,
    threshold_active_from,
    threshold_active_to,
  } = req.body;

  try {
    const newThreshold = await tbl_thresholds.create({
      sensor_type_guid,
      threshold_min_value,
      threshold_max_value,
      threshold_active_from,
      threshold_active_to,
      modified_dt: new Date(),
    });

    handlePostPutDelMtdRes(
      newThreshold,
      'Threshold successfully created.',
      'Threshold creation failed.',
      res
    );
  } catch (error) {
    handleError(error, res, 'creating the threshold');
  }
};

// Update threshold
const updateThreshold = async (req, res) => {
  const t = await sequelize.transaction()
  const {
    threshold_guid,
    sensor_type_guid,
    threshold_min_value,
    threshold_max_value,
    threshold_active_from,
    threshold_active_to,
  } = req.body;

  try {
    const [updatedCount] = await tbl_thresholds.update(
      {
        sensor_type_guid,
        threshold_min_value,
        threshold_max_value,
        threshold_active_from,
        threshold_active_to,
        modified_dt: new Date(),
      },
      {
        where: { threshold_guid },
        transaction: t
      }
    );

    if (updatedCount > 0) {
      await tbl_thresholds.increment('update_count', { by: 1, where: { threshold_guid }, transaction: t });
    }

    await t.commit()

    const getFullRes = await tbl_thresholds.findOne({
      where: { threshold_guid: threshold_guid }
    })

    handlePostPutDelMtdRes(
      getFullRes,
      'Threshold successfully updated.',
      'Threshold update failed.',
      res
    );
  } catch (error) {
    await t.rollback()
    handleError(error, res, 'updating the threshold');
  }
};

// Delete thresholds
const deleteThresholds = async (req, res) => {
  const { threshold_guids } = req.body; // expecting array of guids

  try {
    const result = await tbl_thresholds.destroy({
      where: { threshold_guid: threshold_guids },
    });

    handlePostPutDelMtdRes(
      result,
      'Thresholds successfully deleted.',
      'No thresholds found to delete.',
      res
    );
  } catch (error) {
    handleError(error, res, 'deleting the thresholds');
  }
};


const verifyApi = async (req, res) => {
  const { guid } = req.query;

  try {
    const result = await tbl_thresholds.findOne({
      where: { threshold_guid: guid }
    })

    handlePostPutDelMtdRes(result, 'verify success', 'verify success', res)
  } catch (error) {
    handleError(error, res, 'getting edit for data')
  }
}

module.exports = {
  verifyApi,
  getAllThresholds,
  addThreshold,
  updateThreshold,
  deleteThresholds,
};