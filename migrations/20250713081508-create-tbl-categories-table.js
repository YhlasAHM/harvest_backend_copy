'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // tbl_categories tablosunu oluşturma
    await queryInterface.createTable('tbl_categories', {
      // category_guid sütunu: Birincil Anahtar, UUID tipi ve varsayılan olarak UUIDV4
      category_guid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      // index_number sütunu: Otomatik artan, benzersiz sayı
      index_number: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      category_name: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      // group_guid sütunu: tbl_groups tablosuna referans veren Yabancı Anahtar
      group_guid: {
        type: Sequelize.UUID,
        allowNull: true, // Modelde allowNull: true olarak belirtilmiş
        references: {
          model: 'tbl_groups', // Referans verilen tablo adı
          key: 'group_guid',   // Referans verilen sütun adı
        },
        onUpdate: 'CASCADE',   // Güncellemede cascade et
        onDelete: 'CASCADE',  // Silme işleminde kısıtla
      },
      // group_name sütunu: Grup adı (JSONB - PostgreSQL'e özel), modelde group_name olarak geçiyor, category_name olması daha mantıklı olabilir miydi?
      // Not: Modelinizde burada "group_name" olarak görünüyor, genellikle bu sütun "category_name" olur.
      // Eğer bu sütun gerçekten kategorinin kendi adıysa, ismini "category_name" olarak düşünebilirsiniz.
      group_name: {
        type: Sequelize.JSONB, // PostgreSQL için JSONB tipi kullanıyoruz
        allowNull: true,
      },
      // is_category_enabled sütunu: Kategorinin etkin olup olmadığı (BOOLEAN)
      is_category_enabled: {
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
    // Bu migration geri alındığında tbl_categories tablosunu sil
    await queryInterface.dropTable('tbl_categories');
  },
};