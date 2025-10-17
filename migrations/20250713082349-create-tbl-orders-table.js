'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // tbl_orders tablosunu oluşturma
    await queryInterface.createTable('tbl_orders', {
      // order_guid sütunu: Birincil Anahtar, UUID tipi ve varsayılan olarak UUIDV4
      order_guid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      // group_guid sütunu: tbl_groups tablosuna referans veren Yabancı Anahtar
      group_guid: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'tbl_groups', // Referans verilen tablo adı
          key: 'group_guid',   // Referans verilen sütun adı
        },
        onUpdate: 'CASCADE',   // Güncellemede cascade et
        onDelete: 'CASCADE',  // Silme işleminde kısıtla
      },
      // order_datetime sütunu: Sipariş tarihi ve saati (TIMESTAMP(6)), varsayılan olarak şimdiki zaman
      order_datetime: {
        type: 'TIMESTAMP(6)', // PostgreSQL için TIMESTAMP(6) kullanıyoruz
        allowNull: true,
        defaultValue: Sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'), // PostgreSQL'e özel varsayılan değer
      },
      // order_code sütunu: Sipariş kodu (TEXT)
      order_code: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      // client_guid sütunu: tbl_clients tablosuna referans veren Yabancı Anahtar
      client_guid: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'tbl_clients', // Referans verilen tablo adı
          key: 'client_guid',   // Referans verilen sütun adı
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      // delivery_address sütunu: Teslimat adresi (TEXT)
      delivery_address: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      // price_type_guid sütunu: tbl_price_types tablosuna referans veren Yabancı Anahtar
      price_type_guid: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'tbl_price_types', // Referans verilen tablo adı
          key: 'price_type_guid',   // Referans verilen sütun adı
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      // order_desc sütunu: Sipariş açıklaması (TEXT)
      order_desc: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      // order_status_id sütunu: tbl_order_statuses tablosuna referans veren Yabancı Anahtar
      order_status_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'tbl_order_statuses', // Referans verilen tablo adı
          key: 'ord_status_id',       // Referans verilen sütun adı
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      // ord_total_sum sütunu: Sipariş toplam tutarı (DECIMAL(18, 4)), varsayılan olarak 0.0000
      ord_total_sum: {
        type: Sequelize.DECIMAL(18, 4),
        allowNull: true,
        defaultValue: 0.0000,
      },
      // supplier_guid sütunu: tbl_suppliers tablosuna referans veren Yabancı Anahtar
      supplier_guid: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'tbl_suppliers', // Referans verilen tablo adı
          key: 'supplier_guid',   // Referans verilen sütun adı
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      // Modelde `timestamps: false` olduğu için `createdAt` ve `updatedAt` sütunlarını eklemiyoruz.
    });
  },

  async down(queryInterface, Sequelize) {
    // Bu migration geri alındığında tbl_orders tablosunu sil
    await queryInterface.dropTable('tbl_orders');
  },
};