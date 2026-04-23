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
  const bgX = useTransform(springX, [-500, 500], [30, -30]);
  const bgY = useTransform(springY, [-500, 500], [30, -30]);

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
            className="drop-shadow-[0_0_20px_rgba(34,197,94,0.8)]"
          />
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        {/* Massive Blurred Background Logo with Intense Green Neon Glow */}
        <motion.div
          style={{ x: bgX, y: bgY }}
          className="relative w-[800px] h-[800px] md:w-[1400px] md:h-[1400px] opacity-40 blur-3xl pointer-events-none"
        >
          <Image 
            src="/images/logo.png" 
            alt="Background Glow" 
            fill
            className="object-contain"
          />
          {/* Intense Radiating Green Neon Light */}
          <div className="absolute inset-0 bg-green-500/40 rounded-full blur-[180px] animate-pulse"></div>
          <div className="absolute inset-0 bg-green-400/20 rounded-full blur-[260px]"></div>
          <div className="absolute inset-0 bg-green-600/10 rounded-full blur-[320px]"></div>
        </motion.div>
        
        {/* Animated Blobs for depth */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-600/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      {/* Main Content Card (Clean Glass Tile - NO LOGO INSIDE) */}
      <motion.div
        style={{ x: tileX, y: tileY }}
        className="relative z-10 glass-effect p-12 md:p-24 text-center max-w-4xl mx-auto border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)]"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-6xl md:text-9xl font-bold mb-8 text-white tracking-tighter drop-shadow-2xl">
          HackIE³
        </h1>
        <p className="text-xl md:text-3xl text-green-100/90 mb-14 font-light max-w-2xl mx-auto leading-relaxed">
          Innovate. Create. Elevate. <br />
          <span className="text-green-400 font-semibold">Jadavpur University's</span> Premier Hackathon.
        </p>
        
        <motion.button
          onClick={onRegisterClick}
          className="relative group bg-gradient-to-r from-green-600 to-blue-700 text-white px-14 py-6 rounded-full text-2xl font-bold transition-all duration-300 shadow-[0_0_40px_rgba(34,197,94,0.5)]"
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 0 50px rgba(34, 197, 94, 0.8)",
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
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-green-400 rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
