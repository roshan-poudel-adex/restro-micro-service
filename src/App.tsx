import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import Blog from './pages/Blog';
import Menu from './pages/Menu';
import Order from './pages/Order';
import { OrderProvider } from './context/OrderContext';

function App() {
  return (
    <OrderProvider>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1f2937',
            color: '#fff',
            borderRadius: '12px',
            padding: '16px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
        }}
      />
      <Router>
        <div className="min-h-screen bg-white">
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/team" element={<Team />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/order" element={<Order />} />
            </Routes>
          </AnimatePresence>
          <Footer />
        </div>
      </Router>
    </OrderProvider>
  );
}

export default App;