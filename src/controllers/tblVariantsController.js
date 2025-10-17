const { where } = require('sequelize');
const { tbl_variants, tbl_categories, tbl_materials, sequelize } = require('../models');
const {
    hdlGetMtdResNoCont,
    handlePostPutDelMtdRes,
    handleError
} = require('../scripts/helpers/generalHelpers');


const getAllVariants = async (req, res) => {
    try {
        const variants = await tbl_variants.findAll({
            include: [
                {
                    model: tbl_categories,
                    as: 'tbl_categories',
                    attributes: ["category_name"]
                },
                {
                    model: tbl_materials,
                    as: 'tbl_materials',
                    attributes: ["mtrl_name"]
                },
            ]
        });

        hdlGetMtdResNoCont(variants, 'variants retrieved successfully.', res);
    } catch (error) {
        handleError(error, res, 'retrieving the variants');
    };
};


const addVariant = async (req, res) => {
    const { variant_name, category_guid, material_guid, is_variant_enabled, index_number } = req.body;

    try {
        const newVariant = await tbl_variants.create({
            variant_name, category_guid, material_guid, is_variant_enabled, index_number, modified_dt: new Date()
        });

        if (newVariant) {
            const res1 = await tbl_variants.findOne({
                where: {
                    variant_guid: newVariant.variant_guid
                },
                include: [
                    {
                        model: tbl_categories,
                        as: 'tbl_categories',
                        attributes: ['category_name']
                    },
                    {
                        model: tbl_materials,
                        as: 'tbl_materials',
                        attributes: ['mtrl_name']
                    },
                ]
            })
            handlePostPutDelMtdRes(res1, 'variants successfully created.', 'supplier creation failed.', res);
        }

    } catch (error) {
        handleError(error, res, 'creating the variants');
    };
};


const updateVariant = async (req, res) => {
    const t = await sequelize.transaction()
    const { variant_guid, variant_name, category_guid, material_guid, is_variant_enabled, index_number } = req.body;

    try {
        const [updatedVariant] = await tbl_variants.update(
            {
                variant_name, category_guid, material_guid, is_variant_enabled, index_number, modified_dt: new Date()
            },
            {
                where: { variant_guid },
                transaction: t
            }
        );

        if (updatedVariant > 0) {
            await tbl_variants.increment('update_count', { by: 1, where: { variant_guid }, transaction: t });
        }

        await t.commit()

        const getFullRes = await tbl_variants.findOne({
            where: { variant_guid: variant_guid },
            include: [
                {
                    model: tbl_categories,
                    as: 'tbl_categories',
                    attributes: ['category_name']
                },
                {
                    model: tbl_materials,
                    as: 'tbl_materials',
                    attributes: ['mtrl_name']
                },
            ]
        })

        handlePostPutDelMtdRes(getFullRes, 'variants successfully updated.', 'variants update failed.', res);
    } catch (error) {
        await t.rollback()
        handleError(error, res, 'updating the variants');
    }
};

const deleteVariant = async (req, res) => {
    const { variant_guids } = req.body;

    try {
        const deletingResult = await tbl_variants.destroy({
            where: { variant_guid: variant_guids },
        });

        handlePostPutDelMtdRes(deletingResult, 'variants successfully deleted.', 'variants was not found.', res);
    } catch (error) {
        handleError(error, res, 'deleting the variants');
    };
};


const verifyApi = async (req, res) => {
    const { guid } = req.query;

    try {
        const result = await tbl_variants.findOne({
            where: { variant_guid: guid }
        })

        handlePostPutDelMtdRes(result, 'verify success', 'verify success', res)
    } catch (error) {
        handleError(error, res, 'getting edit for data')
    }

}


module.exports = {
    verifyApi,
    getAllVariants,
    addVariant, deleteVariant, updateVariant
};