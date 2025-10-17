'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // tbl_stands tablosunu oluşturma
    await queryInterface.createTable('tbl_stands', {
      // stand_guid sütunu: Birincil Anahtar, UUID tipi ve varsayılan olarak UUIDV4
      stand_guid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      // stand_name sütunu: Stand adı (JSONB - PostgreSQL'e özel), benzersiz
      stand_name: {
        type: Sequelize.JSONB, // PostgreSQL için JSONB tipi kullanıyoruz
        allowNull: false,
      },
      // stand_number sütunu: Stand numarası (SMALLINT), otomatik artan ve benzersiz
      stand_number: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        unique: true, // Stand numarasının benzersiz olmasını sağlar
        autoIncrement: true, // Otomatik artan değer
      },
      // stand_desc sütunu: Stand açıklaması (JSONB)
      stand_desc: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      // stand_params sütunu: Stand parametreleri (JSONB)
      stand_params: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      // stand_height sütunu: Stand yüksekliği (NUMERIC)
      stand_height: {
        type: Sequelize.NUMERIC,
        allowNull: true,
      },
      // modified_dt sütunu: Son değiştirilme tarihi ve saati (TIMESTAMP(6)), varsayılan olarak şimdiki zaman
      modified_dt: {
        type: 'TIMESTAMP(6)', // PostgreSQL için TIMESTAMP(6) kullanıyoruz
        allowNull: true,
        defaultValue: Sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'), // PostgreSQL'e özel varsayılan değer
      },
      // stand_is_enabled sütunu: Standın etkin olup olmadığı (BOOLEAN)
      stand_is_enabled: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      // Modelde `timestamps: false` olduğu için `createdAt` ve `updatedAt` sütunlarını eklemiyoruz.
    });
  },

  async down(queryInterface, Sequelize) {
    // Bu migration geri alındığında tbl_stands tablosunu sil
    await queryInterface.dropTable('tbl_stands');
  },
};