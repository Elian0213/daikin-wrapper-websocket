# Daikin API Wrapper
This was originally written for my Streamdeck Plugin that I made to control my AC with, but I figured it could be used in many use cases and applications.

# Setup
Copy  ``.env.example`` and rename it to ``.env`` and change the **IP** to the IP of your **Daikin AC**
````
# PORT The websocket will run on
PORT=3000

# The IP of your Daikin AC
DAIKIN_IP=192.168.0.1 
````

After that you need to install all the packages
````bash
# If you use yarn
yarn
# Or if you're oldschool
npm i
````

After all that you can run the script by typing
````
node index.js
````

# Install Node
You will need Node.js to run this script, you can download it below

[Download here](https://nodejs.org/en/download/)