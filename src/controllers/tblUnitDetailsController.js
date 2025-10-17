const { tbl_unit_details, sequelize } = require('../models');
const {
    hdlGetMtdResNoCont,
    handlePostPutDelMtdRes,
    handleError
} = require('../scripts/helpers/generalHelpers');


const getAllUnitDetails = async (req, res) => {
    try {
        const unit_details = await tbl_unit_details.findAll();

        hdlGetMtdResNoCont(unit_details, 'Unit_details retrieved successfully.', res);
    } catch (error) {
        handleError(error, res, 'retrieving the Unit_details');
    };
};


const addUnitDetail = async (req, res) => {
    const { unit_guid, unit_det_name, unit_det_numerator, unit_det_denominator } = req.body;

    try {
        const newUnitDetail = await tbl_unit_details.create({
            unit_guid, unit_det_name, unit_det_numerator, unit_det_denominator
        });

        handlePostPutDelMtdRes(newUnitDetail, 'UnitDetail successfully created.', 'UnitDetail creation failed.', res);
    } catch (error) {
        handleError(error, res, 'creating the UnitDetail');
    };
};


const updateUnitDetail = async (req, res) => {
    const t = await sequelize.transaction()
    const { unit_det_guid, unit_guid, unit_det_name, unit_det_numerator, unit_det_denominator } = req.body;

    try {
        const [updatedUnitDetail] = await tbl_unit_details.update(
            {
                unit_det_guid, unit_guid, unit_det_name, unit_det_numerator, unit_det_denominator
            },
            {
                where: { unit_det_guid },
                transaction: t
            }
        );

        if (updatedUnitDetail > 0) {
            await tbl_unit_details.increment('update_count', { by: 1, where: { unit_det_guid }, transaction: t });
        }

        await t.commit()

        const getFullRes = await tbl_unit_details.findOne({
            where: { unit_det_guid: unit_det_guid }
        })

        handlePostPutDelMtdRes(getFullRes, 'UnitDetail successfully updated.', 'UnitDetail update failed.', res);
    } catch (error) {
        await t.rollback()
        handleError(error, res, 'updating the UnitDetail');
    }
};


const deleteUnitDetail = async (req, res) => {
    const { unit_det_guids } = req.body;

    try {
        const deletingResult = await tbl_unit_details.destroy({
            where: { unit_det_guid: unit_det_guids },
        });

        handlePostPutDelMtdRes(deletingResult, 'unit_det_guids successfully deleted.', 'unit_det_guids was not found.', res);
    } catch (error) {
        handleError(error, res, 'deleting the unit_det_guids');
    };
};

const verifyApi = async (req, res) => {
    const { guid } = req.query;

    try {
        const result = await tbl_unit_details.findOne({
            where: { unit_det_guid: guid }
        })

        handlePostPutDelMtdRes(result, 'verify success', 'verify success', res)
    } catch (error) {
        handleError(error, res, 'getting edit for data')
    }

}

module.exports = {
    verifyApi,
    getAllUnitDetails,
    addUnitDetail,
    updateUnitDetail,
    deleteUnitDetail
};