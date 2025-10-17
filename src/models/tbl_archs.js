'use strict';

module.exports = (sequelize, DataTypes) => {
  const tbl_archs = sequelize.define(
    'tbl_archs',
    {
      arch_guid: {
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
      arch_name: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      arch_desc: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      arch_params: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      arch_number: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      arch_width: {
        type: DataTypes.NUMERIC,
        allowNull: true,
      },
      arch_length: {
        type: DataTypes.NUMERIC,
        allowNull: true,
      },
      arch_m2: {
        type: DataTypes.NUMERIC,
        allowNull: true,
        get() {
          const width = this.getDataValue('arch_width');
          const height = this.getDataValue('arch_length');
          return width && height ? width * height : null;
        },
      },
      modified_dt: {
        type: 'TIMESTAMP(6)',
        allowNull: true,
        defaultValue: sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'),
      },
      arch_is_enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      }
    },
    {
      tableName: 'tbl_archs',
      timestamps: false,
      hooks: {
        beforeCreate: (arch) => {
          if (arch.arch_width && arch.arch_length) {
            arch.arch_m2 = arch.arch_width * arch.arch_length;
          }
        },
        beforeUpdate: (arch) => {
          if (arch.arch_width && arch.arch_length) {
            arch.arch_m2 = arch.arch_width * arch.arch_length;
          }
        },
      },
    }
  );

  tbl_archs.associate = (models) => {

    tbl_archs.belongsTo(models.tbl_sectors, {
      foreignKey: 'sector_guid',
      as: 'tbl_sectors',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    tbl_archs.hasMany(models.tbl_ast_combs, {
      foreignKey: 'arch_guid',
      as: 'tbl_ast_combs'
    });

    tbl_archs.hasMany(models.tbl_sensors, {
      foreignKey: 'arch_guid',
      as: 'tbl_sensors'
    })

    tbl_archs.hasMany(models.tbl_harv_details, {
      foreignKey: 'arch_guid',
      as: 'harv_details'
    })
  };

  return tbl_archs;
};