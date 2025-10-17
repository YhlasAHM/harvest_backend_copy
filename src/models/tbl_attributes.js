'use strict';

module.exports = (sequelize, DataTypes) => {
  const tbl_attributes = sequelize.define(
    'tbl_attributes',
    {
      attribute_guid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      attribute_name: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      attribute_desc: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      mark_for_deletion: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      modified_dt: {
        type: 'TIMESTAMP(6)',
        allowNull: true,
        defaultValue: sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'),
      },
      attribute_number: {
        type: DataTypes.SMALLINT,
        allowNull: true,
        autoIncrement: true,
        unique: true,
      },
      attribute_is_enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      tableName: 'tbl_attributes',
      timestamps: false,
    }
  );

  return tbl_attributes;
};