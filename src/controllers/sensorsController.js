const {
  tbl_sensors,
  tbl_devices,
  tbl_sensor_types,
  tbl_statuses,
  tbl_archs,
  sequelize,
} = require('../models');
const {
  hdlGetMtdResNoCont,
  handlePostPutDelMtdRes,
  handleError,
} = require('../scripts/helpers/generalHelpers');

// Get all sensors
const getAllSensors = async (req, res) => {
  try {
    const sensors = await tbl_sensors.findAll({
      include: [
        {
          model: tbl_devices,
          as: 'tbl_devices',
          attributes: ['d_serial_num'],
        },
        {
          model: tbl_sensor_types,
          as: 'tbl_sensor_types',
          attributes: ['sensor_type_code'],
        },
        {
          model: tbl_statuses,
          as: 'tbl_statuses',
          attributes: ['status_name'],
        },
        {
          model: tbl_archs,
          as: 'tbl_archs',
          attributes: ['arch_name'],
        },
      ],
      order: [['sensor_number', 'ASC']],
    });

    hdlGetMtdResNoCont(sensors, 'Sensors retrieved successfully.', res);
  } catch (error) {
    handleError(error, res, 'retrieving the sensors');
  }
};

// Add sensor
const addSensor = async (req, res) => {
  const t = await sequelize.transaction()
  const {
    device_guid,
    sensor_type_guid,
    s_serial_number,
    installed_dt,
    status_guid,
    arch_guid,
  } = req.body;

  try {
    const newSensor = await tbl_sensors.create({
      device_guid,
      sensor_type_guid,
      s_serial_number,
      installed_dt: installed_dt ? new Date(installed_dt) : null,
      status_guid,
      arch_guid,
    }, { transaction: t });

    if (newSensor) {
      const ress1 = await tbl_sensors.findOne({
        where: {
          sensor_guid: newSensor.sensor_guid,
        },
        transaction: t,
        include: [
          {
            model: tbl_archs,
            as: 'tbl_archs',
            attributes: ['arch_name']
          },
          {
            model: tbl_devices,
            as: 'tbl_devices',
            attributes: ['d_serial_num']
          },
          {
            model: tbl_statuses,
            as: 'tbl_statuses',
            attributes: ['status_name']
          },
          {
            model: tbl_sensor_types,
            as: 'tbl_sensor_types',
            attributes: ['sensor_type_code']
          },
        ]
      })

      await t.commit()

      handlePostPutDelMtdRes(
        ress1,
        'Sensor successfully created.',
        'Sensor creation failed.',
        res,
      );
    }


  } catch (error) {
    await t.rollback()
    handleError(error, res, 'creating the sensor');
  }
};

// Update sensor
const updateSensor = async (req, res) => {
  const t = await sequelize.transaction()
  const {
    sensor_guid,
    device_guid,
    sensor_type_guid,
    s_serial_number,
    installed_dt,
    status_guid,
    arch_guid,
  } = req.body;

  try {
    const [updatedCount] = await tbl_sensors.update(
      {
        device_guid,
        sensor_type_guid,
        s_serial_number,
        installed_dt: installed_dt ? new Date(installed_dt) : null,
        status_guid,
        arch_guid,
      },
      {
        where: { sensor_guid },
        transaction: t
      }
    );


    if (updatedCount > 0) {
      await tbl_sensors.increment('update_count', { by: 1, where: { sensor_guid }, transaction: t });
    }

    const getFullRes = await tbl_sensors.findOne({
      where: { sensor_guid: sensor_guid },
      transaction: t,
      include: [
        {
          model: tbl_archs,
          as: 'tbl_archs',
          attributes: ['arch_name']
        },
        {
          model: tbl_devices,
          as: 'tbl_devices',
          attributes: ['d_serial_num']
        },
        {
          model: tbl_statuses,
          as: 'tbl_statuses',
          attributes: ['status_name']
        },
        {
          model: tbl_sensor_types,
          as: 'tbl_sensor_types',
          attributes: ['sensor_type_code']
        },
      ]
    })
    await t.commit()

    handlePostPutDelMtdRes(
      getFullRes,
      'Sensor successfully updated.',
      'Sensor update failed.',
      res,
    );
  } catch (error) {
    await t.rollback()
    handleError(error, res, 'updating the sensor');
  }
};

// Delete sensors
const deleteSensors = async (req, res) => {
  const { sensor_guids } = req.body; // expecting array of guids

  try {
    const result = await tbl_sensors.destroy({
      where: { sensor_guid: sensor_guids },
    });

    handlePostPutDelMtdRes(
      result,
      'Sensors successfully deleted.',
      'No sensors found to delete.',
      res,
    );
  } catch (error) {
    handleError(error, res, 'deleting the sensors');
  }
};


const verifyApi = async (req, res) => {
  const { guid } = req.query;

  try {
    const result = await tbl_sensors.findOne({
      where: { sensor_guid: guid }
    })

    handlePostPutDelMtdRes(result, 'verify success', 'verify success', res)
  } catch (error) {
    handleError(error, res, 'getting edit for data')
  }

}

module.exports = {
  verifyApi,
  getAllSensors,
  addSensor,
  updateSensor,
  deleteSensors,
};