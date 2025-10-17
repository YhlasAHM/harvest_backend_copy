const jwt = require('jsonwebtoken');
const env = require('../../config');
const { decryptText } = require('./crypto');

// Generate access token
const generateAccessToken = async (data) => {
  return jwt.sign(data, env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
};

// Generate refresh token
const generateRefreshToken = async (data) => {
  return jwt.sign(data, env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
};

// Compare passwords
const comparePasswords = async (inputPassword, userGuid, storedEncrPwd) => {
  const decryptedStoredPassword = await decryptText(storedEncrPwd, userGuid);
  return inputPassword === decryptedStoredPassword;
};

// Verify refresh token
const verifyRefreshToken = async (token) => {
  return jwt.verify(token, env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      return {
        accessToken: null
      };
    };

    const accessToken = await generateAccessToken({
      user_guid: decoded.user_guid,
      user_is_admin: decoded.user_is_admin,
    });

    return {
      accessToken
    };
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  comparePasswords,
  verifyRefreshToken,
};