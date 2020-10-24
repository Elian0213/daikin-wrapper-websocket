import { autoInjectable } from 'tsyringe';
import DaikinService from '../services/daikin-service';

import { IEventController } from '../types/controller';

@autoInjectable()
export default class EventController implements IEventController {
  daikinService: DaikinService

  constructor(daikinService: DaikinService) {
    this.daikinService = daikinService;
  }

  onOpen = async (): Promise<void> => {
    console.log(`[Socket] Connection opened ${new Date()}`);
  }

  onClose = (): void => {
    console.log(`[Socket] Connection closed ${new Date()}`);
  }
}
