"use client";

import React from 'react';
import { motion } from 'framer-motion';

const scheduleData = [
  { time: "09:00 AM", event: "Opening Ceremony", description: "Kickoff and keynote speech." },
  { time: "11:00 AM", event: "Hacking Starts", description: "Teams start building their projects." },
  { time: "02:00 PM", event: "Workshop: AI in Web3", description: "Learning session with industry experts." },
  { time: "07:00 PM", event: "Dinner & Networking", description: "Relax and connect with other hackers." },
];

const Schedule = () => {
  return (
    <section id="schedule" className="py-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center text-white">Event Schedule</h2>
        <div className="relative border-l border-gray-700 ml-4 md:ml-0">
          {scheduleData.map((item, index) => (
            <motion.div
              key={index}
              className="mb-12 ml-8 relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              {/* Timeline Dot */}
              <div className="absolute -left-12 top-1 w-8 h-8 bg-blue-600 rounded-full border-4 border-black shadow-[0_0_15px_rgba(37,99,235,0.6)]"></div>
              
              <div className="glass-effect p-6 hover:bg-white/10 transition-colors duration-300">
                <span className="text-blue-400 font-mono text-sm mb-2 block">{item.time}</span>
                <h3 className="text-2xl font-semibold mb-2 text-white">{item.event}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
