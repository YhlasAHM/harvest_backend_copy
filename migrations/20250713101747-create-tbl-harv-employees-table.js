'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // tbl_harv_employees tablosunu oluşturma
        await queryInterface.createTable('tbl_harv_employees', {
            // harv_empl_guid sütunu: Birincil Anahtar, UUID tipi ve varsayılan olarak UUIDV4
            harv_empl_guid: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            // harvest_guid sütunu: tbl_harvests tablosuna referans veren Yabancı Anahtar
            harvest_guid: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'tbl_harvests', // Referans verilen tablo adı
                    key: 'harvest_guid',   // Referans verilen sütun adı
                },
                onUpdate: 'CASCADE',   // Güncellemede cascade et
                onDelete: 'CASCADE',  // Silme işleminde kısıtla
            },
            // employee_guid sütunu: tbl_employees tablosuna referans veren Yabancı Anahtar
            // Modelinizde 'emloyee_guid' olarak belirtilmiş ancak büyük olasılıkla 'employee_guid' olması hedeflenmiştir.
            employee_guid: { // 'emloyee_guid' yerine 'employee_guid' kullanıldı
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'tbl_employees', // Referans verilen tablo adı
                    key: 'empl_guid',       // Modelde 'targetKey' olarak belirtildiği gibi (tbl_employees'ın birincil anahtarı)
                },
                onUpdate: 'CASCADE',   // Güncellemede cascade et
                onDelete: 'CASCADE',  // Silme işleminde kısıtla
            },
            is_enter_info: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            // row_number sütunu: Satır numarası (INTEGER), otomatik artan ve benzersiz
            row_number: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true, // Satır numarasının benzersiz olmasını sağlar (Bu alandaki 'unique' constraint'i iş mantığınıza göre gözden geçirin.)
                autoIncrement: true, // Otomatik artan değer
            },
            // Modelde `timestamps: false` olduğu için `createdAt` ve `updatedAt` sütunlarını eklemiyoruz.
        }, {
            tableName: 'tbl_harv_employees',
            timestamps: false, // Modelde tanımlandığı gibi
        });
    },

    async down(queryInterface, Sequelize) {
        // Bu migration geri alındığında tbl_harv_employees tablosunu sil
        await queryInterface.dropTable('tbl_harv_employees');
    },
};