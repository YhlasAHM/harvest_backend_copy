'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create the tbl_sensor_types table
    await queryInterface.createTable('tbl_sensor_types', {
      // sensor_type_guid column: Primary Key, UUID type, and defaults to UUIDV4
      sensor_type_guid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      // sensor_type_code column: Sensor type code (STRING), unique and not null
      sensor_type_code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // Ensures the sensor type code is unique
      },
      // sensor_type_unit column: Sensor type unit (CHAR(2)), not null
      sensor_type_unit: {
        type: Sequelize.CHAR(2),
        allowNull: false,
      },
      // sensor_type_desc column: Sensor type description (JSONB)
      sensor_type_desc: {
        type: Sequelize.JSONB, // Using JSONB type for PostgreSQL
        allowNull: true,
      },
      // sensor_type_number column: Sensor type number (INTEGER), auto-incrementing and unique
      sensor_type_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true, // Ensures the sensor type number is unique
        autoIncrement: true, // Auto-incrementing value
      },
      // modified_dt column: Last modification timestamp (TIMESTAMP(6)), defaults to current time
      modified_dt: {
        type: 'TIMESTAMP(6)', // Using TIMESTAMP(6) for PostgreSQL
        allowNull: true,
        defaultValue: Sequelize.literal('(CURRENT_TIMESTAMP)::timestamp without time zone'), // PostgreSQL-specific default value
      },
    }, {
      tableName: 'tbl_sensor_types',
      timestamps: false, // As defined in your model
    });
  },

  async down(queryInterface, Sequelize) {
    // If this migration is rolled back, drop the tbl_sensor_types table
    await queryInterface.dropTable('tbl_sensor_types');
  },
};