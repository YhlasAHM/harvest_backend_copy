'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // tbl_units tablosunu oluşturma
    await queryInterface.createTable('tbl_units', {
      // unit_guid sütunu: Birincil Anahtar, UUID tipi ve varsayılan olarak UUIDV4
      unit_guid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      // unit_name sütunu: Birim adı (JSONB - PostgreSQL'e özel bir veri tipi)
      unit_name: {
        type: Sequelize.JSONB, // PostgreSQL için JSONB tipi kullanıyoruz
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
    // Bu migration geri alındığında tbl_units tablosunu sil
    await queryInterface.dropTable('tbl_units');
  },
};