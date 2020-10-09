import { createConnection } from 'typeorm';
import log from 'fancy-log';
import config from 'config';

const { type } = config.get('database');

try {
  const connection = async () => createConnection(require('../configs/ormconfig'));
  connection();

  log(`${type.toUpperCase()} Database Connected`);
} catch (error) {
  throw new Error(error.message);
}
