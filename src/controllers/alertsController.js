const { tbl_alerts, sequelize } = require('../models');
const {
  hdlGetMtdResNoCont,
  handlePostPutDelMtdRes,
  handleError,
} = require('../scripts/helpers/generalHelpers');

// Get all alerts
const getAllAlerts = async (req, res) => {
  try {
    const alerts = await tbl_alerts.findAll({
      order: [['alert_number', 'ASC']],
    });

    hdlGetMtdResNoCont(alerts, 'Alerts retrieved successfully.', res);
  } catch (error) {
    handleError(error, res, 'retrieving the alerts');
  }
};

// Add alert
const addAlert = async (req, res) => {
  const {
    reading_guid,
    threshold_guid,
    alert_severity,
    created_dt,
    alert_status,
    resolved_dt,
  } = req.body;

  try {
    const newAlert = await tbl_alerts.create({
      reading_guid,
      threshold_guid,
      alert_severity,
      created_dt,
      alert_status,
      resolved_dt,
    });

    handlePostPutDelMtdRes(
      newAlert,
      'Alert successfully created.',
      'Alert creation failed.',
      res
    );
  } catch (error) {
    handleError(error, res, 'creating the alert');
  }
};

const updateAlert = async (req, res) => {
  const t = await sequelize.transaction();

  const {
    alert_guid,
    reading_guid,
    threshold_guid,
    alert_severity,
    created_dt,
    alert_status,
    resolved_dt,
  } = req.body;

  try {
    const [updatedCount] = await tbl_alerts.update(
      {
        reading_guid,
        threshold_guid,
        alert_severity,
        created_dt,
        alert_status,
        resolved_dt,
      },
      {
        where: { alert_guid },
        transaction: t
      }
    );

    if (updatedCount > 0) {
      await tbl_alerts.increment('update_count',
        {
          by: 1,
          where: { alert_guid },
          transaction: t
        }
      );
    }

    await t.commit();

    const getFullRes = await tbl_alerts.findOne({
      where: { alert_guid: alert_guid }
    });

    handlePostPutDelMtdRes(
      getFullRes,
      'Alert successfully updated.',
      'Alert update failed.',
      res
    );
  } catch (error) {
    await t.rollback();
    handleError(error, res, 'updating the alert');
  }
};


const deleteAlerts = async (req, res) => {
  const { alert_guids } = req.body;

  try {
    const result = await tbl_alerts.destroy({
      where: { alert_guid: alert_guids },
    });

    handlePostPutDelMtdRes(
      result,
      'Alerts successfully deleted.',
      'No alerts found to delete.',
      res
    );
  } catch (error) {
    handleError(error, res, 'deleting the alerts');
  }
};


const verifyApi = async (req, res) => {
  const { guid } = req.query;

  try {
    const result = await tbl_alerts.findOne({
      where: { alert_guid: guid }
    })

    handlePostPutDelMtdRes(result, 'verify success', 'verify success', res)
  } catch (error) {
    handleError(error, res, 'getting edit for data')
  }
}

module.exports = {
  verifyApi,
  getAllAlerts,
  addAlert,
  updateAlert,
  deleteAlerts,
};