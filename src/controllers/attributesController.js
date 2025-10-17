const { tbl_attributes } = require('../models');
const { hdlGetMtdResNoCont, handlePostPutDelMtdRes, handleError } = require('../scripts/helpers/generalHelpers');

// Get attributes
const getAllAttributes = async (req, res) => {
  try {
    const attributes = await tbl_attributes.findAll({
      order: [['attribute_number', 'ASC']],
    });

    hdlGetMtdResNoCont(attributes, 'Attributes retrieved successfully.', res);
  } catch (error) {
    handleError(error, res, 'retrieving the attributes');
  };
};

// Add attribute
const addAttribute = async (req, res) => {
  const { attribute_name, attribute_desc, mark_for_deletion } = req.body;

  try {
    const newAttribute = await tbl_attributes.create({
      attribute_name,
      attribute_desc,
      mark_for_deletion,
      modified_dt: new Date(),
    });

    handlePostPutDelMtdRes(newAttribute, 'Attribute successfully created.', 'Attribute creation failed.', res);
  } catch (error) {
    handleError(error, res, 'creating the attribute');
  };
};

// Update attribute
const updateAttribute = async (req, res) => {
  const { attribute_guid, attribute_name, attribute_desc, mark_for_deletion } = req.body;

  try {
    const [updatedAttribute] = await tbl_attributes.update({
      attribute_name,
      attribute_desc,
      mark_for_deletion,
      modified_dt: new Date(),
    }, {
      where: { attribute_guid },
    });

    handlePostPutDelMtdRes(updatedAttribute, 'Attribute successfully updated.', 'Attribute update failed.', res);
  } catch (error) {
    handleError(error, res, 'updating the attribute');
  }
};

// Delete attributes
const deleteAttributes = async (req, res) => {
  const { attribute_guids } = req.body;

  try {
    const deletingResult = await tbl_attributes.destroy({
      where: { attribute_guid: attribute_guids }
    });

    handlePostPutDelMtdRes(deletingResult, 'Attributes successfully deleted.', 'Deleting of attributes failed.', res);
  } catch (error) {
    handleError(error, res, 'deleting the attributes');
  };
};

module.exports = {
  getAllAttributes,
  addAttribute,
  updateAttribute,
  deleteAttributes,
};