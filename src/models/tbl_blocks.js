'use strict';

module.exports = (sequelize, DataTypes) => {
  const tbl_blocks = sequelize.define(
    'tbl_blocks',
    {
      block_guid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      object_guid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'tbl_objects',
          key: 'object_guid',
        },
      },
      update_count: {
        defaultValue: 0,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      block_name: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      block_number: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        unique: true,
        autoIncrement: true,
      },
      block_desc: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      block_width: {
        type: DataTypes.NUMERIC,
        allowNull: true,
      },
      block_length: {
        type: DataTypes.NUMERIC,
        allowNull: true,
      },
      block_m2: {
        type: DataTypes.NUMERIC,
        allowNull: true,
        get() {
          const width = this.getDataValue('block_width');
          const height = this.getDataValue('block_length');
          return width && height ? width * height : null;
        },
      },
      block_params: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      modified_dt: {
        type: 'TIMESTAMP(6)',
        allowNull: true,
        defaultValue: sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'),
      },
      block_is_enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      }
    },
    {
      tableName: 'tbl_blocks',
      timestamps: false,
      hooks: {
        beforeCreate: (block) => {
          if (block.block_width && block.block_length) {
            block.block_m2 = block.block_width * block.block_length;
          }
        },
        beforeUpdate: (block) => {
          if (block.block_width && block.block_length) {
            block.block_m2 = block.block_width * block.block_length;
          }
        },
      },
    },
  );

  tbl_blocks.associate = (models) => {

    tbl_blocks.belongsTo(models.tbl_objects, {
      foreignKey: 'object_guid',
      as: 'tbl_objects',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    tbl_blocks.hasMany(models.tbl_sectors, {
      foreignKey: 'block_guid',
      as: 'tbl_sectors'
    });
  };

  return tbl_blocks;
};