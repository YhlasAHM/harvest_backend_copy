'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // tbl_readings tablosunu oluşturma
    await queryInterface.createTable('tbl_readings', {
      // reading_guid sütunu: Birincil Anahtar, UUID tipi ve varsayılan olarak UUIDV4
      reading_guid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      // sensor_guid sütunu: tbl_sensors tablosuna referans veren Yabancı Anahtar
      sensor_guid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'tbl_sensors', // Referans verilen tablo adı
          key: 'sensor_guid',   // Referans verilen sütun adı
        },
        onUpdate: 'CASCADE',   // Güncellemede cascade et
        onDelete: 'CASCADE',  // Silme işleminde kısıtla
      },
      // reading_dt sütunu: Okuma tarihi ve saati (TIMESTAMP(6))
      reading_dt: {
        type: 'TIMESTAMP(6)', // PostgreSQL için TIMESTAMP(6) kullanıyoruz
        allowNull: false,
      },
      // reading_value sütunu: Okuma değeri (DECIMAL)
      reading_value: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      // reading_number sütunu: Okuma numarası (INTEGER), otomatik artan ve benzersiz
      reading_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true, // Okuma numarasının benzersiz olmasını sağlar
        autoIncrement: true, // Otomatik artan değer
      },
      // Modelde `timestamps: false` olduğu için `createdAt` ve `updatedAt` sütunlarını eklemiyoruz.
    }, {
      tableName: 'tbl_readings',
      timestamps: false, // Modelde tanımlandığı gibi
    });
  },

  async down(queryInterface, Sequelize) {
    // Bu migration geri alındığında tbl_readings tablosunu sil
    await queryInterface.dropTable('tbl_readings');
  },
};