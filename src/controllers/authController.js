const { tbl_users } = require('../models');
const {
  generateAccessToken,
  generateRefreshToken,
  comparePasswords,
  verifyRefreshToken,
} = require('../scripts/helpers/authHelpers');
const {
  handleError,
  resSend,
} = require('../scripts/helpers/generalHelpers');
const http_sts = require('../scripts/helpers/static');

// Register
const register = async (req, res) => {
  const { user_name, user_password, user_is_admin } = req.body;

  try {
    const existingUser = await tbl_users.findOne({ where: { user_name } });

    if (existingUser) {
      return resSend(res, http_sts.conflict, 'Username already exists.', null);
    };

    const newUser = await tbl_users.create({
      user_name,
      user_password,
      user_is_admin,
    });

    const userData = {
      user_guid: newUser.user_guid,
      user_is_admin: newUser.user_is_admin,
    };

    const userDataModified = {
      ...userData,
      user_name: newUser.user_name,
    };

    const accessToken = await generateAccessToken(userData);
    const refreshToken = await generateRefreshToken(userData);

    return resSend(res, http_sts.created, 'User successfully registered.', {
      user: userDataModified,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    handleError(error, res, 'registering the user');
  };
};

// Login
const login = async (req, res) => {
  const { user_name, user_password } = req.body;

  try {
    const user = await tbl_users.findOne({ where: { user_name } });

    if (!user) {
      return resSend(res, http_sts.notFound, 'User is not found', null);
    };

    const isValidPassword = await comparePasswords(
      user_password,
      user.user_guid,
      user.user_password,
    );

    if (!isValidPassword) {
      return resSend(res, http_sts.unAuthorized, 'Password is not correct', null);
    };

    const userDataForToken = {
      user_guid: user.user_guid,
      user_is_admin: user.user_is_admin,
    };

    const userData = {
      user_guid: user.user_guid,
      user_name: user.user_name,
    };

    const accessToken = await generateAccessToken(userDataForToken);
    const refreshToken = await generateRefreshToken(userDataForToken);

    return resSend(res, http_sts.success, 'User successfully logged in.', {
      user: userData,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    handleError(error, res, 'logging in the user');
  };
};

// Renew access token
const renewAccessToken = async (req, res) => {
  const authorization = req.headers.authorization;

  try {
    if (!authorization) {
      return resSend(res, http_sts.unAuthorized, null, null);
    };

    const token = authorization.split(' ')[1];

    const isVerified = await verifyRefreshToken(token);

    if (isVerified.accessToken === null) {
      return resSend(res, http_sts.unAuthorized, null, null);
    };

    return resSend(res, http_sts.success, null, isVerified);
  } catch (err) {
    handleError(err, res, 'renewing access token');
  };
};

module.exports = {
  register,
  login,
  renewAccessToken,
};