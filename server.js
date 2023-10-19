const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;
const apiKey = 'e124f454264efc017a43b7a216c83e27';
app.use(express.static('public'));

app.get('/weather', async (req, res) => {
  const location = req.query.location;

  if (!location) {
    return res.status(400).json({ error: 'Location parameter is required' });
  }

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error('Weather data not found');
    }

    const data = await response.json();
    const temperature = (data.main.temp - 273.15).toFixed(2); // Convert temperature from Kelvin to Celsius
    const condition = data.weather[0].description;

    res.json({ location: data.name, temperature, condition });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

/*
 It allows users to request weather information for a specific location by making GET requests to the /weather endpoint. Here's a detailed explanation of how this code works:

Import Required Modules:

const express = require('express');
const fetch = require('node-fetch');
express: The Express.js framework for building web applications.
node-fetch: A library for making HTTP requests from a Node.js application.
Create an Express Application:

const app = express();
An instance of the Express application is created, which will be used to define routes and handle HTTP requests.
Define a Port:

const port = process.env.PORT || 3000;
This code sets the port for the server to listen on. It uses the value of the PORT environment variable if it's set, or defaults to port 3000.
Configure Static File Serving:

app.use(express.static('public'));
This line configures Express to serve static files from the public directory. These static files could include HTML, CSS, or client-side JavaScript files. This is useful for serving a web page to users.

Weather Endpoint (GET Request):

app.get('/weather', async (req, res) => {
  const location = req.query.location;

  if (!location) {
    return res.status(400).json({ error: 'Location parameter is required' });
  }

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error('Weather data not found');
    }

    const data = await response.json();
    const temperature = (data.main.temp - 273.15).toFixed(2); // Convert temperature from Kelvin to Celsius
    const condition = data.weather[0].description;

    res.json({ location: data.name, temperature, condition });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
This route listens for GET requests at the /weather endpoint.
It extracts the location query parameter from the request URL. The user is expected to provide the location for which they want weather information.
It checks if the location parameter is provided; if not, it returns a 400 Bad Request response with an error message.
It uses the node-fetch library to make an HTTP GET request to the OpenWeatherMap API, which provides weather data. The API endpoint URL includes the user-provided location and the API key for authentication.
If the response from the API is not OK (indicating an error), it throws an error with the message 'Weather data not found.'
If the API request is successful, it parses the JSON response and extracts the location name, temperature (converted from Kelvin to Celsius), and weather condition.
It sends a JSON response to the client with the extracted weather information.

Start the Express Server:

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
The server is started, and it listens on the specified port. When the server starts, a message is logged to the console.
*/