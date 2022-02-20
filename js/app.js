const cityLocation = document.querySelector('.change-location');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {

    // const cityDetails = data.cityDetails;
    // const weather = data.weather;

    // Destructuring
    // console.log(data);
    const {cityDetails, weather} = data;

    // Updating details template
    details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    // removing d-none class
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }

};

const updateCity = async (city) => {

    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    return {cityDetails, weather};
    // Object Shorthand notation used where the property name is same to the value
    // return {
    //     cityDetails: cityDetails,
    //     weather: weather
    // }

};

cityLocation.addEventListener('submit', event => {
    event.preventDefault();

    const city = cityLocation.city.value.trim();
    cityLocation.reset();

    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

});
