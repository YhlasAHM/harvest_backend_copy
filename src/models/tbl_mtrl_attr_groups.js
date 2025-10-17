'use strict';

module.exports = (sequelize, DataTypes) => {
  const tbl_mtrl_attr_groups = sequelize.define(
    'tbl_mtrl_attr_groups',
    {
      mag_guid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      mtrl_guid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'tbl_materials',  // Refers to the table name
          key: 'mtrl_guid',  // Column in the referenced table
        },
      },
      attr_guid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'tbl_attributes',  // Refers to the table name
          key: 'attribute_guid',  // Column in the referenced table
        },
      },
      group_guid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'tbl_groups',  // Refers to the table name
          key: 'group_guid',  // Column in the referenced table
        },
      },
      modified_dt: {
        type: 'TIMESTAMP(6)',
        allowNull: true,
        defaultValue: sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'),
      },
    },
    {
      tableName: 'tbl_mtrl_attr_groups',
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['mtrl_guid', 'attr_guid', 'group_guid'],
          name: 'unique_mtrl_attr_group',
        },
      ],
    }
  );

  tbl_mtrl_attr_groups.associate = (models) => {
    tbl_mtrl_attr_groups.belongsTo(models.tbl_materials, {
      foreignKey: 'mtrl_guid',
      as: 'tbl_materials',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  };

  return tbl_mtrl_attr_groups;
};
