const { tbl_harv_employees, sequelize } = require('../models');
const {
    hdlGetMtdResNoCont,
    handlePostPutDelMtdRes,
    handleError,
} = require('../scripts/helpers/generalHelpers');


const getAllHarvEmployees = async (req, res) => {
    try {
        const harvEmployees = await tbl_harv_employees.findAll();

        hdlGetMtdResNoCont(harvEmployees, 'harvEmployees retrieved successfully.', res);
    } catch (error) {
        handleError(error, res, 'retrieving the harvEmployees');
    }
};


const addHarvEmployee = async (req, res) => {
    const { harvest_guid, employee_guid, } = req.body;

    try {
        const newHarvEmployee = await tbl_harv_employees.create({
            harvest_guid, employee_guid,
        });

        handlePostPutDelMtdRes(
            newHarvEmployee,
            'harvEmployees successfully created.',
            'harvEmployees creation failed.',
            res
        );
    } catch (error) {
        handleError(error, res, 'creating the harvEmployees');
    }
};


const updateHarvEmployee = async (req, res) => {
    const t = await sequelize.transaction()
    const { harv_empl_guid, harvest_guid, employee_guid, } = req.body;

    try {
        const [updatedHarvEmployee] = await tbl_harv_employees.update(
            {
                harvest_guid, employee_guid,
            },
            {
                where: {
                    harv_empl_guid
                }
                , transaction: t
            }
        );


        if (updatedHarvEmployee > 0) {
            await tbl_harv_employees.increment('update_count', { by: 1, where: { harv_empl_guid }, transaction: t });
        }

        await t.commit()

        const getFullRes = await tbl_harv_employees.findOne({
            where: { harv_empl_guid: harv_empl_guid }
        })

        handlePostPutDelMtdRes(
            getFullRes,
            'HarvEmployee successfully updated.',
            'HarvEmployee update failed.',
            res
        );
    } catch (error) {
        await t.rollback()
        handleError(error, res, 'updating the HarvEmployee');
    }
};


const deleteHarvEmployee = async (req, res) => {
    const { harv_empl_guids } = req.body;

    try {
        const result = await tbl_harv_employees.destroy({
            where: { harv_empl_guid: harv_empl_guids },
        });

        handlePostPutDelMtdRes(
            result,
            'harvEmployees successfully deleted.',
            'No harvEmployees found to delete.',
            res
        );
    } catch (error) {
        handleError(error, res, 'deleting the harvEmployees');
    }
};

const verifyApi = async (req, res) => {
    const { guid } = req.query;

    try {
        const result = await tbl_harv_employees.findOne({
            where: { harv_empl_guid: guid }
        })

        handlePostPutDelMtdRes(result, 'verify success', 'verify success', res)
    } catch (error) {
        handleError(error, res, 'getting edit for data')
    }

}


module.exports = {
    verifyApi,
    getAllHarvEmployees,
    updateHarvEmployee,
    addHarvEmployee,
    deleteHarvEmployee
};