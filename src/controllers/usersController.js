const { tbl_users, sequelize } = require('../models');
const {
  hdlGetMtdResNoCont,
  handlePostPutDelMtdRes,
  handleError,
  resSend,
} = require('../scripts/helpers/generalHelpers');
const http_sts = require('../scripts/helpers/static');
const { decryptText } = require('../scripts/helpers/crypto');

// Get users
const getAllUsers = async (req, res) => {
  try {
    const users = await tbl_users.findAll({
      order: [['user_number', 'ASC']],
      attributes: { exclude: ['user_password'] },
    });

    // --- Previous logic with decrypted passwords --- //
    // const decryptedUsers = await Promise.all(
    //   users.map(async (user) => {
    //     const userPlain = user.toJSON();
    //     userPlain.user_password = await decryptText(userPlain.user_password, userPlain.user_guid);
    //     return userPlain;
    //   })
    // );

    hdlGetMtdResNoCont(users, 'Users retrieved successfully.', res);
  } catch (error) {
    handleError(error, res, 'retrieving the users');
  }
};

// Add user
const addUser = async (req, res) => {
  const { user_name, user_password, user_is_admin, user_is_login } = req.body;

  try {
    const existingUser = await tbl_users.findOne({ where: { user_name } });

    if (existingUser) {
      return resSend(res, http_sts.conflict, 'Username already exists.', null);
    };

    const newUser = await tbl_users.create({
      user_name,
      user_password,
      user_is_admin,
      user_is_login,
      modified_dt: new Date(),
    });

    handlePostPutDelMtdRes(newUser, 'User successfully created.', 'User creation failed.', res);
  } catch (error) {
    handleError(error, res, 'creating the user');
  };
};

// Update user
const updateUser = async (req, res) => {
  const t = await sequelize.transaction()
  const {
    user_name,
    user_password,
    user_is_admin,
    user_guid,
    user_is_login
  } = req.body;

  try {
    const [updatedUser] = await tbl_users.update(
      {
        user_name,
        user_password,
        user_is_admin,
        user_is_login,
        modified_dt: new Date(),
      },
      {
        where: { user_guid },
        individualHooks: true,
        transaction: t
      },
    );

    if (updatedUser > 0) {
      await tbl_users.increment('update_count', { by: 1, where: { user_guid }, transaction: t });
    }

    await t.commit()

    const getFullRes = await tbl_users.findOne({
      where: { user_guid: user_guid }
    })

    handlePostPutDelMtdRes(getFullRes, 'User successfully updated.', 'User update failed.', res);
  } catch (error) {
    await t.rollback()
    handleError(error, res, 'updating the user');
  };
};

// Delete users
const deleteUsers = async (req, res) => {
  const { user_guids } = req.body;

  try {
    const deletingResult = await tbl_users.destroy({
      where: { user_guid: user_guids },
    });

    handlePostPutDelMtdRes(deletingResult, 'Users successfully deleted.', 'Users were not found.', res);
  } catch (error) {
    handleError(error, res, 'deleting the user');
  };
};

// Send user password
const getUserPassword = async (req, res) => {
  const { user_guid } = req.params;

  try {
    const userPassword = await tbl_users.findOne({
      where: { user_guid },
      attributes: ['user_password'],
    });

    const userPasswordFinal = userPassword?.dataValues?.user_password;
    const userPasswordDecrypted = await decryptText(userPasswordFinal, user_guid);

    resSend(res, http_sts.success, 'User password retrieved successfully.', userPasswordDecrypted);
  } catch (error) {
    handleError(error, res, 'retrieving the user password.');
  }
};

const verifyApi = async (req, res) => {
  const { guid } = req.query;

  try {
    const result = await tbl_users.findOne({
      where: { user_guid: guid }
    })

    handlePostPutDelMtdRes(result, 'verify success', 'verify success', res)
  } catch (error) {
    handleError(error, res, 'getting edit for data')
  }
}


module.exports = {
  verifyApi,
  getAllUsers,
  addUser,
  updateUser,
  deleteUsers,
  getUserPassword,
};