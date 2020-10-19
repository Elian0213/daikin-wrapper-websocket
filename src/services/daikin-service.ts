import { autoInjectable, inject } from 'tsyringe';
import Axios from 'axios';

@autoInjectable()
export default class DaikinService {
  config: Config;

  constructor(@inject('Config') config: Config) {
    this.config = config;
  }

  /**
   * This converts the weird CSV-like data that the Daikin API gives you into a JSON object
   * @param inputString
   */
  convertData = (inputString: string): JSON|string => {
    let input = inputString;

    const escapeRegExp = (str) => str
      .replace(/([.*+?^=!:${}()|[\]/\\]")/g, '\\$1');

    const replaceAll = (str, find, replace) => str
      .replace(new RegExp(escapeRegExp(find), 'g'), replace);

    if (Buffer.isBuffer(input)) { input = input.toString(); }

    return JSON.parse(`{"${replaceAll(replaceAll(input, '=', '":"'), ',', '","')}"}`);
  }

  /**
   * This is to obtain AC settings like,
   * power status, heating/cooling mode etc..
   */
  getInfo = async (): Promise<controlInfo|unknown> => Axios
    .get(`http://${this.config.daikinIP}/aircon/get_control_info`)
    .then((data: { data: string }) => this.convertData(data.data))
    .catch(() => {
      // Should never happen, so exit process.
      console.log(`[Daikin] Couldn't fetch, are you sure ${this.config.daikinIP} is the IP of your AC?`);
      process.exit();
    })

  /**
   * Obtain sensor information like
   * Temperature inside & outside :D
   */
  getTemperature = async (): Promise<unknown> => Axios
    .get(`http://${this.config.daikinIP}/aircon/get_sensor_info`)
    .then((data: { data: string }) => this.convertData(data.data))
    .catch(() => {
      // Should never happen, so exit process.
      console.log(`[Daikin] Couldn't fetch, are you sure ${this.config.daikinIP} is the IP of your AC?`);
      process.exit();
    })
}
