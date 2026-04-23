"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
  onRegisterClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onRegisterClick }) => {
  return (
    <section id="hero" className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Background elements for 3D effect */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Placeholder for future 3D background elements */}
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </motion.div>

      <motion.div
        className="relative z-10 glass-effect p-8 md:p-12 text-center max-w-3xl mx-auto"
        initial={{ y: -50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.5 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
          HackIE³
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8">
          Welcome to the imaginary hackathon. Innovate. Create. Elevate.
        </p>
        
        <motion.button
          onClick={onRegisterClick}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(129, 140, 248, 0.7)" }}
          whileTap={{ scale: 0.95 }}
        >
          Register Now
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
