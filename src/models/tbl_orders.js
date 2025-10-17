'use strict';

module.exports = (sequelize, DataTypes) => {
    const tbl_orders = sequelize.define(
        'tbl_orders',
        {
            order_guid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            group_guid: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: 'tbl_groups',
                    key: 'group_guid'
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT',
            },
            order_datetime: {
                type: 'TIMESTAMP(6)',
                allowNull: true,
                defaultValue: sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'),
            },
            order_code: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            client_guid: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: 'tbl_clients',
                    key: 'client_guid'
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT',
            },
            delivery_address: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            price_type_guid: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: 'tbl_price_types',
                    key: 'price_type_guid'
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT',
            },
            order_desc: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            order_status_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'tbl_order_statuses',
                    key: 'ord_status_id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT',
            },
            ord_total_sum: {
                type: DataTypes.DECIMAL(18, 4),
                allowNull: true,
                defaultValue: 0.0000,
            },
            supplier_guid: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: 'tbl_suppliers',
                    key: 'supplier_guid',
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT',
            }
        },
        {
            tableName: 'tbl_orders',
            timestamps: false,
        }
    );

    tbl_orders.associate = (models) => {

        tbl_orders.belongsTo(models.tbl_groups, {
            foreignKey: 'group_guid',
            as: 'tbl_groups',
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        });

        tbl_orders.belongsTo(models.tbl_clients, {
            foreignKey: 'client_guid',
            as: 'tbl_clients',
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        });

        tbl_orders.belongsTo(models.tbl_price_types, {
            foreignKey: 'price_type_guid',
            as: 'tbl_price_types',
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        });

        tbl_orders.belongsTo(models.tbl_order_statuses, {
            foreignKey: 'order_status_id',
            as: 'tbl_order_statuses',
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        });

        tbl_orders.belongsTo(models.tbl_suppliers, {
            foreignKey: 'supplier_guid',
            as: 'tbl_suppliers',
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        });

        tbl_orders.hasMany(models.tbl_order_lines, {
            foreignKey: 'order_guid',
            as: 'tbl_order_lines',
            onDelete: 'RESTRICT',
        });

    };

    return tbl_orders;
};