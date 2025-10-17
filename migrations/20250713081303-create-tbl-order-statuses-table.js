'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // tbl_order_statuses tablosunu oluşturma
    await queryInterface.createTable('tbl_order_statuses', {
      // ord_status_id sütunu: Birincil Anahtar, otomatik artan tam sayı
      ord_status_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      // is_edit_allowed sütunu: Düzenlemeye izin verilip verilmediği (BOOLEAN)
      is_edit_allowed: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      // ord_status_name sütunu: Sipariş durumu adı (JSONB - PostgreSQL'e özel)
      ord_status_name: {
        type: Sequelize.JSONB, // PostgreSQL için JSONB tipi kullanıyoruz
        allowNull: true,
      },
      // Modelde `timestamps: false` olduğu için `createdAt` ve `updatedAt` sütunlarını eklemiyoruz.
    });
  },

  async down(queryInterface, Sequelize) {
    // Bu migration geri alındığında tbl_order_statuses tablosunu sil
    await queryInterface.dropTable('tbl_order_statuses');
  },
};