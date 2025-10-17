const { tbl_groups, sequelize } = require('../models');
const { handleGetMtdRes, handlePostPutDelMtdRes, handleError } = require('../scripts/helpers/generalHelpers');

// Get groups
const getAllGroups = async (req, res) => {
  try {
    const groups = await tbl_groups.findAll();

    handleGetMtdRes(groups, 'Groups retrieved successfully.', 'No groups found.', res);
  } catch (error) {
    handleError(error, res, 'retrieving the groups');
  };
};

// Add group
const addGroup = async (req, res) => {
  const { group_name, is_group_enabled, index_number } = req.body;

  try {
    const newGroup = await tbl_groups.create({
      group_name,
      is_group_enabled,
      index_number,
      modified_dt: new Date()
    });

    handlePostPutDelMtdRes(newGroup, 'Group successfully created.', 'Group creation failed.', res);
  } catch (error) {
    handleError(error, res, 'creating the group');
  };
};

// Update group
const updateGroup = async (req, res) => {
  const t = await sequelize.transaction()
  const { group_guid, group_name, is_group_enabled } = req.body;

  try {
    const [updatedGroup] = await tbl_groups.update(
      {
        group_guid,
        group_name,
        is_group_enabled,
        modified_dt: new Date()
      },
      {
        where: { group_guid },
        transaction: t
      }
    );


    if (updatedGroup > 0) {
      await tbl_groups.increment('update_count', { by: 1, where: { group_guid }, transaction: t });
    }

    await t.commit()

    const getFullRes = await tbl_groups.findOne({
      where: { group_guid: group_guid }
    })

    handlePostPutDelMtdRes(getFullRes, 'Group successfully updated.', 'Group update failed.', res);

  } catch (error) {
    await t.rollback()
    handleError(error, res, 'updating the group');
  }
};


// Delete groups
const deleteGroups = async (req, res) => {
  const { group_guids } = req.body;

  try {
    const deletingResult = await tbl_groups.destroy({
      where: { group_guid: group_guids }
    });

    handlePostPutDelMtdRes(deletingResult, 'groups successfully deleted.', 'Deleting of groups failed.', res);
  } catch (error) {
    handleError(error, res, 'deleting the groups');
  };
};

const verifyApi = async (req, res) => {
  const { guid } = req.query;

  try {
    const result = await tbl_groups.findOne({
      where: { group_guid: guid }
    })

    handlePostPutDelMtdRes(result, 'verify success', 'verify success', res)
  } catch (error) {
    handleError(error, res, 'getting edit for data')
  }
}


module.exports = {
  verifyApi,
  getAllGroups,
  addGroup,
  updateGroup,
  deleteGroups,
};