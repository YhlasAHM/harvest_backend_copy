'use strict';

module.exports = (sequelize, DataTypes) => {
    const tbl_marks = sequelize.define(
        'tbl_marks',
        {
            mark_guid: {
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
            mark_name: {
                type: DataTypes.JSONB,
                allowNull: true,
            },
            is_marked_enabled: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            }
        },
        {
            tableName: 'tbl_marks',
            timestamps: false,
        }
    );

    // Add association with tbl_materials
    tbl_marks.associate = (models) => {
        tbl_marks.hasMany(models.tbl_materials, {
            foreignKey: 'mark_guid',
            as: 'tbls_materials',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });
    };

    return tbl_marks;
};