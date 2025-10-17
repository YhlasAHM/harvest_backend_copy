'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // tbl_sectors tablosunu oluşturma
    await queryInterface.createTable('tbl_sectors', {
      // sector_guid sütunu: Birincil Anahtar, UUID tipi ve varsayılan olarak UUIDV4
      sector_guid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      // block_guid sütunu: tbl_blocks tablosuna referans veren Yabancı Anahtar
      block_guid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'tbl_blocks', // Referans verilen tablo adı
          key: 'block_guid',   // Referans verilen sütun adı
        },
        onUpdate: 'CASCADE',   // Güncellemede cascade et
        onDelete: 'CASCADE',  // Silme işleminde kısıtla
      },
      empty_field: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      // sector_name sütunu: Sektör adı (JSONB - PostgreSQL'e özel), benzersiz
      sector_name: {
        type: Sequelize.JSONB, // PostgreSQL için JSONB tipi kullanıyoruz
        allowNull: false,
      },
      // sector_number sütunu: Sektör numarası (SMALLINT), otomatik artan ve benzersiz
      sector_number: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        unique: true, // Sektör numarasının benzersiz olmasını sağlar
        autoIncrement: true, // Otomatik artan değer
      },
      // sector_desc sütunu: Sektör açıklaması (JSONB)
      sector_desc: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      // sector_params sütunu: Sektör parametreleri (JSONB)
      sector_params: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      // sector_width sütunu: Sektör genişliği (NUMERIC)
      sector_width: {
        type: Sequelize.NUMERIC,
        allowNull: true,
      },
      // sector_length sütunu: Sektör uzunluğu (NUMERIC)
      sector_length: {
        type: Sequelize.NUMERIC,
        allowNull: true,
      },
      // sector_m2 sütunu: Sektör alanı (NUMERIC). Bu sütun, get hook'u ile hesaplandığı için veritabanında da bir sütun olarak bulunur.
      sector_m2: {
        type: Sequelize.NUMERIC,
        allowNull: true,
      },
      road_width: {
        type: Sequelize.NUMERIC,
        allowNull: true,
      },
      road_length: {
        type: Sequelize.NUMERIC,
        allowNull: true,
      },
      common_m2: {
        type: Sequelize.NUMERIC,
        allowNull: true,
      },
      // modified_dt sütunu: Son değiştirilme tarihi ve saati (TIMESTAMP(6)), varsayılan olarak şimdiki zaman
      modified_dt: {
        type: 'TIMESTAMP(6)', // PostgreSQL için TIMESTAMP(6) kullanıyoruz
        allowNull: true,
        defaultValue: Sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'), // PostgreSQL'e özel varsayılan değer
      },
      // sector_is_enabled sütunu: Sektörün etkin olup olmadığı (BOOLEAN)
      sector_is_enabled: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      // Modelde `timestamps: false` olduğu için `createdAt` ve `updatedAt` sütunlarını eklemiyoruz.
      // `hooks` (beforeCreate/beforeUpdate) veritabanı şemasını etkilemez, bu yüzden migration'a dahil edilmez.
    });
  },

  async down(queryInterface, Sequelize) {
    // Bu migration geri alındığında tbl_sectors tablosunu sil
    await queryInterface.dropTable('tbl_sectors');
  },
};