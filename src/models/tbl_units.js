'use strict';

module.exports = (sequelize, DataTypes) => {
  const tbl_units = sequelize.define(
    'tbl_units',
    {
      unit_guid: {
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
      unit_name: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      modified_dt: {
        type: 'TIMESTAMP(6)',
        allowNull: true,
        defaultValue: sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'),
      },
    },
    {
      tableName: 'tbl_units',
      timestamps: false,
    }
  );

  // Add association with tbl_materials
  tbl_units.associate = (models) => {

    tbl_units.hasMany(models.tbl_unit_details, {
      foreignKey: 'unit_guid',
      as: 'tbl_unit_details',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    tbl_units.hasMany(models.tbl_materials, {
      foreignKey: 'unit_guid',
      as: 'tbl_materials',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  };

  return tbl_units;
};