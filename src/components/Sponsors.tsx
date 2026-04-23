"use client";

import React from 'react';
import { motion } from 'framer-motion';

const sponsors = [
  { name: "TechCorp", logo: "⚡" },
  { name: "FutureLabs", logo: "🧬" },
  { name: "CloudNine", logo: "☁️" },
  { name: "Nexus", logo: "🌐" },
  { name: "Quantum", logo: "⚛️" },
  { name: "Astra", logo: "✨" },
];

const Sponsors = () => {
  return (
    <section id="sponsors" className="py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center text-white">Our Sponsors</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.1, 
                rotate: [0, -5, 5, 0],
                transition: { duration: 0.3 }
              }}
              className="glass-effect p-6 flex flex-col items-center justify-center aspect-square cursor-pointer group border-white/5 hover:border-blue-500/30 transition-colors"
            >
              <div className="text-4xl mb-3 grayscale group-hover:grayscale-0 transition-all duration-300">
                {sponsor.logo}
              </div>
              <span className="text-sm font-medium text-gray-500 group-hover:text-gray-300 transition-colors">
                {sponsor.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
