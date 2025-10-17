const { tbl_objects, sequelize } = require('../models');
const {
  hdlGetMtdResNoCont,
  handlePostPutDelMtdRes,
  handleError,
} = require('../scripts/helpers/generalHelpers');

// Get objects
const getAllObjects = async (req, res) => {
  try {
    const objects = await tbl_objects.findAll({
      order: [['object_number', 'ASC']]
    });

    hdlGetMtdResNoCont(objects, 'Objects retrieved successfully.', res);
  } catch (error) {
    handleError(error, res, 'retrieving the objects');
  };
};

// Add object
const addObject = async (req, res) => {
  const {
    object_name,
    object_desc,
    object_contact,
    object_width,
    object_length,
    object_is_enabled,
  } = req.body;

  try {
    const newObject = await tbl_objects.create({
      object_name,
      object_desc,
      object_contact,
      object_width,
      object_length,
      object_is_enabled,
    });

    handlePostPutDelMtdRes(newObject, 'Object successfully created.', 'Object creation failed.', res);
  } catch (error) {
    handleError(error, res, 'creating the object');
  };
};

// Update object
const updateObject = async (req, res) => {
  const t = await sequelize.transaction()
  const { object_guid, object_name, object_desc, object_contact, object_width, object_length, object_is_enabled, } = req.body;

  try {
    const [updated] = await tbl_objects.update(
      {
        object_name,
        object_desc,
        object_contact,
        object_width,
        object_length,
        object_is_enabled,
        modified_dt: new Date(),
      },
      {
        where: { object_guid },
        transaction: t
      }
    );

    if (updated > 0) {
      await tbl_objects.increment('update_count', { by: 1, where: { object_guid }, transaction: t });
    }

    await t.commit()

    const getFullRes = await tbl_objects.findOne({
      where: { object_guid: object_guid }
    })

    handlePostPutDelMtdRes(getFullRes, 'Object successfully updated.', 'Object not found.', res);
  } catch (error) {
    await t.rollback()
    handleError(error, res, 'updating the object');
  }
};

const deleteObjects = async (req, res) => {
  const { object_guids } = req.body;

  try {
    const result = await tbl_objects.destroy({
      where: { object_guid: object_guids }
    });

    handlePostPutDelMtdRes(result, 'Objects successfully deleted.', 'No objects found to delete.', res);
  } catch (error) {
    handleError(error, res, 'deleting the objects');
  };
};

const verifyApi = async (req, res) => {
  const { guid } = req.query;

  try {
    const result = await tbl_objects.findOne({
      where: { object_guid: guid }
    });

    handlePostPutDelMtdRes(result, 'verify success', 'verify success', res)
  } catch (error) {
    handleError(error, res, 'getting edit for data');
  }
};


module.exports = {
  verifyApi,
  getAllObjects,
  addObject,
  updateObject,
  deleteObjects,
};