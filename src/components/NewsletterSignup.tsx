import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Gift, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Simulate API call
      setTimeout(() => {
        setIsSubscribed(true);
        toast.success('Welcome! Check your email for a special discount code.');
      }, 1000);
    }
  };

  if (isSubscribed) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 rounded-2xl text-center"
      >
        <CheckCircle className="h-16 w-16 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Welcome to the Family!</h3>
        <p className="text-green-100">You'll receive exclusive offers and updates about our latest dishes.</p>
      </motion.div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-8 rounded-2xl">
      <div className="flex items-center justify-center mb-4">
        <Gift className="h-8 w-8 mr-3" />
        <h3 className="text-2xl font-bold">Get 10% Off Your First Order!</h3>
      </div>
      <p className="text-center text-red-100 mb-6">
        Subscribe to our newsletter for exclusive offers, new menu updates, and authentic Nepalese recipes.
      </p>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full pl-10 pr-4 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/50"
            required
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-white text-red-600 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
        >
          Subscribe
        </motion.button>
      </form>
      
      <p className="text-xs text-red-200 text-center mt-4">
        No spam, unsubscribe anytime. We respect your privacy.
      </p>
    </div>
  );
};

export default NewsletterSignup;