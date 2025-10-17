const joi = require('joi');
const {
  objWithLangsReq,
  objOpt,
  objOptAlwNull,
  uuidReq,
  dateOpt,
  arrReq,
  numOptAlwNull,
  numReq,
} = require('../helpers/validationSchemasHelpers');

const addTrackSchema = joi.object({
  track_name: objWithLangsReq,
  track_desc: objOptAlwNull,
  track_length: numOptAlwNull,
  track_params: objOptAlwNull,
  track_seedlings: numReq,
  track_is_enabled: objOptAlwNull,
});

const updateTrackSchema = joi.object({
  track_guid: uuidReq,
  track_name: objWithLangsReq,
  track_desc: objOptAlwNull,
  track_length: numOptAlwNull,
  track_params: objOpt,
  track_seedlings: numReq,
  track_is_enabled: objOptAlwNull
});

const deleteTracksSchema = joi.object({
  track_guids: arrReq,
});

module.exports = {
  addTrackSchema,
  updateTrackSchema,
  deleteTracksSchema,
};