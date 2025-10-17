'use strict';

module.exports = (sequelize, DataTypes) => {
  const tbl_thresholds = sequelize.define(
    'tbl_thresholds',
    {
      threshold_guid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      sensor_type_guid: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      update_count: {
        defaultValue: 0,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      threshold_min_value: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      threshold_max_value: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      threshold_active_from: {
        type: 'TIMESTAMP(6)',
        allowNull: true,
      },
      threshold_active_to: {
        type: 'TIMESTAMP(6)',
        allowNull: true,
      },
      threshold_number: {
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
      tableName: 'tbl_thresholds',
      timestamps: false,
    }
  );

  tbl_thresholds.associate = (models) => {

    tbl_thresholds.belongsTo(models.tbl_sensor_types, {
      foreignKey: 'sensor_type_guid',
      as: 'tbl_sensor_types',
    });

    tbl_thresholds.hasMany(models.tbl_alerts, {
      foreignKey: 'threshold_guid',
      as: 'tbl_alerts',
    });
  };

  return tbl_thresholds;
};