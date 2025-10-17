'use strict';

module.exports = (sequelize, DataTypes) => {
    const tbl_order_statuses = sequelize.define(
        'tbl_order_statuses',
        {
            ord_status_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            is_edit_allowed: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            ord_status_name: {
                type: DataTypes.JSONB,
                allowNull: true,
            },
        },
        {
            tableName: 'tbl_order_statuses',
            timestamps: false,
        }
    );

    // Add association with tbl_materials
    tbl_order_statuses.associate = (models) => {
        tbl_order_statuses.hasMany(models.tbl_orders, {
            foreignKey: 'order_status_id',
            as: 'tbl_orders',
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        });
    };

    return tbl_order_statuses;
};