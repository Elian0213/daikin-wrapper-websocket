require('dotenv').config()
global.wsServer = require('websocket').server;
global.http = require('http');
global.axios = require('axios');

global.getters = require('./helpers/Getters.js');
global.actions = require('./helpers/Daikin.js');

const Daikin = require('./helpers/Daikin.js');

const server = http.createServer((request, response) => {
  console.log(`${new Date()} Received request for ${request.url}`)
  response.writeHead(404);
  response.end();
});

server.listen(process.env.PORT, () => {
  console.log(`${new Date()} Server is listening on port ${process.env.PORT}`)
});

wsServer = new wsServer({
  httpServer: server,
  autoAcceptConnections: false
});

function originIsAllowed(origin) { 
  return true;
}

wsServer.on('request', (request) => {
  const connection = request.accept(null, request.origin);
  console.log(`${new Date()} New connection`)

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
        Daikin.togglePower()
      case 'updateTemperatureDisplay':
        sendTemperature()
        break
      default:
        console.log(`invalid ${data.utf8Data}`)
        break
    }
  })

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
    }
  }

  connection.on('close', function(reasonCode, description) {
    console.log(`${new Date()} ${connection.remoteAddress} disconnected.`)
  });
});