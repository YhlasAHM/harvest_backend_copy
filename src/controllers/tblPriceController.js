const { tbl_prices } = require('../models');
const {
    hdlGetMtdResNoCont,
    handlePostPutDelMtdRes,
    handleError
} = require('../scripts/helpers/generalHelpers');


const getAllPrices = async (req, res) => {
    try {
        const prices = await tbl_prices.findAll();

        hdlGetMtdResNoCont(prices, 'prices retrieved successfully.', res);
    } catch (error) {
        handleError(error, res, 'retrieving the prices');
    };
};


const addPrice = async (req, res) => {
    const { material_guid, variant_guid, unit_det_guid, price_type_guid, price_value } = req.body;

    try {
        const newPrice = await tbl_prices.create({
            material_guid, variant_guid, unit_det_guid, price_type_guid, price_value, price_dattime: new Date()
        });

        handlePostPutDelMtdRes(newPrice, 'price successfully created.', 'price creation failed.', res);
    } catch (error) {
        handleError(error, res, 'creating the price');
    };
};


const updatePrice = async (req, res) => {
    const { price_guid, material_guid, variant_guid, unit_det_guid, price_type_guid, price_value } = req.body;

    try {
        const [updatedPrice] = await tbl_prices.update(
            {
                material_guid, variant_guid, unit_det_guid, price_type_guid, price_value, price_dattime: new Date()
            },
            {
                where: { price_guid },
            }
        );

        handlePostPutDelMtdRes(updatedPrice, 'Price successfully updated.', 'price update failed.', res);
    } catch (error) {
        handleError(error, res, 'updating the price');
    }
};

const deletePrice = async (req, res) => {
    const { price_guids } = req.body;

    try {
        const deletingResult = await tbl_prices.destroy({
            where: { price_guid: price_guids },
        });

        handlePostPutDelMtdRes(deletingResult, 'price successfully deleted.', 'price was not found.', res);
    } catch (error) {
        handleError(error, res, 'deleting the price');
    };
};

module.exports = {
    getAllPrices,
    addPrice,
    updatePrice,
    deletePrice
};