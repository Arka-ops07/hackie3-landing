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
  const tileX = useTransform(springX, [-500, 500], [-10, 10]);
  const tileY = useTransform(springY, [-500, 500], [-10, 10]);
  const bgX = useTransform(springX, [-500, 500], [20, -20]);
  const bgY = useTransform(springY, [-500, 500], [20, -20]);

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
    <section id="hero" className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden pt-20 bg-[#0a0a0a]">
      {/* Top Left Logo - Fixed to use the transparent version */}
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
            className="drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]"
          />
        </motion.div>
      </div>

      {/* Background Elements - Refined/Less Radiant Glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        {/* Balanced Background Logo with Controlled Green Neon Glow */}
        <motion.div
          style={{ x: bgX, y: bgY }}
          className="relative w-[600px] h-[600px] md:w-[1000px] md:h-[1000px] opacity-25 blur-2xl pointer-events-none"
        >
          <Image 
            src="/images/logo.png" 
            alt="Background Glow" 
            fill
            className="object-contain"
          />
          {/* Refined Radiating Green Neon Light */}
          <div className="absolute inset-0 bg-green-500/20 rounded-full blur-[140px] animate-pulse"></div>
          <div className="absolute inset-0 bg-green-400/5 rounded-full blur-[200px]"></div>
        </motion.div>
        
        {/* Subtle Animated Blobs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-green-600/5 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      {/* Main Content Card (Clean Glass Tile) */}
      <motion.div
        style={{ x: tileX, y: tileY }}
        className="relative z-10 glass-effect p-10 md:p-20 text-center max-w-4xl mx-auto border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.7)]"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-6xl md:text-8xl font-bold mb-8 text-white tracking-tighter drop-shadow-xl">
          HackIE³
        </h1>
        <p className="text-xl md:text-2xl text-green-100/80 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
          Innovate. Create. Elevate. <br />
          <span className="text-green-400 font-medium">Jadavpur University's</span> Premier Hackathon.
        </p>
        
        <motion.button
          onClick={onRegisterClick}
          className="relative group bg-gradient-to-r from-green-600 to-blue-600 text-white px-12 py-5 rounded-full text-2xl font-bold transition-all duration-300 shadow-[0_0_30px_rgba(34,197,94,0.3)]"
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 0 40px rgba(34, 197, 94, 0.6)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10">Initialize Registration</span>
          <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </motion.button>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-green-400 rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
