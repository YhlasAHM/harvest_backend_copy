'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // tbl_users tablosunu oluşturma
    await queryInterface.createTable('tbl_users', {
      // user_guid sütunu: Birincil Anahtar, UUID tipi ve varsayılan olarak UUIDV4
      user_guid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      // user_name sütunu: Kullanıcı adı (STRING), benzersiz
      user_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // user_password sütunu: Kullanıcı şifresi (STRING)
      // NOT: Şifreleme (hooks içinde yapılan) veritabanı şemasını etkilemez.
      user_password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // user_is_admin sütunu: Kullanıcının yönetici olup olmadığı (BOOLEAN), varsayılan false
      user_is_admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      // user_is_login sütunu: Kullanıcının giriş yapabilir olup olmadığı (BOOLEAN), varsayılan true
      user_is_login: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      // modified_dt sütunu: Son değiştirilme tarihi ve saati (TIMESTAMP(6)), varsayılan olarak şimdiki zaman
      modified_dt: {
        type: 'TIMESTAMP(6)', // PostgreSQL için TIMESTAMP(6) kullanıyoruz
        allowNull: true,
        defaultValue: Sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'), // PostgreSQL'e özel varsayılan değer
      },
      // user_number sütunu: Kullanıcı numarası (SMALLINT), otomatik artan ve benzersiz
      user_number: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        unique: true, // Kullanıcı numarasının benzersiz olmasını sağlar
        autoIncrement: true, // Otomatik artan değer
      },
      // Modelde `timestamps: false` olduğu için `createdAt` ve `updatedAt` sütunlarını eklemiyoruz.
      // `hooks` (beforeCreate/beforeUpdate) veritabanı şemasını etkilemez, bu yüzden migration'a dahil edilmez.
    }, {
      tableName: 'tbl_users',
      timestamps: false, // Modelde tanımlandığı gibi
    });
  },

  async down(queryInterface, Sequelize) {
    // Bu migration geri alındığında tbl_users tablosunu sil
    await queryInterface.dropTable('tbl_users');
  },
};