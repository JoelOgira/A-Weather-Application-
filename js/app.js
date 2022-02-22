const cityLocation = document.querySelector('.change-location');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {
    // Destructuring
    const {cityDetails, weather} = data;

    // Updating details template
    details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName} - ${cityDetails.Country.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;
    
    // Updating Day/Night picture and icons
    const iconSrc = `../img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
      
    let timeSrc = weather.IsDayTime ? '../img/day.svg': '../img/night.svg'; //Ternary operator
    time.setAttribute('src', timeSrc);

    // removing d-none class
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }

};

const updateCity = async (city) => {

    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    return {cityDetails, weather}; //Object shorthand notaion
};

cityLocation.addEventListener('submit', event => {
    event.preventDefault();

    window.scrollTo(0, document.body.scrollHeight);
    const city = cityLocation.city.value.trim();
    cityLocation.reset();

    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    // Local storage functionality
    localStorage.setItem('city', city);

});

if (localStorage.getItem('city')) {
    updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}
