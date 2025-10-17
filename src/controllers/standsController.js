const { tbl_stands, sequelize, tbl_blocks, tbl_objects, tbl_sectors } = require('../models');
const { hdlGetMtdResNoCont, handlePostPutDelMtdRes, handleError } = require('../scripts/helpers/generalHelpers');

// Get stands
const getAllStands = async (req, res) => {
  try {
    const stands = await tbl_stands.findAll({
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
                  attributes: ['object_name']
                }
              ]
            }
          ]
        }
      ]
    });

    hdlGetMtdResNoCont(stands, 'Stands retrieved successfully.', res);
  } catch (error) {
    handleError(error, res, 'retrieving the stands');
  };
};

// Add stand

const addStand = async (req, res) => {

  const t = await sequelize.transaction()

  const { sector_guid, stand_name, stand_desc, stand_params, stand_height, stand_is_enabled } = req.body;

  try {
    const newStand = await tbl_stands.create({
      sector_guid,
      stand_name,
      stand_desc,
      stand_params,
      stand_height,
      stand_is_enabled,
      modified_dt: new Date(),
    }, { transaction: t });

    if (newStand) {

      const ress = await tbl_stands.findOne({
        where: { stand_guid: newStand.stand_guid },
        transaction: t,
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
                    attributes: ['object_name']
                  }
                ]
              }
            ]
          }
        ]
      })

      handlePostPutDelMtdRes(ress, 'Stand successfully created.', 'Stand creation failed.', res);
    } else {
      await t.rollback()
    }
    await t.commit()
  } catch (error) {
    handleError(error, res, 'creating the stand');
  };
};

// Update stand
const updateStand = async (req, res) => {
  const t = await sequelize.transaction()
  const { stand_guid, stand_name, stand_desc, stand_params, stand_height, stand_is_enabled } = req.body;

  try {
    const [updatedStand] = await tbl_stands.update({
      stand_guid,
      stand_name,
      stand_desc,
      stand_params,
      stand_height,
      stand_is_enabled,
      modified_dt: new Date(),
    }, {
      where: { stand_guid },
      transaction: t
    });

    if (updatedStand > 0) {
      await tbl_stands.increment('update_count', { by: 1, where: { stand_guid }, transaction: t });
    }

    await t.commit()

    const getFullRes = await tbl_stands.findOne({
      where: { stand_guid: stand_guid },
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
                  attributes: ['object_name']
                }
              ]
            }
          ]
        }
      ]
    })

    handlePostPutDelMtdRes(getFullRes, 'Stand successfully updated.', 'Stand update failed.', res);
  } catch (error) {
    await t.rollback()
    handleError(error, res, 'updating the stand');
  };
};

// Delete stands
const deleteStands = async (req, res) => {
  const { stand_guids } = req.body;

  try {
    const result = await tbl_stands.destroy({
      where: { stand_guid: stand_guids }
    });

    handlePostPutDelMtdRes(result, 'Stands successfully deleted.', 'No stands found to delete.', res);
  } catch (error) {
    handleError(error, res, 'deleting the stands');
  }
};


const verifyApi = async (req, res) => {
  const { guid } = req.query;

  try {
    const result = await tbl_stands.findOne({
      where: { stand_guid: guid }
    })

    handlePostPutDelMtdRes(result, 'verify success', 'verify success', res)
  } catch (error) {
    handleError(error, res, 'getting edit for data')
  }

}

module.exports = {
  verifyApi,
  getAllStands,
  addStand,
  updateStand,
  deleteStands,
};