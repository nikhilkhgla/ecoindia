import { Link } from 'react-router-dom';
import { ChartBar, Droplets, Leaf, Microscope, Thermometer } from 'lucide-react';
import { useEffect } from 'react';

const HomePage = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const features = [
    {
      icon: <Leaf className="h-12 w-12 text-green-500" />,
      title: 'Image-Based Analysis',
      description: 'Upload crop images for AI detection of visible disease symptoms or deficiencies'
    },
    {
      icon: <Thermometer className="h-12 w-12 text-red-500" />,
      title: 'Environmental Data',
      description: 'Integrate real-time temperature and humidity data from ESP8266 sensors'
    },
    {
      icon: <Microscope className="h-12 w-12 text-blue-500" />,
      title: 'NPK Sensor Data',
      description: 'Manually input Nitrogen, Phosphorus, and Potassium levels for comprehensive analysis'
    },
    {
      icon: <ChartBar className="h-12 w-12 text-purple-500" />,
      title: 'Smart Predictions',
      description: 'Get AI-powered predictions on crop health status with treatment recommendations'
    },
    {
      icon: <Droplets className="h-12 w-12 text-cyan-500" />,
      title: 'Detailed Reports',
      description: 'Receive comprehensive reports with diagnoses and actionable recommendations'
    }
  ];

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-400 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">AI-Powered Crop Health Analysis</h1>
          <p className="text-xl mb-8">Revolutionizing agriculture with smart crop monitoring and analysis</p>
          <Link 
            to="/analysis" 
            className="bg-white text-green-600 px-6 py-3 rounded-full font-semibold hover:bg-green-50 transition-colors shadow-lg"
          >
            Start New Analysis
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How It Works</h2>
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col space-y-6">
              <div className="flex items-start">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1 flex-shrink-0">1</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Upload Crop Image</h3>
                  <p className="text-gray-600 mt-1">Take a clear photo of your crop and upload it to our system for analysis</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1 flex-shrink-0">2</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Input Sensor Data</h3>
                  <p className="text-gray-600 mt-1">Enter temperature, humidity, and NPK sensor readings for comprehensive analysis</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1 flex-shrink-0">3</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">AI Analysis</h3>
                  <p className="text-gray-600 mt-1">Our AI model processes the data and identifies potential issues or confirms healthy status</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1 flex-shrink-0">4</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Get Detailed Report</h3>
                  <p className="text-gray-600 mt-1">Receive a comprehensive report with diagnosis and actionable recommendations</p>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link 
                to="/analysis" 
                className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors shadow-md"
              >
                Try It Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
