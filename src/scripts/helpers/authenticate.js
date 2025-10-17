const jwt = require('jsonwebtoken');
const env = require('../../config');
const { resSend } = require('../helpers/generalHelpers');
const httpSts = require('./static');

const authenticate = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return resSend(res, httpSts.unAuthorized, null, null);
  };

  const accessToken = auth.split(' ')[1];

  jwt.verify(accessToken, env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return resSend(res, httpSts.unAuthorized, null, null);
    };

    req.user = user;

    next();
  });
};

module.exports = { authenticate };