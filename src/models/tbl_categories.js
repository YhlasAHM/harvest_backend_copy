'use strict';

module.exports = (sequelize, DataTypes) => {
    const tbl_categories = sequelize.define(
        'tbl_categories',
        {
            category_guid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            index_number: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            category_name: {
                type: DataTypes.JSONB,
                allowNull: true,
            },
            group_guid: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: 'tbl_groups',
                    key: 'group_guid'
                },
            },
            update_count: {
                defaultValue: 0,
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            is_category_enabled: {
                type: DataTypes.BOOLEAN,
                allowNull: true
            },
            modified_dt: {
                type: 'TIMESTAMP(6)',
                allowNull: true,
                defaultValue: sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'),
            },
        },
        {
            tableName: 'tbl_categories',
            timestamps: false,
        }
    );

    tbl_categories.associate = (models) => {

        tbl_categories.hasMany(models.tbl_materials, {
            foreignKey: 'category_guid',
            as: 'tbl_materials',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });

        tbl_categories.belongsTo(models.tbl_groups, {
            foreignKey: 'group_guid',
            as: 'tbl_groups',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });

        tbl_categories.hasMany(models.tbl_variants, {
            foreignKey: 'category_guid',
            as: 'tbl_variants',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });

    };

    return tbl_categories;
};