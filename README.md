# Daikin API Wrapper
This was originally written for my Streamdeck Plugin that I made to control my AC with, but I figured it could be used in many use cases and applications.

## Setup

### Config
Copy  ``config.example.json`` and rename it to ``config.json`` and change the **IP** to the IP of your **Daikin AC**


```json
{
    // The port the websocket will run on
    "websocketPort": 3000,

    // The IP Adress of your Daikin AC wifi module
    "daikinIP": "192.168.0.1"
}
```

### Run

After that you need to install all the packages
````bash
# If you use yarn
yarn

# Or if you're oldschool
npm i
````

After all that you can run the script by typing
````bash
# If you use yarn
yarn dev

# Or if you're oldschool
npm run dev
````

# Install Node
You will need Node.js to run this script, you can download it below

[Download here](https://nodejs.org/en/download/)
