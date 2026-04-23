"use client";

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';

interface HeroProps {
  onRegisterClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onRegisterClick }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Parallax transforms
  const logoX = useTransform(springX, [-500, 500], [-20, 20]);
  const logoY = useTransform(springY, [-500, 500], [-20, 20]);
  const bgX = useTransform(springX, [-500, 500], [15, -15]);
  const bgY = useTransform(springY, [-500, 500], [15, -15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const moveX = clientX - window.innerWidth / 2;
      const moveY = clientY - window.innerHeight / 2;
      mouseX.set(moveX);
      mouseY.set(moveY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section id="hero" className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden pt-20">
      {/* Top Left Logo */}
      <div className="fixed top-6 left-6 z-50">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="cursor-pointer"
          onClick={() => window.location.reload()}
        >
          <Image 
            src="/images/logo.png" 
            alt="HackIE3 Logo" 
            width={60} 
            height={60} 
            className="drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
          />
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        {/* Large Blurred Background Logo with Neon Glow */}
        <motion.div
          style={{ x: bgX, y: bgY }}
          className="relative w-[500px] h-[500px] md:w-[800px] md:h-[800px] opacity-20 blur-3xl pointer-events-none"
        >
          <Image 
            src="/images/logo.png" 
            alt="Background Glow" 
            fill
            className="object-contain"
          />
          <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-[120px] animate-pulse"></div>
        </motion.div>
        
        {/* Animated Blobs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      {/* Main Content Card */}
      <motion.div
        style={{ x: logoX, y: logoY }}
        className="relative z-10 glass-effect p-8 md:p-16 text-center max-w-4xl mx-auto border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <Image 
            src="/images/logo.png" 
            alt="HackIE3 Center Logo" 
            width={180} 
            height={180} 
            className="drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          />
        </motion.div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight">
          HackIE³
        </h1>
        <p className="text-xl md:text-2xl text-blue-100/80 mb-10 font-light max-w-2xl mx-auto leading-relaxed">
          Innovate. Create. Elevate. Join the premier engineering hackathon at Jadavpur University.
        </p>
        
        <motion.button
          onClick={onRegisterClick}
          className="relative group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full text-xl font-bold transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.4)]"
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 0 30px rgba(59, 130, 246, 0.6)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10">Initialize Registration</span>
          <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </motion.button>
      </motion.div>

      {/* Elite Suggestion: Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-blue-400 rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
