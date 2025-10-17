const { tbl_sensor_types, sequelize } = require('../models');
const {
  hdlGetMtdResNoCont,
  handlePostPutDelMtdRes,
  handleError,
} = require('../scripts/helpers/generalHelpers');

// Get all sensor types
const getAllSensorTypes = async (req, res) => {
  try {
    const sensorTypes = await tbl_sensor_types.findAll({
      order: [['sensor_type_number', 'ASC']],
    });

    hdlGetMtdResNoCont(sensorTypes, 'Sensor types retrieved successfully.', res);
  } catch (error) {
    handleError(error, res, 'retrieving the sensor types');
  }
};

// Add sensor type
const addSensorType = async (req, res) => {
  const {
    sensor_type_code,
    sensor_type_unit,
    sensor_type_desc,
  } = req.body;

  try {
    const newSensorType = await tbl_sensor_types.create({
      sensor_type_code,
      sensor_type_unit,
      sensor_type_desc,
      modified_dt: new Date()
    });

    handlePostPutDelMtdRes(
      newSensorType,
      'Sensor type successfully created.',
      'Sensor type creation failed.',
      res,
    );
  } catch (error) {
    handleError(error, res, 'creating the sensor type');
  }
};

// Update sensor type
const updateSensorType = async (req, res) => {
  const t = await sequelize.transaction()
  const {
    sensor_type_guid,
    sensor_type_code,
    sensor_type_unit,
    sensor_type_desc,
  } = req.body;

  try {
    const [updatedSensorType] = await tbl_sensor_types.update(
      {
        sensor_type_code,
        sensor_type_unit,
        sensor_type_desc,
        modified_dt: new Date()
      },
      {
        where: { sensor_type_guid },
        transaction: t
      }
    );


    if (updatedSensorType > 0) {
      await tbl_sensor_types.increment('update_count', { by: 1, where: { sensor_type_guid }, transaction: t });
    }

    await t.commit()

    const getFullRes = await tbl_sensor_types.findOne({
      where: { sensor_type_guid: sensor_type_guid }
    })

    handlePostPutDelMtdRes(
      getFullRes,
      'Sensor type successfully updated.',
      'Sensor type update failed.',
      res,
    );
  } catch (error) {
    await t.rollback()
    handleError(error, res, 'updating the sensor type');
  }
};

// Delete sensor types
const deleteSensorTypes = async (req, res) => {
  const { sensor_type_guids } = req.body;

  try {
    const result = await tbl_sensor_types.destroy({
      where: { sensor_type_guid: sensor_type_guids },
    });

    handlePostPutDelMtdRes(
      result,
      'Sensor types successfully deleted.',
      'No sensor types found to delete.',
      res,
    );
  } catch (error) {
    handleError(error, res, 'deleting the sensor types');
  }
};

const verifyApi = async (req, res) => {
  const { guid } = req.query;

  try {
    const result = await tbl_sensor_types.findOne({
      where: { sensor_type_guid: guid }
    })

    handlePostPutDelMtdRes(result, 'verify success', 'verify success', res)
  } catch (error) {
    handleError(error, res, 'getting edit for data')
  }

}


module.exports = {
  verifyApi,
  getAllSensorTypes,
  addSensorType,
  updateSensorType,
  deleteSensorTypes,
};