'use strict';

module.exports = (sequelize, DataTypes) => {
    const tbl_prices = sequelize.define(
        'tbl_prices',
        {
            price_guid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            price_datetime: {
                type: 'TIMESTAMP(6)',
                allowNull: true,
                defaultValue: sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'),
            },
            material_guid: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: 'tbl_materials',  // Refers to the table name
                    key: 'mtrl_guid',  // Column in the referenced table
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT',
            },
            variant_guid: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: 'tbl_variants',  // Refers to the table name
                    key: 'variant_guid',  // Column in the referenced table
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT',
            },
            unit_det_guid: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: 'tbl_unit_details',  // Refers to the table name
                    key: 'unit_det_guid',  // Column in the referenced table
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT',
            },
            price_type_guid: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: 'tbl_price_types',  // Refers to the table name
                    key: 'price_type_guid',  // Column in the referenced table
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT',
            },
            price_value: {
                type: DataTypes.DECIMAL(18, 4),
                allowNull: true,
                defaultValue: 0.0000,
            },
        },
        {
            tableName: 'tbl_prices',
            timestamps: false,
        }
    );

    tbl_prices.associate = function (models) {

        tbl_prices.belongsTo(models.tbl_unit_details, {
            foreignKey: 'unit_det_guid',
            as: 'tbl_unit_details',
            onDelete: 'RESTRICT',
        });

        tbl_prices.belongsTo(models.tbl_variants, {
            foreignKey: 'variant_guid',
            as: 'tbl_variants',
            onDelete: 'RESTRICT',
        });

        tbl_prices.belongsTo(models.tbl_materials, {
            foreignKey: 'material_guid',
            as: 'tbl_materials',
            onDelete: 'RESTRICT',
        });

        tbl_prices.belongsTo(models.tbl_price_types, {
            foreignKey: 'price_type_guid',
            as: 'tbl_price_types',
            onDelete: 'RESTRICT',
        });

    };

    return tbl_prices;
};