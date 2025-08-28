import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock, Utensils, Heart, Award, TrendingUp, Users, ChefHat, Truck } from 'lucide-react';
import ReviewCard from '../components/ReviewCard';
import NewsletterSignup from '../components/NewsletterSignup';
import LocationMap from '../components/LocationMap';

const Home = () => {
  const features = [
    {
      icon: <ChefHat className="h-12 w-12 text-red-500" />,
      title: "Authentic Cuisine",
      description: "Traditional Nepalese recipes passed down through generations, prepared by expert chefs from Nepal"
    },
    {
      icon: <Truck className="h-12 w-12 text-red-500" />,
      title: "Fast Delivery",
      description: "Quick delivery within 20km radius of Munich, or ready for pickup in 2-3 hours"
    },
    {
      icon: <Award className="h-12 w-12 text-red-500" />,
      title: "Award Winning",
      description: "Recognized as Munich's best Nepalese restaurant 2023 with 4.9/5 rating"
    },
    {
      icon: <Heart className="h-12 w-12 text-red-500" />,
      title: "Fresh Ingredients",
      description: "Daily fresh ingredients sourced locally and authentic spices imported from Nepal"
    }
  ];

  const stats = [
    { number: "5000+", label: "Happy Customers", icon: <Users className="h-8 w-8" /> },
    { number: "4.9", label: "Average Rating", icon: <Star className="h-8 w-8" /> },
    { number: "50+", label: "Menu Items", icon: <Utensils className="h-8 w-8" /> },
    { number: "3", label: "Years Serving", icon: <TrendingUp className="h-8 w-8" /> }
  ];

  const testimonials = [
    {
      name: "Anna Mueller",
      review: "The best Nepalese food in Munich! The momos are incredible and the service is outstanding. I've been coming here for over a year now.",
      rating: 5,
      date: "2 weeks ago",
      platform: "Google"
    },
    {
      name: "David Schmidt",
      review: "Authentic flavors and warm hospitality. The dal bhat reminds me of my trip to Nepal. Highly recommended for anyone wanting real Nepalese cuisine!",
      rating: 5,
      date: "1 month ago",
      platform: "TripAdvisor"
    },
    {
      name: "Lisa Weber",
      review: "Amazing dal bhat and incredibly friendly service. The atmosphere is cozy and the food is always fresh. Will definitely come back with friends!",
      rating: 5,
      date: "3 weeks ago",
      platform: "Yelp"
    },
    {
      name: "Marco Rossi",
      review: "Best chicken curry I've ever had! The spices are perfectly balanced and the delivery was super fast. Great value for money too.",
      rating: 5,
      date: "1 week ago",
      platform: "Google"
    },
    {
      name: "Sarah Johnson",
      review: "Love the vegetarian options here! As a vegan, I appreciate how accommodating they are. The gundruk soup is my favorite!",
      rating: 5,
      date: "2 days ago",
      platform: "Facebook"
    },
    {
      name: "Thomas Müller",
      review: "Fantastic food and great atmosphere. Perfect for both casual dining and special occasions. The team is very professional.",
      rating: 5,
      date: "5 days ago",
      platform: "Google"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-orange-800 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full"
          />
          <motion.div
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 right-20 w-48 h-48 bg-white/5 rounded-full"
          />
        </div>
        
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")'
          }}
        ></div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent"
          >
            Everest Kitchen
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-3xl mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Experience the authentic taste of Nepal in the heart of Munich • Delivery within 20km
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center space-x-8 mb-8 text-red-200"
          >
            <div className="flex items-center space-x-2">
              <Star className="h-6 w-6 text-yellow-400 fill-current" />
              <span className="text-lg font-semibold">4.9/5 Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-6 w-6" />
              <span className="text-lg font-semibold">5000+ Customers</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-6 w-6" />
              <span className="text-lg font-semibold">Fast Delivery</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/menu" 
                className="inline-block bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-10 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-red-500/25 text-lg"
              >
                Order Now • Free Delivery Over €25
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/about" 
                className="inline-block border-2 border-white text-white hover:bg-white hover:text-gray-800 font-bold py-4 px-10 rounded-2xl transition-all duration-300 backdrop-blur-sm text-lg"
              >
                Our Story
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        >
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4 text-red-600">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold text-gray-800 mb-6"
            >
              Why Choose Everest Kitchen?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Discover what makes our restaurant special and why customers keep coming back for authentic Nepalese flavors
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex justify-center mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Dishes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold text-gray-800 mb-6"
            >
              Most Popular Dishes
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Try our customers' favorite dishes, prepared with authentic recipes and fresh ingredients
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop"
                  alt="Momos"
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  🔥 Most Popular
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-red-600 transition-colors">Traditional Momos</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">Steamed dumplings filled with spiced vegetables or meat, served with our signature tomato chutney</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-3xl font-bold text-red-600">€12.90</span>
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-5 w-5 fill-current" />
                    <span className="ml-1 text-gray-600 font-semibold">4.9</span>
                    <span className="ml-1 text-gray-500 text-sm">(324 reviews)</span>
                  </div>
                </div>
                <div className="flex space-x-2 mb-4">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Vegetarian Available</span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">🌶️ Mild</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop"
                  alt="Dal Bhat"
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  🌱 Vegetarian
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-red-600 transition-colors">Dal Bhat Tarkari</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">Traditional lentil soup with basmati rice, seasonal vegetables, and homemade pickle</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-3xl font-bold text-red-600">€15.90</span>
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-5 w-5 fill-current" />
                    <span className="ml-1 text-gray-600 font-semibold">4.8</span>
                    <span className="ml-1 text-gray-500 text-sm">(267 reviews)</span>
                  </div>
                </div>
                <div className="flex space-x-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Complete Meal</span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">🌶️🌶️ Medium</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop"
                  alt="Chicken Curry"
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  👨‍🍳 Chef's Special
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-red-600 transition-colors">Himalayan Chicken Curry</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">Tender chicken in aromatic curry with traditional Himalayan spices and fresh herbs</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-3xl font-bold text-red-600">€18.90</span>
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-5 w-5 fill-current" />
                    <span className="ml-1 text-gray-600 font-semibold">4.7</span>
                    <span className="ml-1 text-gray-500 text-sm">(198 reviews)</span>
                  </div>
                </div>
                <div className="flex space-x-2 mb-4">
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">Protein Rich</span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">🌶️🌶️🌶️ Spicy</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="text-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/menu"
                className="inline-block bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-10 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
              >
                View Full Menu • 50+ Dishes
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold text-gray-800 mb-6"
            >
              What Our Customers Say
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Don't just take our word for it - hear from our satisfied customers
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ReviewCard {...testimonial} />
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <div className="flex items-center justify-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600">4.9/5</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600">1,200+</div>
                <div className="text-gray-600">Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600">98%</div>
                <div className="text-gray-600">Recommend Us</div>
              </div>
            </div>
            <p className="text-gray-600 mb-6">Rated across Google, TripAdvisor, Yelp, and Facebook</p>
            <button className="bg-white border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-bold py-3 px-8 rounded-xl transition-colors">
              Read All Reviews
            </button>
          </div>
        </div>
      </section>

      {/* Location & Newsletter */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
            >
              <LocationMap />
            </motion.div>
            
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="flex items-center"
            >
              <NewsletterSignup />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 via-red-700 to-orange-600 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-5xl font-bold mb-6">Ready to Experience Nepal?</h2>
            <p className="text-2xl mb-8 text-red-100">Order now for pickup or delivery within 20km of Munich</p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/menu"
                  className="inline-block bg-white text-red-600 hover:bg-gray-100 font-bold py-4 px-10 rounded-2xl transition-colors shadow-2xl text-lg"
                >
                  Order Now • Free Delivery Over €25
                </Link>
              </motion.div>
              
              <div className="flex items-center space-x-6 text-red-200">
                <div className="flex items-center space-x-2">
                  <Clock className="h-6 w-6" />
                  <span className="font-semibold">Ready in 2-3 hours</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="h-6 w-6" />
                  <span className="font-semibold">Fast delivery</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <h4 className="font-bold text-lg mb-2">Free Delivery</h4>
                <p className="text-red-200">On orders over €25 within 20km</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <h4 className="font-bold text-lg mb-2">Fresh Daily</h4>
                <p className="text-red-200">All ingredients sourced fresh daily</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <h4 className="font-bold text-lg mb-2">Authentic Taste</h4>
                <p className="text-red-200">Traditional recipes from Nepal</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;