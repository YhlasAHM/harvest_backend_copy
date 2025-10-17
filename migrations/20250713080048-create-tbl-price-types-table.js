'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // tbl_price_types tablosunu oluşturma
    await queryInterface.createTable('tbl_price_types', {
      // price_type_guid sütunu: Birincil Anahtar, UUID tipi ve varsayılan olarak UUIDV4
      price_type_guid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      // price_type_name sütunu: Fiyat tipi adı (JSONB - PostgreSQL'e özel bir veri tipi)
      price_type_name: {
        type: Sequelize.JSONB, // PostgreSQL için JSONB tipi kullanıyoruz
        allowNull: true,
      },
      // price_type_is_enabled sütunu: Fiyat tipinin aktif olup olmadığı (BOOLEAN)
      price_type_is_enabled: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      // Modelde `timestamps: false` olduğu için `createdAt` ve `updatedAt` sütunlarını eklemiyoruz.
    });
  },

  async down(queryInterface, Sequelize) {
    // Bu migration geri alındığında tbl_price_types tablosunu sil
    await queryInterface.dropTable('tbl_price_types');
  },
};