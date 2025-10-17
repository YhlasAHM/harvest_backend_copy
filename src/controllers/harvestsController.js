const {
  sequelize,
  tbl_harvests,
  tbl_harv_employees,
  tbl_harv_details,
  tbl_harv_statuses,
  tbl_sectors,
  tbl_employees
} = require('../models');
const {
  hdlGetMtdResNoCont,
  handlePostPutDelMtdRes,
  handleError,
  resSend,
} = require('../scripts/helpers/generalHelpers');

const { Op } = require('sequelize');
const httpSts = require('../scripts/helpers/static');

const getAllHarvests = async (req, res) => {
  const { start_date, end_date, start_weight, end_weight, start_empl_count, end_empl_count } = req.query;

  try {
    let whereCondition = {};

    if (start_date && end_date) {
      whereCondition.harvest_datetime = {
        [Op.between]: [start_date, end_date]
      };
    } else if (start_date) {
      whereCondition.harvest_datetime = {
        [Op.gte]: start_date
      };
    } else if (end_date) {
      whereCondition.harvest_datetime = {
        [Op.lte]: end_date
      };
    }

    const isValidParam = (value) => value !== undefined && value !== null && value !== 'null' && value !== '';

    if (isValidParam(start_weight) || isValidParam(end_weight)) {
      whereCondition.harvest_weight = {};
      if (isValidParam(start_weight)) whereCondition.harvest_weight[Op.gte] = parseFloat(start_weight);
      if (isValidParam(end_weight)) whereCondition.harvest_weight[Op.lte] = parseFloat(end_weight);
    }

    if (isValidParam(start_empl_count) || isValidParam(end_empl_count)) {
      whereCondition.harvest_empl_count = {};
      if (isValidParam(start_empl_count)) whereCondition.harvest_empl_count[Op.gte] = parseInt(start_empl_count, 10);
      if (isValidParam(end_empl_count)) whereCondition.harvest_empl_count[Op.lte] = parseInt(end_empl_count, 10);
    }

    const harvests = await tbl_harvests.findAll({
      where: whereCondition,
      include: [
        {
          model: tbl_harv_employees, as: 'tbl_harv_employees',
          include: [
            { model: tbl_employees, as: 'tbl_employees' }
          ]
        },
        { model: tbl_harv_details, as: 'harv_details' },
        { model: tbl_harv_statuses, as: 'harv_status' },
        { model: tbl_sectors, as: 'sector', attributes: ['sector_name'] },
      ],
      order: [
        ['harvest_number', 'DESC'],
      ],
    });

    hdlGetMtdResNoCont(harvests, 'Harvests retrieved successfully.', res);
  } catch (error) {
    handleError(error, res, 'retrieving harvests');
  }
};


const getHarvestMinMax = async (req, res) => {
  const { start_date, end_date } = req.query


  try {
    const start_weight = await tbl_harvests.min('harvest_weight', {
      where: {
        harvest_datetime: {
          [Op.between]: [start_date, end_date]
        }
      }
    });

    const end_weight = await tbl_harvests.max('harvest_weight', {
      where: {
        harvest_datetime: {
          [Op.between]: [start_date, end_date]
        }
      }
    });

    const start_empl_count = await tbl_harvests.min('harvest_empl_count', {
      where: {
        harvest_datetime: {
          [Op.between]: [start_date, end_date]
        }
      }
    });

    const end_empl_count = await tbl_harvests.max('harvest_empl_count', {
      where: {
        harvest_datetime: {
          [Op.between]: [start_date, end_date]
        }
      }
    });
    res.status(200).json({ start_weight, end_weight, start_empl_count, end_empl_count })
  }
  catch (error) {
    handleError(error, res, 'retrieving harvests');
  }
}


const validationHarvest = async (req, res) => {
  const { harvest_guid } = req.query

  try {

    const verifyHarvest = await tbl_harvests.findAll({
      where: {
        harvest_guid: harvest_guid
      }
    })

    if (!verifyHarvest) {
      return res.status(404).json({
        message: 'harvest not found!'
      });
    } else {
      return res.status(200).json({
        message: 'harvest exist'
      })
    }
  } catch (error) {
    handleError(error, res, 'creating the harvest');
  }

}

