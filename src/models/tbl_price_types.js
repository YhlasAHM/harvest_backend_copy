'use strict';

module.exports = (sequelize, DataTypes) => {
    const tbl_price_types = sequelize.define(
        'tbl_price_types',
        {
            price_type_guid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            price_type_name: {
                type: DataTypes.JSONB,
                allowNull: true,
            },
            price_type_is_enabled: {
                type: DataTypes.BOOLEAN,
                allowNull: true
            }
        },
        {
            tableName: 'tbl_price_types',
            timestamps: false,
        }
    );

    tbl_price_types.associate = (models) => {
        tbl_price_types.hasMany(models.tbl_clients, {
            foreignKey: 'price_type_guid',
            as: 'tbl_clients',
            onDelete: 'RESTRICT',
        });

        tbl_price_types.hasMany(models.tbl_orders, {
            foreignKey: 'price_type_guid',
            as: 'tbl_orders',
            onDelete: 'RESTRICT',
        });

        tbl_price_types.hasMany(models.tbl_prices, {
            foreignKey: 'price_type_guid',
            as: 'tbl_prices',
            onDelete: 'RESTRICT',
        });
    }

    return tbl_price_types;
};