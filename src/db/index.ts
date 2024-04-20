import appDataSource from './appDataSource';
import logger from '@/lib/logger';

export class TypeORM {
  static async init() {
    try {
      await appDataSource.initialize();
      logger.info('db connection has been initialized!');
    } catch (err) {
      logger.error('Error during db connection initialization:', err);
      throw err;
    }
  }

  static async close() {
    try {
      await appDataSource.destroy();
      logger.info('Db connection has been closed!');
    } catch (err) {
      logger.error('Error during Db connection closing:', err);
      throw err;
    }
  }
}
