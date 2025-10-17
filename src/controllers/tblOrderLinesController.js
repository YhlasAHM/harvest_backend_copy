const { tbl_order_lines } = require('../models');
const {
    hdlGetMtdResNoCont,
    handlePostPutDelMtdRes,
    handleError
} = require('../scripts/helpers/generalHelpers');


const getAllOrderLines = async (req, res) => {
    try {
        const order_lines = await tbl_order_lines.findAll();

        hdlGetMtdResNoCont(order_lines, 'order_lines retrieved successfully.', res);
    } catch (error) {
        handleError(error, res, 'retrieving the order_lines');
    };
};


const addOrderLine = async (req, res) => {
    const { order_guid, material_guid, variant_guid, unit_det_guid, ord_line_amount, ord_line_price, ord_line_total } = req.body;

    try {
        const newOrderLines = await tbl_order_lines.create({
            order_guid, material_guid, variant_guid, unit_det_guid, ord_line_amount, ord_line_price, ord_line_total
        });

        handlePostPutDelMtdRes(newOrderLines, 'order_lines successfully created.', 'order_lines creation failed.', res);
    } catch (error) {
        handleError(error, res, 'creating the order_lines');
    };
};


const updateOrderLine = async (req, res) => {
    const { order_line_id, order_guid, material_guid, variant_guid, unit_det_guid, ord_line_amount, ord_line_price, ord_line_total } = req.body;

    try {
        const [updatedOrderLine] = await tbl_order_lines.update(
            {
                order_guid, material_guid, variant_guid, unit_det_guid, ord_line_amount, ord_line_price, ord_line_total
            },
            {
                where: { order_line_id },
            }
        );

        handlePostPutDelMtdRes(updatedOrderLine, 'order_lines successfully updated.', 'order_lines update failed.', res);
    } catch (error) {
        handleError(error, res, 'updating the order_lines');
    }
};

const deleteOrderLine = async (req, res) => {
    const { order_line_ids } = req.body;

    try {
        const deletingResult = await tbl_order_lines.destroy({
            where: { order_line_id: order_line_ids },
        });

        handlePostPutDelMtdRes(deletingResult, 'order_lines successfully deleted.', 'order_lines was not found.', res);
    } catch (error) {
        handleError(error, res, 'deleting the order_lines');
    };
};

module.exports = {
    getAllOrderLines, addOrderLine, updateOrderLine, deleteOrderLine
};