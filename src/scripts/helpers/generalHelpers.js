// const { stringify } = require('lossless-json');
const httpSts = require('./static');

// Send response
function resSend(res, http_sts, get_msg, get_obj) {
  const send_obj = {
    data: checkObjForNull(get_obj),
    message: checkObjForNull(get_msg)
  };

  res.status(http_sts).json(send_obj);
};

// Check object for null
function checkObjForNull(object) {
  return `${object}` !== "null" ? object : "";
};

// Check array existing and length
function checkArrExstAndLength(array) {
  return array && array.length > 0 ? array : null;
};

// Handle get method response
function handleGetMtdRes(result, success_msg, error_msg, res) {
  if (checkArrExstAndLength(result)) {
    return resSend(res, httpSts.success, success_msg, result);
  } else {
    return resSend(res, httpSts.noContent, error_msg, null);
  };
};

// Handle get method response no content
function hdlGetMtdResNoCont(result, success_msg, res) {
  if (checkArrExstAndLength(result)) {
    return resSend(res, httpSts.success, success_msg, result);
  } else {
    return resSend(res, httpSts.noContent);
  };
};

// Handle post put delete methods response
function handlePostPutDelMtdRes(result, success_msg, error_msg, res) {
  if (result) {
    return resSend(res, httpSts.success, success_msg, result);
  } else {
    return resSend(res, httpSts.badRequest, error_msg, null);
  };
};

// Handle server error message
function hdlServErrMsg(element) {
  return element ? `Server error occured while retrieving the ${element}` : '';
};

// Handle error
function handleError(error, res, text) {
  console.error(`Error occured while ${text}: `, error);
  return resSend(
    res,
    httpSts.serverError,
    `Server error occurred while ${text}.`,
    null,
  );
};

module.exports = {
  resSend,
  handleGetMtdRes,
  handlePostPutDelMtdRes,
  checkObjForNull,
  hdlGetMtdResNoCont,
  hdlServErrMsg,
  handleError,
};