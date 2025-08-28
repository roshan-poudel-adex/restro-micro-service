import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Clock, Phone } from 'lucide-react';

const LocationMap = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-6">
        <h3 className="text-2xl font-bold mb-2">Visit Our Restaurant</h3>
        <p className="text-red-100">Located in the heart of Munich</p>
      </div>
      
      <div className="p-6">
        {/* Mock Map */}
        <div className="bg-gray-200 h-64 rounded-xl mb-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 opacity-20"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-red-600 text-white p-3 rounded-full shadow-lg"
            >
              <MapPin className="h-6 w-6" />
            </motion.div>
          </div>
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg">
            <p className="text-sm font-semibold text-gray-800">Everest Kitchen</p>
            <p className="text-xs text-gray-600">Marienplatz 15, Munich</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
            <MapPin className="h-6 w-6 text-red-600" />
            <div>
              <p className="font-semibold text-gray-800">Address</p>
              <p className="text-sm text-gray-600">Marienplatz 15, 80331 München</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
            <Phone className="h-6 w-6 text-red-600" />
            <div>
              <p className="font-semibold text-gray-800">Phone</p>
              <p className="text-sm text-gray-600">+49 89 123 4567</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
            <Navigation className="h-6 w-6 text-red-600" />
            <div>
              <p className="font-semibold text-gray-800">Delivery Radius</p>
              <p className="text-sm text-gray-600">20km from city center</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
            <Clock className="h-6 w-6 text-red-600" />
            <div>
              <p className="font-semibold text-gray-800">Open Now</p>
              <p className="text-sm text-gray-600">Until 22:00 today</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex space-x-4">
          <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl transition-colors">
            Get Directions
          </button>
          <button className="flex-1 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-bold py-3 px-4 rounded-xl transition-colors">
            Call Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;