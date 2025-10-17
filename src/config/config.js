/* const fs = require('fs');
require('dotenv').config({ path: '../.env' });
const ENV = require('../config');

module.exports = {
  development: {
    username: ENV.LOCAL_DB_USERNAME,
    password: ENV.LOCAL_DB_PASSWORD,
    database: ENV.LOCAL_DB_NAME,
    host: ENV.LOCAL_DB_HOST,
    port: ENV.LOCAL_DB_PORT,
    dialect: ENV.LOCAL_DB_DIALECT,

    timezone: '+05:00', // keep it UTC for consistency

    // dialectOptions: {
    //   useUTC: false,
    //   timezone: '+05:00',
    // },
  },
  test: {
    username: process.env.CI_DB_USERNAME,
    password: process.env.CI_DB_PASSWORD,
    database: process.env.CI_DB_NAME,
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
  },
  production: {
    username: 'username',
    password: 'password',
    database: 'database',
    host: 'host',
    port: 'port',
    dialect: 'postgres',
  },
};


/* 
migrations */

/* npx sequelize-cli db:migrate:undo:all --config src/config/config.js
 */
/* 
npx sequelize-cli db:migrate --config src/config/config.js 
*/


/* fkey delete script */
/* 
SELECT
  conname AS constraint_name,
  conrelid::regclass AS table_name
FROM
pg_constraint
WHERE
contype = 'f';
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN
    SELECT conrelid::regclass AS table_name, conname AS constraint_name
    FROM pg_constraint
    WHERE contype = 'f'
LOOP
    EXECUTE format('ALTER TABLE %s DROP CONSTRAINT %s;', r.table_name, r.constraint_name);
  END LOOP;
END;
$$;
 */ 