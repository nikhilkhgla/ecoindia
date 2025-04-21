import { createContext, useState, useContext, ReactNode } from 'react';
import { cropHealthModel, CropHealthModel } from '../services/MLModel';

type DetectedIssue = {
  name: string;
  severity: 'low' | 'medium' | 'high';
  confidenceScore: number;
  contributionWeight: number;
};

type AnalysisData = {
  image: string | null;
  temperature: number | null;
  humidity: number | null;
  nitrogen: number | null;
  phosphorus: number | null;
  potassium: number | null;
  prediction: {
    status: 'healthy' | 'unhealthy' | null;
    disease: string | null;
    confidence: number | null;
    recommendations: string[] | null;
    detectedIssues?: DetectedIssue[];
  }
};

type AnalysisContextType = {
  analysisData: AnalysisData;
  setImage: (image: string | null) => void;
  setEnvironmentalData: (temp: number | null, humidity: number | null) => void;
  setNPKValues: (n: number | null, p: number | null, k: number | null) => void;
  generatePrediction: () => void;
  clearData: () => void;
  fetchSensorData: () => Promise<{temperature: number, humidity: number} | null>;
  isLoadingSensorData: boolean;
  sensorError: string | null;
};

const initialAnalysisData: AnalysisData = {
  image: null,
  temperature: null,
  humidity: null,
  nitrogen: null,
  phosphorus: null,
  potassium: null,
  prediction: {
    status: null,
    disease: null,
    confidence: null,
    recommendations: null
  }
};

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export const AnalysisProvider = ({ children }: { children: ReactNode }) => {
  const [analysisData, setAnalysisData] = useState<AnalysisData>(initialAnalysisData);
  const [isLoadingSensorData, setIsLoadingSensorData] = useState(false);
  const [sensorError, setSensorError] = useState<string | null>(null);

  const setImage = (image: string | null) => {
    setAnalysisData(prev => ({ ...prev, image }));
  };

  const setEnvironmentalData = (temperature: number | null, humidity: number | null) => {
    setAnalysisData(prev => ({ ...prev, temperature, humidity }));
  };

  const setNPKValues = (nitrogen: number | null, phosphorus: number | null, potassium: number | null) => {
    setAnalysisData(prev => ({ ...prev, nitrogen, phosphorus, potassium }));
  };

  const fetchSensorData = async () => {
    setIsLoadingSensorData(true);
    setSensorError(null);
    
    try {
      const response = await fetch('https://api.thingspeak.com/channels/2892519/feeds.json?api_key=C2W4D2UNAWXAZJ44&results=2');
      
      if (!response.ok) {
        throw new Error('Failed to fetch sensor data');
      }
      
      const data = await response.json();
      
      // Check if we have any feeds data
      if (!data.feeds || data.feeds.length === 0) {
        throw new Error('No sensor data available');
      }
      
      // Get the latest feed (most recent reading)
      const latestFeed = data.feeds[data.feeds.length - 1];
      
      // Assuming field1 is temperature and field2 is humidity
      // Adjust these fields based on the actual ThingSpeak channel configuration
      const temperature = parseFloat(latestFeed.field1);
      const humidity = parseFloat(latestFeed.field2);
      
      // Check if the values are valid numbers
      if (isNaN(temperature) || isNaN(humidity)) {
        throw new Error('Invalid sensor readings');
      }
      
      // Update the context state with the fetched values
      setEnvironmentalData(temperature, humidity);
      
      setIsLoadingSensorData(false);
      return { temperature, humidity };
      
    } catch (error) {
      console.error('Error fetching sensor data:', error);
      setSensorError(error instanceof Error ? error.message : 'Unknown error occurred');
      setIsLoadingSensorData(false);
      return null;
    }
  };

  // Use the ML model for prediction
  const generatePrediction = () => {
    try {
      const { temperature, humidity, nitrogen, phosphorus, potassium } = analysisData;
      
      // Validate required inputs
      if (temperature === null || humidity === null || 
          nitrogen === null || phosphorus === null || potassium === null) {
        console.warn("Missing required inputs for prediction:", { temperature, humidity, nitrogen, phosphorus, potassium });
        // Use default values for any missing inputs (handled in ML model)
      }
      
      // Generate prediction using the ML model
      const prediction = cropHealthModel.predict({
        temperature,
        humidity,
        nitrogen, 
        phosphorus,
        potassium
      });
      
      console.log("Generated prediction:", prediction);
      
      // Update analysis data with the prediction results
      setAnalysisData(prev => ({
        ...prev,
        prediction: {
          status: prediction.status,
          disease: prediction.disease,
          confidence: prediction.confidence,
          recommendations: prediction.recommendations,
          detectedIssues: prediction.detectedIssues
        }
      }));
      
    } catch (error) {
      console.error("Error in generatePrediction:", error);
      throw new Error("Failed to generate prediction");
    }
  };

  const clearData = () => {
    setAnalysisData(initialAnalysisData);
    setSensorError(null);
  };

  return (
    <AnalysisContext.Provider
      value={{
        analysisData,
        setImage,
        setEnvironmentalData,
        setNPKValues,
        generatePrediction,
        clearData,
        fetchSensorData,
        isLoadingSensorData,
        sensorError
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => {
  const context = useContext(AnalysisContext);
  if (context === undefined) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
};
