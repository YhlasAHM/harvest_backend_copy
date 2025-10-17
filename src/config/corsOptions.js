const { allowedOrigins } = require('../scripts/helpers/allowedOrigins');

const corsOptions = {
  /* origin(origin, cb) {
    if (!origin) return cb(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const message =
        "The CORS policy for this site does not allow access from the specified Origin.";
      return cb(new Error(message), false);
    }
    return cb(null, true);
  }, */
  credentials: true,
};

module.exports = corsOptions;