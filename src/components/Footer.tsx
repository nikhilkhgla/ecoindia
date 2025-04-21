import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-green-800 to-green-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-2xl font-bold mb-4">Eco<span className="text-orange-400">India</span></h3>
            <p className="text-sm text-green-200 mb-4">
              Empowering farmers with AI-driven solutions for sustainable agriculture and eco-friendly farming practices.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-50">Quick Links</h3>
            <ul className="space-y-3 text-sm text-green-200">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/marketplace" className="hover:text-white transition-colors">Marketplace</Link></li>
              <li><Link to="/home" className="hover:text-white transition-colors">Farm Scanner</Link></li>
              <li><Link to="/crop-calendar" className="hover:text-white transition-colors">Crop Calendar</Link></li>
              <li><Link to="/community" className="hover:text-white transition-colors">Community</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-50">Support</h3>
            <ul className="space-y-3 text-sm text-green-200">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-50">Contact Us</h3>
            <div className="space-y-4 text-sm text-green-200">
              <div className="flex">
                <MapPin className="h-5 w-5 mr-3 text-orange-400 flex-shrink-0" />
                <span>kosi kalan mathura, house no 2451, uttar pradesh - 281403, India</span>
              </div>
              <div className="flex">
                <Phone className="h-5 w-5 mr-3 text-orange-400 flex-shrink-0" />
                <span>+91 8937879361</span>
              </div>
              <div className="flex">
                <Mail className="h-5 w-5 mr-3 text-orange-400 flex-shrink-0" />
                <span>support@ecoindia.com</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium text-green-50 mb-2">Subscribe to our Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 text-sm text-gray-900 bg-white rounded-l-md focus:outline-none flex-1"
                />
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 text-sm rounded-r-md transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-green-700/50 text-center text-sm text-green-300">
          <p>© {currentYear} EcoIndia. All rights reserved. Made with ❤️ for Indian Farmers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
