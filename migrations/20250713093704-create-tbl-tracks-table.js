'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // tbl_tracks tablosunu oluşturma
    await queryInterface.createTable('tbl_tracks', {
      // track_guid sütunu: Birincil Anahtar, UUID tipi ve varsayılan olarak UUIDV4
      track_guid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      // track_name sütunu: Parkur adı (JSONB - PostgreSQL'e özel), benzersiz
      track_name: {
        type: Sequelize.JSONB, // PostgreSQL için JSONB tipi kullanıyoruz
        allowNull: false,
      },
      // track_number sütunu: Parkur numarası (SMALLINT), otomatik artan ve benzersiz
      track_number: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        unique: true, // Parkur numarasının benzersiz olmasını sağlar
        autoIncrement: true, // Otomatik artan değer
      },
      // track_desc sütunu: Parkur açıklaması (JSONB)
      track_desc: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      // track_params sütunu: Parkur parametreleri (JSONB)
      track_params: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      // track_length sütunu: Parkur uzunluğu (NUMERIC)
      track_length: {
        type: Sequelize.NUMERIC,
        allowNull: true,
      },
      // track_seedlings sütunu: Fidan sayısı (INTEGER), varsayılan olarak 0
      track_seedlings: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      // modified_dt sütunu: Son değiştirilme tarihi ve saati (TIMESTAMP(6)), varsayılan olarak şimdiki zaman
      modified_dt: {
        type: 'TIMESTAMP(6)', // PostgreSQL için TIMESTAMP(6) kullanıyoruz
        allowNull: true,
        defaultValue: Sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'), // PostgreSQL'e özel varsayılan değer
      },
      // track_is_enabled sütunu: Parkurun etkin olup olmadığı (BOOLEAN)
      track_is_enabled: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      // Modelde `timestamps: false` olduğu için `createdAt` ve `updatedAt` sütunlarını eklemiyoruz.
    });
  },

  async down(queryInterface, Sequelize) {
    // Bu migration geri alındığında tbl_tracks tablosunu sil
    await queryInterface.dropTable('tbl_tracks');
  },
};