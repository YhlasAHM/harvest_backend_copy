const { tbl_suppliers } = require('../models');
const {
    hdlGetMtdResNoCont,
    handlePostPutDelMtdRes,
    handleError
} = require('../scripts/helpers/generalHelpers');


const getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await tbl_suppliers.findAll();

        hdlGetMtdResNoCont(suppliers, 'suppliers retrieved successfully.', res);
    } catch (error) {
        handleError(error, res, 'retrieving the suppliers');
    };
};


const addSupplier = async (req, res) => {
    const { supplier_name, supplier_address, supplier_phones } = req.body;

    try {
        const newSupplier = await tbl_suppliers.create({
            supplier_name,
            supplier_address,
            supplier_phones,
        });

        handlePostPutDelMtdRes(newSupplier, 'supplier successfully created.', 'supplier creation failed.', res);
    } catch (error) {
        handleError(error, res, 'creating the supplier');
    };
};


const updateSupplier = async (req, res) => {
    const { supplier_guid, supplier_name, supplier_address, supplier_phones } = req.body;

    try {
        const [updatedSupplier] = await tbl_suppliers.update(
            {
                supplier_guid,
                supplier_name,
                supplier_address,
                supplier_phones,
            },
            {
                where: { supplier_guid },
            }
        );

        handlePostPutDelMtdRes(updatedSupplier, 'supplier successfully updated.', 'supplier update failed.', res);
    } catch (error) {
        handleError(error, res, 'updating the supplier');
    }
};

const deleteSuppliers = async (req, res) => {
    const { supplier_guids } = req.body;

    try {
        const deletingResult = await tbl_suppliers.destroy({
            where: { supplier_guid: supplier_guids },
        });

        handlePostPutDelMtdRes(deletingResult, 'suppliers successfully deleted.', 'suppliers was not found.', res);
    } catch (error) {
        handleError(error, res, 'deleting the suppliers');
    };
};

module.exports = {
    getAllSuppliers,
    addSupplier,
    updateSupplier,
    deleteSuppliers
};