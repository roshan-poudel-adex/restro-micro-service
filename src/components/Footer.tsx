import React from 'react';
import { Mountain, MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Mountain className="h-8 w-8 text-red-500" />
              <span className="text-2xl font-bold">Everest Kitchen</span>
            </div>
            <p className="text-gray-400 mb-4">
              Authentic Nepalese cuisine in the heart of Munich. Experience the flavors of the Himalayas.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-red-500" />
                <span className="text-gray-300">Marienplatz 15, 80331 München</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-red-500" />
                <span className="text-gray-300">+49 89 123 4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-red-500" />
                <span className="text-gray-300">info@everestkitchen.de</span>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Opening Hours</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Mon - Thu:</span>
                <span className="text-gray-300">11:00 - 22:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Fri - Sat:</span>
                <span className="text-gray-300">11:00 - 23:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Sunday:</span>
                <span className="text-gray-300">12:00 - 22:00</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a href="/menu" className="block text-gray-400 hover:text-white transition-colors">Our Menu</a>
              <a href="/about" className="block text-gray-400 hover:text-white transition-colors">About Us</a>
              <a href="/blog" className="block text-gray-400 hover:text-white transition-colors">Food Blog</a>
              <a href="/team" className="block text-gray-400 hover:text-white transition-colors">Our Team</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Everest Kitchen. All rights reserved. Made with ❤️ in Munich.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;