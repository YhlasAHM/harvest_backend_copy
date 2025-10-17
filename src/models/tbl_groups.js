'use strict';

module.exports = (sequelize, DataTypes) => {
  const tbl_groups = sequelize.define(
    'tbl_groups',
    {
      group_guid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      update_count: {
        defaultValue: 0,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      index_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      group_name: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      is_group_enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      modified_dt: {
        type: 'TIMESTAMP(6)',
        allowNull: true,
        defaultValue: sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'),
      },
    },
    {
      tableName: 'tbl_groups',
      timestamps: false,
    }
  );


  tbl_groups.associate = function (models) {

    tbl_groups.hasMany(models.tbl_orders, {
      foreignKey: 'group_guid',
      as: 'tbl_orders',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });


    tbl_groups.hasMany(models.tbl_categories, {
      foreignKey: 'group_guid',
      as: 'tbl_categories',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  };

  return tbl_groups;
};