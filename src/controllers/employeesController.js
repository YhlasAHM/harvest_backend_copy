const { where } = require('sequelize');
const {
  tbl_employees,
  tbl_professions,
  tbl_users,
  sequelize,
} = require('../models');
const {
  hdlGetMtdResNoCont,
  handlePostPutDelMtdRes,
  handleError,
} = require('../scripts/helpers/generalHelpers');


const getAllEmployees = async (req, res) => {
  const { is_specialist } = req.query;

  try {
    let whereCondition = {};

    if (is_specialist !== undefined) {
      const isSpecialistBoolean = is_specialist === 'true';

      whereCondition.is_specialist = isSpecialistBoolean;
    }

    const employees = await tbl_employees.findAll({
      order: [['empl_number', 'ASC']],
      include: [{
        model: tbl_professions,
        as: 'tbl_professions',
        attributes: ['prof_name'],
      },
      {
        model: tbl_users,
        as: 'tbl_users',
        attributes: ['user_name'],
      },
      ],
      where: whereCondition,
    });

    hdlGetMtdResNoCont(employees, 'Employees retrieved successfully.', res);
  } catch (error) {
    handleError(error, res, 'retrieving the employees');
  }
};

const addEmployee = async (req, res) => {
  const {
    empl_name,
    prof_guid,
    empl_contact,
    user_guid,
    empl_is_enabled,
    is_specialist
  } = req.body;
  try {

    const newEmployee = await tbl_employees.create({
      empl_name,
      prof_guid,
      empl_contact,
      user_guid,
      empl_is_enabled,
      is_specialist,
      modified_dt: new Date(),
    });

    const res1 = await tbl_employees.findOne({
      where: { empl_guid: newEmployee.empl_guid },
      include: [{
        model: tbl_professions,
        as: 'tbl_professions',
        attributes: ['prof_name'],
      },
      {
        model: tbl_users,
        as: 'tbl_users',
        attributes: ['user_name']
      },
      ],
    });

    handlePostPutDelMtdRes(res1, 'Employee successfully created.', 'Employee creation failed.', res);
  } catch (error) {
    handleError(error, res, 'creating the employee');
  }
};

const updateEmployee = async (req, res) => {
  const t = await sequelize.transaction()
  const {
    empl_guid,
    empl_name,
    prof_guid,
    empl_contact,
    user_guid,
    empl_is_enabled,
    is_specialist
  } = req.body;

  try {
    const [updated] = await tbl_employees.update({
      empl_name,
      prof_guid,
      empl_contact,
      user_guid,
      empl_is_enabled,
      is_specialist,
      modified_dt: new Date(),
    }, {
      where: { empl_guid },
      transaction: t
    });


    if (updated > 0) {
      await tbl_employees.increment('update_count', { by: 1, where: { empl_guid }, transaction: t });
    }

    await t.commit()

    const getFullRes = await tbl_employees.findOne({
      where: { empl_guid: empl_guid },
      include: [
        {
          model: tbl_professions,
          as: 'tbl_professions',
          attributes: ['prof_name'],
        },
        {
          model: tbl_users,
          as: 'tbl_users',
          attributes: ['user_name']
        },
      ],
    })

    handlePostPutDelMtdRes(
      getFullRes,
      'Employee successfully updated.',
      'Employee update failed.',
      res,
    );

  } catch (error) {
    await t.rollback()
    handleError(error, res, 'updating the employee');
  }
};

const deleteEmployees = async (req, res) => {
  const { empl_guids } = req.body;

  try {
    const deletedEmployee = await tbl_employees.destroy({
      where: { empl_guid: empl_guids },
    });

    handlePostPutDelMtdRes(deletedEmployee, 'Employees successfully deleted.', 'Employees deletion failed.', res);
  } catch (error) {
    handleError(error, res, 'deleting the employees');
  };
};

const verifyApi = async (req, res) => {
  const { guid } = req.query;

  try {
    const result = await tbl_employees.findOne({
      where: { empl_guid: guid }
    })

    handlePostPutDelMtdRes(result, 'verify success', 'verify success', res)
  } catch (error) {
    handleError(error, res, 'getting edit for data')
  }
}


module.exports = {
  verifyApi,
  getAllEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployees,
};