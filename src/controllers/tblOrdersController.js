const { tbl_orders } = require('../models');
const {
    hdlGetMtdResNoCont,
    handlePostPutDelMtdRes,
    handleError,
} = require('../scripts/helpers/generalHelpers');

const getAllOrders = async (req, res) => {
    try {
        const orders = await tbl_orders.findAll();

        hdlGetMtdResNoCont(orders, 'orders retrieved successfully.', res);
    } catch (error) {
        handleError(error, res, 'retrieving the orders');
    }
};


const addOrder = async (req, res) => {
    const { group_guid, order_code, client_guid, delivery_address, price_type_guid, order_desc, order_status_id, ord_total_sum, supplier_guid } = req.body;

    try {
        const newOrder = await tbl_orders.create({
            group_guid, order_code, client_guid, delivery_address, price_type_guid, order_desc, order_status_id, ord_total_sum, supplier_guid, order_datetime: new Date()
        });

        handlePostPutDelMtdRes(
            newOrder,
            'order successfully created.',
            'order creation failed.',
            res
        );
    } catch (error) {
        handleError(error, res, 'creating the Client');
    }
};


const updateOrder = async (req, res) => {
    const { order_guid, group_guid, order_code, client_guid, delivery_address, price_type_guid, order_desc, order_status_id, ord_total_sum, supplier_guid } = req.body;

    try {
        const [updatedOrder] = await tbl_orders.update(
            {
                group_guid, order_code, client_guid, delivery_address, price_type_guid, order_desc, order_status_id, ord_total_sum, supplier_guid, order_datetime: new Date()
            },
            { where: { order_guid } }
        );

        handlePostPutDelMtdRes(
            updatedOrder,
            'Order successfully updated.',
            'Order update failed.',
            res
        );
    } catch (error) {
        handleError(error, res, 'updating the Order');
    }
};

const deleteOrders = async (req, res) => {
    const { order_guids } = req.body;

    try {
        const result = await tbl_orders.destroy({
            where: { order_guid: order_guids },
        });

        handlePostPutDelMtdRes(
            result,
            'order successfully deleted.',
            'No order found to delete.',
            res
        );
    } catch (error) {
        handleError(error, res, 'deleting the order');
    }
};

module.exports = {
    getAllOrders,
    updateOrder,
    deleteOrders,
    addOrder
};