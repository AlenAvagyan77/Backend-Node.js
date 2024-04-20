import { API } from './api';
import { TypeORM } from './db';
import { Container } from 'typedi';
import { WebSocketService } from './websocket';
import SocketIO from './SocketIO';
import logger from '@/lib/logger';

(async () => {
  try {
    await TypeORM.init();
    const httpServer = await API.init();
    const webSocketService = Container.get(WebSocketService);
    await webSocketService.init();
    await SocketIO.init(httpServer);
  } catch (e) {
    logger.error(e);
  }
})();
