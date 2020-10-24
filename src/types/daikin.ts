/* eslint-disable camelcase */

interface controlInfo {
  ret: string;
  pow: string;
  mode: string;
  adv: string;
  stemp: string;
  shum: string;
  dt1: string;
  dt2: string;
  dt3: string;
  dt4: string;
  dt5: string;
  dt7: string;
  dh1: string;
  dh2: string;
  dh3: string;
  dh4: string;
  dh5: string;
  dh7: string;
  dhh: string;
  b_mode: string;
  b_stemp: string;
  b_shum: string;
  alert: string;
  f_rate: string;
  f_dir: string;
  b_f_rate: string;
  b_f_dir: string;
  dfr1: string;
  dfr2: string;
  dfr3: string;
  dfr4: string;
  dfr5: string;
  dfr6: string;
  dfr7: string;
  dfrh: string;
  dfd1: string;
  dfd2: string;
  dfd3: string;
  dfd4: string;
  dfd5: string;
  dfd6: string;
  dfd7: string;
  dfdh: string;
  dmnd_run: string;
  en_demand: string;
}

interface sensorInfo {
  ret: string;
  htemp: number;
  hhum: string;
  otemp: number;
  err: number;
  cmpfreq: number;
  mompow: number;
}

interface postInfoData {
  pow: string;
  mode: string;
  stemp: string;
  shum: string;
  f_rate: string;
  f_dir: string;
}
