'use strict';

module.exports = (sequelize, DataTypes) => {
  const tbl_sectors = sequelize.define(
    'tbl_sectors',
    {
      sector_guid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      block_guid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'tbl_blocks',
          key: 'block_guid',
        },
      },
      update_count: {
        defaultValue: 0,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      empty_field: {
        type: DataTypes.NUMERIC,
        allowNull: true,
      },
      sector_name: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      sector_number: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        unique: true,
        autoIncrement: true,
      },
      sector_desc: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      sector_params: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      sector_width: {
        type: DataTypes.NUMERIC,
        allowNull: true,
      },
      sector_length: {
        type: DataTypes.NUMERIC,
        allowNull: true,
      },
      sector_m2: {
        type: DataTypes.NUMERIC,
        allowNull: true,
        get() {
          const width = this.getDataValue('sector_width');
          const height = this.getDataValue('sector_length');
          return width && height ? width * height : null;
        },
      },
      road_width: {
        type: DataTypes.NUMERIC,
        allowNull: true,
      },
      road_length: {
        type: DataTypes.NUMERIC,
        allowNull: true,
      },
      road_m2: {
        type: DataTypes.NUMERIC,

        allowNull: true,
        get() {
          const width = this.getDataValue('road_width');
          const height = this.getDataValue('road_length');
          return width && height ? width * height : null;
        },
      },
      common_m2: {
        type: DataTypes.NUMERIC,
        allowNull: true,
        get() {
          const width = this.getDataValue('sector_width');
          const height = this.getDataValue('sector_length') * this.getDataValue('road_length');
          return width && height ? width * height : null;
        }
      },
      modified_dt: {
        type: 'TIMESTAMP(6)',
        allowNull: true,
        defaultValue: sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'),
      },
      sector_is_enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      }
    },
    {
      tableName: 'tbl_sectors',
      timestamps: false,
      hooks: {
        beforeCreate: (sector) => {
          if (sector.sector_length) {
            sector.empty_field = sector.sector_length;
          }
          if (sector.sector_width && sector.sector_length) {
            sector.sector_m2 = sector.sector_width * sector.sector_length;
          }
          if (sector.sector_width && sector.sector_length && sector.road_length && sector.road_width) {
            sector.common_m2 = (sector.sector_length + sector.road_length) * sector.sector_width;
          }
        },
        beforeUpdate: (sector) => {
          if (sector.sector_width) {
            sector.empty_field = sector.sector_width;
          }
          if (sector.sector_width && sector.sector_length) {
            sector.sector_m2 = sector.sector_width * sector.sector_length;
          }
          if (sector.sector_width && sector.sector_length && sector.road_length && sector.road_width) {
            sector.common_m2 = (sector.sector_length + sector.road_length) * sector.sector_width;
          }
        },
      },
    }
  );

  tbl_sectors.associate = (models) => {

    tbl_sectors.belongsTo(models.tbl_blocks, {
      foreignKey: 'block_guid',
      as: 'tbl_blocks',
    });

    tbl_sectors.hasMany(models.tbl_archs, {
      foreignKey: 'sector_guid',
      as: 'tbl_archs'
    });

    tbl_sectors.hasMany(models.tbl_valves, {
      foreignKey: 'sector_guid',
      as: 'tbl_valves'
    });

    tbl_sectors.hasMany(models.tbl_harvests, {
      foreignKey: 'sector_guid',
      as: 'harvests'
    });

    tbl_sectors.hasMany(models.tbl_stands, {
      foreignKey: 'sector_guid',
      as: 'stands'
    });

  };

  return tbl_sectors;
};