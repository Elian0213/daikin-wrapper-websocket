import { autoInjectable, inject } from 'tsyringe';
import { Data } from 'ws';
// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import * as Websocket from 'ws';

import { IController, receiveData } from '../types/controller';
import MessageService from '../services/message-service';

@autoInjectable()
export default class MessageController implements IController {
  actions: string[]

  socket: Websocket

  messageService: MessageService

  constructor(@inject('Socket') connection: Websocket, messageService: MessageService) {
    this.socket = connection;

    this.messageService = messageService;

    this.actions = [
      /**
       * Getters
       */
      'getInfo', // Retreive all info
      'getSensorInfo', // Get all sensor info
      /**
       * Setters
       */
      'setData', // Update AC info
    ];
  }

  badRequest = (): void => {
    this.socket.send(JSON.stringify({
      status: 400,
      message: 'Invalid request',
    }));
  }

  validRequest = (request: string): boolean => {
    try {
      const data: receiveData = JSON.parse(request);
      if (data?.name) return true;
    } catch {
      return false;
    }

    return false;
  }

  onMessage = async (message: Data): Promise<void> => {
    const data = message as string;

    if (!this.validRequest(data)) {
      console.log(`[Daikin] Invalid JSON format: ${data}`);

      this.badRequest();
      return;
    }

    const request: receiveData = JSON.parse(data);

    if (!this.actions.includes(request.name)) {
      console.log(`[Daikin] Invalid request type: ${data}`);

      this.badRequest();
      return;
    }

    this.messageService.handleRequest(request, this.socket);
  }
}
