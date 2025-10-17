const { tbl_price_types } = require('../models');
const {
    hdlGetMtdResNoCont,
    handlePostPutDelMtdRes,
    handleError,
} = require('../scripts/helpers/generalHelpers');


const getAllPriceTypes = async (req, res) => {
    try {
        const price_types = await tbl_price_types.findAll();

        hdlGetMtdResNoCont(price_types, 'price_types retrieved successfully.', res);
    } catch (error) {
        handleError(error, res, 'retrieving the price_types');
    }
};


const addPriceType = async (req, res) => {
    const { price_type_name, price_type_is_enabled } = req.body;

    try {
        const newPriceType = await tbl_price_types.create({
            price_type_name,
            price_type_is_enabled
        });

        handlePostPutDelMtdRes(
            newPriceType,
            'PriceType successfully created.',
            'PriceType creation failed.',
            res
        );
    } catch (error) {
        handleError(error, res, 'creating the PriceType');
    }
};


const updatePriceType = async (req, res) => {
    const { price_type_guid, price_type_name, price_type_is_enabled } = req.body;

    try {
        const [updatedPriceType] = await tbl_price_types.update(
            {
                price_type_name,
                price_type_is_enabled
            },
            { where: { price_type_guid } }
        );

        handlePostPutDelMtdRes(
            updatedPriceType,
            'PriceType successfully updated.',
            'PriceType update failed.',
            res
        );
    } catch (error) {
        handleError(error, res, 'updating the PriceType');
    }
};

const deletePriceTypes = async (req, res) => {
    const { price_type_guids } = req.body;

    try {
        const result = await tbl_price_types.destroy({
            where: { price_type_guid: price_type_guids },
        });

        handlePostPutDelMtdRes(
            result,
            'PriceTypes successfully deleted.',
            'No PriceTypes found to delete.',
            res
        );
    } catch (error) {
        handleError(error, res, 'deleting the PriceTypes');
    }
};

module.exports = {
    getAllPriceTypes,
    updatePriceType,
    deletePriceTypes,
    addPriceType
};