import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

interface ReviewCardProps {
  name: string;
  rating: number;
  review: string;
  date: string;
  platform: string;
  avatar?: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ name, rating, review, date, platform, avatar }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
            {avatar ? (
              <img src={avatar} alt={name} className="w-full h-full rounded-full object-cover" />
            ) : (
              name.charAt(0)
            )}
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">{name}</h4>
            <p className="text-sm text-gray-500">{platform} • {date}</p>
          </div>
        </div>
        <Quote className="h-6 w-6 text-red-200" />
      </div>
      
      <div className="flex items-center mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      
      <p className="text-gray-700 leading-relaxed italic">"{review}"</p>
    </motion.div>
  );
};

export default ReviewCard;