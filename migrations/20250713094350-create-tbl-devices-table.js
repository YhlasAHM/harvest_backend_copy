'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // tbl_devices tablosunu oluşturma
    await queryInterface.createTable('tbl_devices', {
      // device_guid sütunu: Birincil Anahtar, UUID tipi ve varsayılan olarak UUIDV4
      device_guid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      // d_serial_num sütunu: Cihaz seri numarası (TEXT), benzersiz
      d_serial_num: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true, // Seri numarasının benzersiz olmasını sağlar
      },
      // device_number sütunu: Cihaz numarası (INTEGER), otomatik artan ve benzersiz
      device_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true, // Cihaz numarasının benzersiz olmasını sağlar
        autoIncrement: true, // Otomatik artan değer
      },
      // installed_dt sütunu: Kurulum tarihi ve saati (TIMESTAMP(6))
      installed_dt: {
        type: 'TIMESTAMP(6)', // PostgreSQL için TIMESTAMP(6) kullanıyoruz
        allowNull: true,
      },
      // Modelde `timestamps: false` olduğu için `createdAt` ve `updatedAt` sütunlarını eklemiyoruz.
    });
  },

  async down(queryInterface, Sequelize) {
    // Bu migration geri alındığında tbl_devices tablosunu sil
    await queryInterface.dropTable('tbl_devices');
  },
};