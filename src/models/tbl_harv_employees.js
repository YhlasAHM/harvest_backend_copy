'use strict';

module.exports = (sequelize, DataTypes) => {
    const tbl_harv_employees = sequelize.define(
        'tbl_harv_employees',
        {
            harv_empl_guid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            harvest_guid: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'tbl_harvests',
                    key: 'harvest_guid'
                }
            },
            employee_guid: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'tbl_employees',
                    key: 'empl_guid'
                },
            },
            update_count: {
                defaultValue: 0,
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            is_enter_info: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            row_number: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
                autoIncrement: true,
            },
        },
        {
            tableName: 'tbl_harv_employees',
            timestamps: false,
        }
    );

    tbl_harv_employees.associate = (models) => {

        tbl_harv_employees.belongsTo(models.tbl_harvests, {
            foreignKey: 'harvest_guid',
            as: 'tbl_harvests',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });

        tbl_harv_employees.belongsTo(models.tbl_employees, {
            foreignKey: 'employee_guid',
            as: 'tbl_employees',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });

    };

    return tbl_harv_employees;
};