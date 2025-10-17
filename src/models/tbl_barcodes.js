'use strict';

module.exports = (sequelize, DataTypes) => {
  const tbl_barcodes = sequelize.define(
    'tbl_barcodes',
    {
      barcode_value: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      material_guid: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'tbl_materials',  // Refers to the table name
          key: 'mtrl_guid',  // Column in the referenced table
        },
      },
      variant_guid: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'tbl_variants',  // Refers to the table name
          key: 'variant_guid',  // Column in the referenced table
        },
      },
      unit_det_guid: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'tbl_unit_details',  // Refers to the table name
          key: 'unit_det_guid',  // Column in the referenced table
        },
      },
      update_count: {
        defaultValue: 0,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_barcode_enabled: {
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
      tableName: 'tbl_barcodes',
      timestamps: false,
    }
  );

  tbl_barcodes.associate = function (models) {

    tbl_barcodes.belongsTo(models.tbl_unit_details, {
      foreignKey: 'unit_det_guid',
      as: 'tbl_unit_details',
      onDelete: 'CASCADE',
    });

    tbl_barcodes.belongsTo(models.tbl_variants, {
      foreignKey: 'variant_guid',
      as: 'tbl_variants',
      onDelete: 'CASCADE',
    });

    tbl_barcodes.belongsTo(models.tbl_materials, {
      foreignKey: 'material_guid',
      as: 'tbl_materials',
      onDelete: 'CASCADE',
    });

  };

  return tbl_barcodes;
};