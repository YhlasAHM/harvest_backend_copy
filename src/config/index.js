require('dotenv').config();

const isDev = process.env.NODE_ENV === 'dev';

const ENV = {
  NODE_PORT: process.env.NODE_PORT,
  INIT_URL: process.env.INIT_URL,
  DB_USERNAME: isDev ? process.env.LOCAL_DB_USERNAME : process.env.REMOTE_DB_USERNAME,
  DB_PASSWORD: isDev ? process.env.LOCAL_DB_PASSWORD : process.env.REMOTE_DB_PASSWORD,
  DB_NAME: isDev ? process.env.LOCAL_DB_NAME : process.env.REMOTE_DB_NAME,
  DB_HOST: isDev ? process.env.LOCAL_DB_HOST : process.env.REMOTE_DB_HOST,
  DB_PORT: isDev ? process.env.LOCAL_DB_PORT : process.env.REMOTE_DB_PORT,
  DB_DIALECT: isDev ? process.env.LOCAL_DB_DIALECT : process.env.REMOTE_DB_DIALECT,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
};

module.exports = ENV;