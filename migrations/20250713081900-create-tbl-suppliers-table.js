'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // tbl_suppliers tablosunu oluşturma
    await queryInterface.createTable('tbl_suppliers', {
      // supplier_guid sütunu: Birincil Anahtar, UUID tipi ve varsayılan olarak UUIDV4
      supplier_guid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      // supplier_name sütunu: Tedarikçi adı (JSONB - PostgreSQL'e özel)
      supplier_name: {
        type: Sequelize.JSONB, // PostgreSQL için JSONB tipi kullanıyoruz
        allowNull: true,
      },
      // supplier_address sütunu: Tedarikçi adresi (JSONB)
      supplier_address: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      // supplier_phones sütunu: Tedarikçi telefon numaraları (TEXT)
      supplier_phones: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      // Modelde `timestamps: false` olduğu için `createdAt` ve `updatedAt` sütunlarını eklemiyoruz.
    });
  },

  async down(queryInterface, Sequelize) {
    // Bu migration geri alındığında tbl_suppliers tablosunu sil
    await queryInterface.dropTable('tbl_suppliers');
  },
};