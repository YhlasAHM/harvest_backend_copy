'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // tbl_statuses tablosunu oluşturma
    await queryInterface.createTable('tbl_statuses', {
      // status_guid sütunu: Birincil Anahtar, UUID tipi ve varsayılan olarak UUIDV4
      status_guid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      // status_name sütunu: Durum adı (JSONB - PostgreSQL'e özel), benzersiz
      status_name: {
        type: Sequelize.JSONB, // PostgreSQL için JSONB tipi kullanıyoruz
        allowNull: false,
      },
      // status_is_enabled sütunu: Durumun etkin olup olmadığı (BOOLEAN), varsayılan olarak true
      status_is_enabled: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      // status_number sütunu: Durum numarası (INTEGER), otomatik artan ve benzersiz
      status_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true, // Durum numarasının benzersiz olmasını sağlar
        autoIncrement: true, // Otomatik artan değer
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
    // Bu migration geri alındığında tbl_statuses tablosunu sil
    await queryInterface.dropTable('tbl_statuses');
  },
};