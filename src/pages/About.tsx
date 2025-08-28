import React from 'react';
import { motion } from 'framer-motion';
import { Mountain, Heart, Users, Award } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "Passion",
      description: "Every dish is prepared with love and dedication to authentic Nepalese flavors"
    },
    {
      icon: <Users className="h-8 w-8 text-red-500" />,
      title: "Community",
      description: "We bring people together through the shared experience of exceptional food"
    },
    {
      icon: <Mountain className="h-8 w-8 text-red-500" />,
      title: "Tradition",
      description: "Preserving centuries-old recipes and cooking techniques from the Himalayas"
    },
    {
      icon: <Award className="h-8 w-8 text-red-500" />,
      title: "Excellence",
      description: "Committed to the highest standards in food quality and customer service"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-16"
    >
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-red-900 to-orange-800">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.pexels.com/photos/3016435/pexels-photo-3016435.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop")'
          }}
        ></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 text-white">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl font-bold mb-6"
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl leading-relaxed"
          >
            From the peaks of the Himalayas to the streets of Munich, discover how our culinary journey began
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
            >
              <img 
                src="https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="Traditional cooking"
                className="rounded-lg shadow-lg"
              />
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold text-gray-800">A Journey of Flavors</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Everest Kitchen was born from a dream to share the rich culinary heritage of Nepal with the vibrant city of Munich. Our founder, Rajesh Gurung, grew up in the shadows of the Himalayas, where he learned the art of traditional Nepalese cooking from his grandmother.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                In 2018, Rajesh moved to Munich and was surprised to find very few authentic Nepalese restaurants. Determined to introduce locals to the incredible flavors of his homeland, he opened Everest Kitchen in 2020, bringing together traditional recipes with locally sourced, fresh ingredients.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Today, we're proud to be Munich's premier destination for authentic Nepalese cuisine, serving both the local Nepalese community and German food enthusiasts who have fallen in love with our unique flavors.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-bold mb-8">Our Mission</h2>
            <p className="text-xl leading-relaxed mb-8">
              "To create an authentic bridge between Nepal and Germany through food, fostering cultural understanding and bringing people together around our table. We're not just serving meals – we're sharing stories, traditions, and the warmth of Nepalese hospitality."
            </p>
            <div className="flex items-center justify-center space-x-2 text-red-200">
              <Mountain className="h-6 w-6" />
              <span className="font-semibold">- Rajesh Gurung, Founder</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Recognition & Awards</h2>
            <p className="text-xl text-gray-600">We're honored to be recognized by our community</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="text-center p-8 bg-gradient-to-b from-yellow-50 to-orange-50 rounded-xl border border-yellow-200"
            >
              <Award className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Best Nepalese Restaurant</h3>
              <p className="text-gray-600 mb-2">Munich Food Awards 2023</p>
              <p className="text-sm text-gray-500">Voted by local food critics</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center p-8 bg-gradient-to-b from-blue-50 to-indigo-50 rounded-xl border border-blue-200"
            >
              <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Excellence in Service</h3>
              <p className="text-gray-600 mb-2">TripAdvisor Certificate 2023</p>
              <p className="text-sm text-gray-500">Based on customer reviews</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center p-8 bg-gradient-to-b from-green-50 to-emerald-50 rounded-xl border border-green-200"
            >
              <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Sustainability Champion</h3>
              <p className="text-gray-600 mb-2">Munich Green Initiative 2022</p>
              <p className="text-sm text-gray-500">For eco-friendly practices</p>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;