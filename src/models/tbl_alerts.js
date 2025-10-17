'use strict';

module.exports = (sequelize, DataTypes) => {
  const tbl_alerts = sequelize.define(
    'tbl_alerts',
    {
      alert_guid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      reading_guid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'tbl_readings',
          key: 'reading_guid',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      threshold_guid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'tbl_thresholds',
          key: 'threshold_guid',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      update_count: {
        defaultValue: 0,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      alert_severity: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      created_dt: {
        type: 'TIMESTAMP(6)',
        allowNull: true,
        defaultValue: sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone')
      },
      alert_status: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      resolved_dt: {
        type: 'TIMESTAMP(6)',
        allowNull: true,
        defaultValue: sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'),
      },
      alert_number: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true,
        autoIncrement: true,
      },
    },
    {
      tableName: 'tbl_alerts',
      timestamps: false,
    }
  );

  tbl_alerts.associate = (models) => {
    tbl_alerts.belongsTo(models.tbl_readings, {
      foreignKey: 'reading_guid',
      as: 'tbl_readings',
    });

    tbl_alerts.belongsTo(models.tbl_thresholds, {
      foreignKey: 'threshold_guid',
      as: 'tbl_thresholds',
    });
  };

  return tbl_alerts;
};