const addHarvest = async (req, res) => {
  const t = await sequelize.transaction()
  const { harvest_datetime, sector_guid, harvest_weight, harvest_empl_count, harvest_desc } = req.body;

  try {

    const harv_status_id = await tbl_harv_statuses.min("harv_status_id", { transaction: t })
    if (harv_status_id) {
      const newHarvest = await tbl_harvests.create({
        harvest_datetime,
        sector_guid,
        harvest_weight,
        harvest_empl_count,
        harvest_desc,
        harv_status_id: harv_status_id
      }, { transaction: t });

      const res1 = await tbl_harvests.findOne({
        where: { harvest_guid: newHarvest.harvest_guid },
        transaction: t,
        include: [
          {
            model: tbl_sectors,
            as: 'sector',
            attributes: ['sector_name']
          },
          {
            model: tbl_harv_statuses,
            as: 'harv_status',
            attributes: ['harv_status_name']
          }
        ]
      })

      await t.commit()

      handlePostPutDelMtdRes(res1, 'Harvest successfully created.', 'Harvest creation failed.', res);
    } else {
      res.status(404).json({ message: "harv_status_id not found" })
      await t.rollback()
    }

  } catch (error) {
    await t.rollback();
    handleError(error, res, 'creating the harvest');
  }
};

// Update harvest
const updateHarvest = async (req, res) => {
  const t = await sequelize.transaction()
  const { harvest_guid, harvest_datetime, harvest_desc, harv_status_id } = req.body;

  try {
    const [updatedHarvest] = await tbl_harvests.update({
      harvest_guid,
      harvest_datetime,
      harvest_desc,
      harv_status_id,
      modified_dt: new Date()
    }, {
      where: { harvest_guid },
      transaction: t
    });

    if (updatedHarvest > 0) {
      await tbl_harvests.increment('update_count', { by: 1, where: { harvest_guid }, transaction: t });
    }

    await t.commit()

    const getFullRes = await tbl_harvests.findOne({
      where: { harvest_guid: harvest_guid }
    })

    handlePostPutDelMtdRes(getFullRes, 'Harvest successfully updated.', 'Harvest update failed.', res);
  } catch (error) {
    await t.rollback()
    handleError(error, res, 'updating the harvest');
  };
};

// Delete harvest
const deleteHarvests = async (req, res) => {
  const { harvest_guids } = req.body;

  try {
    const deletedHarvest = await tbl_harvests.destroy({
      where: { harvest_guid: harvest_guids },
    });

    handlePostPutDelMtdRes(deletedHarvest, 'Harvest successfully deleted.', 'Harvest deletion failed.', res);
  } catch (error) {
    handleError(error, res, 'deleting the harvests');
  };
};


const updateHarvAndHarvDet = async (req, res) => {

  const t = await sequelize.transaction();
  
  const { harvest_guid, harvest_datetime, sector_guid, harv_employees, harvest_desc, harv_status_id } = req.body;

  try {
    if (!Array.isArray(harv_employees) || harv_employees.length === 0) {
      return resSend(
        res,
        httpSts.badRequest,
        'No harvest employees GUIDs provided for deletion.',
        null
      );
    } else {

      await tbl_harv_employees.destroy({
        where: { harvest_guid: harvest_guid },
      }, { transaction: t })

      await Promise.all(harv_employees.map(async (employee) => {
        await tbl_harv_employees.create({
          harvest_guid: harvest_guid,
          employee_guid: employee.empl_guid,
          is_enter_info: employee.is_enter
        }, { transaction: t });
      }));

      await tbl_harvests.update(
        {
          harvest_datetime: harvest_datetime,
          harvest_desc: harvest_desc,
          sector_guid: sector_guid,
          harv_status_id: harv_status_id
        },
        {
          where: { harvest_guid: harvest_guid },
          transaction: t
        }
      );

      await t.commit();

      handlePostPutDelMtdRes('harvest successfully updated', 'Harvest successfully updated.', 'Harvest update failed.', res);
    }

  } catch (error) {
    await t.rollback();
    console.error(error);
    handleError(error, res, 'updating the harvest details');
  }
};

const verifyApi = async (req, res) => {
  const { guid } = req.query;

  try {
    const result = await tbl_harvests.findOne({
      where: { harvest_guid: guid }
    })

    handlePostPutDelMtdRes(result, 'verify success', 'verify success', res)
  } catch (error) {
    handleError(error, res, 'getting edit for data')
  }

}

module.exports = {
  verifyApi,
  validationHarvest,
  updateHarvAndHarvDet,
  getHarvestMinMax,
  getAllHarvests,
  addHarvest,
  updateHarvest,
  deleteHarvests,
};