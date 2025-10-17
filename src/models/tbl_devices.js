'use strict';

module.exports = (sequelize, DataTypes) => {
  const tbl_devices = sequelize.define(
    'tbl_devices',
    {
      device_guid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      d_serial_num: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      update_count: {
        defaultValue: 0,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      device_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
      },
      installed_dt: {
        type: 'TIMESTAMP(6)',
        allowNull: true,
      },
    },
    {
      tableName: 'tbl_devices',
      timestamps: false,
    }
  );

  tbl_devices.associate = models => {
    tbl_devices.hasMany(models.tbl_sensors, {
      foreignKey: 'device_guid',
      as: 'tbl_sensors',
    });
  }

  return tbl_devices;
};