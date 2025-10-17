'use strict';

module.exports = (sequelize, DataTypes) => {
    const tbl_harv_statuses = sequelize.define(
        'tbl_harv_statuses',
        {
            harv_status_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                unique: true,
                autoIncrement: true
            },
            update_count: {
                defaultValue: 0,
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            harv_status_name: {
                type: DataTypes.JSONB,
                allowNull: false,
            },
            is_allow_edit: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            is_allow_delete: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
        },
        {
            tableName: 'tbl_harv_statuses',
            timestamps: false,
        }
    );

    tbl_harv_statuses.associate = (models) => {

        tbl_harv_statuses.hasMany(models.tbl_harvests, {
            foreignKey: 'harv_status_id',
            as: 'tbl_harvests',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });

    };

    return tbl_harv_statuses;
};