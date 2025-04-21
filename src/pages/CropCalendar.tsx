import { useState } from 'react';
import { Calendar, Cloud, Droplets, Thermometer } from 'lucide-react';


const cropData = [
  {
    id: 1,
    name: 'Wheat',
    sowingPeriod: 'October - November',
    harvestPeriod: 'March - April',
    waterRequirement: 'Moderate',
    idealTemp: '15-24°C',
    soilType: 'Loamy soil with good drainage',
    stages: [
      { name: 'Sowing', months: ['Oct', 'Nov'], status: 'active' },
      { name: 'Vegetative Growth', months: ['Dec', 'Jan'], status: 'upcoming' },
      { name: 'Flowering', months: ['Feb'], status: 'upcoming' },
      { name: 'Grain Filling', months: ['Feb', 'Mar'], status: 'upcoming' },
      { name: 'Harvesting', months: ['Mar', 'Apr'], status: 'upcoming' }
    ]
  },
  {
    id: 2,
    name: 'Rice',
    sowingPeriod: 'June - July',
    harvestPeriod: 'November - December',
    waterRequirement: 'High',
    idealTemp: '20-35°C',
    soilType: 'Clay soil with water retention properties',
    stages: [
      { name: 'Nursery', months: ['Jun'], status: 'completed' },
      { name: 'Transplanting', months: ['Jul'], status: 'completed' },
      { name: 'Tillering', months: ['Aug'], status: 'completed' },
      { name: 'Heading', months: ['Sep', 'Oct'], status: 'completed' },
      { name: 'Harvesting', months: ['Nov', 'Dec'], status: 'active' }
    ]
  },
  {
    id: 3,
    name: 'Cotton',
    sowingPeriod: 'April - May',
    harvestPeriod: 'November - January',
    waterRequirement: 'Moderate',
    idealTemp: '21-35°C',
    soilType: 'Deep, well-drained black soil',
    stages: [
      { name: 'Sowing', months: ['Apr', 'May'], status: 'completed' },
      { name: 'Vegetative Growth', months: ['Jun', 'Jul'], status: 'completed' },
      { name: 'Flowering', months: ['Aug', 'Sep'], status: 'completed' },
      { name: 'Boll Development', months: ['Sep', 'Oct'], status: 'completed' },
      { name: 'Harvesting', months: ['Nov', 'Dec', 'Jan'], status: 'active' }
    ]
  }
];

// Mock weather forecast
const weatherForecast = [
  { day: 'Today', temp: '28°C', condition: 'Sunny', icon: '☀️' },
  { day: 'Tomorrow', temp: '27°C', condition: 'Partly Cloudy', icon: '⛅' },
  { day: 'Wednesday', temp: '29°C', condition: 'Sunny', icon: '☀️' },
  { day: 'Thursday', temp: '25°C', condition: 'Rain', icon: '🌧️' },
  { day: 'Friday', temp: '24°C', condition: 'Rain', icon: '🌧️' }
];

