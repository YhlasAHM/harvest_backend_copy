'use strict';

module.exports = (sequelize, DataTypes) => {
  const tbl_tracks = sequelize.define(
    'tbl_tracks',
    {
      track_guid: {
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
      track_name: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      track_number: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        unique: true,
        autoIncrement: true,
      },
      track_desc: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      track_params: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      track_length: {
        type: DataTypes.NUMERIC,
        allowNull: true,
      },
      track_seedlings: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      modified_dt: {
        type: 'TIMESTAMP(6)',
        allowNull: true,
        defaultValue: sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'),
      },
      track_is_enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      tableName: 'tbl_tracks',
      timestamps: false,
    }
  );

  tbl_tracks.associate = (models) => {
    tbl_tracks.hasMany(models.tbl_ast_combs, {
      foreignKey: 'track_guid',
      as: 'tbl_ast_combs',
    });
  };

  return tbl_tracks;
};