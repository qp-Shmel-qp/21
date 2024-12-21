import React, { useState, useEffect } from 'react';
import { fetchWeatherData } from '../utils/api';
import WeatherForm from './WeaterForm';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedCity = localStorage.getItem('city');
    if (savedCity) {
      setCity(savedCity);
      fetchWeather(savedCity);
    }
  }, []);

  useEffect(() => {
    if (city) {
      fetchWeather(city);
      const intervalId = setInterval(() => {
        fetchWeather(city);
      }, 600000); 

      return () => clearInterval(intervalId); 
    }
  }, [city]);

  const fetchWeather = async (city) => {
    setLoading(true);
    try {
      const data = await fetchWeatherData(city);
      setWeatherData(data);
      localStorage.setItem('city', city); 
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  return (
    <div>
      <h1>Прогноз погоды</h1>
      <WeatherForm city={city} setCity={setCity} handleSubmit={handleSubmit} />

      {loading && <p>Загрузка...</p>}
      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Температура: {weatherData.main.temp} °C</p>
          <p>Описание: {weatherData.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
            alt={weatherData.weather[0].description}
          />
        </div>
      )}
    </div>
  );
};

export default Weather;
