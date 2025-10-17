'use strict';

module.exports = (sequelize, DataTypes) => {
  const tbl_employees = sequelize.define(
    'tbl_employees',
    {
      empl_guid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      empl_name: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      prof_guid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'tbl_professions',
          key: 'prof_guid',
        },
      },
      empl_contact: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      update_count: {
        defaultValue: 0,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      empl_number: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        unique: true,
        autoIncrement: true,
      },
      user_guid: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'tbl_users',
          key: 'user_guid',
        },
      },
      is_specialist: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      empl_is_enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      modified_dt: {
        type: 'TIMESTAMP(6)',
        allowNull: true,
        defaultValue: sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'),
      },
    },
    {
      tableName: 'tbl_employees',
      timestamps: false,
    },
  );

  // Associations
  tbl_employees.associate = (models) => {
    tbl_employees.belongsTo(models.tbl_professions, {
      foreignKey: 'prof_guid',
      as: 'tbl_professions',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    tbl_employees.belongsTo(models.tbl_users, {
      foreignKey: 'user_guid',
      as: 'tbl_users',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    tbl_employees.hasMany(models.tbl_harv_agronomists, {
      foreignKey: 'agronome_guid',
      as: 'tbl_harv_agronomists',
    });

    tbl_employees.hasMany(models.tbl_harv_details, {
      foreignKey: 'employee_guid',
      as: 'tbl_harv_details',
    });

    tbl_employees.hasMany(models.tbl_harv_employees, {
      foreignKey: 'employee_guid',
      as: 'tbl_harv_employees',
    });

  };

  return tbl_employees;
};