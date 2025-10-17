'use strict';

module.exports = (sequelize, DataTypes) => {
  const tbl_objects = sequelize.define(
    'tbl_objects',
    {
      object_guid: {
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
      object_name: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      object_number: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        unique: true,
        autoIncrement: true,
      },
      object_desc: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      object_contact: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      object_width: {
        type: DataTypes.NUMERIC,
        allowNull: true,
      },
      object_length: {
        type: DataTypes.NUMERIC,
        allowNull: true,
      },
      object_m2: {
        type: DataTypes.NUMERIC,
        allowNull: true,
        get() {
          const width = this.getDataValue('object_width');
          const height = this.getDataValue('object_length');
          return width && height ? width * height : null;
        },
      },
      modified_dt: {
        type: 'TIMESTAMP(6)',
        allowNull: true,
        defaultValue: sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'),
      },
      object_is_enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      }
    },
    {
      tableName: 'tbl_objects',
      timestamps: false,
      hooks: {
        beforeCreate: (object) => {
          if (object.object_width && object.object_length) {
            object.object_m2 = object.object_width * object.object_length;
          }
        },
        beforeUpdate: (object) => {
          if (object.object_width && object.object_length) {
            object.object_m2 = object.object_width * object.object_length;
          }
        },
      },
    }
  );

  tbl_objects.associate = (models) => {

    tbl_objects.hasMany(models.tbl_blocks, {
      foreignKey: 'object_guid',
      as: 'tbl_blocks'
    });

  };

  return tbl_objects;
};