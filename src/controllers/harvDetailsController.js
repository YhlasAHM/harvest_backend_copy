const { sequelize, tbl_harv_details, tbl_grades, tbl_employees, tbl_materials, tbl_harvests, tbl_archs } = require('../models');
const { resSend, handlePostPutDelMtdRes, hdlGetMtdResNoCont, handleError } = require('../scripts/helpers/generalHelpers');
const httpSts = require('../scripts/helpers/static');

// Get all harvest details
const getAllHarvestDetails = async (req, res) => {
  const { harvest_guid } = req.params;

  try {
    const harvestDetails = await tbl_harv_details.findAll({

      where: { harvest_guid },
      include: [
        { model: tbl_grades, as: 'tbl_grades', attributes: ['grade_name'] },
        { model: tbl_employees, as: 'tbl_employees', attributes: ['empl_name'] },
        { model: tbl_materials, as: 'tbl_materials', attributes: ['mtrl_name'] },
        { model: tbl_archs, as: 'arch', attributes: ['arch_name'] },
      ]
    });

    hdlGetMtdResNoCont(harvestDetails, 'Harvest details retrieved successfully.', res);
  } catch (error) {
    handleError(error, res, 'retrieving the harvest details');
  };
};


const addHarvestDetails = async (req, res) => {
  const t = await sequelize.transaction();
  const {
    harvest_guid,
    arch_guid,
    start_time,
    end_time,
    harv_det_weight,
    employee_guid,
    grade_guid,
    material_guid,
    harv_det_desc
  } = req.body;

  try {
    const newHarvestDetail = await tbl_harv_details.create({
      harvest_guid,
      arch_guid,
      start_time,
      end_time,
      harv_det_weight,
      employee_guid,
      grade_guid,
      material_guid,
      harv_det_desc
    }, { transaction: t });

    if (newHarvestDetail) {

      await tbl_harvests.increment(
        { harvest_weight: harv_det_weight },
        { where: { harvest_guid }, transaction: t }
      );

      const harv_dets = await tbl_harv_details.count({
        where: { harvest_guid },
        transaction: t,
      });

      if (harv_dets) {
        await tbl_harvests.update(
          { harvest_empl_count: harv_dets },
          { where: { harvest_guid }, transaction: t }
        );
      }

      const res1 = await tbl_harv_details.findOne({
        where: { harv_det_guid: newHarvestDetail.harv_det_guid },
        transaction: t,
        include: [
          {
            model: tbl_grades,
            as: 'tbl_grades',
            attributes: ['grade_name']
          },
          {
            model: tbl_employees,
            as: 'tbl_employees',
            attributes: ['empl_name']
          },
          {
            model: tbl_materials,
            as: 'tbl_materials',
            attributes: ['mtrl_name']
          },
          {
            model: tbl_archs,
            as: 'arch',
            attributes: ['arch_name']
          },
          {
            model: tbl_harvests,
            as: 'tbl_harvests',
            attributes: ['harvest_datetime']
          }
        ],
      });

      await t.commit();

      handlePostPutDelMtdRes(res1, 'Harvest detail successfully created.', 'Harvest detail creation failed.', res);
    } else {
      
      await t.rollback();
    }

  } catch (error) {
    await t.rollback();
    console.error(error);
    handleError(error, res, 'creating the harvest details');
  }
};

const updateHarvestDetails = async (req, res) => {
  const t = await sequelize.transaction()
  const { harv_det_guid, arch_guid, start_time, end_time, harv_det_weight, employee_guid, grade_guid, material_guid, harv_det_desc } = req.body;

  try {
    const [updatedHarvestDetail] = await tbl_harv_details.update({
      start_time, arch_guid, end_time, harv_det_weight, employee_guid, grade_guid, material_guid, harv_det_desc, modified_dt: new Date()
    }, {
      where: { harv_det_guid },
      individualHooks: true,
      transaction: t
    });

    if (updatedHarvestDetail > 0) {
      await tbl_harv_details.increment('update_count', { by: 1, where: { harv_det_guid }, transaction: t });
    } else {
      await t.rollback()
    }

    const getFullRes = await tbl_harv_details.findOne({
      where: { harv_det_guid: harv_det_guid },
      transaction: t,
      include: [
        {
          model: tbl_grades,
          as: 'tbl_grades',
          attributes: ['grade_name']
        },
        {
          model: tbl_employees,
          as: 'tbl_employees',
          attributes: ['empl_name']
        },
        {
          model: tbl_materials,
          as: 'tbl_materials',
          attributes: ['mtrl_name']
        },
        {
          model: tbl_archs,
          as: 'arch',
          attributes: ['arch_name']
        },
      ],
    })

    await t.commit()

    handlePostPutDelMtdRes(getFullRes, 'Harvest detail successfully updated.', 'Harvest detail update failed.', res);
  } catch (error) {
    await t.rollback()
    handleError(error, res, 'updating the harvest details');
  };
};

const deleteHarvestDetails = async (req, res) => {
  const { harv_det_guids } = req.body;
  const t = await sequelize.transaction();

  try {
    if (!Array.isArray(harv_det_guids) || harv_det_guids.length === 0) {
      return resSend(
        res,
        httpSts.badRequest,
        'No harvest detail GUIDs provided for deletion.',
        null
      );
    }

    const detailsToDelete = await tbl_harv_details.findAll({
      where: { harv_det_guid: harv_det_guids },
      transaction: t
    });

    if (!detailsToDelete || detailsToDelete.length === 0) {
      await t.rollback();
      return resSend(res, httpSts.notFound, 'No harvest details found.', null);
    }

    const harvest_guid = detailsToDelete[0].harvest_guid;

    const deletedCount = await tbl_harv_details.destroy({
      where: { harv_det_guid: harv_det_guids },
      transaction: t,
    });

    const remainingDetails = await tbl_harv_details.findAll({
      where: { harvest_guid },
      transaction: t
    });

    const newTotalWeight = remainingDetails.reduce((sum, det) => sum + Number(det.harv_det_weight), 0);
    const newEmplCount = remainingDetails.length;

    await tbl_harvests.update(
      {
        harvest_weight: newTotalWeight,
        harvest_empl_count: newEmplCount,
      },
      { where: { harvest_guid }, transaction: t }
    );

    await t.commit();

    handlePostPutDelMtdRes(
      deletedCount,
      `Successfully deleted ${deletedCount} harvest detail(s).`,
      'Harvest details deletion failed.',
      res
    );
  } catch (error) {
    await t.rollback();
    handleError(error, res, 'deleting the harvest details');
  }
};

const verifyApi = async (req, res) => {
  const { guid } = req.query;

  try {
    const result = await tbl_harv_details.findOne({
      where: { harv_det_guid: guid }
    })

    handlePostPutDelMtdRes(result, 'verify success', 'verify success', res)
  } catch (error) {
    handleError(error, res, 'getting edit for data')
  }

}

module.exports = {
  verifyApi,
  getAllHarvestDetails,
  addHarvestDetails,
  updateHarvestDetails,
  deleteHarvestDetails,
};