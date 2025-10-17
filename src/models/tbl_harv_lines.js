'use strict';

module.exports = (sequelize, DataTypes) => {
    const tbl_harv_lines = sequelize.define(
        'tbl_harv_lines',
        {
            harv_line_guid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            harv_line_number: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: true,
            },
            harv_line_weight: {
                type: DataTypes.DECIMAL(18, 3),
                allowNull: false,
            },
            ast_guid: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'tbl_ast_combs',
                    key: 'ast_guid',
                },
            },
            harv_det_guid: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'tbl_harv_details',
                    key: 'harv_det_guid',
                },
            },
            update_count: {
                defaultValue: 0,
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            tableName: 'tbl_harv_lines',
            timestamps: false,
        }
    );

    tbl_harv_lines.associate = (models) => {

        tbl_harv_lines.belongsTo(models.tbl_ast_combs, {
            foreignKey: 'ast_guid',
            as: 'tbl_ast_combs',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });

        tbl_harv_lines.belongsTo(models.tbl_harv_details, {
            foreignKey: 'harv_det_guid',
            as: 'tbl_harv_details',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });
    };

    return tbl_harv_lines;
};