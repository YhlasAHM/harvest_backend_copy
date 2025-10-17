const { tbl_harv_agronomists } = require('../models');
const { resSend, handleGetMtdRes, handlePostPutDelMtdRes, handleError } = require('../scripts/helpers/generalHelpers');
const httpSts = require('../scripts/helpers/static');

// Get agronomists
const getAllAgronomists = async (req, res) => {
  try {
    const agronomists = await tbl_harv_agronomists.findAll();

    handleGetMtdRes(agronomists, 'Agronomists retrieved successfully.', 'No agronomists found.', res);
  } catch (error) {
    handleError(error, res, 'retrieving the agronomists');
  };
};

// Add agronomist
const addAgronomist = async (req, res) => {
  const { harvest_guid, agronome_guid } = req.body;

  try {
    const newAgronomist = await tbl_harv_agronomists.create({
      harvest_guid,
      agronome_guid,
    });

    handlePostPutDelMtdRes(newAgronomist, 'Agronomist successfully created.', 'Agronomist creation failed.', res);
  } catch (error) {
    handleError(error, res, 'creating the agronomist');
  }
};

// Update agronomist
const updateAgronomist = async (req, res) => {
  const { harv_empl_guid, harvest_guid, agronome_guid } = req.body;

  try {
    const [updatedAgronomist] = await tbl_harv_agronomists.update({
      harvest_guid,
      agronome_guid,
    }, {
      where: { harv_empl_guid },
    });

    handlePostPutDelMtdRes(updatedAgronomist, 'Agronomist successfully updated.', 'Agronomist update failed.', res);
  } catch (error) {
    handleError(error, res, 'updating the agronomist');
  };
};

// Delete agronomists
const deleteAgronomists = async (req, res) => {
  const { harv_empl_guids } = req.body;

  try {
    const deletedAgronomist = await tbl_harv_agronomists.destroy({
      where: { harv_empl_guid: harv_empl_guids },
    });

    handlePostPutDelMtdRes(deletedAgronomist, 'Agronomist successfully deleted.', 'Agronomist deletion failed.', res);
  } catch (error) {
    handleError(error, res, 'deleting the agronomists');
  };
};

module.exports = {
  getAllAgronomists,
  addAgronomist,
  updateAgronomist,
  deleteAgronomists,
};