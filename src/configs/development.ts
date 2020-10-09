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
    type: process.env.TMS_DB_TYPE || 'sqlite',
    name: process.env.TMS_DB_NAME,
  },
  mail: {
    apiKey: process.env.TMS_SENDGRID_API_KEY || '', // Sendgrid key here
  },
};
