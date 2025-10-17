'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('tbl_harv_details', {
            harv_det_guid: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            harvest_guid: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'tbl_harvests',
                    key: 'harvest_guid',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            employee_guid: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'tbl_employees',
                    key: 'empl_guid',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            grade_guid: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'tbl_grades',
                    key: 'grade_guid',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            material_guid: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'tbl_materials',
                    key: 'mtrl_guid',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            arch_guid: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'tbl_archs',
                    key: 'arch_guid',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            harv_det_desc: {
                type: Sequelize.STRING,
                allowNull: true
            },
            start_time: {
                type: Sequelize.TIME,
                allowNull: false
            },
            end_time: {
                type: Sequelize.TIME,
                allowNull: false
            },
            harv_det_weight: {
                type: Sequelize.NUMERIC,
                allowNull: false,
            },
            harv_det_number: {
                type: Sequelize.SMALLINT,
                allowNull: false,
                autoIncrement: true,
                unique: true,
            },
            modified_dt: {
                type: 'TIMESTAMP(6)',
                allowNull: true,
                defaultValue: Sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'),
            }
        }, {
            tableName: 'tbl_harv_details',
            timestamps: false
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('tbl_harv_details');
    }

};   