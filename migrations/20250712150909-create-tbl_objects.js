// migrations/YYYYMMDDHHMMSS-create-tbl_objects_table.js
// (YYYYMMDDHHMMSS kısmı sizin oluşturduğunuz dosya adındaki zaman damgası olacak)

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_objects', {
      object_guid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      object_name: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      object_number: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        unique: true,
        autoIncrement: true,
      },
      object_desc: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      object_contact: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      object_width: {
        type: Sequelize.NUMERIC,
        allowNull: true,
      },
      object_length: {
        type: Sequelize.NUMERIC,
        allowNull: true,
      },
      object_m2: {
        type: Sequelize.NUMERIC,
        allowNull: true,
      },
      modified_dt: {
        type: 'TIMESTAMP(6)',
        allowNull: true,
        defaultValue: Sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'),
      },
      object_is_enabled: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    // Migration'ı geri aldığımızda tbl_objects tablosunu sil
    await queryInterface.dropTable('tbl_objects');
  },
};