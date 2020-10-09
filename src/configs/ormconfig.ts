import * as path from 'path';
import config from 'config';

const { type } = config.get('database');

const srcPath = (...segments: string[]) => path.join(__dirname, '../database', ...segments);

const conneection = {
  name: 'default',
  type,
  database: srcPath('tms.sqlite'),
  entities: [srcPath('entity', '*{.ts,.js}')],
  synchronize: true,
  migrationsTableName: '_migrations',
};

if (module) {
  module.exports = conneection;
}

export default conneection;
