'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // tbl_barcodes tablosunu oluşturma
    await queryInterface.createTable('tbl_barcodes', {
      // barcode_value sütunu: Birincil Anahtar, STRING(100) tipi ve benzersiz
      barcode_value: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true, // Barkod değerinin benzersiz olmasını sağlar
        primaryKey: true,
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
      // is_barcode_enabled sütunu: Barkodun etkin olup olmadığı (BOOLEAN)
      is_barcode_enabled: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      modified_dt: {
        type: 'TIMESTAMP(6)',
        allowNull: true,
        defaultValue: Sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'),
      },
      // Modelde `timestamps: false` olduğu için `createdAt` ve `updatedAt` sütunlarını eklemiyoruz.
    });
  },

  async down(queryInterface, Sequelize) {
    // Bu migration geri alındığında tbl_barcodes tablosunu sil
    await queryInterface.dropTable('tbl_barcodes');
  },
};