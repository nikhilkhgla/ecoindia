import { WeatherData } from '../types';

const API_KEY = 'YOUR_OPENWEATHER_API_KEY'; // Replace with your actual API key

export const fetchWeatherData = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Weather data fetch failed');
    }
    
    const data = await response.json();
    
    return {
      temperature: data.main.temp,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      windSpeed: data.wind.speed,
      rainfall: data.rain ? data.rain['1h'] : 0,
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    // Return fallback data in case of error
    return {
      temperature: 25,
      humidity: 60,
      description: 'Weather data unavailable',
      icon: '01d',
      windSpeed: 0,
    };
  }
};
