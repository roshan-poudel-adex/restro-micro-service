import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Award, Users, Heart } from 'lucide-react';

const Team = () => {
  const teamMembers = [
    {
      name: "Rajesh Gurung",
      role: "Owner & Head Chef",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      description: "Born in Pokhara, Nepal. Over 15 years of culinary experience specializing in traditional Nepalese cuisine.",
      specialties: ["Traditional Momos", "Dal Bhat", "Nepalese Spices"]
    },
    {
      name: "Maya Thapa",
      role: "Sous Chef",
      image: "https://images.pexels.com/photos/3785104/pexels-photo-3785104.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      description: "Expert in vegetarian dishes and modern interpretations of classic Nepalese recipes.",
      specialties: ["Vegetarian Curries", "Traditional Breads", "Desserts"]
    },
    {
      name: "Pemba Sherpa",
      role: "Kitchen Manager",
      image: "https://images.pexels.com/photos/2709388/pexels-photo-2709388.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      description: "Ensures quality and consistency in every dish. Former restaurant manager from Kathmandu.",
      specialties: ["Quality Control", "Team Leadership", "Menu Planning"]
    },
    {
      name: "Anna Mueller",
      role: "Restaurant Manager",
      image: "https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      description: "Local Munich native who ensures excellent service and smooth operations.",
      specialties: ["Customer Service", "Operations", "Local Relations"]
    },
    {
      name: "Karma Lama",
      role: "Chef de Partie",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      description: "Specializes in grilled items and tandoor cooking. Trained in traditional methods.",
      specialties: ["Tandoor Cooking", "Grilled Meats", "Marinades"]
    },
    {
      name: "Sarah Johnson",
      role: "Service Supervisor",
      image: "https://images.pexels.com/photos/3768142/pexels-photo-3768142.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      description: "Leads our front-of-house team with enthusiasm and attention to detail.",
      specialties: ["Staff Training", "Customer Relations", "Event Coordination"]
    }
  ];

  const stats = [
    {
      icon: <Users className="h-8 w-8 text-red-500" />,
      number: "12",
      label: "Team Members"
    },
    {
      icon: <Award className="h-8 w-8 text-red-500" />,
      number: "25+",
      label: "Years Combined Experience"
    },
    {
      icon: <ChefHat className="h-8 w-8 text-red-500" />,
      number: "4",
      label: "Professional Chefs"
    },
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      number: "100%",
      label: "Passion for Food"
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
            backgroundImage: 'url("https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop")'
          }}
        ></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 text-white">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl font-bold mb-6"
          >
            Meet Our Team
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl leading-relaxed"
          >
            The passionate people behind every authentic dish and memorable experience
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-gray-50 rounded-xl"
              >
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Amazing Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Each member brings unique skills and passion to create your perfect dining experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-red-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{member.description}</p>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Specialties:</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1 bg-red-100 text-red-700 text-xs rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold text-gray-800">Our Team Culture</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                At Everest Kitchen, we believe that great food comes from a happy team. Our multicultural crew brings together the best of Nepalese tradition and German efficiency, creating an environment where creativity and authenticity thrive.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We invest in our team's growth through regular training, cultural exchange programs, and opportunities to learn traditional cooking techniques. Many of our staff have been with us since opening, creating the family atmosphere our customers love.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Weekly Training</h4>
                  <p className="text-sm text-gray-600">Continuous skill development</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Fair Wages</h4>
                  <p className="text-sm text-gray-600">Above industry standards</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Team Events</h4>
                  <p className="text-sm text-gray-600">Monthly team building</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Growth Path</h4>
                  <p className="text-sm text-gray-600">Internal promotions</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
            >
              <img 
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop"
                alt="Team working together"
                className="rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-20 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-bold mb-8">Join Our Team</h2>
            <p className="text-xl leading-relaxed mb-8">
              We're always looking for passionate people who share our love for great food and exceptional service. Whether you're an experienced chef or starting your culinary journey, we'd love to hear from you.
            </p>
            <div className="space-x-4">
              <a 
                href="mailto:jobs@everestkitchen.de"
                className="inline-block bg-white text-red-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition-colors"
              >
                View Open Positions
              </a>
              <div className="inline-flex items-center space-x-2 text-red-200">
                <Heart className="h-5 w-5" />
                <span>Great benefits & growth opportunities</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Team;