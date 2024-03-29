const key = 'DEGMLKpmnbiK1uLlxLbKrlfmtcEHvGVc'; 

// Get weather information
const getWeather = async (locationKey) => {

    const base = `http://dataservice.accuweather.com/currentconditions/v1/`;
    const query = `${locationKey}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
    
};

// Get city information
const getCity = async (city) => {

    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];

};


