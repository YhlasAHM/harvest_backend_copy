const { tbl_statuses, sequelize } = require('../models');
const {
  hdlGetMtdResNoCont,
  handlePostPutDelMtdRes,
  handleError,
} = require('../scripts/helpers/generalHelpers');

// Get all statuses
const getAllStatuses = async (req, res) => {
  try {
    const statuses = await tbl_statuses.findAll({
      order: [['status_number', 'ASC']],
    });

    hdlGetMtdResNoCont(statuses, 'Statuses retrieved successfully.', res);
  } catch (error) {
    handleError(error, res, 'retrieving the statuses');
  }
};

// Add status
const addStatus = async (req, res) => {
  const { status_name, status_is_enabled } = req.body;

  try {
    const newStatus = await tbl_statuses.create({
      status_name,
      status_is_enabled,
      modified_dt: new Date(),
    });

    handlePostPutDelMtdRes(
      newStatus,
      'Status successfully created.',
      'Status creation failed.',
      res
    );
  } catch (error) {
    handleError(error, res, 'creating the status');
  }
};

// Update status
const updateStatus = async (req, res) => {
  const t = await sequelize.transaction()
  const { status_guid, status_name, status_is_enabled } = req.body;

  try {
    const [updatedStatus] = await tbl_statuses.update(
      {
        status_name,
        status_is_enabled,
        modified_dt: new Date(),
      },
      {
        where: { status_guid },
        transaction: t
      }
    );

    if (updatedStatus > 0) {
      await tbl_statuses.increment('update_count', { by: 1, where: { status_guid }, transaction: t });
    }

    await t.commit()

    const getFullRes = await tbl_statuses.findOne({
      where: { status_guid: status_guid }
    })

    handlePostPutDelMtdRes(
      getFullRes,
      'Status successfully updated.',
      'Status update failed.',
      res
    );

  } catch (error) {
    await t.rollback()
    handleError(error, res, 'updating the status');
  }
};

// Delete statuses
const deleteStatuses = async (req, res) => {
  const { status_guids } = req.body;

  try {
    const result = await tbl_statuses.destroy({
      where: { status_guid: status_guids },
    });

    handlePostPutDelMtdRes(
      result,
      'Statuses successfully deleted.',
      'No statuses found to delete.',
      res
    );
  } catch (error) {
    handleError(error, res, 'deleting the statuses');
  }
};

const verifyApi = async (req, res) => {
  const { guid } = req.query;

  try {
    const result = await tbl_statuses.findOne({
      where: { status_guid: guid }
    })

    handlePostPutDelMtdRes(result, 'verify success', 'verify success', res)
  } catch (error) {
    handleError(error, res, 'getting edit for data')
  }

}

module.exports = {
  verifyApi,
  getAllStatuses,
  addStatus,
  updateStatus,
  deleteStatuses,
};