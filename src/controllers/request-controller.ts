import { autoInjectable } from 'tsyringe';
import { Data } from 'ws';
import DaikinService from '../services/daikin-service';

import { IController } from '../types/controller';

@autoInjectable()
export default class RequestController implements IController {
  daikinService: DaikinService

  constructor(daikinService: DaikinService) {
    this.daikinService = daikinService;
  }

  onMessage = async (data: Data): Promise<void> => {
    console.log(`Message received ${new Date()}`);
    const actData = await this.daikinService.getTemperature();

    console.log(actData);
    console.log(data);
  }

  onClose = (): void => {
    console.log(`[Socket] Connection closed ${new Date()}`);
  }
}
