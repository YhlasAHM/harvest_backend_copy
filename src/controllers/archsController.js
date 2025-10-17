const { tbl_archs, tbl_sectors, tbl_blocks, tbl_objects, sequelize } = require('../models');
const {
  hdlGetMtdResNoCont,
  handlePostPutDelMtdRes,
  handleError,
} = require('../scripts/helpers/generalHelpers');

const { Op } = require('sequelize');

// Get archs
const getAllArchs = async (req, res) => {
  try {
    const archs = await tbl_archs.findAll({
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

    hdlGetMtdResNoCont(archs, 'Archs retrieved successfully.', res);
  } catch (error) {
    handleError(error, res, 'retrieving the archs');
  };
};


const getArchsForSector = async (req, res) => {

  const { sector_guid } = req.query

  try {
    const archs = await tbl_archs.findAll({
      where: {
        sector_guid: sector_guid
      },
      include: [
        {
          model: tbl_sectors,
          as: 'tbl_sectors',
          attributes: ['sector_name']
        },
      ],
      order: [['arch_number', 'ASC']],
    });

    hdlGetMtdResNoCont(archs, 'Archs retrieved successfully.', res);
  } catch (error) {
    handleError(error, res, 'retrieving the archs');
  };
};

// Add arch
const addArch = async (req, res) => {

  const t = await sequelize.transaction();

  const {
    sector_guid,
    arch_name,
    arch_desc,
    arch_params,
    arch_number,
    arch_width,
    arch_length,
    arch_is_enabled
  } = req.body;

  try {

    const archVerify = await tbl_archs.count({
      where: {
        sector_guid: sector_guid,
        arch_number: arch_number
      },
      transaction: t
    });

    if (archVerify > 0) {
      await t.rollback();
      return res.status(409).json({ message: "Bu sector_guid ve arch_number kombinasiyasy bar conflict status" });
    }

    const sector = await tbl_sectors.findOne({
      where: { sector_guid },
      attributes: ['empty_field'],
      transaction: t
    });

    if (!sector) {
      await t.rollback();
      return res.status(404).json({ message: "sektor not found" });
    }

    const updateFieldForSector = sector.empty_field - arch_width;

    if (updateFieldForSector >= 0) {

      const newArch = await tbl_archs.create({
        sector_guid,
        arch_name,
        arch_desc,
        arch_number,
        arch_width,
        arch_length,
        arch_params,
        arch_is_enabled,
        modified_dt: new Date(),
      }, { transaction: t });

      await tbl_sectors.update({
        empty_field: updateFieldForSector,
      }, { where: { sector_guid }, transaction: t });

      await t.commit();

      const resss = await tbl_archs.findOne({
        where: { arch_guid: newArch.arch_guid },
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

                  }
                ]
              }
            ]
          }
        ]
      })

      return handlePostPutDelMtdRes(resss, 'Arch successfully created.', 'Arch creation failed.', res);

    } else {

      await t.rollback();
      return res.status(400).json({ message: " There is not enough space in the sector " });
    }

  } catch (error) {

    await t.rollback();
    handleError(error, res, 'creating the arch');
  };
};

// Update arch
const updateArch = async (req, res) => {
  const t = await sequelize.transaction();

  const {
    arch_guid,
    sector_guid,
    arch_name,
    arch_desc,
    arch_params,
    arch_width,
    arch_length,
    arch_is_enabled
  } = req.body;

  try {
    const updatedArch = await tbl_archs.update({
      sector_guid,
      arch_name,
      arch_desc,
      arch_params,
      arch_width,
      arch_length,
      arch_is_enabled,
      modified_dt: new Date(),
    }, {
      where: { arch_guid },
      transaction: t
    });

    if (updatedArch > 0) {
      await tbl_archs.increment('update_count', { by: 1, where: { arch_guid }, transaction: t });
    }

    await t.commit();

    const getFullRes = await tbl_archs.findOne({
      where: {
        arch_guid: arch_guid,
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
                  attributes: ['object_name']
                }
              ]
            }
          ]
        }
      ]
    })

    handlePostPutDelMtdRes(getFullRes, 'Arch successfully updated.', 'Arch update failed.', res);
  } catch (error) {
    await t.rollback();
    handleError(error, res, 'updating the arch');
  };
};

