import React, { useState } from 'react';
import Conditions from './Conditions';
import classes from './Forecast.css';

const Forecast = () => {

    let [city, setCity] = useState('');
    let [unit, setUnit] = useState('metric');
    let [responseObj, setResponseObj] = useState({});
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);

    function getForecast(e){
        e.preventDefault();

        if (city.length === 0) {
            return setError(true);
        }

        setError(false);
        setResponseObj({});
       
        setLoading(true);
        
        const uriEncodedCity = encodeURIComponent(city);

        fetch(`https://community-open-weather-map.p.rapidapi.com/weather?units=${unit}&q=${uriEncodedCity}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": "<Your API Key>"
        }
    })
    .then(response => response.json())
    .then(response => {
        if (response.cod !== 200) {
            throw new Error()
        }
        setResponseObj(response);
        setLoading(false);
    })
    .catch(err => {
        setError(true);
        console.log(err.message);
    });
}

    return (
        <div class="forecastdiv">
        <form onSubmit={getForecast}>
            <input
                type="text"
                className="search"
                placeholder="Enter a City"
                maxLength="50"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                />
        </form>
        <Conditions
              responseObj={responseObj}
              error={error} 
              loading={loading} 
           />
    </div>
    )
}

export default Forecast;