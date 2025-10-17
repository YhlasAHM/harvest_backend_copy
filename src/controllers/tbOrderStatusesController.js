const { tbl_order_statuses } = require('../models');
const {
    hdlGetMtdResNoCont,
    handlePostPutDelMtdRes,
    handleError
} = require('../scripts/helpers/generalHelpers');


const getAllOrderStatuses = async (req, res) => {
    try {
        const orderStatuses = await tbl_order_statuses.findAll();

        hdlGetMtdResNoCont(orderStatuses, 'orderStatuses retrieved successfully.', res);
    } catch (error) {
        handleError(error, res, 'retrieving the orderStatuses');
    };
};


const addOrderStatuses = async (req, res) => {
    const { is_edit_allowed, ord_status_name } = req.body;

    try {
        const newOrderStatuses = await tbl_order_statuses.create({
            is_edit_allowed,
            ord_status_name
        });

        handlePostPutDelMtdRes(newOrderStatuses, 'OrderStatuses successfully created.', 'OrderStatuses creation failed.', res);
    } catch (error) {
        handleError(error, res, 'creating the OrderStatuses');
    };
};


const updateOrderStatuses = async (req, res) => {
    const { ord_status_id, is_edit_allowed, ord_status_name } = req.body;

    try {
        const [updatedOrderStatus] = await tbl_order_statuses.update(
            {
                is_edit_allowed,
                ord_status_name
            },
            {
                where: { ord_status_id },
            }
        );

        handlePostPutDelMtdRes(updatedOrderStatus, 'orderStatus successfully updated.', 'orderStatus update failed.', res);
    } catch (error) {
        handleError(error, res, 'updating the orderStatus');
    }
};

const deleteOrderStatuses = async (req, res) => {
    const { order_statuses_ids } = req.body;

    try {
        const deletingResult = await tbl_order_statuses.destroy({
            where: { ord_status_id: order_statuses_ids },
        });

        handlePostPutDelMtdRes(deletingResult, 'orderStatuses successfully deleted.', 'OrdersStatuses was not found.', res);
    } catch (error) {
        handleError(error, res, 'deleting the orderStatuses');
    };
};

module.exports = {
    getAllOrderStatuses,
    addOrderStatuses,
    updateOrderStatuses,
    deleteOrderStatuses,
};