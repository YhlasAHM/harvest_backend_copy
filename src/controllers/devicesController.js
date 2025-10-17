const { tbl_devices, sequelize } = require('../models');
const {
  hdlGetMtdResNoCont,
  handlePostPutDelMtdRes,
  handleError,
} = require('../scripts/helpers/generalHelpers');

// Get all devices
const getAllDevices = async (req, res) => {
  try {
    const devices = await tbl_devices.findAll({
      order: [['device_number', 'ASC']],
    });

    hdlGetMtdResNoCont(devices, 'Devices retrieved successfully.', res);
  } catch (error) {
    handleError(error, res, 'retrieving the devices');
  }
};

// Add device
const addDevice = async (req, res) => {
  const { d_serial_num, installed_dt } = req.body;

  try {
    const newDevice = await tbl_devices.create({
      d_serial_num,
      installed_dt: installed_dt ? new Date(installed_dt) : null,
    });

    handlePostPutDelMtdRes(
      newDevice,
      'Device successfully created.',
      'Device creation failed.',
      res,
    );
  } catch (error) {
    handleError(error, res, 'creating the device');
  }
};

// Update device
const updateDevice = async (req, res) => {

  const t = await sequelize.transaction()

  const { device_guid, d_serial_num, installed_dt } = req.body;

  try {
    const [updatedDevice] = await tbl_devices.update(
      {
        d_serial_num,
        installed_dt: installed_dt ? new Date(installed_dt) : null,
      },
      { where: { device_guid }, transaction: t }
    );

    if (updatedDevice > 0) {
      await tbl_devices.increment('update_count', { by: 1, where: { device_guid }, transaction: t });
    }

    await t.commit()

    const getFullRes = await tbl_devices.findOne({
      where: { device_guid: device_guid }
    })

    handlePostPutDelMtdRes(
      getFullRes,
      'Device successfully updated.',
      'Device update failed.',
      res
    );

  } catch (error) {
    await t.rollback()
    handleError(error, res, 'updating the device');
  }
};

// Delete devices
const deleteDevices = async (req, res) => {
  const { device_guids } = req.body;

  try {
    const result = await tbl_devices.destroy({
      where: { device_guid: device_guids },
    });

    handlePostPutDelMtdRes(
      result,
      'Devices successfully deleted.',
      'No devices found to delete.',
      res
    );
  } catch (error) {
    handleError(error, res, 'deleting the devices');
  }
};

const verifyApi = async (req, res) => {
  const { guid } = req.query;

  try {
    const result = await tbl_devices.findOne({
      where: { device_guid: guid }
    })

    handlePostPutDelMtdRes(result, 'verify success', 'verify success', res)
  } catch (error) {
    handleError(error, res, 'getting edit for data')
  }

}

module.exports = {
  verifyApi,
  getAllDevices,
  addDevice,
  updateDevice,
  deleteDevices,
};