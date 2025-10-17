'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // tbl_groups tablosunu oluşturma
    await queryInterface.createTable('tbl_groups', {
      // group_guid sütunu: Birincil Anahtar, UUID tipi ve varsayılan olarak UUIDV4
      group_guid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      index_number: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      // group_name sütunu: Grup adı (JSONB - PostgreSQL'e özel), benzersiz
      group_name: {
        type: Sequelize.JSONB, // PostgreSQL için JSONB tipi kullanıyoruz
        allowNull: true,
      },
      // is_group_enabled sütunu: Grubun etkin olup olmadığı (BOOLEAN)
      is_group_enabled: {
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
    // Bu migration geri alındığında tbl_groups tablosunu sil
    await queryInterface.dropTable('tbl_groups');
  },
};