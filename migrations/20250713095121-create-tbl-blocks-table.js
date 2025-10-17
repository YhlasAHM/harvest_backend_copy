'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // tbl_blocks tablosunu oluşturma
    await queryInterface.createTable('tbl_blocks', {
      // block_guid sütunu: Birincil Anahtar, UUID tipi ve varsayılan olarak UUIDV4
      block_guid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      // object_guid sütunu: tbl_objects tablosuna referans veren Yabancı Anahtar
      object_guid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'tbl_objects', // Referans verilen tablo adı
          key: 'object_guid',   // Referans verilen sütun adı
        },
        onUpdate: 'CASCADE',   // Güncellemede cascade et
        onDelete: 'CASCADE',  // Silme işleminde kısıtla (Modelde CASCADE, ama burada RESTRICT daha güvenli bir başlangıç olur. İhtiyaca göre değiştirilebilir.)
      },
      // block_name sütunu: Blok adı (JSONB - PostgreSQL'e özel), benzersiz
      block_name: {
        type: Sequelize.JSONB, // PostgreSQL için JSONB tipi kullanıyoruz
        allowNull: false,
      },
      // block_number sütunu: Blok numarası (SMALLINT), otomatik artan ve benzersiz
      block_number: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        unique: true, // Blok numarasının benzersiz olmasını sağlar
        autoIncrement: true, // Otomatik artan değer
      },
      // block_desc sütunu: Blok açıklaması (JSONB)
      block_desc: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      // block_width sütunu: Blok genişliği (NUMERIC)
      block_width: {
        type: Sequelize.NUMERIC,
        allowNull: true,
      },
      // block_length sütunu: Blok uzunluğu (NUMERIC)
      block_length: {
        type: Sequelize.NUMERIC,
        allowNull: true,
      },
      // block_m2 sütunu: Blok alanı (NUMERIC). Bu sütun, get hook'u ile hesaplandığı için veritabanında da bir sütun olarak bulunur.
      block_m2: {
        type: Sequelize.NUMERIC,
        allowNull: true,
      },
      // block_params sütunu: Blok parametreleri (JSONB)
      block_params: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      // modified_dt sütunu: Son değiştirilme tarihi ve saati (TIMESTAMP(6)), varsayılan olarak şimdiki zaman
      modified_dt: {
        type: 'TIMESTAMP(6)', // PostgreSQL için TIMESTAMP(6) kullanıyoruz
        allowNull: true,
        defaultValue: Sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'), // PostgreSQL'e özel varsayılan değer
      },
      // block_is_enabled sütunu: Bloğun etkin olup olmadığı (BOOLEAN)
      block_is_enabled: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      // Modelde `timestamps: false` olduğu için `createdAt` ve `updatedAt` sütunlarını eklemiyoruz.
      // `hooks` (beforeCreate/beforeUpdate) veritabanı şemasını etkilemez, bu yüzden migration'a dahil edilmez.
    });
  },

  async down(queryInterface, Sequelize) {
    // Bu migration geri alındığında tbl_blocks tablosunu sil
    await queryInterface.dropTable('tbl_blocks');
  },
};