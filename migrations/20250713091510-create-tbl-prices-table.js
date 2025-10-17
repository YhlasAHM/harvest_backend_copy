'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // tbl_prices tablosunu oluşturma
    await queryInterface.createTable('tbl_prices', {
      // price_guid sütunu: Birincil Anahtar, UUID tipi ve varsayılan olarak UUIDV4
      price_guid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      // price_datetime sütunu: Fiyatın belirlendiği tarih ve saat (TIMESTAMP(6)), varsayılan olarak şimdiki zaman
      price_datetime: {
        type: 'TIMESTAMP(6)', // PostgreSQL için TIMESTAMP(6) kullanıyoruz
        allowNull: true,
        defaultValue: Sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'), // PostgreSQL'e özel varsayılan değer
      },
      // material_guid sütunu: tbl_materials tablosuna referans veren Yabancı Anahtar
      material_guid: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'tbl_materials', // Referans verilen tablo adı
          key: 'mtrl_guid',       // Referans verilen sütun adı
        },
        onUpdate: 'CASCADE',   // Güncellemede cascade et
        onDelete: 'CASCADE',  // Silme işleminde kısıtla
      },
      // variant_guid sütunu: tbl_variants tablosuna referans veren Yabancı Anahtar
      variant_guid: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'tbl_variants', // Referans verilen tablo adı
          key: 'variant_guid',   // Referans verilen sütun adı
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      // unit_det_guid sütunu: tbl_unit_details tablosuna referans veren Yabancı Anahtar
      unit_det_guid: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'tbl_unit_details', // Referans verilen tablo adı
          key: 'unit_det_guid',      // Referans verilen sütun adı
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      // price_type_guid sütunu: tbl_price_types tablosuna referans veren Yabancı Anahtar
      price_type_guid: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'tbl_price_types', // Referans verilen tablo adı
          key: 'price_type_guid',   // Referans verilen sütun adı
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      // price_value sütunu: Fiyat değeri (DECIMAL(18, 4)), varsayılan olarak 0.0000
      price_value: {
        type: Sequelize.DECIMAL(18, 4),
        allowNull: true,
        defaultValue: 0.0000,
      },
      // Modelde `timestamps: false` olduğu için `createdAt` ve `updatedAt` sütunlarını eklemiyoruz.
    });
  },

  async down(queryInterface, Sequelize) {
    // Bu migration geri alındığında tbl_prices tablosunu sil
    await queryInterface.dropTable('tbl_prices');
  },
};