const CropCalendar = () => {
  const [selectedCrop, setSelectedCrop] = useState(cropData[0]);
  const [location, setLocation] = useState('Delhi, India');
  
  // Current month for highlighting the active period
  const currentMonth = new Date().toLocaleString('default', { month: 'short' });
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">Smart Crop Calendar</h1>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Calendar Section */}
        <div className="flex-grow">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-green-50 border-b border-green-100 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h2 className="text-xl font-semibold text-green-800 flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Crop Planting & Harvesting Schedule
                </h2>
                <p className="text-sm text-green-600">
                  AI-optimized calendar based on crop requirements and local weather patterns
                </p>
              </div>
              
              <div className="mt-3 sm:mt-0">
                <select
                  value={selectedCrop.id}
                  onChange={(e) => setSelectedCrop(cropData.find(crop => crop.id === parseInt(e.target.value)) || cropData[0])}
                  className="border border-green-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {cropData.map(crop => (
                    <option key={crop.id} value={crop.id}>{crop.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">{selectedCrop.name} Growth Timeline</h3>
                  
                  <div className="space-y-4">
                    {selectedCrop.stages.map((stage, index) => (
                      <div key={index} className="flex">
                        <div className="flex flex-col items-center mr-4">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            stage.status === 'completed' 
                              ? 'bg-green-500 text-white' 
                              : stage.status === 'active'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-500'
                          }`}>
                            {stage.status === 'completed' ? '✓' : index + 1}
                          </div>
                          {index < selectedCrop.stages.length - 1 && (
                            <div className={`w-0.5 h-full ${
                              stage.status === 'completed' ? 'bg-green-500' : 'bg-gray-200'
                            }`}></div>
                          )}
                        </div>
                        
                        <div className="pb-5">
                          <div className="flex items-baseline">
                            <h4 className="text-md font-medium">{stage.name}</h4>
                            <span className="ml-2 text-sm text-gray-500">
                              ({stage.months.join(', ')})
                            </span>
                          </div>
                          
                          <div className={`text-sm mt-1 ${
                            stage.status === 'active' ? 'text-blue-600' : 'text-gray-600'
                          }`}>
                            {stage.status === 'active' && 'Current Stage - '}
                            {stage.months.includes(currentMonth) && 'Optimal time for this activity'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="text-lg font-medium mb-3">Crop Requirements</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Sowing Period</p>
                          <p className="text-gray-600">{selectedCrop.sowingPeriod}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Harvest Period</p>
                          <p className="text-gray-600">{selectedCrop.harvestPeriod}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Droplets className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Water Requirement</p>
                          <p className="text-gray-600">{selectedCrop.waterRequirement}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Thermometer className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Ideal Temperature</p>
                          <p className="text-gray-600">{selectedCrop.idealTemp}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">AI Recommendations</h3>
                    <ul className="list-disc pl-5 text-gray-700 space-y-2">
                      <li>Based on current soil moisture and upcoming rainfall, delay irrigation by 2 days</li>
                      <li>Expected yield increase of 10-15% with suggested farming practices</li>
                      <li>Apply organic fertilizer within the next 7 days for optimal results</li>
                      <li>Alert: Leaf spot disease risk is high due to humidity. Consider preventive measures</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Weather and Notifications Sidebar */}
        <div className="lg:w-80">
          {/* Weather Widget */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="p-4 bg-blue-50 border-b border-blue-100">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-blue-800 flex items-center">
                  <Cloud className="h-5 w-5 mr-2" />
                  Weather Forecast
                </h3>
                <span className="text-sm text-blue-600">{location}</span>
              </div>
            </div>
            
            <div className="p-4">
              {weatherForecast.map((day, index) => (
                <div 
                  key={index} 
                  className={`py-2 flex justify-between items-center ${
                    index < weatherForecast.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <span className="text-gray-700">{day.day}</span>
                  <div className="flex items-center">
                    <span className="text-xl mr-2">{day.icon}</span>
                    <div className="text-right">
                      <div className="font-medium">{day.temp}</div>
                      <div className="text-xs text-gray-500">{day.condition}</div>
                    </div>
                  </div>
                </div>
              ))}
              <button className="w-full mt-3 text-center text-blue-600 text-sm hover:text-blue-700">
                View 10-Day Forecast →
              </button>
            </div>
          </div>
          
          {/* Notifications */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-yellow-50 border-b border-yellow-100">
              <h3 className="font-semibold text-yellow-800">
                Important Alerts
              </h3>
            </div>
            
            <div className="p-4">
              <div className="space-y-4">
                <div className="p-3 bg-red-50 rounded-md border-l-4 border-red-500">
                  <p className="font-medium text-red-800">Weather Warning</p>
                  <p className="text-sm text-red-600">Heavy rainfall expected on Thursday. Consider harvesting mature crops before rain.</p>
                </div>
                
                <div className="p-3 bg-green-50 rounded-md border-l-4 border-green-500">
                  <p className="font-medium text-green-800">Optimal Planting</p>
                  <p className="text-sm text-green-600">Next week will be ideal for sowing winter vegetables due to favorable soil temperature.</p>
                </div>
                
                <div className="p-3 bg-yellow-50 rounded-md border-l-4 border-yellow-500">
                  <p className="font-medium text-yellow-800">Market Alert</p>
                  <p className="text-sm text-yellow-600">Tomato prices expected to rise next month. Consider adjusting your planting schedule.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropCalendar;
