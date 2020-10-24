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

  postInfo = async (data: postInfoData): Promise<unknown> => Axios
    .get(`http://${this.config.daikinIP}/aircon/set_control_info?pow=${data.pow}&mode=${data.mode}&stemp=${data.stemp}&shum=${data.shum}&f_rate=${data.f_rate}&f_dir=${data.f_dir}`)
    .then((resp) => {
      console.log(`${new Date()} ${resp.data}`);

      return {
        status: 200,
        message: 'AC Data updated',
      };
    })
    .catch(() => {
      console.log(`[Daikin] Couldn't POST, are you sure ${this.config.daikinIP} is the IP of your AC?`);
      process.exit();
    })

  /**
   * This is to obtain AC settings like,
   * power status, heating/cooling mode etc..
   * @type controlInfo
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
   * @type sensorInfo
   */
  getTemperature = async (): Promise<sensorInfo|unknown> => Axios
    .get(`http://${this.config.daikinIP}/aircon/get_sensor_info`)
    .then((data: { data: string }) => this.convertData(data.data))
    .catch(() => {
      // Should never happen, so exit process.
      console.log(`[Daikin] Couldn't fetch, are you sure ${this.config.daikinIP} is the IP of your AC?`);
      process.exit();
    })
}
