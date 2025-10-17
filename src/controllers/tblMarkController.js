const { tbl_marks, sequelize } = require('../models');
const {
    hdlGetMtdResNoCont,
    handlePostPutDelMtdRes,
    handleError,
} = require('../scripts/helpers/generalHelpers');


const getAllMarks = async (req, res) => {
    try {
        const marks = await tbl_marks.findAll();

        hdlGetMtdResNoCont(marks, 'marks retrieved successfully.', res);
    } catch (error) {
        handleError(error, res, 'retrieving the marks');
    }
};


const addMark = async (req, res) => {
    const { mark_name, is_marked_enabled } = req.body;

    try {
        const newMark = await tbl_marks.create({
            mark_name, is_marked_enabled
        });

        handlePostPutDelMtdRes(
            newMark,
            'marks successfully created.',
            'marks creation failed.',
            res
        );
    } catch (error) {
        handleError(error, res, 'creating the marks');
    }
};


const updateMark = async (req, res) => {
    const t = await sequelize.transaction()
    const { mark_guid, mark_name, is_marked_enabled } = req.body;

    try {
        const [updatedMark] = await tbl_marks.update(
            {
                mark_name, is_marked_enabled
            },
            {
                where: { mark_guid },
                transaction: t
            }
        );

        if (updatedMark > 0) {
            await tbl_marks.increment('update_count', { by: 1, where: { mark_guid }, transaction: t });
        }

        await t.commit()

        const getFullRes = await tbl_marks.findOne({
            where: { mark_guid: mark_guid }
        })

        handlePostPutDelMtdRes(
            getFullRes,
            'Mark successfully updated.',
            'Mark update failed.',
            res
        );
    } catch (error) {
        await t.rollback()
        handleError(error, res, 'updating the Mark');
    }
};

const deleteMarks = async (req, res) => {
    const { mark_guids } = req.body;

    try {
        const result = await tbl_marks.destroy({
            where: { mark_guid: mark_guids },
        });

        handlePostPutDelMtdRes(
            result,
            'Mark successfully deleted.',
            'No mark found to delete.',
            res
        );
    } catch (error) {
        handleError(error, res, 'deleting the mark');
    }
};

const verifyApi = async (req, res) => {
    const { guid } = req.query;

    try {
        const result = await tbl_marks.findOne({
            where: { mark_guid: guid }
        })

        handlePostPutDelMtdRes(result, 'verify success', 'verify success', res)
    } catch (error) {
        handleError(error, res, 'getting edit for data')
    }

}


module.exports = {
    verifyApi,
    getAllMarks, addMark, deleteMarks, updateMark
};