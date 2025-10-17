const { where } = require('sequelize');
const { tbl_barcodes, tbl_materials, tbl_unit_details, tbl_variants, sequelize } = require('../models');
const {
    hdlGetMtdResNoCont,
    handlePostPutDelMtdRes,
    handleError,
} = require('../scripts/helpers/generalHelpers');

const getAllBarcodes = async (req, res) => {
    try {
        const barcodes = await tbl_barcodes.findAll({
            include: [{
                model: tbl_materials,
                as: "tbl_materials",
                attributes: ["mtrl_name"]
            },
            {
                model: tbl_variants,
                as: "tbl_variants",
                attributes: ["variant_name"]
            },
            {
                model: tbl_unit_details,
                as: "tbl_unit_details",
                attributes: ["unit_det_name"]
            }]
        });

        hdlGetMtdResNoCont(barcodes, 'barcodes retrieved successfully.', res);
    } catch (error) {
        handleError(error, res, 'retrieving the barcodes');
    }
};

const addBarcode = async (req, res) => {
    const { barcode_value, material_guid, variant_guid, unit_det_guid, is_barcode_enabled } = req.body;

    try {
        const newBarcode = await tbl_barcodes.create({
            barcode_value, material_guid, variant_guid, unit_det_guid, is_barcode_enabled, modified_dt: new Date()
        });

        if (newBarcode) {
            const res1 = await tbl_barcodes.findOne({
                where: { barcode_value: newBarcode.barcode_value },
                include: [{
                    model: tbl_materials,
                    as: "tbl_materials",
                    attributes: ["mtrl_name"]
                },
                {
                    model: tbl_variants,
                    as: "tbl_variants",
                    attributes: ["variant_name"]
                },
                {
                    model: tbl_unit_details,
                    as: "tbl_unit_details",
                    attributes: ["unit_det_name"]
                }]
            })
            handlePostPutDelMtdRes(
                res1,
                'barcodes successfully created.',
                'barcodes creation failed.',
                res
            );
        }

    } catch (error) {
        handleError(error, res, 'creating the barcodes');
    }
};

const updateBarcode = async (req, res) => {
    const t = await sequelize.transaction()
    const { barcode_value, material_guid, variant_guid, unit_det_guid, is_barcode_enabled } = req.body;

    try {
        const [updatedBarcode] = await tbl_barcodes.update(
            {
                material_guid, variant_guid, unit_det_guid, is_barcode_enabled, modified_dt: new Date()
            },
            {
                where: { barcode_value },
                transaction: t
            }
        );

        if (updatedBarcode > 0) {
            await tbl_barcodes.increment('update_count', { by: 1, where: { barcode_value }, transaction: t });
        } else {
            await t.rollback()
        }

        await t.commit()

        const getFullRes = await tbl_barcodes.findOne({
            where: { barcode_value: barcode_value },
            include: [{
                model: tbl_materials,
                as: "tbl_materials",
                attributes: ["mtrl_name"]
            },
            {
                model: tbl_variants,
                as: "tbl_variants",
                attributes: ["variant_name"]
            },
            {
                model: tbl_unit_details,
                as: "tbl_unit_details",
                attributes: ["unit_det_name"]
            }]
        })

        handlePostPutDelMtdRes(
            getFullRes,
            'barcodes successfully updated.',
            'barcodes update failed.',
            res
        );
    } catch (error) {
        await t.rollback()
        handleError(error, res, 'updating the barcodes');
    }
};

const deleteBarcode = async (req, res) => {
    const { barcode_values } = req.body;

    try {
        const result = await tbl_barcodes.destroy({
            where: { barcode_value: barcode_values },
        });

        handlePostPutDelMtdRes(
            result,
            'barcodes successfully deleted.',
            'No barcodes found to delete.',
            res
        );
    } catch (error) {
        handleError(error, res, 'deleting the barcodes');
    }
};

const verifyApi = async (req, res) => {
    const { guid } = req.query;

    try {
        const result = await tbl_barcodes.findOne({
            where: { barcode_value: guid }
        })

        handlePostPutDelMtdRes(result, 'verify success', 'verify success', res)
    } catch (error) {
        handleError(error, res, 'getting edit for data')
    }

}

module.exports = {
    verifyApi,
    getAllBarcodes,
    addBarcode,
    updateBarcode,
    deleteBarcode
};