"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const gifData = [
  { id: 1, placeholder: "Building...", gifUrl: "https://media.giphy.com/media/3o7TKMGpxxWlD8xX1u/giphy.gif" },
  { id: 2, placeholder: "Designing...", gifUrl: "https://media.giphy.com/media/l41lTjJ8z8x8z8x8z/giphy.gif" },
  { id: 3, placeholder: "Innovating...", gifUrl: "https://media.giphy.com/media/3o7TKVUn7ADmu7V50/giphy.gif" },
  { id: 4, placeholder: "Connecting...", gifUrl: "https://media.giphy.com/media/3o7TKMGpxxWlD8xX1u/giphy.gif" },
  { id: 5, placeholder: "Winning...", gifUrl: "https://media.giphy.com/media/l41lTjJ8z8x8z8x8z/giphy.gif" },
  { id: 6, placeholder: "Celebrating...", gifUrl: "https://media.giphy.com/media/3o7TKVUn7ADmu7V50/giphy.gif" },
];

const GifWall = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="gif-wall" className="py-24 px-6 md:px-12 bg-black/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center text-white">Vibe Check</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {gifData.map((item) => (
            <motion.div
              key={item.id}
              className="relative aspect-video glass-effect overflow-hidden cursor-pointer flex items-center justify-center group"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-xl font-semibold text-gray-500 group-hover:opacity-0 transition-opacity duration-300">
                {item.placeholder}
              </span>
              <AnimatePresence>
                {hoveredId === item.id && (
                  <motion.img
                    src={item.gifUrl}
                    alt="Vibe"
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GifWall;
