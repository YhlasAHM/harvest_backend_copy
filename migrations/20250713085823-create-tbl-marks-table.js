'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // tbl_marks tablosunu oluşturma
    await queryInterface.createTable('tbl_marks', {
      // mark_guid sütunu: Birincil Anahtar, UUID tipi ve varsayılan olarak UUIDV4
      mark_guid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      // mark_name sütunu: Marka adı (JSONB - PostgreSQL'e özel), benzersiz
      mark_name: {
        type: Sequelize.JSONB, // PostgreSQL için JSONB tipi kullanıyoruz
        allowNull: true,
      },
      // is_marked_enabled sütunu: Markanın etkin olup olmadığı (BOOLEAN)
      is_marked_enabled: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      // Modelde `timestamps: false` olduğu için `createdAt` ve `updatedAt` sütunlarını eklemiyoruz.
    });
  },

  async down(queryInterface, Sequelize) {
    // Bu migration geri alındığında tbl_marks tablosunu sil
    await queryInterface.dropTable('tbl_marks');
  },
};