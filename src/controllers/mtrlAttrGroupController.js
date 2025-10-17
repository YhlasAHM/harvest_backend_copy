const { tbl_mtrl_attr_groups } = require('../models');
const { resSend, handleGetMtdRes, handlePostPutDelMtdRes } = require('../scripts/helpers/generalHelpers');
const httpSts = require('../scripts/helpers/static');

// Get material attribute groups
const getAllMtrlAttrGroups = async (req, res) => {
  try {
    const mtrlAttrGroups = await tbl_mtrl_attr_groups.findAll();

    handleGetMtdRes(mtrlAttrGroups, 'Material attribute groups retrieved successfully.', 'No material attribute groups found.', res);
  } catch (error) {
    console.error('Error: ', error);
    return resSend(res, httpSts.serverError, 'An error occurred while retrieving the material attribute groups.', null);
  }
};

// Add material attribute group
const addMtrlAttrGroup = async (req, res) => {
  const { mtrl_guid, attr_guid, group_guid } = req.body;

  try {
    const newMtrlAttrGroup = await tbl_mtrl_attr_groups.create({
      mtrl_guid,
      attr_guid,
      group_guid,
      modified_dt: new Date(),
    });

    handlePostPutDelMtdRes(newMtrlAttrGroup, 'Material attribute group successfully created.', 'Material attribute group creation failed.', res);
  } catch (error) {
    console.error('Error: ', error);
    return resSend(res, httpSts.serverError, 'An error occurred while creating the material attribute group.', null);
  }
};

// Update material attribute group
const updateMtrlAttrGroup = async (req, res) => {
  const { mag_guid, mtrl_guid, attr_guid, group_guid } = req.body;

  try {
    const [updatedMtrlAttrGroup] = await tbl_mtrl_attr_groups.update(
      {
        mtrl_guid,
        attr_guid,
        group_guid,
        modified_dt: new Date(),
      },
      {
        where: { mag_guid },
      }
    );

    handlePostPutDelMtdRes(updatedMtrlAttrGroup, 'Material attribute group successfully updated.', 'Material attribute group update failed.', res);
  } catch (error) {
    console.error('Error: ', error);
    return resSend(res, httpSts.serverError, 'An error occurred while updating the material attribute group.', null);
  }
};

// Delete material attribute groups
const deleteMtrlAttrGroups = async (req, res) => {
  const { mag_guids } = req.body;

  try {
    const deletedMtrlAttrGroup = await tbl_mtrl_attr_groups.destroy({
      where: { mag_guid: mag_guids },
    });

    handlePostPutDelMtdRes(deletedMtrlAttrGroup, 'Material attribute group successfully deleted.', 'Material attribute group deletion failed.', res);
  } catch (error) {
    console.error('Error: ', error);
    return resSend(res, httpSts.serverError, 'An error occurred while deleting the material attribute group.', null);
  }
};

module.exports = {
  getAllMtrlAttrGroups,
  addMtrlAttrGroup,
  updateMtrlAttrGroup,
  deleteMtrlAttrGroups,
};
