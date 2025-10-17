'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // tbl_grades tablosunu oluşturma
    await queryInterface.createTable('tbl_grades', {
      // grade_guid sütunu: Birincil Anahtar, UUID tipi ve varsayılan olarak UUIDV4
      grade_guid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      // grade_number sütunu: Derece numarası (SMALLINT), otomatik artan ve benzersiz
      grade_number: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        unique: true, // Derece numarasının benzersiz olmasını sağlar
        autoIncrement: true, // Otomatik artan değer
      },
      // grade_name sütunu: Derece adı (JSONB - PostgreSQL'e özel), benzersiz
      grade_name: {
        type: Sequelize.JSONB, // PostgreSQL için JSONB tipi kullanıyoruz
        allowNull: false,
      },
      // grade_desc sütunu: Derece açıklaması (JSONB)
      grade_desc: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      // grade_is_enabled sütunu: Derecenin etkin olup olmadığı (BOOLEAN)
      grade_is_enabled: {
        type: Sequelize.BOOLEAN,
        allowNull: true, // Modelde allowNull: true
      },
      modified_dt: {
        type: 'TIMESTAMP(6)',
        allowNull: true,
        defaultValue: Sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'),
      },
      // Modelde `timestamps: false` olduğu için `createdAt` ve `updatedAt` sütunlarını eklemiyoruz.
    }, {
      tableName: 'tbl_grades',
      timestamps: false, // Modelde tanımlandığı gibi
    });
  },

  async down(queryInterface, Sequelize) {
    // Bu migration geri alındığında tbl_grades tablosunu sil
    await queryInterface.dropTable('tbl_grades');
  },
};