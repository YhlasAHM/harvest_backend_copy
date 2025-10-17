'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('tbl_harv_lines', {
            harv_line_guid: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            harv_line_number: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: true,
            },
            harv_line_weight: {
                type: Sequelize.DECIMAL(18, 3), // DECIMAL tipi için precision ve scale belirtin
                allowNull: false,
            },
            ast_guid: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'tbl_ast_combs', // Referans verilen tablonun adı (çoğul hali 'tbl_ast_combs' olması muhtemel)
                    key: 'ast_guid',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            harv_det_guid: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'tbl_harv_details', // Referans verilen tablonun adı (çoğul hali 'tbl_harv_details' olması muhtemel)
                    key: 'harv_det_guid',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            // Modelinizde timestamps: false olduğu için createdAt ve updatedAt burada eklenmiyor.
        }, {
            tableName: 'tbl_harv_lines',
            timestamps: false // Migration'da doğrudan bir seçenek yoktur, modelde belirtilir.
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('tbl_harv_lines');
    }
};
