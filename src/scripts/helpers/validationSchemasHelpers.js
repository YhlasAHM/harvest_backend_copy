const joi = require('joi');

const objWithLangsReq =
  joi.object({
    ru: joi.string().required(),
    tk: joi.string().required()
  })
    .required()
    .messages({
      "object.base": "{#label} is not applicable.",
      "any.required": "{#label} required.",
    });

const Joi = require('joi');

const numeric18_4Schema = Joi.number()
  .precision(4)
  .custom((value, helpers) => {
    const valueAsString = Math.abs(value).toString();
    const [integerPart, decimalPart] = valueAsString.split('.');
    const integerLength = integerPart ? integerPart.length : 0;
    const decimalLength = decimalPart ? decimalPart.length : 0;
    const totalDigits = integerLength + decimalLength;

    if (totalDigits > 18) {
      return helpers.error('number.totalDigitsExceeded', { limit: 18 });
    }
    return value;
  }, 'Numeric(18,4) Type Validation').required()
  .messages({
    'number.base': 'Value must be a number.',
    'number.precision': 'Must contain a maximum of {#limit} decimal places after the comma.',
    'number.totalDigitsExceeded': 'Must contain a maximum of {#limit} total digits (including digits before and after the comma).',
    'any.required': 'Value is required.'
  });

const numeric18_4SchemaOpt = Joi.number()
  .precision(4)
  .custom((value, helpers) => {
    const valueAsString = Math.abs(value).toString();
    const [integerPart, decimalPart] = valueAsString.split('.');
    const integerLength = integerPart ? integerPart.length : 0;
    const decimalLength = decimalPart ? decimalPart.length : 0;
    const totalDigits = integerLength + decimalLength;

    if (totalDigits > 18) {
      return helpers.error('number.totalDigitsExceeded', { limit: 18 });
    }
    return value;
  }, 'Numeric(18,4) Type Validation')
  .optional().allow(null).messages({
    'number.base': 'Value must be a number.',
    'number.precision': 'Must contain a maximum of {#limit} decimal places after the comma.',
    'number.totalDigitsExceeded': 'Must contain a maximum of {#limit} total digits (including digits before and after the comma).',
  });

const objWithLangsOpt = joi.object({
  ru: joi.string().allow('').optional(),
  tk: joi.string().allow('').optional(),
})
  .allow(null)
  .optional();

// object optional
const objOpt = joi.object().optional();

// Object optional allow null
const objOptAlwNull = joi.object().allow(null).optional();

// uuid required
const uuidReq =
  joi.string().uuid().required().messages({
    "string.base": "{#label} must be a string.",
    "string.empty": "{#label} should not be empty.",
    "any.required": "{#label} is required.",
    "string.guid": "{#label} must be a valid UUID.",
  });

// uuid optional
const uuidOpt =
  joi.string().uuid().optional().allow(null).messages({
    "string.base": "{#label} must be a string.",
    "string.empty": "{#label} should not be empty.",
    "string.guid": "{#label} must be a valid UUID.",
  });

// string required
const strReq =
  joi.string().required().messages({
    "string.base": "{#label} is not applicable.",
    "string.empty": "{#label} should not be empty.",
    "any.required": "{#label} required.",
  });

// string optional
const strOpt = joi.string().allow('').optional();


const barcode_val = joi.array().items(strReq).min(1).required().messages({
  "string.base": "{#label} is not applicable.",
  "string.empty": "{#label} should not be empty.",
  "any.required": "{#label} required.",
});

// string max 100 required
const strMax100Req = joi.string().max(100).required().messages({
  "string.base": "{#label} must be a string.",
  "string.empty": "{#label} should not be empty.",
  "string.max": "{#label} should not exceed {#limit} characters.",
  "any.required": "{#label} is required.",
})

// string max 100 optional
const strMax100Opt =
  joi.string().max(100).optional().messages({
    "string.base": "{#label} must be a string.",
    "string.empty": "{#label} should not be empty.",
    "string.max": "{#label} should not exceed {#limit} characters.",
  });

// number required
const numReq =
  joi.number().required().messages({
    "number.base": "{#label} is not applicable.",
    "number.empty": "{#label} should not be empty.",
    "any.required": "{#label} required.",
  });

// number optional
const numOpt = joi.number().optional();

// Number optional allow null
const numOptAlwNull = joi.number().allow(null).optional();


const objArray = joi.array().items(joi.object())

// date required
const dateReq =
  joi.date().required().messages({
    "date.base": "{#label} is not applicable.",
    "date.empty": "{#label} should not be empty.",
    "any.required": "{#label} required.",
  })


// date optional
const dateOpt = joi.date().optional();

// Boolean required
const boolReq = joi.boolean().required();

// boolean optional
const boolOpt = joi.boolean().optional();

// array required
const arrReq =
  joi.array().items(uuidReq).min(1).required().messages({
    "array.base": "{#label} must be an array.",
    "array.min": "At least one element is required.",
    "any.required": "{#label} is required."
  });


/* id required */

const arrIdReq =
  joi.array().items(joi.number()).min(1).required().messages({
    "array.base": "{#label} must be an array.",
    "array.min": "At least one element is required.",
    "any.required": "{#label} is required."
  });

// Username
const userName = joi
  .string()
  .required()
  .min(3)
  .max(30)
  .pattern(/^[a-z0-9_-]+$/)
  .messages({
    "string.base": "{#label} is not applicable.",
    "string.empty": "{#label} should not be empty.",
    "string.min": "{#label} should be at least {#limit} characters.",
    "string.max": "{#label} should not exceed {#limit} characters.",
    "string.pattern.base": "{#label} may only contain lowercase letters, digits, underscores (_), and hyphens (-).",
    "any.required": "{#label} required.",
  });

// User password
const userPassword = joi
  .string()
  .required()
  .min(3)
  .max(20)
  .messages({
    "string.base": "{#label} is not applicable.",
    "string.empty": "{#label} should not be empty.",
    "string.min": "{#label} should be at least {#limit} characters.",
    "string.max": "{#label} should not exceed {#limit} characters.",
    "any.required": "{#label} required.",
  });


const timeReq = joi
  .string()
  .pattern(/^([0-1][0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/) // HH:mm veya HH:mm:ss
  .required()
  .messages({
    "string.pattern.base": "{#label} must be in HH:mm or HH:mm:ss format.",
    "string.base": "{#label} must be a string.",
    "string.empty": "{#label} should not be empty.",
    "any.required": "{#label} is required.",
  });


module.exports = {
  timeReq,
  objArray,
  objWithLangsReq,
  strReq,
  numReq,
  objOpt,
  objOptAlwNull,
  numeric18_4SchemaOpt,
  dateOpt,
  uuidReq,
  boolOpt,
  uuidOpt,
  barcode_val,
  strOpt,
  objWithLangsOpt,
  dateReq,
  strMax100Opt,
  numOpt,
  strMax100Req,
  numeric18_4Schema,
  arrReq,
  numOptAlwNull,
  userName,
  arrIdReq,
  userPassword,
  boolReq,
};