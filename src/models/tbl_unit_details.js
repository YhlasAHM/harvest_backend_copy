'use strict';

module.exports = (sequelize, DataTypes) => {
    const tbl_unit_details = sequelize.define(
        'tbl_unit_details',
        {
            unit_det_guid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            unit_guid: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: 'tbl_units',
                    key: 'unit_guid',
                },
            },
            update_count: {
                defaultValue: 0,
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            unit_det_name: {
                type: DataTypes.JSONB,
                allowNull: true,
            },
            unit_det_numerator: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            unit_det_denominator: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
        },
        {
            tableName: 'tbl_unit_details',
            timestamps: false,
        }
    );

    tbl_unit_details.associate = function (models) {

        tbl_unit_details.belongsTo(models.tbl_units, {
            foreignKey: 'unit_guid',
            as: 'tbl_units',
        });

        tbl_unit_details.hasMany(models.tbl_barcodes, {
            foreignKey: 'unit_det_guid',
            as: 'tbl_barcodes'
        });

        tbl_unit_details.hasMany(models.tbl_prices, {
            foreignKey: 'unit_det_guid',
            as: 'tbl_prices'
        });

        tbl_unit_details.hasMany(models.tbl_order_lines, {
            foreignKey: 'unit_det_guid',
            as: 'tbl_order_lines'
        });

    };

    return tbl_unit_details;
};