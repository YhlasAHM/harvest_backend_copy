'use strict';

module.exports = (sequelize, DataTypes) => {
    const tbl_suppliers = sequelize.define(
        'tbl_suppliers',
        {
            supplier_guid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            supplier_name: {
                type: DataTypes.JSONB,
                allowNull: true,
            },
            supplier_address: {
                type: DataTypes.JSONB,
                allowNull: true,
            },
            supplier_phones: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        },
        {
            tableName: 'tbl_suppliers',
            timestamps: false,
        }
    );

    tbl_suppliers.associate = (models) => {
        tbl_suppliers.hasMany(models.tbl_orders, {
            foreignKey: 'supplier_guid',
            as: 'tbl_orders',
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        });
    };

    return tbl_suppliers;
};