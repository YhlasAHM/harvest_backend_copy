'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('tbl_harv_statuses', {
            harv_status_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            harv_status_name: {
                type: Sequelize.JSONB,
                allowNull: false,
            },
            is_allow_edit: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            is_allow_delete: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
        }, {
            tableName: 'tbl_harv_statuses',
            timestamps: false
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('tbl_harv_statuses');
    }
};