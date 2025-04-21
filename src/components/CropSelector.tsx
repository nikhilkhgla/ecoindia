import { useState } from 'react';
import { Crop, WeatherData } from '../types';
import toast from 'react-hot-toast';
import { ImageOff } from 'lucide-react';

interface CropSelectorProps {
  availableCrops: Crop[];
  selectedCrops: Crop[];
  onAddCrop: (cropId: string) => void;
  weatherData: WeatherData | null;
}

const CropSelector = ({ availableCrops, selectedCrops, onAddCrop, weatherData }: CropSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  
  const filteredCrops = availableCrops.filter(crop => 
    crop.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedCrops.some(selected => selected.id === crop.id)
  );
  
  const handleAddCrop = (cropId: string) => {
    onAddCrop(cropId);
    
    // Check if current weather is suitable for this crop
    if (weatherData) {
      const crop = availableCrops.find(c => c.id === cropId);
      if (crop) {
        const { temperature } = weatherData;
        const { min, max } = crop.idealTemperature;
        
        if (temperature < min) {
          toast.warning(`Current temperature (${Math.round(temperature)}°C) is below ideal for ${crop.name} (min: ${min}°C)`);
        } else if (temperature > max) {
          toast.warning(`Current temperature (${Math.round(temperature)}°C) is above ideal for ${crop.name} (max: ${max}°C)`);
        }
      }
    }
  };
  
  const getCurrentMonth = () => {
    return new Date().getMonth() + 1; // JavaScript months are 0-indexed
  };
  
  const isRecommendedForPlanting = (crop: Crop) => {
    const currentMonth = getCurrentMonth();
    return crop.seasonality.bestPlantingMonths.includes(currentMonth);
  };

  const handleImageError = (cropId: string) => {
    setImageErrors(prev => ({ ...prev, [cropId]: true }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Select Crops</h2>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search crops..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
        {filteredCrops.length > 0 ? (
          filteredCrops.map(crop => (
            <div key={crop.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="relative h-32 bg-gray-100">
                {imageErrors[crop.id] ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <div className="text-center">
                      <ImageOff className="h-8 w-8 mx-auto text-gray-400" />
                      <p className="text-xs text-gray-500 mt-1">{crop.name}</p>
                    </div>
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
              
              <div className="p-3">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{crop.name}</h3>
                  {isRecommendedForPlanting(crop) && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Recommended
                    </span>
                  )}
                </div>
                
                <p className="text-xs text-gray-500 italic mb-2">{crop.scientificName}</p>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{crop.description}</p>
                
                <div className="flex justify-between items-center text-xs text-gray-600 mb-3">
                  <div>
                    <span className="font-medium">Growing period:</span> {crop.growingPeriod} days
                  </div>
                  <div>
                    <span className="font-medium">Water:</span> {crop.waterRequirements}
                  </div>
                </div>
                
                <button
                  onClick={() => handleAddCrop(crop.id)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors"
                >
                  Add to Calendar
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            {searchTerm ? 'No crops match your search' : 'No more crops available'}
          </div>
        )}
      </div>
    </div>
  );
};

export default CropSelector;
