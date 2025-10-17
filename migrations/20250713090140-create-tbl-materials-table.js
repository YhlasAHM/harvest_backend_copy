'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // tbl_materials tablosunu oluşturma
    await queryInterface.createTable('tbl_materials', {
      // mtrl_guid sütunu: Birincil Anahtar, UUID tipi ve varsayılan olarak UUIDV4
      mtrl_guid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      // mtrl_name sütunu: Materyal adı (JSONB - PostgreSQL'e özel), benzersiz
      mtrl_name: {
        type: Sequelize.JSONB, // PostgreSQL için JSONB tipi kullanıyoruz
        allowNull: true,

      },
      // mtrl_code sütunu: Materyal kodu (TEXT), benzersiz
      mtrl_code: {
        type: Sequelize.TEXT, // Modelde STRING(100) yerine TEXT olarak güncellendi.
        allowNull: true,
        unique: true, // Materyal kodunun benzersiz olmasını sağlar
      },
      // mtrl_desc sütunu: Materyal açıklaması (JSONB)
      mtrl_desc: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      // category_guid sütunu: tbl_categories tablosuna referans veren Yabancı Anahtar
      category_guid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'tbl_categories', // Referans verilen tablo adı
          key: 'category_guid',    // Referans verilen sütun adı
        },
        onUpdate: 'CASCADE',   // Güncellemede cascade et
        onDelete: 'CASCADE',  // Silme işleminde kısıtla
      },
      // mark_guid sütunu: tbl_marks tablosuna referans veren Yabancı Anahtar
      mark_guid: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'tbl_marks', // Referans verilen tablo adı
          key: 'mark_guid',   // Referans verilen sütun adı
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      // unit_guid sütunu: tbl_units tablosuna referans veren Yabancı Anahtar
      unit_guid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'tbl_units', // Referans verilen tablo adı
          key: 'unit_guid',   // Referans verilen sütun adı
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      // is_weight_use sütunu: Ağırlık kullanımının olup olmadığı (BOOLEAN)
      is_weight_use: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      // use_variants sütunu: Varyant kullanımının olup olmadığı (BOOLEAN)
      use_variants: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      // owner_is_group sütunu: Sahibinin grup olup olmadığı (BOOLEAN)
      owner_is_group: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      // is_mtrl_enabled sütunu: Materyalin etkin olup olmadığı (BOOLEAN)
      is_mtrl_enabled: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      // mtrl_type_id sütunu: tbl_mtrl_types tablosuna referans veren Yabancı Anahtar
      mtrl_type_id: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        references: {
          model: 'tbl_mtrl_types', // Referans verilen tablo adı
          key: 'mtrl_type_id',     // Referans verilen sütun adı
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    // Bu migration geri alındığında tbl_materials tablosunu sil
    await queryInterface.dropTable('tbl_materials');
  },
};