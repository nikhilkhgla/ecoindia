import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlignLeft, Camera, Droplets, LoaderCircle, RefreshCw, Squircle, Thermometer, Upload } from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';

const AnalysisPage = () => {
  const navigate = useNavigate();
  const { 
    analysisData,
    setImage, 
    setEnvironmentalData, 
    setNPKValues,
    generatePrediction,
    fetchSensorData,
    isLoadingSensorData,
    sensorError,
    clearData
  } = useAnalysis();

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [isGeneratingPrediction, setIsGeneratingPrediction] = useState(false);
  const [formData, setFormData] = useState({
    temperature: '',
    humidity: '',
    nitrogen: '',
    phosphorus: '',
    potassium: ''
  });

  useEffect(() => {
    // Clear previous data when starting a new analysis
    clearData();
    
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Update form data when sensor data is loaded
  useEffect(() => {
    if (analysisData.temperature !== null) {
      setFormData(prev => ({
        ...prev,
        temperature: analysisData.temperature!.toString()
      }));
    }
    
    if (analysisData.humidity !== null) {
      setFormData(prev => ({
        ...prev,
        humidity: analysisData.humidity!.toString()
      }));
    }
  }, [analysisData.temperature, analysisData.humidity]);

  // Fetch sensor data when reaching step 2
  useEffect(() => {
    if (step === 2) {
      handleFetchSensorData();
    }
  }, [step]);

  // Monitor prediction status and navigate when ready
  useEffect(() => {
    if (isGeneratingPrediction && analysisData.prediction && analysisData.prediction.status) {
      // If prediction is generated successfully, navigate to report
      setIsGeneratingPrediction(false);
      setIsLoading(false);
      navigate('/report');
    }
  }, [analysisData.prediction, isGeneratingPrediction, navigate]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        setImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFetchSensorData = async () => {
    await fetchSensorData();
  };

  const handleNextStep = () => {
    if (step === 1 && !imagePreview) {
      alert('Please upload an image first.');
      return;
    }
    
    if (step === 2) {
      // Save environmental data
      setEnvironmentalData(
        formData.temperature ? parseFloat(formData.temperature) : null,
        formData.humidity ? parseFloat(formData.humidity) : null
      );
    }
    
    if (step === 3) {
      // Save NPK values
      setNPKValues(
        formData.nitrogen ? parseFloat(formData.nitrogen) : null,
        formData.phosphorus ? parseFloat(formData.phosphorus) : null,
        formData.potassium ? parseFloat(formData.potassium) : null
      );
    }
    
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setGenerationError(null);
    
    try {
      // Save NPK values one more time to be sure
      setNPKValues(
        formData.nitrogen ? parseFloat(formData.nitrogen) : null,
        formData.phosphorus ? parseFloat(formData.phosphorus) : null,
        formData.potassium ? parseFloat(formData.potassium) : null
      );
      
      // Flag that we're waiting for prediction
      setIsGeneratingPrediction(true);
      
      // Generate prediction
      generatePrediction();
      
      // If not navigated by the useEffect within 5 seconds, show error
      setTimeout(() => {
        if (isGeneratingPrediction) {
          setIsGeneratingPrediction(false);
          setIsLoading(false);
          setGenerationError("Prediction generation timed out. Please try again.");
        }
      }, 5000);
      
    } catch (error) {
      console.error("Error generating prediction:", error);
      setGenerationError("There was a problem generating your report. Please try again.");
      setIsGeneratingPrediction(false);
      setIsLoading(false);
    }
  };

  // Show prediction modal if prediction is available but not navigated yet
  const showPredictionPreview = isGeneratingPrediction && analysisData.prediction && analysisData.prediction.status;

  return (
    <div className="container mx-auto px-4 py-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Crop Health Analysis</h1>
      
      {/* Progress Bar */}
      <div className="max-w-3xl mx-auto mb-10">
        <div className="flex justify-between">
          <div className={`text-center ${step >= 1 ? 'text-green-600' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center mb-2 ${step >= 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
              <Camera size={20} />
            </div>
            <span className="text-sm">Image</span>
          </div>
          <div className={`text-center ${step >= 2 ? 'text-green-600' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center mb-2 ${step >= 2 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
              <Thermometer size={20} />
            </div>
            <span className="text-sm">Environment</span>
          </div>
          <div className={`text-center ${step >= 3 ? 'text-green-600' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center mb-2 ${step >= 3 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
              <AlignLeft size={20} />
            </div>
            <span className="text-sm">NPK Values</span>
          </div>
          <div className={`text-center ${step >= 4 ? 'text-green-600' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center mb-2 ${step >= 4 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
              <Droplets size={20} />
            </div>
            <span className="text-sm">Review</span>
          </div>
        </div>
        <div className="w-full bg-gray-200 h-2 mt-4 rounded-full">
          <div 
            className="bg-green-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* Step 1: Image Upload */}
        {step === 1 && (
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">Upload Crop Image</h2>
            <p className="text-gray-600 mb-6">Upload a clear image of your crop for analysis</p>
            
            <div className="mb-6">
              <label 
                htmlFor="cropImage" 
                className="block w-full py-12 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
              >
                {imagePreview ? (
                  <div className="flex flex-col items-center">
                    <img 
                      src={imagePreview} 
                      alt="Crop preview" 
                      className="max-h-48 max-w-full mb-4 rounded-lg"
                    />
                    <span className="text-green-600 flex items-center">
                      <Upload size={16} className="mr-1" /> Change image
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Camera size={48} className="text-gray-400 mb-2" />
                    <span className="text-gray-500">Click or drag to upload</span>
                  </div>
                )}
              </label>
              <input 
                type="file" 
                id="cropImage" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageUpload}
              />
            </div>
          </div>
        )}

        {/* Step 2: Environmental Data */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Environmental Data</h2>
            <p className="text-gray-600 mb-3">Retrieving data from your ESP8266 sensor through ThingSpeak</p>
            
            {/* ESP8266 Data Status */}
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Thermometer size={20} className="text-blue-500 mr-2" />
                  <span className="font-medium">ESP8266 Sensor Data</span>
                </div>
                <button 
                  onClick={handleFetchSensorData}
                  disabled={isLoadingSensorData}
                  className="text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <RefreshCw size={16} className={`mr-1 ${isLoadingSensorData ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
              </div>
              
              {isLoadingSensorData ? (
                <div className="flex items-center justify-center mt-4">
                  <LoaderCircle size={24} className="text-blue-500 animate-spin mr-2" />
                  <span>Fetching latest sensor data...</span>
                </div>
              ) : sensorError ? (
                <div className="mt-4 text-red-600 bg-red-50 p-3 rounded-lg flex items-start">
                  <Squircle size={18} className="mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Error fetching sensor data</p>
                    <p className="text-sm">{sensorError}</p>
                    <p className="text-sm mt-1">You can manually enter values below for this analysis.</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Temperature</p>
                    <p className="text-xl font-semibold">{analysisData.temperature !== null ? `${analysisData.temperature} °C` : 'N/A'}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Humidity</p>
                    <p className="text-xl font-semibold">{analysisData.humidity !== null ? `${analysisData.humidity} %` : 'N/A'}</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="temperature" className="block text-gray-700 mb-1">Temperature (°C)</label>
                <input
                  type="number"
                  id="temperature"
                  name="temperature"
                  value={formData.temperature}
                  onChange={handleInputChange}
                  placeholder="e.g., 28.5"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <p className="text-xs text-gray-500 mt-1">Value from ESP8266 sensor or enter manually</p>
              </div>
              
              <div>
                <label htmlFor="humidity" className="block text-gray-700 mb-1">Humidity (%)</label>
                <input
                  type="number"
                  id="humidity"
                  name="humidity"
                  value={formData.humidity}
                  onChange={handleInputChange}
                  placeholder="e.g., 65"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <p className="text-xs text-gray-500 mt-1">Value from ESP8266 sensor or enter manually</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: NPK Values */}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">NPK Sensor Values</h2>
            <p className="text-gray-600 mb-6">Enter the Nitrogen, Phosphorus, and Potassium levels from your soil test</p>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="nitrogen" className="block text-gray-700 mb-1">Nitrogen (N) Level</label>
                <input
                  type="number"
                  id="nitrogen"
                  name="nitrogen"
                  value={formData.nitrogen}
                  onChange={handleInputChange}
                  placeholder="e.g., 45"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div>
                <label htmlFor="phosphorus" className="block text-gray-700 mb-1">Phosphorus (P) Level</label>
                <input
                  type="number"
                  id="phosphorus"
                  name="phosphorus"
                  value={formData.phosphorus}
                  onChange={handleInputChange}
                  placeholder="e.g., 32"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div>
                <label htmlFor="potassium" className="block text-gray-700 mb-1">Potassium (K) Level</label>
                <input
                  type="number"
                  id="potassium"
                  name="potassium"
                  value={formData.potassium}
                  onChange={handleInputChange}
                  placeholder="e.g., 38"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Review Your Data</h2>
            <p className="text-gray-600 mb-6">Please verify that all the information is correct before analysis</p>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Crop Image</h3>
                {imagePreview ? (
                  <div className="flex justify-center">
                    <img 
                      src={imagePreview} 
                      alt="Crop preview" 
                      className="max-h-32 rounded-lg border border-gray-200"
                    />
                  </div>
                ) : (
                  <p className="text-red-500">No image uploaded</p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Environmental Data</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Temperature:</span>
                      <span className="font-medium">{formData.temperature} °C</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Humidity:</span>
                      <span className="font-medium">{formData.humidity} %</span>
                    </div>
                    <div className="text-xs text-blue-600 mt-1">
                      Data from ESP8266 sensor
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">NPK Values</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Nitrogen:</span>
                      <span className="font-medium">{formData.nitrogen}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Phosphorus:</span>
                      <span className="font-medium">{formData.phosphorus}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Potassium:</span>
                      <span className="font-medium">{formData.potassium}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Manually entered values
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Error message */}
        {generationError && (
          <div className="mt-4 text-red-600 bg-red-50 p-3 rounded-lg flex items-start">
            <Squircle size={18} className="mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Error</p>
              <p className="text-sm">{generationError}</p>
            </div>
          </div>
        )}
        
        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              type="button"
              onClick={handlePreviousStep}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              Back
            </button>
          )}
          {step < 4 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className={`px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors ${step === 1 && !imagePreview ? 'opacity-50 cursor-not-allowed' : ''} ml-auto`}
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center ml-auto"
            >
              {isLoading ? (
                <>
                  <LoaderCircle size={18} className="mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyze Crop'
              )}
            </button>
          )}
        </div>
      </div>
      
      {/* Prediction Preview Modal */}
      {showPredictionPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <h3 className="text-xl font-bold mb-4">Analysis Results</h3>
            
            <div className="mb-4">
              <div className="font-medium mb-1">Health Status:</div>
              <div className={`font-semibold ${analysisData.prediction.status === 'healthy' ? 'text-green-600' : 'text-red-600'}`}>
                {analysisData.prediction.status === 'healthy' ? 'Healthy' : 'Unhealthy'}
              </div>
            </div>
            
            {analysisData.prediction.disease && (
              <div className="mb-4">
                <div className="font-medium mb-1">Detected Issue:</div>
                <div className="text-red-600">{analysisData.prediction.disease}</div>
              </div>
            )}
            
            <div className="mb-6">
              <div className="font-medium mb-1">Confidence:</div>
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                  <div 
                    className={`h-2.5 rounded-full ${
                      analysisData.prediction.confidence! >= 80 ? 'bg-green-600' : 
                      analysisData.prediction.confidence! >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}  
                    style={{ width: `${analysisData.prediction.confidence}%` }}
                  ></div>
                </div>
                <span>{analysisData.prediction.confidence}%</span>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-3">Redirecting to detailed report...</p>
              <div className="animate-spin inline-block w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisPage;
