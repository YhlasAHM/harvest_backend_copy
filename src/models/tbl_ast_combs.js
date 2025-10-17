'use strict';

module.exports = (sequelize, DataTypes) => {
  const tbl_ast_combs = sequelize.define(
    'tbl_ast_combs',
    {
      ast_guid: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      arch_guid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'tbl_archs',
          key: 'arch_guid'
        },
      },
      stand_guid: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      track_guid: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      update_count: {
        defaultValue: 0,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      modified_dt: {
        type: 'TIMESTAMP(6)',
        allowNull: true,
        defaultValue: sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'),
      },
    },
    {
      tableName: 'tbl_ast_combs',
      timestamps: false,
    }
  );

  tbl_ast_combs.associate = (models) => {

    tbl_ast_combs.belongsTo(models.tbl_archs, {
      foreignKey: 'arch_guid',
      as: 'tbl_archs',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    tbl_ast_combs.belongsTo(models.tbl_stands, {
      foreignKey: 'stand_guid',
      as: 'tbl_stands',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    tbl_ast_combs.belongsTo(models.tbl_tracks, {
      foreignKey: 'track_guid',
      as: 'tbl_tracks',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    tbl_ast_combs.hasMany(models.tbl_harv_lines, {
      foreignKey: 'ast_guid',
      as: 'tbl_harv_lines',
    })

  };

  return tbl_ast_combs;
};
