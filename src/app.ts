import 'reflect-metadata';

import { container } from 'tsyringe';
import * as Websocket from 'ws';

import ConfigService from './services/config-service';

// Controllers
import RequestController from './controllers/request-controller';
import { IController } from './types/controller';

// Entry point for the app.
const mainAsync = async () => {
  // Initialize config
  const config = new ConfigService<Config>().loadConfigFromPath('./config.json');

  container.register<Config>('Config', { useValue: config });

  const server = new Websocket.Server({ port: config.websocketPort });

  server.on('open', () => {
    console.log(`${new Date()} New connection`);
  });

  server.on('connection', (socket) => {
    socket.on('message', container.resolve<IController>(RequestController).onMessage);

    socket.on('close', container.resolve<IController>(RequestController).onClose);
  });
};

mainAsync();
