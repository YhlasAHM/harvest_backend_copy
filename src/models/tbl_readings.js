'use strict';

module.exports = (sequelize, DataTypes) => {
  const tbl_readings = sequelize.define(
    'tbl_readings',
    {
      reading_guid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      sensor_guid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'tbl_sensors',
          key: 'sensor_guid'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      update_count: {
        defaultValue: 0,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reading_dt: {
        type: 'TIMESTAMP(6)',
        allowNull: false,
      },
      reading_value: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      reading_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true
      }
    },
    {
      tableName: 'tbl_readings',
      timestamps: false,
    }
  );

  tbl_readings.associate = (models) => {
    tbl_readings.belongsTo(models.tbl_sensors, {
      foreignKey: 'sensor_guid',
      as: 'tbl_sensors',
    });

    tbl_readings.hasMany(models.tbl_alerts, {
      foreignKey: 'reading_guid',
      as: 'tbl_alerts',
    });
  };

  return tbl_readings;
};