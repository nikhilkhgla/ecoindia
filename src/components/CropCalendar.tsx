import { useState } from 'react';
import { format, addDays } from 'date-fns';
import { Calendar, Check, ImageOff, Info, Squircle, X } from 'lucide-react';
import { Crop, WeatherData } from '../types';

interface CropCalendarProps {
  crops: Crop[];
  onRemoveCrop: (cropId: string) => void;
  weatherData: WeatherData | null;
}

const CropCalendar = ({ crops, onRemoveCrop, weatherData }: CropCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  
  const isWeatherSuitable = (crop: Crop) => {
    if (!weatherData) return null;
    
    const { temperature, humidity } = weatherData;
    const { idealTemperature, idealHumidity } = crop;
    
    if (
      temperature >= idealTemperature.min && 
      temperature <= idealTemperature.max &&
      humidity >= idealHumidity.min &&
      humidity <= idealHumidity.max
    ) {
      return 'suitable';
    } else if (
      (temperature < idealTemperature.min - 5 || 
       temperature > idealTemperature.max + 5) ||
      (humidity < idealHumidity.min - 10 ||
       humidity > idealHumidity.max + 10)
    ) {
      return 'unsuitable';
    } else {
      return 'marginal';
    }
  };
  
  const getCurrentPhase = (crop: Crop) => {
    // Assuming the crop is planted today for demonstration
    // In a real app, you would store the actual planting date
    const daysSincePlanting = 0;
    
    for (const phase of crop.phases) {
      if (daysSincePlanting >= phase.startDay && daysSincePlanting <= phase.endDay) {
        return phase;
      }
    }
    
    return crop.phases[0]; // Default to first phase
  };

  const handleImageError = (cropId: string) => {
    setImageErrors(prev => ({ ...prev, [cropId]: true }));
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Your Crop Calendar</h2>
      
      {crops.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-500 mb-2">No crops selected</h3>
          <p className="text-gray-500">
            Select crops from the panel to view their growth calendar and recommendations
          </p>
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Set planting date (for planning purposes)
            </label>
            <input
              type="date"
              value={format(selectedDate, 'yyyy-MM-dd')}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <div className="space-y-6">
            {crops.map(crop => {
              const suitability = isWeatherSuitable(crop);
              const currentPhase = getCurrentPhase(crop);
              
              return (
                <div key={crop.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="flex justify-between items-center bg-gray-50 px-4 py-3 border-b">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                        {imageErrors[crop.id] ? (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageOff className="h-5 w-5 text-gray-400" />
                          </div>
                        ) : (
                          <img 
                            src={crop.imageUrl} 
                            alt={crop.name}
                            className="w-full h-full object-cover"
                            onError={() => handleImageError(crop.id)}
                            loading="lazy"
                          />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{crop.name}</h3>
                        <p className="text-xs text-gray-500">{crop.growingPeriod} days to maturity</p>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => onRemoveCrop(crop.id)}
                      className="text-gray-400 hover:text-red-500"
                      aria-label="Remove crop"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  
                  {weatherData && (
                    <div className={`p-3 ${
                      suitability === 'suitable' ? 'bg-green-50 text-green-800' :
                      suitability === 'unsuitable' ? 'bg-red-50 text-red-800' :
                      'bg-yellow-50 text-yellow-800'
                    }`}>
                      <div className="flex items-center gap-2">
                        {suitability === 'suitable' ? (
                          <Check size={16} />
                        ) : suitability === 'unsuitable' ? (
                          <Squircle size={16} />
                        ) : (
                          <Info size={16} />
                        )}
                        <span className="text-sm">
                          {suitability === 'suitable' ? 
                            'Current weather conditions are ideal for this crop' :
                            suitability === 'unsuitable' ?
                            'Current weather conditions are not suitable for this crop' :
                            'Current weather conditions are marginally suitable for this crop'
                          }
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <div className="p-4">
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Optimal Growing Conditions</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="bg-gray-50 p-2 rounded">
                          <span className="text-gray-600">Temperature:</span>{' '}
                          {crop.idealTemperature.min}°C - {crop.idealTemperature.max}°C
                        </div>
                        <div className="bg-gray-50 p-2 rounded">
                          <span className="text-gray-600">Humidity:</span>{' '}
                          {crop.idealHumidity.min}% - {crop.idealHumidity.max}%
                        </div>
                        <div className="bg-gray-50 p-2 rounded">
                          <span className="text-gray-600">Water needs:</span>{' '}
                          {crop.waterRequirements}
                        </div>
                        <div className="bg-gray-50 p-2 rounded">
                          <span className="text-gray-600">Soil:</span>{' '}
                          {crop.soilType.join(', ')}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Growth Timeline</h4>
                      <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden mb-2">
                        {crop.phases.map((phase, index) => {
                          const width = ((phase.endDay - phase.startDay) / crop.growingPeriod) * 100;
                          const left = (phase.startDay / crop.growingPeriod) * 100;
                          
                          return (
                            <div
                              key={index}
                              className={`absolute h-full ${index % 2 === 0 ? 'bg-green-200' : 'bg-green-300'}`}
                              style={{
                                left: `${left}%`,
                                width: `${width}%`
                              }}
                            ></div>
                          );
                        })}
                      </div>
                      
                      <div className="flex justify-between text-xs text-gray-500 mb-3">
                        <span>{format(selectedDate, 'MMM d')}</span>
                        <span>{format(addDays(selectedDate, crop.growingPeriod), 'MMM d')}</span>
                      </div>
                      
                      <div className="space-y-3">
                        {crop.phases.map((phase, index) => (
                          <details key={index} className="text-sm">
                            <summary className="font-medium cursor-pointer">
                              {phase.name} ({phase.startDay}-{phase.endDay} days)
                            </summary>
                            <div className="pl-4 pt-2">
                              <p className="mb-2">{phase.description}</p>
                              <div className="mb-2">
                                <span className="font-medium">Temperature:</span>{' '}
                                {phase.optimalTemperature.min}°C - {phase.optimalTemperature.max}°C
                              </div>
                              <div className="mb-2">
                                <span className="font-medium">Key tasks:</span>
                                <ul className="list-disc list-inside pl-2">
                                  {phase.tasks.map((task, i) => (
                                    <li key={i}>{task}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </details>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <h4 className="font-medium mb-2">Common Issues</h4>
                      <div className="grid grid-cols-2 gap-x-4 text-sm">
                        <div>
                          <h5 className="font-medium text-gray-700">Pests:</h5>
                          <ul className="list-disc list-inside text-gray-600">
                            {crop.commonPests.map((pest, index) => (
                              <li key={index}>{pest}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-700">Diseases:</h5>
                          <ul className="list-disc list-inside text-gray-600">
                            {crop.commonDiseases.map((disease, index) => (
                              <li key={index}>{disease}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CropCalendar;
