'use strict';

module.exports = (sequelize, DataTypes) => {
  const tbl_harvests = sequelize.define(
    'tbl_harvests',
    {
      harvest_guid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      sector_guid: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'tbl_sectors',
          key: 'sector_guid',
        },
      },
      harvest_datetime: {
        type: 'TIMESTAMP(6)',
        allowNull: false,
        defaultValue: sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'),
      },
      harvest_weight: {
        type: DataTypes.NUMERIC,
        allowNull: false,
      },
      harvest_number: {
        type: DataTypes.SMALLINT,
        unique: true,
        autoIncrement: true,
      },
      harvest_empl_count: {
        type: DataTypes.SMALLINT,
        allowNull: true,
      },
      harvest_desc: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      update_count: {
        defaultValue: 0,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      harv_status_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'tbl_harv_statuses',
          key: 'harv_status_id',
        },
      },
      modified_dt: {
        type: 'TIMESTAMP(6)',
        allowNull: true,
        defaultValue: sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'),
      },
    },
    {
      tableName: 'tbl_harvests',
      timestamps: false,
    }
  );

  tbl_harvests.associate = (models) => {

    tbl_harvests.hasMany(models.tbl_harv_details, {
      foreignKey: 'harvest_guid',
      as: 'harv_details',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    tbl_harvests.hasMany(models.tbl_harv_employees, {
      foreignKey: 'harvest_guid',
      as: 'tbl_harv_employees',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    tbl_harvests.belongsTo(models.tbl_harv_statuses, {
      foreignKey: 'harv_status_id',
      as: 'harv_status',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    tbl_harvests.belongsTo(models.tbl_sectors, {
      foreignKey: 'sector_guid',
      as: 'sector',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

  };

  return tbl_harvests;
};