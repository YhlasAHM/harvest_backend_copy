const { where } = require('sequelize');
const { tbl_categories, tbl_groups, sequelize } = require('../models');
const {
    hdlGetMtdResNoCont,
    handlePostPutDelMtdRes,
    handleError,
} = require('../scripts/helpers/generalHelpers');

const getAllCategories = async (req, res) => {
    try {
        const categories = await tbl_categories.findAll({
            include: [{
                model: tbl_groups,
                as: 'tbl_groups',
                attributes: ['group_name']
            }]
        });

        hdlGetMtdResNoCont(categories, 'categories retrieved successfully.', res);
    } catch (error) {
        handleError(error, res, 'retrieving the categories');
    }
};

const addCategory = async (req, res) => {
    const t = await sequelize.transaction()
    const { group_guid, group_name, is_category_enabled, index_number, category_name } = req.body;

    try {
        const newCategory = await tbl_categories.create({
            group_guid, group_name, is_category_enabled, index_number, category_name, modified_dt: new Date()
        }, { transaction: t });

        if (newCategory) {

            const ress1 = await tbl_categories.findOne({
                where: { category_guid: newCategory.category_guid },
                transaction: t,
                include: [{
                    model: tbl_groups,
                    as: 'tbl_groups',
                    attributes: ['group_name']
                }]
            })

            await t.commit()

            handlePostPutDelMtdRes(
                ress1,
                'categories successfully created.',
                'categories creation failed.',
                res
            );
        } else {
            await t.rollback()
        }
    } catch (error) {
        await t.rollback()
        handleError(error, res, 'creating the categories');
    }
};

const updateCategory = async (req, res) => {
    const t = await sequelize.transaction()
    const { category_guid, group_guid, group_name, is_category_enabled, category_name } = req.body;

    try {
        const [updatedCategory] = await tbl_categories.update(
            {
                group_guid, group_name, is_category_enabled, category_name, modified_dt: new Date()
            },
            {
                where: { category_guid },
                transaction: t
            }
        );


        if (updatedCategory > 0) {
            await tbl_categories.increment('update_count', { by: 1, where: { category_guid }, transaction: t });
        } else {
            await t.rollback()
        }

        await t.commit()

        const getFullRes = await tbl_categories.findOne({
            where: { category_guid: category_guid },
            include: [{
                model: tbl_groups,
                as: 'tbl_groups',
                attributes: ['group_name']
            }]
        })

        handlePostPutDelMtdRes(
            getFullRes,
            'categories successfully updated.',
            'categories update failed.',
            res
        );
    } catch (error) {
        await t.rollback()
        handleError(error, res, 'updating the categories');
    }
};

const deleteCategory = async (req, res) => {
    const { category_guids } = req.body;

    try {
        const result = await tbl_categories.destroy({
            where: { category_guid: category_guids },
        });

        handlePostPutDelMtdRes(
            result,
            'categories successfully deleted.',
            'No categories found to delete.',
            res
        );
    } catch (error) {
        handleError(error, res, 'deleting the categories');
    }
};


const verifyApi = async (req, res) => {
    const { guid } = req.query;

    try {
        const result = await tbl_categories.findOne({
            where: { category_guid: guid }
        })

        handlePostPutDelMtdRes(result, 'verify success', 'verify success', res)
    } catch (error) {
        handleError(error, res, 'getting edit for data')
    }

}

module.exports = {
    verifyApi,
    getAllCategories,
    updateCategory,
    deleteCategory,
    addCategory
};