const deleteArchs = async (req, res) => {
  const { arch_guids } = req.body;

  try {
    const result = await tbl_archs.destroy({
      where: { arch_guid: arch_guids }
    });

    handlePostPutDelMtdRes(result, 'Archs successfully deleted.', 'No archs found to delete.', res);
  } catch (error) {
    handleError(error, res, 'deleting the archs');
  };
};

const autoGenerate = async (req, res) => {
  const t = await sequelize.transaction();

  const { sector_guid, arch_name, arch_desc, arch_width, arch_length, generateCount } = req.body;

  try {

    const sector = await tbl_sectors.findOne({
      where: { sector_guid },
      attributes: ['empty_field'],
      transaction: t
    })

    const updateFieldForSector = sector.empty_field - (generateCount * arch_width)

    let newArches = [];

    let arch_numbers = []

    if (updateFieldForSector > 0) {

      const existingArches = await tbl_archs.findAll({
        where: { sector_guid: sector_guid },
        attributes: ['arch_number'],
        order: [['arch_number', 'DESC']],
        transaction: t
      });

      arch_numbers = existingArches.map(arch => arch.arch_number);

      for (let i = 0; i < generateCount; i++) {

        for (let indexNumber = 1; indexNumber <= (generateCount + (arch_numbers.length)); indexNumber++) {
          if (!arch_numbers.includes(indexNumber)) {

            const newArchName = {};
            const newArchDesc = {};

            if (arch_name && typeof arch_name === 'object') {
              newArchName.tk = `${arch_name.tk}${indexNumber}`;
              newArchName.ru = `${arch_name.ru}${indexNumber}`;
            } else {
              newArchName.tk = `Arka${indexNumber}`;
              newArchName.ru = `Арка${indexNumber}`;
            }

            if (arch_desc && typeof arch_desc === 'object') {
              newArchDesc.tk = arch_desc.tk;
              newArchDesc.ru = arch_desc.ru;
            } else {
              newArchDesc.tk = 'Default Description';
              newArchDesc.ru = 'Описание по умолчанию';
            }

            const newArchData = {
              sector_guid,
              arch_name: newArchName,
              arch_desc: newArchDesc,
              arch_width,
              arch_length,
              arch_number: indexNumber,
            };

            arch_numbers.push(indexNumber)

            newArches.push(newArchData); break;
          }
        }
      }

      const res11 = await tbl_archs.bulkCreate(newArches);

      const newArchGuids = res11.map(arch => arch.arch_guid);

      await tbl_sectors.update({
        empty_field: updateFieldForSector
      }, { where: { sector_guid }, transaction: t })

      if (res11) {
        const fullResponse = await tbl_archs.findAll({
          where: {
            arch_guid: { [Op.in]: newArchGuids }
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
                      attributes: ['object_name']
                    }
                  ]
                }
              ]
            }
          ],
          transaction: t
        });
        res.status(200).json({ data: fullResponse, message: "autogenerate success" })
      }

    } else {
      res.status(409).json({ message: "arch lar sectora yerlesmeyar" })
      await t.rollback();
    }

    await t.commit();

  } catch (error) {
    await t.rollback();
    console.error(error);
    handleError(error, res, 'creating autogenerate archs');
  }
}


const verifyApi = async (req, res) => {
  const { guid } = req.query;

  try {
    const result = await tbl_archs.findOne({
      where: { arch_guid: guid }
    })

    handlePostPutDelMtdRes(result, 'verify success', 'verify success', res)
  } catch (error) {
    handleError(error, res, 'getting edit for data')
  }

}

module.exports = {
  verifyApi,
  autoGenerate,
  getArchsForSector,
  getAllArchs,
  addArch,
  updateArch,
  deleteArchs,
};