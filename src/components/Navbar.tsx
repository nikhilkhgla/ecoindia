import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, ShoppingCart, User, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Track scroll position to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-green-700 shadow-md' : 'bg-gradient-to-r from-green-700 to-green-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-white">Eco<span className="text-orange-400">India</span></span>
            </Link>
            <div className="hidden md:ml-8 md:flex md:space-x-6">
              <Link to="/" className={`px-3 py-2 rounded-md text-sm font-medium text-white ${
                location.pathname === '/' ? 'bg-green-600' : 'hover:bg-green-600/70'
              } transition-colors`}>Home</Link>
              <Link to="/marketplace" className={`px-3 py-2 rounded-md text-sm font-medium text-white ${
                location.pathname === '/marketplace' ? 'bg-green-600' : 'hover:bg-green-600/70'
              } transition-colors`}>Marketplace</Link>
              <Link to="/home" className={`px-3 py-2 rounded-md text-sm font-medium text-white ${
                location.pathname === '/home' ? 'bg-green-600' : 'hover:bg-green-600/70'
              } transition-colors`}>FarmScanner</Link>
              <Link to="/crop-calendar" className={`px-3 py-2 rounded-md text-sm font-medium text-white ${
                location.pathname === '/crop-calendar' ? 'bg-green-600' : 'hover:bg-green-600/70'
              } transition-colors`}>Crop Calendar</Link>
              <Link to="/community" className={`px-3 py-2 rounded-md text-sm font-medium text-white ${
                location.pathname === '/community' ? 'bg-green-600' : 'hover:bg-green-600/70'
              } transition-colors`}>Community</Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-5">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="bg-green-600/50 text-white placeholder-green-200 rounded-full py-1.5 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-white/70 w-48 transition-all focus:w-60"
              />
              <Search className="absolute right-3 top-1.5 h-5 w-5 text-green-200" />
            </div>
            <Link to="/login" className="p-2 rounded-full hover:bg-green-600/70 text-white transition-colors">
              <User className="h-5 w-5" />
            </Link>
            {/* <Link to="/marketplace" className="p-2 rounded-full hover:bg-green-600/70 text-white transition-colors relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-4 w-4 bg-orange-500 rounded-full text-xs flex items-center justify-center">2</span>
            </Link> */}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-green-600 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-green-800 animate-fadeIn">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-green-600 transition-colors">Home</Link>
            <Link to="/marketplace" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-green-600 transition-colors">Marketplace</Link>
            <Link to="/home" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-green-600 transition-colors">Farm Scanner</Link>
            <Link to="/crop-calendar" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-green-600 transition-colors">Crop Calendar</Link>
            <Link to="/community" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-green-600 transition-colors">Community</Link>
            
            <div className="relative mt-3 px-3">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-green-600/50 text-white placeholder-green-200 rounded-full py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-white/70"
              />
              <Search className="absolute right-6 top-2.5 h-5 w-5 text-green-200" />
            </div>
            
            <div className="flex justify-between px-3 pt-3">
              <Link to="/login" className="flex items-center text-white hover:text-green-200 transition-colors">
                <User className="h-5 w-5 mr-2" /> Login
              </Link>
              <Link to="/marketplace" className="flex items-center text-white hover:text-green-200 transition-colors">
                <ShoppingCart className="h-5 w-5 mr-2" /> Cart (2)
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
