"use client";

import React, { useState } from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Highlights from '@/components/Highlights';
import Schedule from '@/components/Schedule';
import Sponsors from '@/components/Sponsors';
import GifWall from '@/components/GifWall';
import MapSection from '@/components/MapSection';
import RegistrationModal from '@/components/RegistrationModal';
import Footer from '@/components/Footer';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen">
      <Hero onRegisterClick={() => setIsModalOpen(true)} />
      <About />
      <Highlights />
      <Schedule />
      <Sponsors />
      <GifWall />
      <MapSection />
      <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Footer />
    </main>
  );
}
