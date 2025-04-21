import { WeatherData } from '../types';

export const fetchThingSpeakData = async (): Promise<WeatherData> => {
  try {
    const response = await fetch(
      'https://api.thingspeak.com/channels/2892519/feeds.json?api_key=C2W4D2UNAWXAZJ44&results=2'
    );
    
    if (!response.ok) {
      throw new Error('ThingSpeak data fetch failed');
    }
    
    const data = await response.json();
    
    // Extract the latest data point
    const latestData = data.feeds && data.feeds.length > 0 ? data.feeds[data.feeds.length - 1] : null;
    
    if (!latestData) {
      throw new Error('No data available from ThingSpeak');
    }
    
    // Parse fields - typically field1 might be temperature and field2 humidity
    // You may need to adjust these based on the actual data structure
    const temperature = parseFloat(latestData.field1) || 25;
    const humidity = parseFloat(latestData.field2) || 60;
    
    return {
      temperature,
      humidity,
      description: 'Data from FramScanner sensor',
      icon: '11d', // Default icon for sensor data
      windSpeed: 0, // Sensor might not provide wind data
      rainfall: 0,  // Sensor might not provide rainfall data
      sensorTimestamp: latestData.created_at
    };
  } catch (error) {
    console.error('Error fetching ThingSpeak data:', error);
    // Return fallback data in case of error
    return {
      temperature: 25,
      humidity: 60,
      description: 'Sensor data unavailable',
      icon: '01d',
      windSpeed: 0,
    };
  }
};
