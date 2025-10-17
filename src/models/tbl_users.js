'use strict';

const { encryptText } = require('../scripts/helpers/crypto');

module.exports = (sequelize, DataTypes) => {
  const tbl_users = sequelize.define(
    'tbl_users',
    {
      user_guid: {
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
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      user_password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      user_is_login: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      modified_dt: {
        type: 'TIMESTAMP(6)',
        allowNull: true,
        defaultValue: sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'),
      },
      user_number: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        unique: true,
        autoIncrement: true,
      },
    },
    {
      tableName: 'tbl_users',
      timestamps: false,
      // Hooks
      hooks: {
        beforeCreate: async (user) => {
          if (user.user_password) {
            user.user_password = await encryptText(user.user_password, user.user_guid);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed('user_password')) {
            user.user_password = await encryptText(user.user_password, user.user_guid);
          }
        },
      },
    },
  );

  tbl_users.associate = (models) => {
    // Example association if tbl_employees has user_guid as FK
    tbl_users.hasMany(models.tbl_employees, {
      foreignKey: 'user_guid',
      as: 'tbl_employees',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  };

  return tbl_users;
};