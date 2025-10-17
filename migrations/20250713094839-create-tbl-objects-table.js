'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // tbl_objects tablosunu oluşturma
    await queryInterface.createTable('tbl_objects', {
      // object_guid sütunu: Birincil Anahtar, UUID tipi ve varsayılan olarak UUIDV4
      object_guid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      // object_name sütunu: Nesne adı (JSONB - PostgreSQL'e özel), benzersiz
      object_name: {
        type: Sequelize.JSONB, // PostgreSQL için JSONB tipi kullanıyoruz
        allowNull: false,
      },
      // object_number sütunu: Nesne numarası (SMALLINT), otomatik artan ve benzersiz
      object_number: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        unique: true, // Nesne numarasının benzersiz olmasını sağlar
        autoIncrement: true, // Otomatik artan değer
      },
      // object_desc sütunu: Nesne açıklaması (JSONB)
      object_desc: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      // object_contact sütunu: Nesne iletişim bilgileri (JSONB)
      object_contact: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      // object_width sütunu: Nesne genişliği (NUMERIC)
      object_width: {
        type: Sequelize.NUMERIC,
        allowNull: true,
      },
      // object_length sütunu: Nesne uzunluğu (NUMERIC)
      object_length: {
        type: Sequelize.NUMERIC,
        allowNull: true,
      },
      // object_m2 sütunu: Nesne alanı (NUMERIC). Bu sütun, get hook'u ile hesaplandığı için veritabanında saklanır.
      object_m2: {
        type: Sequelize.NUMERIC,
        allowNull: true,
      },
      // modified_dt sütunu: Son değiştirilme tarihi ve saati (TIMESTAMP(6)), varsayılan olarak şimdiki zaman
      modified_dt: {
        type: 'TIMESTAMP(6)', // PostgreSQL için TIMESTAMP(6) kullanıyoruz
        allowNull: true,
        defaultValue: Sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'), // PostgreSQL'e özel varsayılan değer
      },
      // object_is_enabled sütunu: Nesnenin etkin olup olmadığı (BOOLEAN)
      object_is_enabled: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      // Modelde `timestamps: false` olduğu için `createdAt` ve `updatedAt` sütunlarını eklemiyoruz.
      // `hooks` (beforeCreate/beforeUpdate) veritabanı şemasını etkilemez, bu yüzden migration'a dahil edilmez.
    });
  },

  async down(queryInterface, Sequelize) {
    // Bu migration geri alındığında tbl_objects tablosunu sil
    await queryInterface.dropTable('tbl_objects');
  },
};