'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // tbl_sensors tablosunu oluşturma
    await queryInterface.createTable('tbl_sensors', {
      // sensor_guid sütunu: Birincil Anahtar, UUID tipi ve varsayılan olarak UUIDV4
      sensor_guid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      // device_guid sütunu: tbl_devices tablosuna referans veren Yabancı Anahtar
      device_guid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'tbl_devices', // Referans verilen tablo adı
          key: 'device_guid',   // Referans verilen sütun adı
        },
        onUpdate: 'CASCADE',   // Güncellemede cascade et
        onDelete: 'CASCADE',  // Silme işleminde kısıtla
      },
      // sensor_type_guid sütunu: tbl_sensor_types tablosuna referans veren Yabancı Anahtar
      sensor_type_guid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'tbl_sensor_types', // Referans verilen tablo adı
          key: 'sensor_type_guid',   // Referans verilen sütun adı
        },
        onUpdate: 'CASCADE',   // Güncellemede cascade et
        onDelete: 'CASCADE',  // Silme işleminde kısıtla
      },
      // s_serial_number sütunu: Sensör seri numarası (TEXT), benzersiz
      s_serial_number: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true, // Seri numarasının benzersiz olmasını sağlar
      },
      // installed_dt sütunu: Kurulum tarihi ve saati (TIMESTAMP(6)), varsayılan olarak şimdiki zaman
      installed_dt: {
        type: 'TIMESTAMP(6)', // PostgreSQL için TIMESTAMP(6) kullanıyoruz
        allowNull: true,
        defaultValue: Sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'), // PostgreSQL'e özel varsayılan değer
      },
      // status_guid sütunu: tbl_statuses tablosuna referans veren Yabancı Anahtar
      status_guid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'tbl_statuses', // Referans verilen tablo adı
          key: 'status_guid',   // Referans verilen sütun adı
        },
        onUpdate: 'CASCADE',   // Güncellemede cascade et
        onDelete: 'CASCADE',  // Silme işleminde kısıtla
      },
      // arch_guid sütunu: tbl_archs tablosuna referans veren Yabancı Anahtar
      arch_guid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'tbl_archs', // Referans verilen tablo adı
          key: 'arch_guid',   // Referans verilen sütun adı
        },
        onUpdate: 'CASCADE',   // Güncellemede cascade et
        onDelete: 'CASCADE',  // Silme işleminde kısıtla
      },
      // sensor_number sütunu: Sensör numarası (INTEGER), otomatik artan ve benzersiz
      sensor_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true, // Sensör numarasının benzersiz olmasını sağlar
        autoIncrement: true, // Otomatik artan değer
      },
      // Modelde `timestamps: false` olduğu için `createdAt` ve `updatedAt` sütunlarını eklemiyoruz.
    });
  },

  async down(queryInterface, Sequelize) {
    // Bu migration geri alındığında tbl_sensors tablosunu sil
    await queryInterface.dropTable('tbl_sensors');
  },
};