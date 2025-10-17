const { tbl_sectors, tbl_blocks, tbl_objects, sequelize } = require('../models');
const { handlePostPutDelMtdRes, hdlGetMtdResNoCont, handleError } = require('../scripts/helpers/generalHelpers');

// Get sectors
const getAllSectors = async (req, res) => {
  try {
    const sectors = await tbl_sectors.findAll({
      include: [
        {
          model: tbl_blocks,
          as: 'tbl_blocks',
          attributes: ['block_name'],
          include: [
            {
              model: tbl_objects,
              as: 'tbl_objects',
              attributes: ['object_name']
            }
          ],
        },
      ],
      order: [['sector_number', 'ASC']],
    });

    hdlGetMtdResNoCont(sectors, 'Sectors retrieved successfully.', res);
  } catch (error) {
    handleError(error, res, 'retrieving the sectors');
  };
};

// Add sector
const addSector = async (req, res) => {
  const {
    block_guid,
    sector_name,
    sector_desc,
    sector_params,
    sector_width,
    sector_length,
    road_width,
    road_length,
    sector_is_enabled
  } = req.body;

  try {
    const newSector = await tbl_sectors.create({
      block_guid,
      sector_name,
      sector_desc,
      sector_width,
      sector_length,
      road_width,
      road_length,
      sector_params,
      sector_is_enabled,
      modified_dt: new Date(),
    });

    if (newSector) {
      const resData = await tbl_sectors.findOne({
        where: {
          sector_guid: newSector.sector_guid,
        },
        include: [
          {
            model: tbl_blocks,
            as: 'tbl_blocks',
            attributes: ['block_name'],
            include: [
              {
                model: tbl_objects,
                as: 'tbl_objects',
                attributes: ['object_name']
              }
            ],
          },
        ],
      });

      handlePostPutDelMtdRes(resData, 'Sector successfully created.', 'Sector creation failed.', res);
    }
  } catch (error) {
    handleError(error, res, 'creating the sector');
  };
};

// Update sector
const updateSector = async (req, res) => {
  const t = await sequelize.transaction()
  const {
    sector_guid,
    block_guid,
    sector_name,
    sector_desc,
    sector_params,
    road_width,
    road_length,
    sector_width,
    sector_length,
    sector_is_enabled
  } = req.body;

  try {
    const [updatedSector] = await tbl_sectors.update(
      {
        block_guid,
        sector_name,
        sector_desc,
        sector_width,
        sector_length,
        road_width,
        road_length,
        sector_params,
        sector_is_enabled,
        modified_dt: new Date(),
      },
      {
        where: { sector_guid },
        transaction: t
      }
    );

    if (updatedSector > 0) {
      await tbl_sectors.increment('update_count', { by: 1, where: { sector_guid }, transaction: t });
    }

    await t.commit()

    const getFullRes = await tbl_sectors.findOne({
      where: {
        sector_guid: sector_guid,
      },
      include: [
        {
          model: tbl_blocks,
          as: 'tbl_blocks',
          attributes: ['block_name'],
          include: [
            {
              model: tbl_objects,
              as: 'tbl_objects',
              attributes: ['object_name']
            }
          ]
        }
      ]
    })

    handlePostPutDelMtdRes(getFullRes, 'Sector successfully updated.', 'Sector update failed.', res);
  } catch (error) {
    await t.rollback()
    handleError(error, res, 'updating the sector');
  };
};

// Delete sectors
const deleteSectors = async (req, res) => {
  const { sector_guids } = req.body;

  try {
    const result = await tbl_sectors.destroy({
      where: { sector_guid: sector_guids }
    });

    handlePostPutDelMtdRes(result, 'Sectors successfully deleted.', 'No sectors found to delete.', res);
  } catch (error) {
    handleError(error, res, 'deleting the sectors');
  };
};


const verifyApi = async (req, res) => {
  const { guid } = req.query;

  try {
    const result = await tbl_sectors.findOne({
      where: { sector_guid: guid }
    })

    handlePostPutDelMtdRes(result, 'verify success', 'verify success', res)
  } catch (error) {
    handleError(error, res, 'getting edit for data')
  }

}


module.exports = {
  verifyApi,
  getAllSectors,
  addSector,
  updateSector,
  deleteSectors,
};