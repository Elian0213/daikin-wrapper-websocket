
# Types - Daikin API
Types explained if they are not self-explanatory, like the entire goddamn daikin API.


## aircon/get_control_info
The Daikin API is undocumented and everyone hates this, here is my weak attempt.

### pow - number
`pow` is the power control

| value | description |   |
|-------|-------------|---|
| 0     | off         |   |
| 1     | on          |   |

### stemp - float
`stemp` is the temperature the AC will try to get the envoirment to.

| value | description     |   |
|-------|-----------------|---|
| FLOAT | The temperature |   |

### f_dir - number
`f_dir` is the blade direction the AC will be blowing at.

| value | description                                       |   |
|-------|---------------------------------------------------|---|
| 0     | Blowing straight (off)                            |   |
| 1     | Move up and down                                  |   |
| 2     | Move left and right                               |   |
| 3     | 3D, move and left and right, but also up and down |   |

### f_rate - string
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
