'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // tbl_variants tablosunu oluşturma
    await queryInterface.createTable('tbl_variants', {
      // variant_guid sütunu: Birincil Anahtar, UUID tipi ve varsayılan olarak UUIDV4
      variant_guid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      index_number: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      // variant_name sütunu: Varyant adı (JSONB - PostgreSQL'e özel), benzersiz
      variant_name: {
        type: Sequelize.JSONB, // PostgreSQL için JSONB tipi kullanıyoruz
        allowNull: true,
      },
      // category_guid sütunu: tbl_categories tablosuna referans veren Yabancı Anahtar
      category_guid: {
        type: Sequelize.UUID,
        allowNull: false, // Modelde allowNull: false olarak belirtilmiş
        references: {
          model: 'tbl_categories', // Referans verilen tablo adı
          key: 'category_guid',    // Referans verilen sütun adı
        },
        onUpdate: 'CASCADE',   // Güncellemede cascade et
        onDelete: 'CASCADE',  // Silme işleminde kısıtla
      },
      // material_guid sütunu: tbl_materials tablosuna referans veren Yabancı Anahtar
      material_guid: {
        type: Sequelize.UUID,
        allowNull: false, // Modelde allowNull: false olarak belirtilmiş
        references: {
          model: 'tbl_materials', // Referans verilen tablo adı
          key: 'mtrl_guid',       // Referans verilen sütun adı
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      // is_variant_enabled sütunu: Varyantın etkin olup olmadığı (BOOLEAN)
      is_variant_enabled: {
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
    // Bu migration geri alındığında tbl_variants tablosunu sil
    await queryInterface.dropTable('tbl_variants');
  },
};