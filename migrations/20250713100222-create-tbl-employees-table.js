'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // tbl_employees tablosunu oluşturma
        await queryInterface.createTable('tbl_employees', {
            // empl_guid sütunu: Birincil Anahtar, UUID tipi ve varsayılan olarak UUIDV4
            empl_guid: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            // empl_name sütunu: Çalışan adı (JSONB - PostgreSQL'e özel)
            empl_name: {
                type: Sequelize.JSONB, // PostgreSQL için JSONB tipi kullanıyoruz
                allowNull: false,
            },
            // prof_guid sütunu: tbl_professions tablosuna referans veren Yabancı Anahtar
            prof_guid: {
                type: Sequelize.UUID,
                allowNull: false, // Modelde allowNull: false
                references: {
                    model: 'tbl_professions', // Referans verilen tablo adı
                    key: 'prof_guid',         // Referans verilen sütun adı
                },
                onUpdate: 'CASCADE',   // Güncellemede cascade et
                onDelete: 'SET NULL',  // Modelde SET NULL olarak belirtilmiş, bu kritik bir farktır.
            },
            // empl_contact sütunu: Çalışan iletişim bilgisi (JSONB)
            empl_contact: {
                type: Sequelize.JSONB,
                allowNull: true,
            },
            empl_number: {
                type: Sequelize.SMALLINT,
                allowNull: false,
                unique: true, // Çalışan numarasının benzersiz olmasını sağlar
                autoIncrement: true, // Otomatik artan değer
            },
            // user_guid sütunu: tbl_users tablosuna referans veren Yabancı Anahtar
            user_guid: {
                type: Sequelize.UUID,
                allowNull: true, // Modelde allowNull: true
                references: {
                    model: 'tbl_users', // Referans verilen tablo adı
                    key: 'user_guid',   // Referans verilen sütun adı
                },
                onUpdate: 'CASCADE',   // Güncellemede cascade et
                onDelete: 'CASCADE',  // Silme işleminde kısıtla
            },
            is_specialist: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            // empl_is_enabled sütunu: Çalışanın etkin olup olmadığı (BOOLEAN), varsayılan true
            empl_is_enabled: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            modified_dt: {
                type: 'TIMESTAMP(6)', // PostgreSQL için TIMESTAMP(6) kullanıyoruz
                allowNull: true,
                defaultValue: Sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'), // PostgreSQL'e özel varsayılan değer
            },
            // Modelde `timestamps: false` olduğu için `createdAt` ve `updatedAt` sütunlarını eklemiyoruz.
        }, {
            tableName: 'tbl_employees',
            timestamps: false, // Modelde tanımlandığı gibi
        });
    },

    async down(queryInterface, Sequelize) {
        // Bu migration geri alındığında tbl_employees tablosunu sil
        await queryInterface.dropTable('tbl_employees');
    },
};