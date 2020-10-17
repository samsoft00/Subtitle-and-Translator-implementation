// tslint:disable-next-line: no-var-requires
require('dotenv').config();

module.exports = {
  general: {
    env: 'development',
    baseUrl: process.env.TMS_BASE_URL || 'http://127.0.0.1',
    port: process.env.PORT || 3000,
    maxUploadFileSize: process.env.TMS_MAX_UPLOAD_SIZE || 10 * 1024 * 1024, // 100MB,
  },
  database: {
    type: process.env.TMS_DB_TYPE || 'postgres',
    host: process.env.TMS_DB_HOST,
    port: process.env.TMS_DB_PORT,
    username: process.env.TMS_DB_USERNAME,
    password: process.env.TMS_DB_PASSWORD,
    name: process.env.TMS_DB_NAME,
  },
  mail: {
    apiKey: process.env.TMS_SENDGRID_API_KEY || '', // Sendgrid key here
  },
};
