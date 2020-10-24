import { autoInjectable, inject } from 'tsyringe';
// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import * as Websocket from 'ws';
import { receiveData } from '../types/controller';

import DaikinService from './daikin-service';

@autoInjectable()
export default class MessageService {
  config: Config;

  daikinService: DaikinService

  socket: Websocket

  constructor(@inject('Config') config: Config, daikinService: DaikinService) {
    this.config = config;
    this.daikinService = daikinService;
  }

  handleRequest = (data: receiveData, socket: Websocket): void => {
    this.socket = socket;

    this[data.name](data?.value);
  }

  getInfo = async (_data: string): Promise<void> => {
    this.socket
      .send(JSON.stringify({
        name: 'getInfo',
        data: await this.daikinService.getInfo(),
      }));
  }

  getSensorInfo = async (_data: string): Promise<void> => {
    this.socket
      .send(JSON.stringify({
        name: 'getSensorInfo',
        data: await this.daikinService.getTemperature(),
      }));
  }

  // Setters

  setData = async (data: postInfoData): Promise<void> => {
    const error = () => {
      this.socket.send(JSON.stringify({
        status: 400,
        message: 'Invalid data format',
      }));
    };

    if (!data?.f_dir || !data?.f_rate || !data?.mode) { error(); return; }

    if (!data?.pow || !data?.shum || !data?.stemp) { error(); return; }

    this.socket.send(JSON.stringify({
      name: 'setData',
      data: await this.daikinService.postInfo(data),
    }));
  }
}
