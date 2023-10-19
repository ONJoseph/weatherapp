const searchButton = document.getElementById('searchButton');
const locationInput = document.getElementById('locationInput');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const conditionElement = document.getElementById('condition');

searchButton.addEventListener('click', async () => {
  const location = locationInput.value;

  try {
    const response = await fetch(`/weather?location=${location}`);
    const data = await response.json();

    locationElement.textContent = data.location;
    temperatureElement.textContent = `Temperature: ${data.temperature} °C`;
    conditionElement.textContent = `Condition: ${data.condition}`;
  } catch (error) {
    console.error(error);
    locationElement.textContent = 'Location not found';
    temperatureElement.textContent = '';
    conditionElement.textContent = '';
  }
});
