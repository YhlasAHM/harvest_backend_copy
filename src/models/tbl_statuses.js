'use strict';

module.exports = (sequelize, DataTypes) => {
  const tbl_statuses = sequelize.define(
    'tbl_statuses',
    {
      status_guid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      update_count: {
        defaultValue: 0,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status_name: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      status_is_enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      status_number: {
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
      tableName: 'tbl_statuses',
      timestamps: false,
    }
  );

  tbl_statuses.associate = models => {
    tbl_statuses.hasMany(models.tbl_sensors, {
      foreignKey: 'status_guid',
      key: 'tbl_sensors',
    });

  };

  return tbl_statuses;
};