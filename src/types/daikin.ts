/* eslint-disable camelcase */

/**
 * pow: Power, either [0 = off, 1 = on]
 * stemp: Temperature of the AC, float
 * f_rate: Fan speed
 *  'A' : 'Automatic',
 *  'B' : 'Nightmode - quiet as hell',
 *  '3' : 'Level 1',
 *  '4' : 'Level 2',
 *  '5' : 'Level 3',
 *  '6' : 'Level 4',
 *   '7' : 'Level 5',
 */
type controlInfo = {
  ret: string;
  pow: number;
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

type sensorInfo = {
  ret: string;
  htemp: string;
  hhum: string;
  otemp: string;
  err: string;
  cmpfreq: string;
  mompow: string;
}
