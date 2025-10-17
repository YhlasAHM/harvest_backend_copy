'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // tbl_thresholds tablosunu oluşturma
    await queryInterface.createTable('tbl_thresholds', {
      // threshold_guid sütunu: Birincil Anahtar, UUID tipi ve varsayılan olarak UUIDV4
      threshold_guid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
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
      // threshold_min_value sütunu: Eşik minimum değeri (DECIMAL)
      threshold_min_value: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      // threshold_max_value sütunu: Eşik maksimum değeri (DECIMAL)
      threshold_max_value: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      // threshold_active_from sütunu: Eşiğin aktif olduğu başlangıç tarihi (TIMESTAMP(6))
      threshold_active_from: {
        type: 'TIMESTAMP(6)', // PostgreSQL için TIMESTAMP(6) kullanıyoruz
        allowNull: true,
      },
      // threshold_active_to sütunu: Eşiğin aktif olduğu bitiş tarihi (TIMESTAMP(6))
      threshold_active_to: {
        type: 'TIMESTAMP(6)', // PostgreSQL için TIMESTAMP(6) kullanıyoruz
        allowNull: true,
      },
      // threshold_number sütunu: Eşik numarası (INTEGER), otomatik artan ve benzersiz
      threshold_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true, // Eşik numarasının benzersiz olmasını sağlar
        autoIncrement: true, // Otomatik artan değer
      },
      // modified_dt sütunu: Son değiştirilme tarihi ve saati (TIMESTAMP(6)), varsayılan olarak şimdiki zaman
      modified_dt: {
        type: 'TIMESTAMP(6)', // PostgreSQL için TIMESTAMP(6) kullanıyoruz
        allowNull: true,
        defaultValue: Sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'), // PostgreSQL'e özel varsayılan değer
      },
    }, {
      tableName: 'tbl_thresholds',
      timestamps: false, // Modelde tanımlandığı gibi
    });
  },

  async down(queryInterface, Sequelize) {
    // Bu migration geri alındığında tbl_thresholds tablosunu sil
    await queryInterface.dropTable('tbl_thresholds');
  },
};