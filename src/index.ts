import { API } from './api';
import { TypeORM } from './db';
import {Container} from 'typedi';
import {WebSocketService} from './websocket';

(async () => {
  try {
    await TypeORM.init();
    await API.init();
    const webSocketService = Container.get(WebSocketService);
    await webSocketService.init();
  } catch (e) {
    console.log(e);
  }
})();
