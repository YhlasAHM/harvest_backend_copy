'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // tbl_clients tablosunu oluşturma
    await queryInterface.createTable('tbl_clients', {
      // client_guid sütunu: Birincil Anahtar, UUID tipi ve varsayılan olarak UUIDV4
      client_guid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      // client_name sütunu: Müşteri adı (JSONB - PostgreSQL'e özel)
      client_name: {
        type: Sequelize.JSONB, // PostgreSQL için JSONB tipi kullanıyoruz
        allowNull: true,
      },
      // client_address sütunu: Müşteri adresi (JSONB)
      client_address: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      // client_phones sütunu: Müşteri telefon numaraları (TEXT)
      client_phones: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      // price_type_guid sütunu: tbl_price_types tablosuna referans veren Yabancı Anahtar
      price_type_guid: {
        type: Sequelize.UUID,
        allowNull: true, // Modelde allowNull: true olarak belirtilmiş
        references: {
          model: 'tbl_price_types', // Referans verilen tablo adı
          key: 'price_type_guid',   // Referans verilen sütun adı
        },
        onUpdate: 'CASCADE',   // Güncellemede cascade et
        onDelete: 'CASCADE',  // Silme işleminde kısıtla
      },
      // client_gps_latitude sütunu: GPS Enlemi (TEXT)
      client_gps_latitude: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      // client_gps_longitude sütunu: GPS Boylamı (TEXT)
      client_gps_longitude: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      // is_client_enabled sütunu: Müşterinin etkin olup olmadığı (BOOLEAN)
      is_client_enabled: {
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
    // Bu migration geri alındığında tbl_clients tablosunu sil
    await queryInterface.dropTable('tbl_clients');
  },
};