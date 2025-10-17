'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'tbl_harvests',
      {
        harvest_guid: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        sector_guid: {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: 'tbl_sectors',
            key: 'sector_guid',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        harvest_datetime: {
          type: Sequelize.DATE(6),
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        harvest_weight: {
          type: Sequelize.NUMERIC,
          allowNull: false,
        },
        harvest_number: {
          type: Sequelize.SMALLINT,
          unique: true,
          autoIncrement: true,
        },
        harvest_empl_count: {
          type: Sequelize.SMALLINT,
          allowNull: true,
        },
        harvest_desc: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        harv_status_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'tbl_harv_statuses',
            key: 'harv_status_id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        modified_dt: {
          type: Sequelize.DATE(6),
          allowNull: true,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      {
        tableName: 'tbl_harvests',
        timestamps: false,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tbl_harvests');
  },
};
