require('dotenv').config();
global.wsServer = require('websocket').server;
global.http = require('http');
global.axios = require('axios');

global.getters = require('./helpers/Getters.js');
global.actions = require('./helpers/Daikin.js');

const Daikin = require('./helpers/Daikin.js');

wsServer.on('request', (request) => {
  const connection = request.accept(null, request.origin);
  console.log(`${new Date()} New connection`);

  connection.on('message', (data) => {
    if (data.type !== 'utf8') return;

    switch (data.utf8Data) {
    case 'increaseTemperature':
      Daikin.inreaseTemperature();
      break;
    case 'decreaseTemperature':
      Daikin.decreaseTemperature();
      break;
    case 'togglePower':
      Daikin.togglePower();
    case 'updateTemperatureDisplay':
      sendTemperature();
      sendPowerStatus();
      break;
    default:
      console.log(`invalid ${data.utf8Data}`);
      break;
    }
  });

  global.sendTemperature = (temp) => {
    if (temp == undefined) {
      getters.info()
        .then((acSettings) => {
          const data = {
            type: 'sendTemperature',
            temperature: `${acSettings.stemp} °C`,
          };

          connection.sendUTF(JSON.stringify(data));
        });
    } else {
      const data = {
        type: 'sendTemperature',
        temperature: `${temp} °C`,
      };

      connection.sendUTF(JSON.stringify(data));
      sendPowerStatus(1);
    }

    sendPowerStatus();
  };

  global.sendPowerStatus = async (value) => {
    if (value === undefined) {
      const acInfo = await getters.info();

      connection.sendUTF(JSON.stringify({
        type: 'sendPowerStatus',
        powerStatus: Number(acInfo.pow),
      }));
    } else {
      connection.sendUTF(JSON.stringify({
        type: 'sendPowerStatus',
        powerStatus: value,
      }));
    }
  };
});
