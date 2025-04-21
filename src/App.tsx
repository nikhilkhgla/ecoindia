import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
// import FarmScanner from './pages/FarmScanner';
import CropCalendar from './pages/CropCalendar';
import Community from './pages/Community';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HomePage from './pages/HomePage';
import AnalysisPage from './pages/AnalysisPage';
import ReportPage from './pages/ReportPage';
import { AnalysisProvider } from './context/AnalysisContext';

export function App() {
  useEffect(() => {
    // Include required fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <Router>
      
      <AnalysisProvider>
        <div className="flex flex-col min-h-screen bg-gray-50" style={{ fontFamily: "'Poppins', sans-serif" }}>
          <Navbar />
          <main className="flex-grow pt-16">
            <Routes>
              {/* Existing Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/marketplace" element={<Marketplace />} />
              {/* <Route path="/farm-scanner" element={<FarmScanner />} /> */}
              <Route path="/crop-calendar" element={<CropCalendar />} />
              <Route path="/community" element={<Community />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* New Routes */}
              <Route path="/home" element={<HomePage />} />
              <Route path="/analysis" element={<AnalysisPage />} />
              <Route path="/report" element={<ReportPage />} />
            </Routes>
          </main>
          <Chatbot />
          <Footer />
        </div>
      </AnalysisProvider>
    </Router>
  );
}

export default App;
