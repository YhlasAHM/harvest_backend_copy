'use strict';

module.exports = (sequelize, DataTypes) => {
    const tbl_variants = sequelize.define(
        'tbl_variants',
        {
            variant_guid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            update_count: {
                defaultValue: 0,
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            index_number: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            variant_name: {
                type: DataTypes.JSONB,
                allowNull: true,
            },
            category_guid: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'tbl_categories',
                    key: 'category_guid'
                },
            },
            material_guid: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'tbl_materials',
                    key: 'mtrl_guid',
                },
            },
            is_variant_enabled: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            modified_dt: {
                type: 'TIMESTAMP(6)',
                allowNull: true,
                defaultValue: sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'),
            },
        },
        {
            tableName: 'tbl_variants',
            timestamps: false,
        }
    );

    // Add association with tbl_materials
    tbl_variants.associate = (models) => {
        tbl_variants.belongsTo(models.tbl_materials, {
            foreignKey: 'material_guid',
            as: 'tbl_materials',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });

        tbl_variants.hasMany(models.tbl_barcodes, {
            foreignKey: 'variant_guid',
            as: 'tbl_barcodes',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });

        tbl_variants.hasMany(models.tbl_prices, {
            foreignKey: 'variant_guid',
            as: 'tbl_prices',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });

        tbl_variants.belongsTo(models.tbl_categories, {
            foreignKey: 'category_guid',
            as: 'tbl_categories',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });

        tbl_variants.hasMany(models.tbl_order_lines, {
            foreignKey: 'variant_guid',
            as: 'tbl_order_lines',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });

    };

    return tbl_variants;
};