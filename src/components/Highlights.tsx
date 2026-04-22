"use client";

import React from 'react';
import { motion } from 'framer-motion';

const highlights = [
  { title: "Innovation", description: "Pushing boundaries with AI and Web3.", icon: "🚀" },
  { title: "Community", description: "Connect with 500+ global hackers.", icon: "🤝" },
  { title: "Prizes", description: "$50,000 in total prize pool.", icon: "🏆" },
];

const Highlights = () => {
  return (
    <section id="highlights" className="py-24 px-6 md:px-12 bg-black/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center text-white">Event Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              className="glass-effect p-8 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="text-5xl mb-6">{item.icon}</div>
              <h3 className="text-2xl font-semibold mb-4 text-white">{item.title}</h3>
              <p className="text-gray-400">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
