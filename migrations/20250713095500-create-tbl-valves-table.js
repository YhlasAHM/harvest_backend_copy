'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // tbl_valves tablosunu oluşturma
    await queryInterface.createTable('tbl_valves', {
      // valve_guid sütunu: Birincil Anahtar, UUID tipi ve varsayılan olarak UUIDV4
      valve_guid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      // sector_guid sütunu: tbl_sectors tablosuna referans veren Yabancı Anahtar
      sector_guid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'tbl_sectors', // Referans verilen tablo adı
          key: 'sector_guid',   // Referans verilen sütun adı
        },
        onUpdate: 'CASCADE',   // Güncellemede cascade et
        onDelete: 'CASCADE',  // Silme işleminde kısıtla (Modelde CASCADE, ama burada RESTRICT daha güvenli bir başlangıç olur. İhtiyaca göre değiştirilebilir.)
      },
      // valve_name sütunu: Vana adı (JSONB - PostgreSQL'e özel), benzersiz
      valve_name: {
        type: Sequelize.JSONB, // PostgreSQL için JSONB tipi kullanıyoruz
        allowNull: false,
      },
      // valve_desc sütunu: Vana açıklaması (JSONB)
      valve_desc: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      // valve_params sütunu: Vana parametreleri (JSONB)
      valve_params: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      // modified_dt sütunu: Son değiştirilme tarihi ve saati (TIMESTAMP(6)), varsayılan olarak şimdiki zaman
      modified_dt: {
        type: 'TIMESTAMP(6)', // PostgreSQL için TIMESTAMP(6) kullanıyoruz
        allowNull: true,
        defaultValue: Sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'), // PostgreSQL'e özel varsayılan değer
      },
      // valve_number sütunu: Vana numarası (SMALLINT), otomatik artan ve benzersiz
      valve_number: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        autoIncrement: true, // Otomatik artan değer
        unique: true, // Vana numarasının benzersiz olmasını sağlar
      },
      // valve_is_enabled sütunu: Vananın etkin olup olmadığı (BOOLEAN)
      valve_is_enabled: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      // Modelde `timestamps: false` olduğu için `createdAt` ve `updatedAt` sütunlarını eklemiyoruz.
    });
  },

  async down(queryInterface, Sequelize) {
    // Bu migration geri alındığında tbl_valves tablosunu sil
    await queryInterface.dropTable('tbl_valves');
  },
};