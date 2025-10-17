'use strict';

module.exports = (sequelize, DataTypes) => {
  const tbl_stands = sequelize.define(
    'tbl_stands',
    {
      stand_guid: {
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
      stand_name: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      stand_number: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        unique: true,
        autoIncrement: true,
      },
      stand_desc: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      stand_params: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      stand_height: {
        type: DataTypes.NUMERIC,
        allowNull: true,
      },
      modified_dt: {
        type: 'TIMESTAMP(6)',
        allowNull: true,
        defaultValue: sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'),
      },
      stand_is_enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      }
    },
    {
      tableName: 'tbl_stands',
      timestamps: false,
    }
  );

  tbl_stands.associate = (models) => {

    tbl_stands.hasMany(models.tbl_ast_combs, {
      foreignKey: 'stand_guid',
      as: 'tbl_ast_combs'
    });

    tbl_stands.belongsTo(models.tbl_sectors, {
      foreignKey: 'sector_guid',
      as: 'tbl_sectors',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

  };

  return tbl_stands;
};