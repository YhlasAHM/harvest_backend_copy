'use strict';

module.exports = (sequelize, DataTypes) => {
    const tbl_clients = sequelize.define(
        'tbl_clients',
        {
            client_guid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            client_name: {
                type: DataTypes.JSONB,
                allowNull: true,
            },
            client_address: {
                type: DataTypes.JSONB,
                allowNull: true,
            },
            client_phones: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            update_count: {
                defaultValue: 0,
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            price_type_guid: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: 'tbl_price_types',
                    key: 'price_type_guid',
                },
            },
            client_gps_latitude: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            client_gps_longitude: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            is_client_enabled: {
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
            tableName: 'tbl_clients',
            timestamps: false,
        }
    );

    tbl_clients.associate = function (models) {

        tbl_clients.belongsTo(models.tbl_price_types, {
            foreignKey: 'price_type_guid',
            as: 'tbl_price_types',
            onUpdate: "CASCADE",
            onDelete: 'CASCADE',
        });

        tbl_clients.hasMany(models.tbl_orders, {
            foreignKey: 'client_guid',
            as: 'tbl_orders',
            onUpdate: "CASCADE",
            onDelete: 'CASCADE',
        });


    };

    return tbl_clients;
};