"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="relative pt-24 pb-12 px-6 overflow-hidden">
      {/* Futuristic Design Line (Circuit/Angled Style) */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center justify-center">
        <div className="w-32 h-1 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] rounded-full"></div>
        <div className="absolute -top-1 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]"></div>
      </div>
      
      {/* Decorative Angled Lines */}
      <svg className="absolute top-0 left-0 w-full h-12 opacity-20" preserveAspectRatio="none">
        <path d="M0,0 L45%,0 L50%,12 L55%,0 L100%,0" fill="none" stroke="currentColor" className="text-blue-500" strokeWidth="1" />
      </svg>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
            <span className="text-2xl font-bold text-white tracking-tighter">HackIE³</span>
          </div>
          <p className="text-gray-400 max-w-sm leading-relaxed">
            The premier engineering hackathon at Jadavpur University. 
            Empowering the next generation of innovators to solve real-world problems.
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Quick Links</h4>
          <ul className="space-y-4 text-gray-400">
            <li><a href="#hero" className="hover:text-blue-400 transition-colors">Home</a></li>
            <li><a href="#about" className="hover:text-blue-400 transition-colors">About</a></li>
            <li><a href="#schedule" className="hover:text-blue-400 transition-colors">Schedule</a></li>
            <li><a href="#location" className="hover:text-blue-400 transition-colors">Location</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Social</h4>
          <ul className="space-y-4 text-gray-400">
            <li><a href="#" className="hover:text-blue-400 transition-colors">LinkedIn</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Twitter</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Discord</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:row items-center justify-between gap-4 text-gray-500 text-sm">
        <p>© 2026 HackIE³. All rights reserved.</p>
        <p>Made with ❤️ at Jadavpur University</p>
      </div>
    </footer>
  );
};

export default Footer;
