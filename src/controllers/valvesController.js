const { where } = require('sequelize');
const { tbl_valves, tbl_sectors, tbl_blocks, tbl_objects, sequelize } = require('../models');
const {
  hdlGetMtdResNoCont,
  handlePostPutDelMtdRes,
  handleError,
} = require('../scripts/helpers/generalHelpers');

// Get valves
const getAllValves = async (req, res) => {
  try {
    const valves = await tbl_valves.findAll({
      include: [
        {
          model: tbl_sectors,
          as: 'tbl_sectors',
          attributes: ['sector_name'],
          include: [
            {
              model: tbl_blocks,
              as: 'tbl_blocks',
              attributes: ['block_name'],
              include: [
                {
                  model: tbl_objects,
                  as: 'tbl_objects',
                  attributes: ['object_name'],
                },
              ],
            },
          ],
        },
      ],
    });

    hdlGetMtdResNoCont(valves, 'Valves retrieved successfully.', res);
  } catch (error) {
    handleError(error, res, 'retrieving the valves');
  };
};

// Add valve
const addValve = async (req, res) => {
  const { sector_guid, valve_name, valve_desc, valve_params, valve_is_enabled } = req.body;

  try {
    const newValve = await tbl_valves.create({
      sector_guid,
      valve_name,
      valve_desc,
      valve_params,
      valve_is_enabled,
      modified_dt: new Date(),
    });

    if (newValve) {
      const res1 = await tbl_valves.findOne({
        where: {
          valve_guid: newValve.valve_guid
        },
        include: [
          {
            model: tbl_sectors,
            as: 'tbl_sectors',
            attributes: ['sector_name'],
            include: [
              {
                model: tbl_blocks,
                as: 'tbl_blocks',
                attributes: ['block_name'],
                include: [
                  {
                    model: tbl_objects,
                    as: 'tbl_objects',
                    attributes: ['object_name'],
                  },
                ],
              },
            ],
          },
        ],
      })
      handlePostPutDelMtdRes(res1, 'Valve successfully created.', 'Valve creation failed.', res);
    }

  } catch (error) {
    handleError(error, res, 'creating the valve');
  };
};

// Update valve
const updateValve = async (req, res) => {
  const t = await sequelize.transaction()
  const { valve_guid, sector_guid, valve_name, valve_desc, valve_params, valve_is_enabled } = req.body;

  try {
    const [updatedValve] = await tbl_valves.update(
      {
        sector_guid,
        valve_name,
        valve_desc,
        valve_params,
        valve_is_enabled,
        modified_dt: new Date(),
      },
      {
        where: { valve_guid },
        transaction: t
      }
    );

    if (updatedValve > 0) {
      await tbl_valves.increment('update_count', { by: 1, where: { valve_guid }, transaction: t });
    }

    await t.commit()

    const getFullRes = await tbl_valves.findOne({
      where: { valve_guid: valve_guid },
      include: [
        {
          model: tbl_sectors,
          as: 'tbl_sectors',
          attributes: ['sector_name'],
          include: [
            {
              model: tbl_blocks,
              as: 'tbl_blocks',
              attributes: ['block_name'],
              include: [
                {
                  model: tbl_objects,
                  as: 'tbl_objects',
                  attributes: ['object_name'],
                },
              ],
            },
          ],
        },
      ],
    })

    handlePostPutDelMtdRes(getFullRes, 'Valve successfully updated.', 'Valve update failed.', res);
  } catch (error) {
    await t.rollback()
    handleError(error, res, 'updating the valve');
  };
};

// Delete valves
const deleteValves = async (req, res) => {
  const { valve_guids } = req.body;

  try {
    const result = await tbl_valves.destroy({
      where: { valve_guid: valve_guids }
    });

    handlePostPutDelMtdRes(result, 'Valves successfully deleted.', 'No valves found to delete.', res);
  } catch (error) {
    handleError(error, res, 'deleting the valves');
  };
};

const verifyApi = async (req, res) => {
  const { guid } = req.query;

  try {
    const result = await tbl_valves.findOne({
      where: { valve_guid: guid }
    })

    handlePostPutDelMtdRes(result, 'verify success', 'verify success', res)
  } catch (error) {
    handleError(error, res, 'getting edit for data')
  }
}


module.exports = {
  verifyApi,
  getAllValves,
  addValve,
  updateValve,
  deleteValves,
};