import 'reflect-metadata';

import { container } from 'tsyringe';
import * as Websocket from 'ws';

import ConfigService from './services/config-service';
import { IController, IEventController } from './types/controller';

// Controllers
import MessageController from './controllers/message-controller';
import EventController from './controllers/event-controller';

// Entry point for the app.
const mainAsync = async () => {
  // Initialize config
  const config = new ConfigService<Config>().loadConfigFromPath('./config.json');

  container.register<Config>('Config', { useValue: config });

  const server = new Websocket.Server({ port: config.websocketPort });

  console.log(`[Socket] Running on port: ${config.websocketPort}`);

  server.on('connection', container.resolve<IEventController>(EventController).onOpen);

  server.on('connection', (socket) => {
    container.register('Socket', { useValue: socket });

    socket.on('message', container.resolve<IController>(MessageController).onMessage);

    socket.on('close', container.resolve<IEventController>(EventController).onClose);
  });
};

mainAsync();
