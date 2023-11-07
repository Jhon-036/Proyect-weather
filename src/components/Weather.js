import React from 'react';
import axios from 'axios'
import {useEffect, useState} from 'react'

const Weather = () => {

    const [weather, setWeather] = useState({});
    const [temp, setTemp] = useState(0);
    const [isCels, setIsCels] = useState(true);

    const success = pos => {

        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=9c3cdfcea9070b55c81f3613144d2a68`)
            .then(res => {
            setWeather(res.data);
            setTemp((res.data.main.temp -273.15).toFixed(2));
            console.log(res.data);
        })
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success)
    }, [])

    const convertTemp = () =>{
        if (isCels) {
            setTemp(((temp * 9/5) + 32).toFixed(2));
            setIsCels(false);
        } else {
            setTemp (((temp - 32) * 5/9).toFixed(2));
            setIsCels(true);
        }
    }
    

    return (
        <div className='card'>
            <h1>{weather.name}, {weather.sys?.country}</h1>
            <div className='container-card'>
                <section className='cloud'>
                    <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
                    <p>{temp} {isCels ? 'C°' : 'F°'}</p>
                </section>
                <section className='cloud-details'>
                    <p>{weather.weather?.[0].description}</p>
                    <ul>
                        <li><i className="fas fa-wind"></i> <span>Wind speed:</span> {weather.wind?.speed} m/s</li>
                        <li><i className="fas fa-cloud"></i> <span>Clouds:</span> {weather.main?.humidity} %</li>
                        <li><i className="fas fa-thermometer-three-quarters"></i> <span>Pressure:</span> {weather.main?.pressure} mb</li>
                    </ul>
                </section>
            </div>
            <button onClick={convertTemp}>Degrees °F/°C</button>
        </div>
        
    );
};

export default Weather;