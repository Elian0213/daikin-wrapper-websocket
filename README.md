# Daikin API Wrapper
This was originally written for my Streamdeck Plugin that I made to control my AC with, but I figured it could be used in many use cases and applications.

## API Explained
[Please check this out, I made an attempt](https://github.com/Elian0213/daikin-wrapper-websocket/tree/master/src/types)

## Setup

### Config
Copy  ``config.example.json`` and rename it to ``config.json`` and change the **IP** to the IP of your **Daikin AC**


```json
{
    "websocketPort": 3000,
    "daikinIP": "192.168.0.1"
}
```

### Run

After that you need to install all the packages
````bash
$ yarn
````

After all that you can run the script by typing
````bash
$ yarn dev
````

# Usage
```js
const ws = new WebSocket('ws://localhost:3000');

// Global storage of AC data
let acData = {};

ws.onopen = () => {
  // Receive AC info on connect
  ws.send(JSON.stringify({ name: 'getInfo' }));
};

// Receive data
ws.onmessage = (data) => {
  const response = JSON.parse(data.data);

  switch (response.name) {
  case 'getInfo':
    // Update global AC info
    acData = response.data;
    break;
  default:
    console.log(response);
    break;
  }
};

// Toggle power
const togglePower = () => {
  acData.pow = acData.pow === '1' ? '0' : '1';
  ws.send(JSON.stringify({ name: 'setData', value: acData }));
};

// Turn power on/off, depending on the state of the AC
togglePower();
```

# Install Node
You will need Node.js to run this script, you can download it below

[Download here](https://nodejs.org/en/download/)
