'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // tbl_unit_details tablosunu oluşturma
    await queryInterface.createTable('tbl_unit_details', {
      // unit_det_guid sütunu: Birincil Anahtar, UUID tipi ve varsayılan olarak UUIDV4
      unit_det_guid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      // unit_guid sütunu: tbl_units tablosuna referans veren Yabancı Anahtar
      unit_guid: {
        type: Sequelize.UUID,
        allowNull: true, // Modelde allowNull: true olarak belirtilmiş
        references: {
          model: 'tbl_units', // Referans verilen tablo adı
          key: 'unit_guid',   // Referans verilen sütun adı
        },
        onUpdate: 'CASCADE',   // Güncellemede cascade et
        onDelete: 'CASCADE',  // Silme işleminde kısıtla
      },
      // unit_det_name sütunu: Birim detay adı (JSONB - PostgreSQL'e özel bir veri tipi)
      unit_det_name: {
        type: Sequelize.JSONB, // PostgreSQL için JSONB tipi kullanıyoruz
        allowNull: true,
      },
      // unit_det_numerator sütunu: Pay (INTEGER)
      unit_det_numerator: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      // unit_det_denominator sütunu: Payda (INTEGER)
      unit_det_denominator: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      // Modelde `timestamps: false` olduğu için `createdAt` ve `updatedAt` sütunlarını eklemiyoruz.
    });
  },

  async down(queryInterface, Sequelize) {
    // Bu migration geri alındığında tbl_unit_details tablosunu sil
    await queryInterface.dropTable('tbl_unit_details');
  },
};