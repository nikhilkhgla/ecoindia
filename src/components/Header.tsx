import { format } from 'date-fns';
import { Calendar, MapPin } from 'lucide-react';
import { UserLocation } from '../types';

interface HeaderProps {
  location: UserLocation | null;
  date: Date;
}

const Header = ({ location, date }: HeaderProps) => {
  return (
    <header className="bg-green-800 text-white p-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Smart Crop Calendar</h1>
            <p className="text-green-100">EcoIndia Agriculture</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row items-center gap-4">
            {location && (
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span>{location.name}</span>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{format(date, 'PPP')}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
