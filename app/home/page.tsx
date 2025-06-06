'use client';

import Header from '../../components/Header';
import Hero from '../../components/Hero';
import About from '../../components/About';
import Amenities from '../../components/Amenities';
import Gallery from '../../components/Gallery';
import Testimonials from '../../components/Testimonials';
import Calendar from '../../components/Calendar';
import Contact from '../../components/Contact';
import Footer from '../../components/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Amenities />
        <Gallery />
        <Testimonials />
        <Calendar />
        <Contact />
      </main>
      <Footer />
    </>
  );
} 