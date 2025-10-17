'use strict';

module.exports = (sequelize, DataTypes) => {
  const tbl_mtrl_types = sequelize.define(
    'tbl_mtrl_types',
    {
      mtrl_type_id: {
        type: DataTypes.SMALLINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      mtrl_type_name: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      update_count: {
        defaultValue: 0,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      modified_dt: {
        type: 'TIMESTAMP(6)',
        allowNull: true,
        defaultValue: sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'),
      },
    },
    {
      tableName: 'tbl_mtrl_types',
      timestamps: false,
    }
  );

  // Add association with tbl_materials
  tbl_mtrl_types.associate = (models) => {
    tbl_mtrl_types.hasMany(models.tbl_materials, {
      foreignKey: 'mtrl_type_id',
      as: 'tbl_materials',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  };


  return tbl_mtrl_types;
};