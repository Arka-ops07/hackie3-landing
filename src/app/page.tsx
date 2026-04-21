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
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Highlights />
      <Schedule />
      <Sponsors />
      <GifWall />
      <MapSection />
      <RegistrationModal />
      <Footer />
    </main>
  );
}
