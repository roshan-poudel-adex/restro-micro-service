import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Plus, Minus, Heart, Info } from 'lucide-react';

interface FoodCardProps {
  item: any;
  onAddToCart: (item: any) => void;
  quantity: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ item, onAddToCart, quantity, onUpdateQuantity }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const getSpicyIndicator = (level: number) => {
    return '🌶️'.repeat(level);
  };

  const getBadgeColor = (category: string) => {
    const colors = {
      momos: 'bg-red-100 text-red-700',
      curries: 'bg-orange-100 text-orange-700',
      rice: 'bg-green-100 text-green-700',
      appetizers: 'bg-blue-100 text-blue-700',
      drinks: 'bg-purple-100 text-purple-700',
      desserts: 'bg-pink-100 text-pink-700'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  return (
    <motion.div
      layout
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
    >
      <div className="relative overflow-hidden">
        <img 
          src={item.image}
          alt={item.name}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Overlay badges */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          {item.popular && (
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              🔥 Popular
            </span>
          )}
          {item.vegetarian && (
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              🌱 Vegetarian
            </span>
          )}
        </div>

        {/* Heart button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
        >
          <Heart className={`h-5 w-5 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
        </button>

        {/* Quick info button */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="absolute bottom-4 right-4 p-2 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-colors"
        >
          <Info className="h-4 w-4" />
        </button>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(item.category)}`}>
                {item.category}
              </span>
              {item.spicy > 0 && (
                <span className="text-sm">{getSpicyIndicator(item.spicy)}</span>
              )}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors">
              {item.name}
            </h3>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
          {item.description}
        </p>
        
        {/* Expandable details */}
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 p-3 bg-gray-50 rounded-lg"
          >
            <div className="text-xs text-gray-600 space-y-1">
              <p><strong>Preparation time:</strong> 15-20 minutes</p>
              <p><strong>Allergens:</strong> Contains gluten, may contain nuts</p>
              <p><strong>Calories:</strong> ~450 kcal</p>
            </div>
          </motion.div>
        )}
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium text-gray-700">{item.rating}</span>
            </div>
            <span className="text-xs text-gray-500">(127 reviews)</span>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-red-600">€{item.price.toFixed(2)}</span>
            <p className="text-xs text-gray-500">incl. VAT</p>
          </div>
        </div>
        
        {quantity === 0 ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onAddToCart(item)}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
          >
            <Plus className="h-5 w-5" />
            <span>Add to Cart</span>
          </motion.button>
        ) : (
          <div className="flex items-center justify-between bg-gray-100 rounded-xl p-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onUpdateQuantity(item.id, quantity - 1)}
              className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors shadow-md"
            >
              <Minus className="h-4 w-4" />
            </motion.button>
            <span className="font-bold text-gray-800 px-4 text-lg">
              {quantity}
            </span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onUpdateQuantity(item.id, quantity + 1)}
              className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors shadow-md"
            >
              <Plus className="h-4 w-4" />
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FoodCard;