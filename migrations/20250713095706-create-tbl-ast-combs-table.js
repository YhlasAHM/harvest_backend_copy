'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // tbl_ast_combs tablosunu oluşturma
    await queryInterface.createTable('tbl_ast_combs', {
      // ast_guid sütunu: Birincil Anahtar, UUID tipi ve varsayılan olarak UUIDV4
      ast_guid: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      // arch_guid sütunu: tbl_archs tablosuna referans veren Yabancı Anahtar
      arch_guid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'tbl_archs', // Referans verilen tablo adı
          key: 'arch_guid'    // Referans verilen sütun adı
        },
        onUpdate: 'CASCADE',   // Güncellemede cascade et
        onDelete: 'CASCADE',  // Silme işleminde kısıtla
      },
      // stand_guid sütunu: tbl_stands tablosuna referans veren Yabancı Anahtar
      stand_guid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'tbl_stands', // Referans verilen tablo adı
          key: 'stand_guid'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      // track_guid sütunu: tbl_tracks tablosuna referans veren Yabancı Anahtar
      track_guid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'tbl_tracks', // Referans verilen tablo adı
          key: 'track_guid'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      // modified_dt sütunu: Son değiştirilme tarihi ve saati (TIMESTAMP(6)), varsayılan olarak şimdiki zaman
      modified_dt: {
        type: 'TIMESTAMP(6)', // PostgreSQL için TIMESTAMP(6) kullanıyoruz
        allowNull: true,
        defaultValue: Sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'), // PostgreSQL'e özel varsayılan değer
      },
      // Modelde `timestamps: false` olduğu için `createdAt` ve `updatedAt` sütunlarını eklemiyoruz.
    }, {
      tableName: 'tbl_ast_combs',
      timestamps: false, // Modelde tanımlandığı gibi
    });
  },

  async down(queryInterface, Sequelize) {
    // Bu migration geri alındığında tbl_ast_combs tablosunu sil
    await queryInterface.dropTable('tbl_ast_combs');
  },
};