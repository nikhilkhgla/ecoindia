import React from 'react';
import { Cpu, MapPin } from 'lucide-react';
import { DataSource } from '../types';

interface DataSourceToggleProps {
  dataSource: DataSource;
  onToggle: () => void;
}

const DataSourceToggle = ({ dataSource, onToggle }: DataSourceToggleProps) => {
  return (
    <div className="flex items-center">
      <span className="mr-2 text-sm font-medium text-gray-700">
        {dataSource === 'location' ? 'Location' : 'FramScanner'}
      </span>
      
      <button
        onClick={onToggle}
        className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus:outline-none ${
          dataSource === 'thingspeak' ? 'bg-green-600' : 'bg-gray-400'
        }`}
        aria-pressed={dataSource === 'thingspeak'}
      >
        <span className="sr-only">
          {dataSource === 'location' ? 'Switch to FramScanner data' : 'Switch to location data'}
        </span>
        
        <span 
          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
            dataSource === 'thingspeak' ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
        
        <span className="absolute left-0 top-0 flex h-full w-5 items-center justify-center">
          <MapPin size={12} className={`text-${dataSource === 'location' ? 'white' : 'gray-400'}`} />
        </span>
        
        <span className="absolute right-0 top-0 flex h-full w-5 items-center justify-center">
          <Cpu size={12} className={`text-${dataSource === 'thingspeak' ? 'white' : 'gray-400'}`} />
        </span>
      </button>
    </div>
  );
};

export default DataSourceToggle;
