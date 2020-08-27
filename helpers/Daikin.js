function Daikin() {
  // h-hewo cutie >_<
}

Daikin.togglePower = () => {
  getters.sensorInfo()
  .then((sensorInfo) => {
    getters.info().then((acSettings) => {
      acSettings.sensorInfo = sensorInfo;

      acSettings.pow = Number(acSettings.pow) === 1 ? 0 : 1;

      actions.updateInfo(acSettings.pow, acSettings.mode, acSettings.stemp, acSettings.shum, acSettings.f_rate, acSettings.f_dir)
    });
  })
}

Daikin.inreaseTemperature = () => {
  getters.sensorInfo()
  .then((sensorInfo) => {
    getters.info().then((acSettings) => {
      acSettings.sensorInfo = sensorInfo;

      acSettings.stemp = parseFloat(acSettings.stemp) + 0.5;

      actions.updateInfo(acSettings.pow, acSettings.mode, acSettings.stemp, acSettings.shum, acSettings.f_rate, acSettings.f_dir)
      sendTemperature(acSettings.stemp)
    });
  })
}

Daikin.decreaseTemperature = () => {
  getters.sensorInfo()
  .then((sensorInfo) => {
    getters.info().then((acSettings) => {
      acSettings.sensorInfo = sensorInfo;

      acSettings.stemp = parseFloat(acSettings.stemp) - 0.5;

      actions.updateInfo(acSettings.pow, acSettings.mode, acSettings.stemp, acSettings.shum, acSettings.f_rate, acSettings.f_dir)
      sendTemperature(acSettings.stemp)
    });
  })
}

Daikin.updateInfo = (pow, mode, stemp, shum, f_rate, f_dir) => {
  pow = pow ? 1 : 0;
  axios.get(`http://${process.env.DAIKIN_IP}/aircon/set_control_info?pow=${pow}&mode=${mode}&stemp=${stemp}&shum=${shum}&f_rate=${f_rate}&f_dir=${f_dir}`)
  .then((resp) => {
    console.log(`${new Date()} ${resp.data}`);
    // Force update power button
    sendPowerStatus(0);
  })
}

module.exports = Daikin;
