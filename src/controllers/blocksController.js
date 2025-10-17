const { tbl_blocks, tbl_objects, sequelize } = require('../models');
const {
  hdlGetMtdResNoCont,
  handlePostPutDelMtdRes,
  handleError,
} = require('../scripts/helpers/generalHelpers');

// Get blocks
const getAllBlocks = async (req, res) => {
  try {
    const blocks = await tbl_blocks.findAll({
      include: [{
        model: tbl_objects,
        as: 'tbl_objects',
        attributes: ['object_name']
      }],
      order: [['block_number', 'ASC']],
    });

    hdlGetMtdResNoCont(blocks, 'Blocks retrieved successfully.', res);
  } catch (error) {
    handleError(error, res, 'retrieving the blocks');
  };
};

// Add block
const addBlock = async (req, res) => {
  const {
    object_guid,
    block_name,
    block_desc,
    block_params,
    block_width,
    block_length,
    block_is_enabled
  } = req.body;

  try {
    const newBlock = await tbl_blocks.create({
      object_guid,
      block_name,
      block_desc,
      block_width,
      block_length,
      block_params,
      block_is_enabled,
      modified_dt: new Date(),
    });

    if (newBlock) {
      const resData = await tbl_blocks.findOne({
        where: {
          block_guid: newBlock.block_guid,
        },
        include: [
          {
            model: tbl_objects,
            as: 'tbl_objects',
            attributes: ['object_name'],
          },
        ],
      });

      handlePostPutDelMtdRes(resData, 'Block successfully created.', 'Block creation failed.', res);
    }
  }
  catch (error) {
    handleError(error, res, 'creating the block');
  };
};

// Update block
const updateBlock = async (req, res) => {
  const t = await sequelize.transaction();

  const {
    object_guid,
    block_guid,
    block_name,
    block_desc,
    block_params,
    block_width,
    block_length,
    block_is_enabled,
  } = req.body;

  try {
    const [updatedBlock] = await tbl_blocks.update({
      object_guid,
      block_name,
      block_desc,
      block_width,
      block_length,
      block_params,
      block_is_enabled,
      modified_dt: new Date(),
    }, {
      where: { block_guid },
      transaction: t
    });


    if (updatedBlock > 0) {
      await tbl_blocks.increment('update_count', { by: 1, where: { block_guid }, transaction: t });
    }

    await t.commit();

    const getFullRes = await tbl_blocks.findOne({
      where: { block_guid: block_guid },
      include: [
        {
          model: tbl_objects,
          as: 'tbl_objects',
          attributes: ['object_name'],
        },
      ],
    })

    handlePostPutDelMtdRes(getFullRes, 'Block successfully updated.', 'Block update failed.', res);

  } catch (error) {
    await t.rollback()
    handleError(error, res, 'updating the block');
  };
};

// Delete blocks
const deleteBlocks = async (req, res) => {
  const { block_guids } = req.body;

  try {
    const result = await tbl_blocks.destroy({
      where: { block_guid: block_guids }
    });

    handlePostPutDelMtdRes(result, 'Blocks successfully deleted.', 'No blocks found to delete.', res);
  } catch (error) {
    handleError(error, res, 'deleting the blocks');
  };
};

const verifyApi = async (req, res) => {
  const { guid } = req.query;

  try {
    const result = await tbl_blocks.findOne({
      where: { block_guid: guid }
    });

    handlePostPutDelMtdRes(result, 'verify success', 'verify success', res)
  } catch (error) {
    handleError(error, res, 'getting edit for data');
  }
};


module.exports = {
  verifyApi,
  getAllBlocks,
  addBlock,
  updateBlock,
  deleteBlocks,
};