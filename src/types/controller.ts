import WebSocket = require('ws');

export interface IController {
  onMessage(data: WebSocket.Data): void;
  onClose(): void;
}
