const { tbl_tracks, sequelize } = require('../models');
const { hdlGetMtdResNoCont, handlePostPutDelMtdRes, handleError } = require('../scripts/helpers/generalHelpers');

// Get tracks
const getAllTracks = async (req, res) => {
  try {
    const tracks = await tbl_tracks.findAll({
      order: [['track_number', 'ASC']],
    });

    hdlGetMtdResNoCont(tracks, 'Tracks retrieved successfully.', res);
  } catch (error) {
    handleError(error, res, 'retrieving the tracks');
  };
};

// Add track
const addTrack = async (req, res) => {
  const {
    track_guid,
    track_name,
    track_desc,
    track_params,
    track_length,
    track_seedlings,
    track_is_enabled
  } = req.body;

  try {
    const newTrack = await tbl_tracks.create({
      track_guid,
      track_name,
      track_desc,
      track_params,
      track_length,
      track_seedlings,
      track_is_enabled,
      modified_dt: new Date(),
    });

    handlePostPutDelMtdRes(
      newTrack,
      'Track successfully created.',
      'Track creation failed.',
      res,
    );
  } catch (error) {
    handleError(error, res, 'creating the track');
  };
};

// Update track
const updateTrack = async (req, res) => {
  const t = await sequelize.transaction()
  const {
    track_guid,
    track_name,
    track_desc,
    track_params,
    track_length,
    track_seedlings,
    track_is_enabled
  } = req.body;

  try {
    const [updatedTrack] = await tbl_tracks.update({
      track_guid,
      track_name,
      track_desc,
      track_params,
      track_length,
      track_seedlings,
      track_is_enabled,
      modified_dt: new Date(),
    }, {
      where: { track_guid },
      transaction: t
    });

    if (updatedTrack > 0) {
      await tbl_tracks.increment('update_count', { by: 1, where: { track_guid }, transaction: t });
    }

    await t.commit()

    const getFullRes = await tbl_tracks.findOne({
      where: { track_guid: track_guid }
    })

    handlePostPutDelMtdRes(getFullRes, 'Track successfully updated.', 'Track update failed.', res);
  } catch (error) {
    await t.commit()
    handleError(error, res, 'updating the track');
  };
};

// Delete tracks
const deleteTracks = async (req, res) => {
  const { track_guids } = req.body;

  try {
    const result = await tbl_tracks.destroy({
      where: { track_guid: track_guids }
    });

    handlePostPutDelMtdRes(result, 'Tracks successfully deleted.', 'No tracks found to delete.', res);
  } catch (error) {
    handleError(error, res, 'deleting the tracks');
  };
};

const verifyApi = async (req, res) => {
  const { guid } = req.query;

  try {
    const result = await tbl_tracks.findOne({
      where: { track_guid: guid }
    })

    handlePostPutDelMtdRes(result, 'verify success', 'verify success', res)
  } catch (error) {
    handleError(error, res, 'getting edit for data')
  }
}

module.exports = {
  verifyApi,
  getAllTracks,
  addTrack,
  updateTrack,
  deleteTracks,
};