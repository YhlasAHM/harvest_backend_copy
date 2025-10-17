'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // tbl_professions tablosunu oluşturma
    await queryInterface.createTable('tbl_professions', {
      // prof_guid sütunu: Birincil Anahtar, UUID tipi ve varsayılan olarak UUIDV4
      prof_guid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      // prof_name sütunu: Meslek adı (JSONB - PostgreSQL'e özel), benzersiz
      prof_name: {
        type: Sequelize.JSONB, // PostgreSQL için JSONB tipi kullanıyoruz
        allowNull: false,
      },
      // prof_number sütunu: Meslek numarası (SMALLINT), otomatik artan ve benzersiz
      prof_number: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        unique: true, // Meslek numarasının benzersiz olmasını sağlar
        autoIncrement: true, // Otomatik artan değer
      },
      // prof_is_enabled sütunu: Mesleğin etkin olup olmadığı (BOOLEAN)
      prof_is_enabled: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      // Modelde `timestamps: false` olduğu için `createdAt` ve `updatedAt` sütunlarını eklemiyoruz.
    }, {
      tableName: 'tbl_professions',
      timestamps: false, // Modelde tanımlandığı gibi
    });
  },

  async down(queryInterface, Sequelize) {
    // Bu migration geri alındığında tbl_professions tablosunu sil
    await queryInterface.dropTable('tbl_professions');
  },
};