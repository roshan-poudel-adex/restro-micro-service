import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Plus, Minus, ShoppingCart, Filter, Search, SlidersHorizontal, X } from 'lucide-react';
import { useOrder } from '../context/OrderContext';
import { Link } from 'react-router-dom';
import FoodCard from '../components/FoodCard';
import toast from 'react-hot-toast';

const Menu = () => {
  const { state, dispatch } = useOrder();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [dietaryFilter, setDietaryFilter] = useState('all');
  const [spicyFilter, setSpicyFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'appetizers', name: 'Appetizers' },
    { id: 'momos', name: 'Momos' },
    { id: 'curries', name: 'Curries' },
    { id: 'rice', name: 'Rice & Noodles' },
    { id: 'drinks', name: 'Beverages' },
    { id: 'desserts', name: 'Desserts' }
  ];

  const menuItems = [
    {
      id: '1',
      name: 'Traditional Chicken Momos',
      description: 'Steamed dumplings filled with seasoned chicken, served with spicy tomato chutney',
      price: 12.90,
      category: 'momos',
      image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      rating: 4.9,
      popular: true,
      vegetarian: false,
      spicy: 2
    },
    {
      id: '2',
      name: 'Vegetable Momos',
      description: 'Fresh vegetables and herbs wrapped in delicate dumpling skin, perfectly steamed',
      price: 10.90,
      category: 'momos',
      image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      rating: 4.8,
      popular: true,
      vegetarian: true,
      spicy: 1
    },
    {
      id: '13',
      name: 'Buff Momos',
      description: 'Traditional buffalo meat momos with authentic Nepalese spices and herbs',
      price: 14.90,
      category: 'momos',
      image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      rating: 4.9,
      popular: false,
      vegetarian: false,
      spicy: 3
    },
    {
      id: '14',
      name: 'Jhol Momos',
      description: 'Steamed momos served in spicy tomato-based soup broth',
      price: 15.90,
      category: 'momos',
      image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      rating: 4.7,
      popular: true,
      vegetarian: false,
      spicy: 3
    },
    {
      id: '3',
      name: 'Dal Bhat Tarkari',
      description: 'Traditional lentil curry with basmati rice, seasonal vegetables, and pickle',
      price: 15.90,
      category: 'rice',
      image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      rating: 4.9,
      popular: true,
      vegetarian: true,
      spicy: 2
    },
    {
      id: '15',
      name: 'Mutton Curry',
      description: 'Tender goat meat curry cooked with traditional Nepalese spices',
      price: 22.90,
      category: 'curries',
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      rating: 4.8,
      popular: false,
      vegetarian: false,
      spicy: 3
    },
    {
      id: '16',
      name: 'Paneer Curry',
      description: 'Fresh cottage cheese in rich tomato and cream curry sauce',
      price: 16.90,
      category: 'curries',
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      rating: 4.6,
      popular: false,
      vegetarian: true,
      spicy: 2
    },
    {
      id: '17',
      name: 'Nepali Tea',
      description: 'Traditional milk tea with cardamom, ginger, and Himalayan herbs',
      price: 4.50,
      category: 'drinks',
      image: 'https://images.pexels.com/photos/1894810/pexels-photo-1894810.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      rating: 4.7,
      popular: false,
      vegetarian: true,
      spicy: 0
    },
    {
      id: '18',
      name: 'Kheer',
      description: 'Traditional rice pudding with milk, cardamom, and nuts',
      price: 7.90,
      category: 'desserts',
      image: 'https://images.pexels.com/photos/3616956/pexels-photo-3616956.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      rating: 4.5,
      popular: false,
      vegetarian: true,
      spicy: 0
    },
    {
      id: '4',
      name: 'Chicken Curry',
      description: 'Tender chicken in aromatic curry with traditional Himalayan spices',
      price: 18.90,
      category: 'curries',
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      rating: 4.7,
      popular: false,
      vegetarian: false,
      spicy: 3
    },
    {
      id: '5',
      name: 'Gundruk Soup',
      description: 'Fermented leafy greens soup with tomatoes and traditional spices',
      price: 8.90,
      category: 'appetizers',
      image: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      rating: 4.6,
      popular: false,
      vegetarian: true,
      spicy: 2
    },
    {
      id: '6',
      name: 'Chatamari',
      description: 'Nepalese rice crepe topped with minced meat and vegetables',
      price: 14.90,
      category: 'appetizers',
      image: 'https://images.pexels.com/photos/12737766/pexels-photo-12737766.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      rating: 4.5,
      popular: false,
      vegetarian: false,
      spicy: 2
    },
    {
      id: '7',
      name: 'Aloo Tama',
      description: 'Potato and bamboo shoot curry with black-eyed peas',
      price: 13.90,
      category: 'curries',
      image: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      rating: 4.4,
      popular: false,
      vegetarian: true,
      spicy: 2
    },
    {
      id: '8',
      name: 'Chow Mein',
      description: 'Stir-fried noodles with vegetables and your choice of meat',
      price: 16.90,
      category: 'rice',
      image: 'https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      rating: 4.6,
      popular: false,
      vegetarian: false,
      spicy: 2
    },
    {
      id: '9',
      name: 'Thukpa',
      description: 'Hearty noodle soup with vegetables and tender meat in aromatic broth',
      price: 14.90,
      category: 'rice',
      image: 'https://images.pexels.com/photos/1887735/pexels-photo-1887735.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      rating: 4.7,
      popular: false,
      vegetarian: false,
      spicy: 2
    },
    {
      id: '10',
      name: 'Masala Chai',
      description: 'Traditional spiced tea with milk, cardamom, and cinnamon',
      price: 3.50,
      category: 'drinks',
      image: 'https://images.pexels.com/photos/1894810/pexels-photo-1894810.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      rating: 4.8,
      popular: true,
      vegetarian: true,
      spicy: 0
    },
    {
      id: '11',
      name: 'Lassi',
      description: 'Refreshing yogurt drink available in sweet, salty, or mango flavor',
      price: 4.50,
      category: 'drinks',
      image: 'https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      rating: 4.5,
      popular: false,
      vegetarian: true,
      spicy: 0
    },
    {
      id: '12',
      name: 'Sel Roti',
      description: 'Traditional ring-shaped rice bread, crispy outside and soft inside',
      price: 6.90,
      category: 'desserts',
      image: 'https://images.pexels.com/photos/3616956/pexels-photo-3616956.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      rating: 4.7,
      popular: false,
      vegetarian: true,
      spicy: 0
    }
  ];

  let filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
    const matchesDietary = dietaryFilter === 'all' || 
                          (dietaryFilter === 'vegetarian' && item.vegetarian) ||
                          (dietaryFilter === 'non-vegetarian' && !item.vegetarian);
    const matchesSpicy = spicyFilter === 'all' || 
                        (spicyFilter === 'mild' && item.spicy <= 1) ||
                        (spicyFilter === 'medium' && item.spicy === 2) ||
                        (spicyFilter === 'hot' && item.spicy >= 3);
    
    return matchesCategory && matchesSearch && matchesPrice && matchesDietary && matchesSpicy;
  });

  // Sort items
  filteredItems = filteredItems.sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return (b.popular ? 1 : 0) - (a.popular ? 1 : 0) || b.rating - a.rating;
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const addToOrder = (item) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        image: item.image
      }
    });
    toast.success(`${item.name} added to cart!`);
  };

  const getItemQuantity = (itemId) => {
    const item = state.items.find(item => item.id === itemId);
    return item ? item.quantity : 0;
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      dispatch({ type: 'REMOVE_ITEM', payload: itemId });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity: newQuantity } });
    }
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSearchTerm('');
    setPriceRange([0, 50]);
    setDietaryFilter('all');
    setSpicyFilter('all');
    setSortBy('popular');
  };

  return (
    <>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-16"
    >
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-red-900 via-red-800 to-orange-800">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop")'
          }}
        ></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 text-white">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-6xl font-bold mb-6"
          >
            Our Menu
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl mb-8"
          >
            Authentic Nepalese flavors crafted with traditional recipes • 50+ dishes available
          </motion.p>
          
          <div className="flex items-center justify-center space-x-8 text-red-200">
            <div className="flex items-center space-x-2">
              <Star className="h-6 w-6 text-yellow-400 fill-current" />
              <span className="font-semibold">4.9/5 Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Free Delivery Over €25</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search dishes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-lg"
              />
            </div>
            
            {/* Advanced Filters Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-3 rounded-xl transition-colors"
            >
              <SlidersHorizontal className="h-5 w-5" />
              <span>Filters</span>
              {(dietaryFilter !== 'all' || spicyFilter !== 'all' || priceRange[0] > 0 || priceRange[1] < 50) && (
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">Active</span>
              )}
            </button>
            
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name A-Z</option>
            </select>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 lg:max-w-md">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-600'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <motion.section
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-gray-50 border-b"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Advanced Filters</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={clearFilters}
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range: €{priceRange[0]} - €{priceRange[1]}
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="flex-1"
                  />
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="flex-1"
                  />
                </div>
              </div>
              
              {/* Dietary Preferences */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dietary</label>
                <select
                  value={dietaryFilter}
                  onChange={(e) => setDietaryFilter(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="all">All Items</option>
                  <option value="vegetarian">Vegetarian Only</option>
                  <option value="non-vegetarian">Non-Vegetarian</option>
                </select>
              </div>
              
              {/* Spice Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Spice Level</label>
                <select
                  value={spicyFilter}
                  onChange={(e) => setSpicyFilter(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="all">All Levels</option>
                  <option value="mild">Mild 🌶️</option>
                  <option value="medium">Medium 🌶️🌶️</option>
                  <option value="hot">Hot 🌶️🌶️🌶️</option>
                </select>
              </div>
              
              {/* Results Count */}
              <div className="flex items-end">
                <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg">
                  <span className="font-semibold">{filteredItems.length}</span> dishes found
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Menu Items */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No dishes found</h3>
              <p className="text-gray-600 mb-8">Try adjusting your filters or search terms</p>
              <button
                onClick={clearFilters}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-xl transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <FoodCard
                  item={item}
                  onAddToCart={addToOrder}
                  quantity={getItemQuantity(item.id)}
                  onUpdateQuantity={updateQuantity}
                />
              </motion.div>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* Floating Cart Button */}
      {state.items.length > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <Link
            to="/order"
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white p-4 rounded-2xl shadow-2xl hover:shadow-red-500/25 transition-all flex items-center space-x-3 group"
          >
            <ShoppingCart className="h-7 w-7 group-hover:scale-110 transition-transform" />
            <div className="flex flex-col">
              <span className="bg-yellow-400 text-red-800 text-sm font-bold px-3 py-1 rounded-full mb-1">
              {state.items.length}
            </span>
              <span className="hidden sm:inline font-bold text-lg">
              €{state.total.toFixed(2)}
            </span>
            </div>
          </Link>
        </motion.div>
      )}
    </motion.div>
    </>
  );
};

export default Menu;