'use strict';

module.exports = (sequelize, DataTypes) => {
  const tbl_harv_agronomists = sequelize.define(
    'tbl_harv_agronomists',
    {
      harv_empl_guid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      harvest_guid: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        references: {
          model: 'tbl_harvests',
          key: 'harvest_guid',
        },
      },
      agronome_guid: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        references: {
          model: 'tbl_employees',
          key: 'empl_guid',
        },
      },
      prof_guid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'tbl_professions',
          key: 'prof_guid',
        },
      },
    },
    {
      tableName: 'tbl_harv_agronomists',
      timestamps: false,
    }
  );

  tbl_harv_agronomists.associate = (models) => {
    tbl_harv_agronomists.belongsTo(models.tbl_harvests, {
      foreignKey: 'harvest_guid',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    tbl_harv_agronomists.belongsTo(models.tbl_employees, {
      foreignKey: 'agronome_guid',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    tbl_harv_agronomists.belongsTo(models.tbl_professions, {
      foreignKey: 'prof_guid',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  };

  return tbl_harv_agronomists;
};