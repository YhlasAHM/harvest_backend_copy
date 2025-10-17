'use strict';

module.exports = (sequelize, DataTypes) => {
    const tbl_order_lines = sequelize.define(
        'tbl_order_lines',
        {
            order_line_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            order_guid: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: 'tbl_orders',
                    key: 'order_guid'
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT',
            },
            material_guid: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: 'tbl_materials',
                    key: 'mtrl_guid'
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT',
            },
            variant_guid: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: 'tbl_variants',
                    key: 'variant_guid'
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT',
            },
            unit_det_guid: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: 'tbl_unit_details',
                    key: 'unit_det_guid'
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT',
            },
            ord_line_amount: {
                type: DataTypes.DECIMAL(18, 4),
                allowNull: true,
                defaultValue: 0.0000,
            },
            ord_line_price: {
                type: DataTypes.DECIMAL(18, 4),
                allowNull: true,
                defaultValue: 0.0000,
            },
            ord_line_total: {
                type: DataTypes.DECIMAL(18, 4),
                allowNull: true,
                defaultValue: 0.0000,
            },
        },
        {
            tableName: 'tbl_order_lines',
            timestamps: false,
        }
    );

    tbl_order_lines.associate = (models) => {

        tbl_order_lines.belongsTo(models.tbl_materials, {
            foreignKey: 'material_guid',
            as: 'tbl_materials',
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        });

        tbl_order_lines.belongsTo(models.tbl_orders, {
            foreignKey: 'order_guid',
            as: 'tbl_orders',
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        });

        tbl_order_lines.belongsTo(models.tbl_variants, {
            foreignKey: 'variant_guid',
            as: 'tbl_variants',
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        });

        tbl_order_lines.belongsTo(models.tbl_unit_details, {
            foreignKey: 'unit_det_guid',
            as: 'tbl_unit_details',
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        });
    };

    return tbl_order_lines;
};