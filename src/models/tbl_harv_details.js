'use strict';

module.exports = (sequelize, DataTypes) => {
  const tbl_harv_details = sequelize.define(
    'tbl_harv_details',
    {
      harv_det_guid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      harvest_guid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'tbl_harvests',
          key: 'harvest_guid',
        },
      },
      employee_guid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'tbl_employees',
          key: 'empl_guid',
        },
      },
      grade_guid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'tbl_grades',
          key: 'grade_guid',
        },
      },
      material_guid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'tbl_materials',
          key: 'mtrl_guid',
        },
      },
      arch_guid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'tbl_archs',
          key: 'arch_guid',
        },
      },
      update_count: {
        defaultValue: 0,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      harv_det_desc: {
        type: DataTypes.STRING,
        allowNull: true
      },
      start_time: {
        type: DataTypes.TIME,
        allowNull: false
      },
      end_time: {
        type: DataTypes.TIME,
        allowNull: false
      },
      harv_det_weight: {
        type: DataTypes.NUMERIC,
        allowNull: false,
      },
      harv_det_number: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        autoIncrement: true,
        unique: true,
      },
      modified_dt: {
        type: 'TIMESTAMP(6)',
        allowNull: true,
        defaultValue: sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'),
      },
    },
    {
      tableName: 'tbl_harv_details',
      timestamps: false,
      hooks: {
        afterUpdate: async (harvDetail, options) => {
          const { harvest_guid } = harvDetail;

          const { tbl_harv_details, tbl_harvests } = sequelize.models;

          const allDetails = await tbl_harv_details.findAll({ where: { harvest_guid } });

          const totalWeight = allDetails.reduce((sum, detail) => sum + Number(detail.harv_det_weight), 0);

          await tbl_harvests.update(
            { harvest_weight: totalWeight },
            { where: { harvest_guid } }
          );
        },
      }
    },
  );

  tbl_harv_details.associate = (models) => {

    tbl_harv_details.belongsTo(models.tbl_harvests, {
      foreignKey: 'harvest_guid',
      as: 'tbl_harvests',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    tbl_harv_details.belongsTo(models.tbl_employees, {
      foreignKey: 'employee_guid',
      as: 'tbl_employees',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    })

    tbl_harv_details.belongsTo(models.tbl_grades, {
      foreignKey: 'grade_guid',
      as: 'tbl_grades',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    })

    tbl_harv_details.belongsTo(models.tbl_materials, {
      foreignKey: 'material_guid',
      as: 'tbl_materials',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    })

    tbl_harv_details.belongsTo(models.tbl_archs, {
      foreignKey: 'arch_guid',
      as: 'arch',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    })

    tbl_harv_details.hasMany(models.tbl_harv_lines, {
      foreignKey: 'harv_det_guid',
      as: 'tbl_harv_lines',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });


  };

  return tbl_harv_details;
};