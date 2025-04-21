import { Clock, Cloud, Droplets, Thermometer, Wind } from 'lucide-react';
import { WeatherData, DataSource } from '../types';
import DataSourceToggle from './DataSourceToggle';
import { format } from 'date-fns';

interface WeatherPanelProps {
  weatherData: WeatherData;
  dataSource: DataSource;
  onToggleDataSource: () => void;
}

const WeatherPanel = ({ weatherData, dataSource, onToggleDataSource }: WeatherPanelProps) => {
  const getWeatherIconUrl = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {dataSource === 'location' ? 'Current Weather Conditions' : 'FramScanner Sensor Data'}
        </h2>
        <DataSourceToggle dataSource={dataSource} onToggle={onToggleDataSource} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex items-center gap-4">
          {dataSource === 'location' ? (
            <img 
              src={getWeatherIconUrl(weatherData.icon)} 
              alt={weatherData.description}
              className="w-16 h-16"
            />
          ) : (
            <Thermometer size={40} className="text-red-500 p-2" />
          )}
          <div>
            <span className="text-3xl font-bold">{Math.round(weatherData.temperature)}°C</span>
            <p className="text-gray-600 capitalize">{weatherData.description}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Droplets size={24} className="text-blue-500" />
          <div>
            <p className="text-gray-600">Humidity</p>
            <span className="text-xl font-semibold">{weatherData.humidity}%</span>
          </div>
        </div>
        
        {dataSource === 'location' && (
          <div className="flex items-center gap-4">
            <Wind size={24} className="text-teal-500" />
            <div>
              <p className="text-gray-600">Wind Speed</p>
              <span className="text-xl font-semibold">{weatherData.windSpeed} m/s</span>
            </div>
          </div>
        )}
        
        {dataSource === 'location' && (
          <div className="flex items-center gap-4">
            <Cloud size={24} className="text-gray-500" />
            <div>
              <p className="text-gray-600">Rainfall</p>
              <span className="text-xl font-semibold">{weatherData.rainfall ?? 0} mm</span>
            </div>
          </div>
        )}
        
        {dataSource === 'thingspeak' && weatherData.sensorTimestamp && (
          <div className="flex items-center gap-4 col-span-2">
            <Clock size={24} className="text-gray-500" />
            <div>
              <p className="text-gray-600">Last Updated</p>
              <span className="text-xl font-semibold">
                {format(new Date(weatherData.sensorTimestamp), 'MMM d, yyyy - HH:mm')}
              </span>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-100">
        <p className="text-sm text-gray-600">
          {dataSource === 'location' 
            ? 'Weather conditions play a critical role in determining the best time for planting, irrigating, and harvesting your crops.'
            : 'Data from your FramScanner sensor provides real-time temperature and humidity readings from your specific location.'}
        </p>
      </div>
    </div>
  );
};

export default WeatherPanel;
