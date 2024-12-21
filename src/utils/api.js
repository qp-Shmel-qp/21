import axios from 'axios';

const API_KEY = '24f246d079655b17050f8b185f170612';

export const fetchWeatherData = async (city) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=ru`
    );
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении данных о погоде:', error);
    throw error; 
  }
};
