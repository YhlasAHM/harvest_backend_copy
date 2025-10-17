'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // tbl_alerts tablosunu oluşturma
    await queryInterface.createTable('tbl_alerts', {
      // alert_guid sütunu: Birincil Anahtar, UUID tipi ve varsayılan olarak UUIDV4
      alert_guid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      // reading_guid sütunu: tbl_readings tablosuna referans veren Yabancı Anahtar
      reading_guid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'tbl_readings', // Referans verilen tablo adı
          key: 'reading_guid',   // Referans verilen sütun adı
        },
        onUpdate: 'CASCADE',   // Güncellemede cascade et
        onDelete: 'CASCADE',  // Silme işleminde kısıtla
      },
      // threshold_guid sütunu: tbl_thresholds tablosuna referans veren Yabancı Anahtar
      threshold_guid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'tbl_thresholds', // Referans verilen tablo adı
          key: 'threshold_guid',   // Referans verilen sütun adı
        },
        onUpdate: 'CASCADE',   // Güncellemede cascade et
        onDelete: 'CASCADE',  // Silme işleminde kısıtla
      },
      // alert_severity sütunu: Uyarı şiddeti (TEXT)
      alert_severity: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      // created_dt sütunu: Oluşturulma tarihi ve saati (TIMESTAMP(6))
      created_dt: {
        type: 'TIMESTAMP(6)', // PostgreSQL için TIMESTAMP(6) kullanıyoruz
        allowNull: true,
        defaultValue: Sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'),
        // Modelde defaultValue belirtilmemiş, bu yüzden migration'a da eklenmedi.
        // Eğer bir varsayılan değer olmalıysa, buraya eklemeniz gerekir.
      },
      // alert_status sütunu: Uyarı durumu (TEXT)
      alert_status: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      // resolved_dt sütunu: Çözülme tarihi ve saati (TIMESTAMP(6))
      resolved_dt: {
        type: 'TIMESTAMP(6)', // PostgreSQL için TIMESTAMP(6) kullanıyoruz
        allowNull: true,
        defaultValue: Sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'),
      },
      // alert_number sütunu: Uyarı numarası (INTEGER), otomatik artan ve benzersiz
      alert_number: {
        type: Sequelize.INTEGER,
        allowNull: true, // Modelde allowNull: true, ancak autoIncrement ve unique ile kullanılması biraz ilginç.
        // Eğer bu alanın her zaman bir değer alması ve benzersiz olması isteniyorsa allowNull: false olmalı.
        unique: true, // Uyarı numarasının benzersiz olmasını sağlar
        autoIncrement: true, // Otomatik artan değer
      },
      // Modelde `timestamps: false` olduğu için `createdAt` ve `updatedAt` sütunlarını eklemiyoruz.
    }, {
      tableName: 'tbl_alerts',
      timestamps: false, // Modelde tanımlandığı gibi
    });
  },

  async down(queryInterface, Sequelize) {
    // Bu migration geri alındığında tbl_alerts tablosunu sil
    await queryInterface.dropTable('tbl_alerts');
  },
};