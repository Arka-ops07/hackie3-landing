"use client";

import React from 'react';
import { motion } from 'framer-motion';

const MapSection = () => {
  // Jadavpur University, Kolkata - Satellite View
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3686.101137021356!2d88.36888427602055!3d22.49103853585724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0271237f3876c1%3A0x733658f837471243!2sJadavpur%20University!5e0!3m2!1sen!2sin!4v1713875000000!5m2!1sen!2sin&maptype=satellite";

  return (
    <section id="location" className="py-24 px-6 md:px-12 bg-black/50">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">The Venue</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            HackIE³ is hosted at the prestigious **Jadavpur University**, Kolkata. Join us at the hub of engineering excellence.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative glass-effect p-2 md:p-4 overflow-hidden group shadow-[0_0_30px_rgba(59,130,246,0.1)]"
        >
          <div className="aspect-video w-full rounded-lg overflow-hidden transition-all duration-700">
            <iframe 
              src={mapEmbedUrl}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Jadavpur University Map"
            ></iframe>
          </div>
          
          {/* Overlay Info Card */}
          <div className="absolute bottom-8 right-8 hidden md:block">
            <motion.div 
              whileHover={{ y: -5 }}
              className="glass-effect p-6 border-blue-500/20"
            >
              <h4 className="text-white font-bold mb-1">Jadavpur University</h4>
              <p className="text-sm text-gray-400">188, Raja S.C. Mallick Rd, Kolkata, WB</p>
              <a 
                href="https://maps.app.goo.gl/kQXHSLVbBfFQRGeMA" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-4 flex items-center gap-2 text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors"
              >
                <span>Open in Google Maps</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MapSection;
