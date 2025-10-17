'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // tbl_mtrl_types tablosunu oluşturma
    await queryInterface.createTable('tbl_mtrl_types', {
      // mtrl_type_id sütunu: Birincil Anahtar, otomatik artan küçük tam sayı
      mtrl_type_id: {
        type: Sequelize.SMALLINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      // mtrl_type_name sütunu: Materyal tipi adı (JSONB - PostgreSQL'e özel), benzersiz
      mtrl_type_name: {
        type: Sequelize.JSONB, // PostgreSQL için JSONB tipi kullanıyoruz
        allowNull: false,
        unique: true, // Materyal tipi adının benzersiz olmasını sağlar
      },
      // modified_dt sütunu: Son değiştirilme tarihi ve saati (TIMESTAMP(6)), varsayılan olarak şimdiki zaman
      modified_dt: {
        type: 'TIMESTAMP(6)', // PostgreSQL için TIMESTAMP(6) kullanıyoruz
        allowNull: true,
        defaultValue: Sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'), // PostgreSQL'e özel varsayılan değer
      },
      // Modelde `timestamps: false` olduğu için `createdAt` ve `updatedAt` sütunlarını eklemiyoruz.
    });
  },

  async down(queryInterface, Sequelize) {
    // Bu migration geri alındığında tbl_mtrl_types tablosunu sil
    await queryInterface.dropTable('tbl_mtrl_types');
  },
};