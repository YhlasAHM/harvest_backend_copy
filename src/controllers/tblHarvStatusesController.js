const { Op } = require('sequelize');
const { tbl_harv_statuses, sequelize } = require('../models');
const {
    hdlGetMtdResNoCont,
    handlePostPutDelMtdRes,
    handleError,
} = require('../scripts/helpers/generalHelpers');


const getAllHarvStatuses = async (req, res) => {
    try {
        const harv_statuses = await tbl_harv_statuses.findAll({
            order: [
                ['harv_status_id', 'ASC'],
            ],
        });

        hdlGetMtdResNoCont(harv_statuses, 'harvStatuses retrieved successfully.', res);
    } catch (error) {
        handleError(error, res, 'retrieving the harvStatuses');
    }
};

const getInitHarvStatus = async (req, res) => {
    try {
        const minId = await tbl_harv_statuses.min('harv_status_id');

        const minStatus = await tbl_harv_statuses.findOne({
            where: {
                harv_status_id: minId
            }
        });

        if (!minStatus) {
            hdlGetMtdResNoCont(null, 'No minStatus found.', res);
            return;
        }
        handlePostPutDelMtdRes(
            minStatus,
            'harvStatuses successfully created.',
            'harvStatuses creation failed.',
            res
        );
    } catch (error) {
        handleError(error, res, 'retrieving the minStatus');
    }
};


const getNotInitHarvStatus = async (req, res) => {
    try {
        const minId = await tbl_harv_statuses.min('harv_status_id');

        const notInitStatus = await tbl_harv_statuses.findAll({
            where: {
                harv_status_id: {
                    [Op.gt]: minId,
                }
            }
        });

        handlePostPutDelMtdRes(
            notInitStatus,
            'harvStatuses successfully created.',
            'harvStatuses creation failed.',
            res
        );
    } catch (error) {
        handleError(error, res, 'retrieving the notInitStatuses');
    }
};


const addHarvStatus = async (req, res) => {
    const { harv_status_name, is_allow_edit, is_allow_delete } = req.body;

    try {
        const newHarvStatuses = await tbl_harv_statuses.create({
            harv_status_name, is_allow_edit, is_allow_delete
        });

        handlePostPutDelMtdRes(
            newHarvStatuses,
            'harvStatuses successfully created.',
            'harvStatuses creation failed.',
            res
        );
    } catch (error) {
        handleError(error, res, 'creating the harvStatuses');
    }
};


const updateHarvStatus = async (req, res) => {

    const t = await sequelize.transaction()
    const { harv_status_id, harv_status_name, is_allow_edit, is_allow_delete } = req.body;

    try {

        const minId = await tbl_harv_statuses.min('harv_status_id');
        if (harv_status_id === minId && is_allow_edit === false) {
            return res.status(409).json({
                message: 'Ilkinji ýagdaýyň diňe adyny üýtgedip bilersiňiz!'
            });
        }

        const [updatedHarvStasus] = await tbl_harv_statuses.update(
            {
                harv_status_id, harv_status_name, is_allow_edit, is_allow_delete
            },
            { where: { harv_status_id }, transaction: t }
        );
        if (updatedHarvStasus > 0) {
            await tbl_harv_statuses.increment('update_count', { by: 1, where: { harv_status_id }, transaction: t });
        }

        await t.commit()

        const getFullRes = await tbl_harv_statuses.findOne({
            where: { harv_status_id: harv_status_id }
        })

        handlePostPutDelMtdRes(
            getFullRes,
            'harvStatuses successfully updated.',
            'harvStatuses update failed.',
            res
        );
    } catch (error) {
        await t.rollback()
        handleError(error, res, 'updating the Mark');
    }
};

const deleteHarvStatuses = async (req, res) => {
    const { harv_status_ids } = req.body;

    try {
        const result = await tbl_harv_statuses.destroy({
            where: { harv_status_id: harv_status_ids },
        });

        handlePostPutDelMtdRes(
            result,
            'harvStatuses successfully deleted.',
            'No harvStatuses found to delete.',
            res
        );
    } catch (error) {
        handleError(error, res, 'deleting the harvStatuses');
    }
};

const verifyApi = async (req, res) => {
    const { id } = req.query;

    try {
        const result = await tbl_harv_statuses.findOne({
            where: { harv_status_id: id }
        })

        handlePostPutDelMtdRes(result, 'verify success', 'verify success', res)
    } catch (error) {
        handleError(error, res, 'getting edit for data')
    }

}

module.exports = {
    verifyApi,
    getAllHarvStatuses, addHarvStatus, updateHarvStatus, deleteHarvStatuses, getInitHarvStatus, getNotInitHarvStatus
};