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
