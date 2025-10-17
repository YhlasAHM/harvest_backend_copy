const { tbl_readings, sequelize } = require('../models');
const {
  hdlGetMtdResNoCont,
  handlePostPutDelMtdRes,
  handleError,
} = require('../scripts/helpers/generalHelpers');

// Get all readings
const getAllReadings = async (req, res) => {
  try {
    const readings = await tbl_readings.findAll({
      order: [['reading_number', 'ASC']],
    });

    hdlGetMtdResNoCont(readings, 'Readings retrieved successfully.', res);
  } catch (error) {
    handleError(error, res, 'retrieving the readings');
  }
};

// Add reading
const addReading = async (req, res) => {
  const {
    sensor_guid,
    reading_dt,
    reading_value,
  } = req.body;

  try {
    const newReading = await tbl_readings.create({
      sensor_guid,
      reading_dt,
      reading_value,
    });

    handlePostPutDelMtdRes(
      newReading,
      'Reading successfully created.',
      'Reading creation failed.',
      res
    );
  } catch (error) {
    handleError(error, res, 'creating the reading');
  }
};

// Update reading
const updateReading = async (req, res) => {
  const t = await sequelize.transaction()
  const {
    reading_guid,
    sensor_guid,
    reading_dt,
    reading_value,
  } = req.body;

  try {
    const [updatedCount] = await tbl_readings.update(
      {
        sensor_guid,
        reading_dt,
        reading_value,
      },
      {
        where: { reading_guid },
        transaction: t
      }
    );

    if (updatedCount > 0) {
      await tbl_readings.increment('update_count', { by: 1, where: { reading_guid }, transaction: t });
    }

    const getFullRes = await tbl_readings.findOne({
      where: { reading_guid: reading_guid }
    })

    await t.commit()

    handlePostPutDelMtdRes(
      getFullRes,
      'Reading successfully updated.',
      'Reading update failed.',
      res
    );
  } catch (error) {
    await t.rollback()
    handleError(error, res, 'updating the reading');
  }
};

// Delete readings
const deleteReadings = async (req, res) => {
  const { reading_guids } = req.body;

  try {
    const result = await tbl_readings.destroy({
      where: { reading_guid: reading_guids },
    });

    handlePostPutDelMtdRes(
      result,
      'Readings successfully deleted.',
      'No readings found to delete.',
      res
    );
  } catch (error) {
    handleError(error, res, 'deleting the readings');
  }
};

const verifyApi = async (req, res) => {
  const { guid } = req.query;

  try {
    const result = await tbl_readings.findOne({
      where: { reading_guid: guid }
    })

    handlePostPutDelMtdRes(result, 'verify success', 'verify success', res)
  } catch (error) {
    handleError(error, res, 'getting edit for data')
  }

}


module.exports = {
  verifyApi,
  getAllReadings,
  addReading,
  updateReading,
  deleteReadings,
};