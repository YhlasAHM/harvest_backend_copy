'use strict';

module.exports = (sequelize, DataTypes) => {
  const tbl_sensors = sequelize.define(
    'tbl_sensors',
    {
      sensor_guid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      device_guid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'tbl_devices',
          key: 'device_guid'
        },
      },
      update_count: {
        defaultValue: 0,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sensor_type_guid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'tbl_sensor_types',
          key: 'sensor_type_guid'
        },
      },
      s_serial_number: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      installed_dt: {
        type: 'TIMESTAMP(6)',
        allowNull: true,
        defaultValue: sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'),
      },
      status_guid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'tbl_statuses',
          key: 'status_guid'
        },
      },
      arch_guid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'tbl_archs',
          key: 'arch_guid'
        },
      },
      sensor_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
      },
    },
    {
      tableName: 'tbl_sensors',
      timestamps: false,
    }
  );

  tbl_sensors.associate = (models) => {

    tbl_sensors.belongsTo(models.tbl_devices, {
      foreignKey: 'device_guid',
      as: 'tbl_devices',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    tbl_sensors.belongsTo(models.tbl_sensor_types, {
      foreignKey: 'sensor_type_guid',
      as: 'tbl_sensor_types',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    tbl_sensors.belongsTo(models.tbl_statuses, {
      foreignKey: 'status_guid',
      as: 'tbl_statuses',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    tbl_sensors.belongsTo(models.tbl_archs, {
      foreignKey: 'arch_guid',
      as: 'tbl_archs',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    tbl_sensors.hasMany(models.tbl_readings, {
      foreignKey: 'sensor_guid',
      as: 'tbl_readings',
    });

  };

  return tbl_sensors;
};