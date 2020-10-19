
# Types - Daikin API
Types explained if they are not self-explanatory, like the entire goddamn daikin API.
The Daikin API is undocumented and everyone hates this, here is my weak attempt.

## aircon/get_control_info
You can either **GET** to retreive settings or **POST** to updat them.

### get request
What is what? This might not be a 100% correct as there is no official documentation

| name   | type   | description           |
|--------|--------|-----------------------|
| ret    | string | Response status       |
| pow    | number | Power status          |
| stemp  | float  | AC Temperature        |
| shum   | number | Don't know, keep at 0 |
| mode   | number | Cooling, heating etc. |
| f_rate | string | Blowing speed         |
| f_dir  | number | Blowing direction     |
| alert  | number | Error code?           |

### post request
This is all the data that is changeable and relevent to be changed

#### pow - number
`pow` is the power control

| value | description |   |
|-------|-------------|---|
| 0     | off         |   |
| 1     | on          |   |

#### stemp - float
`stemp` is the temperature the AC will try to get the envoirment to.

| value | description     |   |
|-------|-----------------|---|
| FLOAT | The temperature |   |

#### f_dir - number
`f_dir` is the blade direction the AC will be blowing at.
| value | description                                       |   |
|-------|---------------------------------------------------|---|
| 0     | Blowing straight (off)                            |   |
| 1     | Move up and down                                  |   |
| 2     | Move left and right                               |   |
| 3     | 3D, move and left and right, but also up and down |   |

#### f_rate - string
`f_rate` is the *"speed dial"*
| value | description             |   |
|-------|-------------------------|---|
| A     | Automatic               |   |
| B     | Silence or, night mode  |   |
| 3     | Speed level 1           |   |
| 4     | Speed level 2           |   |
| 5     | Speed level 3           |   |
| 6     | Speed level 4           |   |
| 7     | Speed level 5 (MAX)     |   |

## /aircon/get_sensor_info
You can only retreive this info by doing a **GET** request.

| name  | type   | description         |
|-------|--------|---------------------|
| ret   | string |  Response status    |
| htemp | float  | Home temperature    |
| otemp | float  | Outside temperature |
