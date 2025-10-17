'use strict';

module.exports = (sequelize, DataTypes) => {
	const tbl_professions = sequelize.define(
		'tbl_professions',
		{
			prof_guid: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			update_count: {
				defaultValue: 0,
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			prof_name: {
				type: DataTypes.JSONB,
				allowNull: false,
			},
			prof_number: {
				type: DataTypes.SMALLINT,
				allowNull: false,
				unique: true,
				autoIncrement: true,
			},
			prof_is_enabled: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
			},
		},
		{
			tableName: 'tbl_professions',
			timestamps: false,
		},
	);

	// Associations
	tbl_professions.associate = (models) => {
		tbl_professions.hasMany(models.tbl_employees, {
			foreignKey: 'prof_guid',
			as: 'tbl_employees',
		});

		tbl_professions.hasMany(models.tbl_harv_agronomists, {
			foreignKey: 'prof_guid',
			as: 'tbl_harv_agronomists',
		});
	};

	return tbl_professions;
};