const { tbl_clients } = require('../models');
const {
    hdlGetMtdResNoCont,
    handlePostPutDelMtdRes,
    handleError,
} = require('../scripts/helpers/generalHelpers');

const getAllClients = async (req, res) => {
    try {
        const clients = await tbl_clients.findAll();

        hdlGetMtdResNoCont(clients, 'clients retrieved successfully.', res);
    } catch (error) {
        handleError(error, res, 'retrieving the clients');
    }
};


const addClient = async (req, res) => {
    const { client_name, client_address, client_phones, price_type_guid, client_gps_latitude, client_gps_longitude, is_client_enabled } = req.body;

    try {
        const newClient = await tbl_clients.create({
            client_name, client_address, client_phones, price_type_guid, client_gps_latitude, client_gps_longitude, is_client_enabled, modified_dt: new Date()
        });

        handlePostPutDelMtdRes(
            newClient,
            'Client successfully created.',
            'Client creation failed.',
            res
        );
    } catch (error) {
        handleError(error, res, 'creating the Client');
    }
};


const updateClient = async (req, res) => {
    const { client_guid, client_name, client_address, client_phones, price_type_guid, client_gps_latitude, client_gps_longitude, is_client_enabled } = req.body;

    try {
        const [updatedPriceType] = await tbl_clients.update(
            {
                client_name, client_address, client_phones, price_type_guid, client_gps_latitude, client_gps_longitude, is_client_enabled, modified_dt: new Date()
            },
            { where: { client_guid } }
        );

        handlePostPutDelMtdRes(
            updatedPriceType,
            'client successfully updated.',
            'client update failed.',
            res
        );
    } catch (error) {
        handleError(error, res, 'updating the client');
    }
};

const deleteClients = async (req, res) => {
    const { client_guids } = req.body;

    try {
        const result = await tbl_clients.destroy({
            where: { client_guid: client_guids },
        });

        handlePostPutDelMtdRes(
            result,
            'client successfully deleted.',
            'No client found to delete.',
            res
        );
    } catch (error) {
        handleError(error, res, 'deleting the client');
    }
};

module.exports = {
    getAllClients,
    updateClient,
    deleteClients,
    addClient
};