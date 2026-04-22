import React from 'react';
import ParallaxSection from './ParallaxSection';

const About = () => {
  return (
    <section id="about" className="py-24 px-6 md:px-12">
      <ParallaxSection offset={100}>
        <div className="glass-effect p-8 md:p-16 max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">The Future is IE³</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-300 text-lg leading-relaxed">
            <p>
              HackIE³ is not just a hackathon; it's a gateway to the future. We bring together the brightest minds to solve real-world problems using cutting-edge technology.
            </p>
            <p>
              Join us for 48 hours of intense creation, collaboration, and competition. Whether you're a designer, developer, or visionary, there's a place for you here.
            </p>
          </div>
        </div>
      </ParallaxSection>
    </section>
  );
};

export default About;
