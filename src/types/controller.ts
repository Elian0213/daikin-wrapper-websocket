// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import * as Websocket from 'ws';
import WebSocket = require('ws');

export interface IController {
  onMessage(data: WebSocket.Data): void;
}

export interface IEventController {
  onOpen(): void;
  onClose(): void;
}

export interface receiveData {
  name: string;
  value?: any;
}

// "{ name: 'getInfo' }"
