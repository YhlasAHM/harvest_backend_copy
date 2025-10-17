'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create the tbl_order_lines table
    await queryInterface.createTable('tbl_order_lines', {
      // order_line_id column: Primary Key, auto-incrementing integer
      order_line_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      // order_guid column: Foreign Key referencing tbl_orders
      order_guid: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'tbl_orders', // References the table name
          key: 'order_guid',   // Column in the referenced table
        },
        onUpdate: 'CASCADE',   // On update, cascade changes
        onDelete: 'CASCADE',  // On delete, restrict (prevent deletion if referenced)
      },
      // material_guid column: Foreign Key referencing tbl_materials
      material_guid: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'tbl_materials', // References the table name
          key: 'mtrl_guid',       // Column in the referenced table
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      // variant_guid column: Foreign Key referencing tbl_variants
      variant_guid: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'tbl_variants', // References the table name
          key: 'variant_guid',   // Column in the referenced table
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      // unit_det_guid column: Foreign Key referencing tbl_unit_details
      unit_det_guid: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'tbl_unit_details', // References the table name
          key: 'unit_det_guid',      // Column in the referenced table
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      // ord_line_amount column: Order line quantity (DECIMAL(18, 4)), defaults to 0.0000
      ord_line_amount: {
        type: Sequelize.DECIMAL(18, 4),
        allowNull: true,
        defaultValue: 0.0000,
      },
      // ord_line_price column: Order line unit price (DECIMAL(18, 4)), defaults to 0.0000
      ord_line_price: {
        type: Sequelize.DECIMAL(18, 4),
        allowNull: true,
        defaultValue: 0.0000,
      },
      // ord_line_total column: Order line total amount (DECIMAL(18, 4)), defaults to 0.0000
      ord_line_total: {
        type: Sequelize.DECIMAL(18, 4),
        allowNull: true,
        defaultValue: 0.0000,
      },
      // Since `timestamps: false` is set in the model, we don't add `createdAt` and `updatedAt` columns.
    });
  },

  async down(queryInterface, Sequelize) {
    // If this migration is rolled back, drop the tbl_order_lines table
    await queryInterface.dropTable('tbl_order_lines');
  },
};