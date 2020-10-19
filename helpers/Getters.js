function parse(input) {
  function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\]\")/g, '\\$1');
  }

  function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
  }

  let responseData = null;

  if (Buffer.isBuffer(input)) {
    input = input.toString();
  }

  try {
    responseData = JSON.parse(`{"${replaceAll(replaceAll(input, '\=', '":"'), ',', '","')}"}`);
  } catch (e) {
    return 'Cannot parse response';
  }

  return responseData;
}

module.exports = {
  info: async () => await axios.get(`http://${process.env.DAIKIN_IP}/aircon/get_control_info`)
    .then((data) => {
      const response = parse(data.data);

      return response;
    }),

  sensorInfo: async () => await axios.get(`http://${process.env.DAIKIN_IP}/aircon/get_sensor_info`)
    .then((data) => {
      const response = parse(data.data);

      return {
        temp_inside: parseFloat(response.htemp),
        temp_outside: parseFloat(response.otemp),
      };
    })
    .catch((err) => {
      console.log(err);
    }),
};
