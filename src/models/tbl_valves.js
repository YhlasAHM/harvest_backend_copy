'use strict';

module.exports = (sequelize, DataTypes) => {
  const tbl_valves = sequelize.define(
    'tbl_valves',
    {
      valve_guid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      sector_guid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'tbl_sectors',
          key: 'sector_guid',
        },
      },
      update_count: {
        defaultValue: 0,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      valve_name: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      valve_desc: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      valve_params: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      modified_dt: {
        type: 'TIMESTAMP(6)',
        allowNull: true,
        defaultValue: sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'),
      },
      valve_number: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        autoIncrement: true,
        unique: true,
      },
      valve_is_enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      }
    },
    {
      tableName: 'tbl_valves',
      timestamps: false,
    }
  );

  tbl_valves.associate = (models) => {

    tbl_valves.belongsTo(models.tbl_sectors, {
      foreignKey: 'sector_guid',
      as: 'tbl_sectors',
      onUpdate: 'NO ACTION',
      onDelete: 'CASCADE',
    });

  };

  return tbl_valves;
};