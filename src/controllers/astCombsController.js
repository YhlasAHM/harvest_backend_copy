const { tbl_ast_combs } = require('../models');
const { resSend, handlePostPutDelMtdRes, handleError, hdlGetMtdResNoCont } = require('../scripts/helpers/generalHelpers');
const httpSts = require('../scripts/helpers/static');


const getAllAstCombs = async (req, res) => {
  try {
    const ast_combs = await tbl_ast_combs.findAll();

    hdlGetMtdResNoCont(ast_combs, 'ast_combs retrieved successfully.', res);
  } catch (error) {
    handleError(error, res, 'retrieving the ast_combs');
  };
};


const addAstComb = async (req, res) => {
  const { arch_guid, stand_guid, track_guid } = req.body;

  try {
    const newAstComb = await tbl_ast_combs.create({
      arch_guid,
      stand_guid,
      track_guid,
      modified_dt: new Date(),
    });

    handlePostPutDelMtdRes(newAstComb, 'AstComb successfully created.', 'AstComb creation failed.', res);
  } catch (error) {
    console.error('Error: ', error);
    return resSend(res, httpSts.serverError, 'Server error occurred while creating the AstComb.', null);
  }
};


const updateAstCombs = async (req, res) => {
  const t = await sequelize.transaction();

  const { ast_guid, arch_guid, stand_guid, track_guid } = req.body;

  try {
    const [updatedAstCombs] = await tbl_ast_combs.update({
      arch_guid, stand_guid, track_guid,
      modified_dt: new Date(),
    }, {
      where: { ast_guid },
      transaction: t
    });

    if (updatedAstCombs > 0) {
      await tbl_ast_combs.increment('update_count', { by: 1, where: { ast_guid }, transaction: t });
    }

    await t.commit();

    const getFullRes = await tbl_ast_combs.findOne({
      where: { ast_guid }
    })

    handlePostPutDelMtdRes(getFullRes, 'ast_combs successfully updated.', 'ast_combs update failed.', res);
  } catch (error) {
    await t.rollback();
    handleError(error, res, 'updating the ast_combs');
  }
};

const deleteAstCombs = async (req, res) => {
  const { ast_guids } = req.body;

  try {
    const deletingResult = await tbl_ast_combs.destroy({
      where: { ast_guid: ast_guids }
    });

    handlePostPutDelMtdRes(deletingResult, 'ast_combs successfully deleted.', 'Deleting of ast_combs failed.', res);
  } catch (error) {
    handleError(error, res, 'ast_combs the attributes');
  };
};


const verifyApi = async (req, res) => {
  const { guid } = req.params;

  try {
    const result = await tbl_ast_combs.findOne({
      where: { ast_guid: guid }
    })

    handlePostPutDelMtdRes(result, 'verify success', 'verify success', res)
  } catch (error) {
    handleError(error, res, 'getting edit for data')
  }

}


module.exports = {
  verifyApi,
  addAstComb,
  getAllAstCombs,
  updateAstCombs,
  deleteAstCombs
};