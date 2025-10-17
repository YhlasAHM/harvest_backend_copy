'use strict';

module.exports = (sequelize, DataTypes) => {
  const tbl_materials = sequelize.define(
    'tbl_materials',
    {
      mtrl_guid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      mtrl_name: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      update_count: {
        defaultValue: 0,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      mtrl_code: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: true,
      },
      mtrl_desc: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      category_guid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'tbl_categories',
          key: 'category_guid'
        },
      },
      mark_guid: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'tbl_marks',
          key: 'mark_guid'
        },
      },
      unit_guid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'tbl_units',
          key: 'unit_guid',
        },
      },
      is_weight_use: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      use_variants: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      owner_is_group: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      is_mtrl_enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      mtrl_type_id: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        references: {
          model: 'tbl_mtrl_types',
          key: 'mtrl_type_id',
        },
      },
      modified_dt: {
        type: 'TIMESTAMP(6)',
        allowNull: true,
        defaultValue: sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'),
      },
    },
    {
      tableName: 'tbl_materials',
      timestamps: false,
    }
  );

  tbl_materials.associate = (models) => {

    tbl_materials.belongsTo(models.tbl_mtrl_types, {
      foreignKey: 'mtrl_type_id',
      as: 'tbl_mtrl_types',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    tbl_materials.belongsTo(models.tbl_units, {
      foreignKey: 'unit_guid',
      as: 'tbl_units',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    tbl_materials.belongsTo(models.tbl_categories, {
      foreignKey: 'category_guid',
      as: 'tbl_categories',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    })

    tbl_materials.belongsTo(models.tbl_marks, {
      foreignKey: 'mark_guid',
      as: 'tbl_marks',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    tbl_materials.hasMany(models.tbl_barcodes, {
      foreignKey: 'material_guid',
      as: 'tbl_barcodes'
    });

    tbl_materials.hasMany(models.tbl_variants, {
      foreignKey: 'material_guid',
      as: 'tbl_variants'
    });

    tbl_materials.hasMany(models.tbl_prices, {
      foreignKey: 'material_guid',
      as: 'tbl_prices'
    });

    tbl_materials.hasMany(models.tbl_order_lines, {
      foreignKey: 'material_guid',
      as: 'tbl_order_lines'
    });

    tbl_materials.hasMany(models.tbl_harv_details, {
      foreignKey: 'material_guid',
      as: 'tbl_harv_details'
    });

  }

  return tbl_materials;
};