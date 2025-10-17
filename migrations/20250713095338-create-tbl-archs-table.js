'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // tbl_archs tablosunu oluşturma
    await queryInterface.createTable('tbl_archs', {
      // arch_guid sütunu: Birincil Anahtar, UUID tipi ve varsayılan olarak UUIDV4
      arch_guid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      // sector_guid sütunu: tbl_sectors tablosuna referans veren Yabancı Anahtar
      sector_guid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'tbl_sectors', // Referans verilen tablo adı
          key: 'sector_guid',   // Referans verilen sütun adı
        },
        onUpdate: 'CASCADE',   // Güncellemede cascade et
        onDelete: 'CASCADE',  // Silme işleminde kısıtla (Modelde CASCADE, ama burada RESTRICT daha güvenli bir başlangıç olur. İhtiyaca göre değiştirilebilir.)
      },
      // arch_name sütunu: Kemer adı (JSONB - PostgreSQL'e özel), benzersiz
      arch_name: {
        type: Sequelize.JSONB, // PostgreSQL için JSONB tipi kullanıyoruz
        allowNull: false,
      },
      // arch_desc sütunu: Kemer açıklaması (JSONB)
      arch_desc: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      // arch_params sütunu: Kemer parametreleri (JSONB)
      arch_params: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      // arch_number sütunu: Kemer numarası (SMALLINT), otomatik artan ve benzersiz
      arch_number: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        // Kemer numarasının benzersiz olmasını sağlar
        // Otomatik artan değer
      },
      // arch_width sütunu: Kemer genişliği (NUMERIC)
      arch_width: {
        type: Sequelize.NUMERIC,
        allowNull: true,
      },
      // arch_length sütunu: Kemer uzunluğu (NUMERIC)
      arch_length: {
        type: Sequelize.NUMERIC,
        allowNull: true,
      },
      // arch_m2 sütunu: Kemer alanı (NUMERIC). Bu sütun, get hook'u ile hesaplandığı için veritabanında da bir sütun olarak bulunur.
      arch_m2: {
        type: Sequelize.NUMERIC,
        allowNull: true,
      },
      // modified_dt sütunu: Son değiştirilme tarihi ve saati (TIMESTAMP(6)), varsayılan olarak şimdiki zaman
      modified_dt: {
        type: 'TIMESTAMP(6)', // PostgreSQL için TIMESTAMP(6) kullanıyoruz
        allowNull: true,
        defaultValue: Sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'), // PostgreSQL'e özel varsayılan değer
      },
      // arch_is_enabled sütunu: Kemerin etkin olup olmadığı (BOOLEAN)
      arch_is_enabled: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      // Modelde `timestamps: false` olduğu için `createdAt` ve `updatedAt` sütunlarını eklemiyoruz.
      // `hooks` (beforeCreate/beforeUpdate) veritabanı şemasını etkilemez, bu yüzden migration'a dahil edilmez.
    });
  },

  async down(queryInterface, Sequelize) {
    // Bu migration geri alındığında tbl_archs tablosunu sil
    await queryInterface.dropTable('tbl_archs');
  },
};