const { where } = require('sequelize');
const {
  tbl_materials,
  tbl_mtrl_types,
  tbl_units,
  sequelize,
  tbl_categories,
  tbl_marks } = require('../models');
const { hdlGetMtdResNoCont, handlePostPutDelMtdRes, handleError } = require('../scripts/helpers/generalHelpers');

// Get materials
const getAllMaterials = async (req, res) => {
  try {
    const materials = await tbl_materials.findAll({
      include: [{
        model: tbl_mtrl_types,
        as: 'tbl_mtrl_types',
        attributes: ['mtrl_type_name']
      },
      {
        model: tbl_units,
        as: 'tbl_units',
        attributes: ['unit_name']
      }
      ],
    });

    hdlGetMtdResNoCont(materials, 'Materials retrieved successfully.', res);
  } catch (error) {
    handleError(error, res, 'retrieving the materials');
  }
};

const addMaterial = async (req, res) => {

  const { mtrl_name, mtrl_desc, category_guid, mark_guid, unit_guid, is_weight_use, use_variants, owner_is_group, is_mtrl_enabled, mtrl_type_id, mtrl_code } = req.body;

  try {
    const newMaterial = await tbl_materials.create({
      mtrl_name, mtrl_code, mtrl_desc, category_guid, mark_guid, unit_guid, is_weight_use, use_variants, owner_is_group, is_mtrl_enabled, mtrl_type_id, modified_dt: new Date()
    });

    if (newMaterial) {
      const res1 = await tbl_materials.findOne({
        where: {
          mtrl_guid: newMaterial.mtrl_guid
        },
        include: [
          {
            model: tbl_categories,
            as: 'tbl_categories',
            attributes: ['category_name']
          },
          {
            model: tbl_marks,
            as: 'tbl_marks',
            attributes: ['mark_name']
          },
          {
            model: tbl_units,
            as: 'tbl_units',
            attributes: ['unit_name']
          },
          {
            model: tbl_mtrl_types,
            as: 'tbl_mtrl_types',
            attributes: ['mtrl_type_name']
          },
        ]
      })

      handlePostPutDelMtdRes(res1, 'Material successfully created.', 'Material creation failed.', res);
    }

  } catch (error) {
    handleError(error, res, 'creating the material');
  };
};

const updateMaterial = async (req, res) => {
  const t = await sequelize.transaction()
  const { mtrl_guid, mtrl_name, mtrl_code, mtrl_desc, category_guid, mark_guid, unit_guid, is_weight_use, use_variants, owner_is_group, is_mtrl_enabled, mtrl_type_id } = req.body;

  try {
    const [updatedMaterial] = await tbl_materials.update(
      {
        mtrl_name, mtrl_code, mtrl_desc, category_guid, mark_guid, unit_guid, is_weight_use, use_variants, owner_is_group, is_mtrl_enabled, mtrl_type_id, modified_dt: new Date()
      },
      {
        where: { mtrl_guid },
        transaction: t
      }
    );

    if (updatedMaterial > 0) {
      await tbl_materials.increment('update_count', { by: 1, where: { mtrl_guid }, transaction: t });
    } else {
      await t.rollback()
    }

    await t.commit()

    const getFullRes = await tbl_materials.findOne({
      where: { mtrl_guid: mtrl_guid },
      include: [
        {
          model: tbl_categories,
          as: 'tbl_categories',
          attributes: ['category_name']
        },
        {
          model: tbl_marks,
          as: 'tbl_marks',
          attributes: ['mark_name']
        },
        {
          model: tbl_units,
          as: 'tbl_units',
          attributes: ['unit_name']
        },
        {
          model: tbl_mtrl_types,
          as: 'tbl_mtrl_types',
          attributes: ['mtrl_type_name']
        },
      ]
    })

    handlePostPutDelMtdRes(getFullRes, 'Material successfully updated.', 'Material update failed.', res);
  } catch (error) {
    await t.rollback()
    handleError(error, res, 'updating the material');
  };
};

// Delete materials
const deleteMaterials = async (req, res) => {
  const { mtrl_guids } = req.body;

  try {
    const deletedMaterial = await tbl_materials.destroy({
      where: { mtrl_guid: mtrl_guids },
    });

    handlePostPutDelMtdRes(deletedMaterial, 'Materials successfully deleted.', 'Materials deletion failed.', res);
  } catch (error) {
    handleError(error, res, 'deleting the materials');
  };
};

const verifyApi = async (req, res) => {
  const { guid } = req.query;

  try {
    const result = await tbl_materials.findOne({
      where: { mtrl_guid: guid }
    })

    handlePostPutDelMtdRes(result, 'verify success', 'verify success', res)
  } catch (error) {
    handleError(error, res, 'getting edit for data')
  }

}

module.exports = {
  verifyApi,
  getAllMaterials,
  addMaterial,
  updateMaterial,
  deleteMaterials,
};