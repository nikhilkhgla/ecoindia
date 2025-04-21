import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChartBar, CircleCheck, Download, Droplets, FileDown, FlaskConical, LoaderCircle, Printer, Squircle, ThermometerSun } from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ReportPage = () => {
  const { analysisData } = useAnalysis();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Check if data is ready
  useEffect(() => {
    console.log("Report page mounted, checking data:", analysisData);
    
    // Check if all required data is present
    const requiredFields = [
      analysisData.temperature !== null,
      analysisData.humidity !== null,
      analysisData.nitrogen !== null,
      analysisData.phosphorus !== null,
      analysisData.potassium !== null,
      analysisData.prediction.status !== null
    ];
    
    // Give a longer loading time to make sure data is processed
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // If any required data is missing after loading time, redirect to analysis
      if (requiredFields.includes(false)) {
        console.error("Missing required data for report", analysisData);
        alert("Error: Missing data for report generation. Redirecting to analysis page.");
        navigate('/analysis');
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [analysisData, navigate]);

  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;
    
    setIsDownloading(true);
    try {
      // Hide the download buttons during capture
      const buttonsContainer = document.querySelector('.print\\:hidden');
      const buttonsDisplayStyle = buttonsContainer ? getComputedStyle(buttonsContainer).display : 'block';
      if (buttonsContainer) {
        buttonsContainer.setAttribute('style', 'display: none !important');
      }

      // Find "Next Steps" section that should be excluded from PDF
      const nextStepsSection = reportRef.current.querySelector('.print\\:hidden:not(:first-child)');
      const nextStepsDisplayStyle = nextStepsSection ? getComputedStyle(nextStepsSection).display : 'block';
      if (nextStepsSection) {
        nextStepsSection.setAttribute('style', 'display: none !important');
      }

      const pdfOptions = {
        scale: 2, // Higher scale for better quality
        useCORS: true, // To handle images from different domains
        allowTaint: true,
        scrollX: 0,
        scrollY: 0,
        backgroundColor: '#ffffff'
      };

      const canvas = await html2canvas(reportRef.current, pdfOptions);
      
      // Restore elements back to normal
      if (buttonsContainer) {
        buttonsContainer.setAttribute('style', `display: ${buttonsDisplayStyle}`);
      }
      if (nextStepsSection) {
        nextStepsSection.setAttribute('style', `display: ${nextStepsDisplayStyle}`);
      }

      const imgData = canvas.toDataURL('image/png');
      
      // Calculate dimensions for PDF
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      
      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      // Add additional pages if needed
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      // Generate a filename with date
      const today = new Date();
      const dateStr = today.toISOString().split('T')[0]; // YYYY-MM-DD format
      
      // Save the PDF
      pdf.save(`CropHealth_Report_${dateStr}.pdf`);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('There was a problem generating the PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };
  
  // Get severity color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-500';
      case 'low': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  // Show loading state while checking data
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <LoaderCircle size={48} className="text-green-600 animate-spin mb-4" />
        <h2 className="text-xl font-medium text-gray-700">Generating Report...</h2>
        <p className="text-gray-500 mt-2">Processing data through ML model...</p>
      </div>
    );
  }

  // If we passed the loading check but still don't have status, prevent errors with early return
  if (!analysisData.prediction.status) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-red-50 p-6 rounded-lg max-w-md mx-auto">
          <Squircle size={48} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-red-700 mb-2">Report Generation Failed</h2>
          <p className="text-gray-700 mb-4">There was a problem generating your report. This may be due to missing data or processing errors.</p>
          <Link to="/analysis" className="bg-green-600 text-white px-4 py-2 rounded-md inline-block">
            Try Again
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Fixed Floating Download Button on Mobile */}
      <div className="md:hidden fixed bottom-5 right-5 z-10">
        <button
          onClick={handleDownloadPDF}
          disabled={isDownloading}
          className="flex items-center justify-center w-14 h-14 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isDownloading ? (
            <LoaderCircle size={24} className="animate-spin" />
          ) : (
            <FileDown size={24} />
          )}
        </button>
      </div>
      
      <div className="print:hidden mb-8 flex justify-between items-center">
        <Link to="/analysis" className="flex items-center text-green-600 hover:underline">
          <ArrowLeft size={18} className="mr-1" />
          <span>New Analysis</span>
        </Link>
        
        <div className="hidden md:flex space-x-3">
          <button 
            onClick={handlePrint}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            <Printer size={18} className="mr-2" />
            Print Report
          </button>
          
          <button 
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isDownloading ? (
              <>
                <LoaderCircle size={18} className="mr-2 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download size={18} className="mr-2" />
                Download Report
              </>
            )}
          </button>
        </div>
      </div>
      
      <div ref={reportRef} className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden print:shadow-none">
        {/* Report Header */}
        <div className="bg-green-600 text-white p-6">
          <div className="flex justify-between">
            <div>
              <h1 className="text-2xl font-bold">Crop Health Analysis Report</h1>
              <p className="mt-2 opacity-90">Generated on {formatDate()}</p>
            </div>
            
            <div className="text-right">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white text-green-600 font-semibold">
                {analysisData.prediction.status === 'healthy' ? (
                  <>
                    <CircleCheck size={16} className="mr-1" />
                    Healthy
                  </>
                ) : (
                  <>
                    <Squircle size={16} className="mr-1" />
                    Needs Attention
                  </>
                )}
              </div>
              
              <div className="mt-2 text-sm">
                Confidence: {analysisData.prediction.confidence}%
              </div>
            </div>
          </div>
        </div>
        
        {/* Report Content */}
        <div className="p-6">
          {/* Image and Summary */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="md:w-1/2">
              <h2 className="text-lg font-semibold mb-3">Crop Image</h2>
              <div className="border rounded-lg overflow-hidden">
                {analysisData.image ? (
                  <img 
                    src={analysisData.image} 
                    alt="Analyzed Crop" 
                    className="w-full h-64 object-cover"
                    crossOrigin="anonymous"
                  />
                ) : (
                  <div className="h-64 bg-gray-100 flex items-center justify-center text-gray-400">
                    No image available
                  </div>
                )}
              </div>
            </div>
            
            <div className="md:w-1/2">
              <h2 className="text-lg font-semibold mb-3">Analysis Summary</h2>
              <div className="bg-gray-50 p-4 rounded-lg h-64 flex flex-col">
                <div className="mb-4">
                  <div className="font-medium">Health Status:</div>
                  <div className={`font-semibold text-lg ${analysisData.prediction.status === 'healthy' ? 'text-green-600' : 'text-red-600'}`}>
                    {analysisData.prediction.status === 'healthy' ? 'Healthy' : 'Unhealthy'}
                  </div>
                </div>
                
                {analysisData.prediction.disease && (
                  <div className="mb-4">
                    <div className="font-medium">Diagnosis:</div>
                    <div className="text-red-600 font-semibold">{analysisData.prediction.disease}</div>
                  </div>
                )}
                
                <div>
                  <div className="font-medium">Confidence Level:</div>
                  <div className="flex items-center mt-1">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          analysisData.prediction.confidence! >= 80 ? 'bg-green-600' : 
                          analysisData.prediction.confidence! >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                        }`} 
                        style={{ width: `${analysisData.prediction.confidence}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm">{analysisData.prediction.confidence}%</span>
                  </div>
                </div>

                <div className="mt-4 text-xs bg-blue-50 p-2 rounded">
                  <p className="text-blue-700 font-medium">ML Model Analysis:</p>
                  <p>This analysis was performed using our trained Machine Learning model that evaluates crop health based on environmental and nutrient parameters.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Data Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <ThermometerSun size={20} className="text-blue-500 mr-2" />
                <h3 className="font-semibold">Temperature</h3>
              </div>
              <div className="text-2xl font-bold">{analysisData.temperature}°C</div>
              <div className="text-xs text-gray-500 mt-1">
                {analysisData.temperature! > 35 ? 'High' : analysisData.temperature! < 15 ? 'Low' : 'Optimal'} for most crops
              </div>
              <div className="mt-2 text-xs text-blue-600">From ESP8266 sensor</div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <Droplets size={20} className="text-blue-500 mr-2" />
                <h3 className="font-semibold">Humidity</h3>
              </div>
              <div className="text-2xl font-bold">{analysisData.humidity}%</div>
              <div className="text-xs text-gray-500 mt-1">
                {analysisData.humidity! > 85 ? 'High' : analysisData.humidity! < 30 ? 'Low' : 'Optimal'} for most crops
              </div>
              <div className="mt-2 text-xs text-blue-600">From ESP8266 sensor</div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <FlaskConical size={20} className="text-blue-500 mr-2" />
                <h3 className="font-semibold">NPK Values</h3>
              </div>
              <div className="flex justify-between">
                <div className="text-center">
                  <div className="text-sm">Nitrogen</div>
                  <div className="text-lg font-bold">{analysisData.nitrogen}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm">Phosphorus</div>
                  <div className="text-lg font-bold">{analysisData.phosphorus}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm">Potassium</div>
                  <div className="text-lg font-bold">{analysisData.potassium}</div>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-600">Manually entered values</div>
            </div>
          </div>
          
          {/* ML Model Insights */}
          {analysisData.prediction.detectedIssues && analysisData.prediction.detectedIssues.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3 flex items-center">
                <ChartBar size={18} className="mr-2 text-purple-600" />
                ML Model Insights
              </h2>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-purple-800 mb-3">
                  Our machine learning model detected the following conditions based on your input data:
                </p>
                <div className="space-y-3">
                  {analysisData.prediction.detectedIssues.map((issue, index) => (
                    <div key={index} className="flex items-center bg-white p-3 rounded-md shadow-sm">
                      <div className={`w-3 h-3 rounded-full ${getSeverityColor(issue.severity)} mr-3`}></div>
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <span className="font-medium">{issue.name}</span>
                          <span className="text-sm text-gray-500">
                            Confidence: {Math.round(issue.confidenceScore * 100)}%
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Severity: <span className="font-medium capitalize">{issue.severity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-purple-700 mt-4 bg-purple-100 p-2 rounded">
                  Our ML model analyzes the relationships between different parameters to identify issues that might not be apparent from individual readings alone.
                </div>
              </div>
            </div>
          )}
          
          {/* Recommendations */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Recommendations</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              {analysisData.prediction.recommendations?.map((recommendation, index) => (
                <div key={index} className="flex items-start mb-3 last:mb-0">
                  <div className="bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                    {index + 1}
                  </div>
                  <p>{recommendation}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Download Option for Medium Screens */}
          <div className="md:hidden print:hidden text-center my-8">
            <button 
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed w-full justify-center"
            >
              {isDownloading ? (
                <>
                  <LoaderCircle size={20} className="mr-2 animate-spin" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <Download size={20} className="mr-2" />
                  Download Report as PDF
                </>
              )}
            </button>
          </div>
          
          {/* Next Steps */}
          <div className="text-center mt-10 p-4 border-t pt-6 print:hidden">
            <h3 className="font-semibold text-lg mb-3">Next Steps</h3>
            <p className="text-gray-600 mb-4">Would you like to perform another crop analysis?</p>
            <Link 
              to="/analysis" 
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-colors shadow-sm"
            >
              Start New Analysis
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
