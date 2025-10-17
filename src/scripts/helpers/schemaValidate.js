const { checkObjForNull } = require('../../scripts/helpers/generalHelpers')

// Validate body
const validateBody = schema => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    const send_obj = {
      message: checkObjForNull(error.details[0].message),
    };

    return res.status(400).json(send_obj);
  };
  return next();
};

// Validate params
const validateParams = schema => (req, res, next) => {
  const { error } = schema.validate(req.params)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  return next()
};

// Validate queries
const validateQueries = schema => (req, res, next) => {
  const { error } = schema.validate(req.query)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  return next()
};

module.exports = {
  validateBody,
  validateParams,
  validateQueries,
};