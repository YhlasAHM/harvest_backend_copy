'use strict';

module.exports = (sequelize, DataTypes) => {
  const tbl_sensor_types = sequelize.define(
    'tbl_sensor_types',
    {
      sensor_type_guid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      sensor_type_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      update_count: {
        defaultValue: 0,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sensor_type_unit: {
        type: DataTypes.CHAR(2),
        allowNull: false,
      },
      sensor_type_desc: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      sensor_type_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
      },
      modified_dt: {
        type: 'TIMESTAMP(6)',
        allowNull: true,
        defaultValue: sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'),
      },
    },
    {
      tableName: 'tbl_sensor_types',
      timestamps: false,
    }
  );

  tbl_sensor_types.associate = (models) => {

    tbl_sensor_types.hasMany(models.tbl_sensors, {
      foreignKey: 'sensor_type_guid',
      as: 'tbl_sensors',
    });

    tbl_sensor_types.hasMany(models.tbl_thresholds, {
      foreignKey: 'sensor_type_guid',
      as: 'tbl_thresholds',
    });

  }

  return tbl_sensor_types;
};