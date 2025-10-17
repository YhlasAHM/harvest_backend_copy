'use strict';

module.exports = (sequelize, DataTypes) => {
  const tbl_grades = sequelize.define(
    'tbl_grades',
    {
      grade_guid: {
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
      grade_number: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        unique: true,
        autoIncrement: true,
      },
      grade_name: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      grade_desc: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      grade_is_enabled: {
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
      tableName: 'tbl_grades',
      timestamps: false,
    }
  );


  tbl_grades.associate = (models) => {
    tbl_grades.hasMany(models.tbl_harv_details, {
      foreignKey: 'grade_guid',
      as: 'tbl_harv_details',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  };

  return tbl_grades;
};