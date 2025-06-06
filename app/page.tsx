'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import ParticlesBackground from '@/components/ParticlesBackground';

export default function LandingPage() {
  const router = useRouter();
  const [hoveredSide, setHoveredSide] = useState<'dom' | 'hideaway' | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <main className="min-h-screen w-full overflow-hidden bg-black text-white relative">
      {/* Animated Particles Background */}
      <ParticlesBackground />

      {/* Nature-themed background decorations */}
      <div className="absolute inset-0 overflow-hidden opacity-20 z-10">
        {/* Subtle green decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-[#2f6310]/5 blur-2xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-40 h-40 rounded-full bg-[#3d7f15]/5 blur-2xl"></div>
      </div>

      {/* Layered Backgrounds */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Darker overlay */}
        <div className="absolute inset-0 bg-black/70" />
        {/* Wood-textured gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40 mix-blend-color-burn" />
        {/* Subtle wood grain texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj4KICA8ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj4KICAgIDxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIuNzUiIG51bU9jdGF2ZXM9IjQiIHN0aXRjaFRpbGVzPSJzdGl0Y2giIC8+CiAgICA8ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIiAvPgogIDwvZmlsdGVyPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1IiAvPgo8L3N2Zz4=')] opacity-30 mix-blend-overlay" />
      </motion.div>

      <div className="flex flex-col md:flex-row h-screen items-center justify-center relative z-20">
        {/* Divider Line */}
        <motion.div 
          className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-200/20 to-transparent z-30"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* Dom Cabin Side */}
        <motion.div 
          className="relative w-full md:w-1/2 h-1/2 md:h-full cursor-pointer group overflow-hidden"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          onHoverStart={() => setHoveredSide('dom')}
          onHoverEnd={() => setHoveredSide(null)}
          onClick={() => router.push('/home')}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/images/cabin-exterior.jpg"
              alt="Dom Cabin"
              fill
              className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-black/80 via-black/60 to-black/40 group-hover:from-black/90 group-hover:via-black/70 group-hover:to-black/50 transition-all duration-700" />
          
          {/* Glowing border effect */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-200/20 transition-all duration-700" />
          
          <motion.div 
            className="absolute inset-0 flex items-center justify-center p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="text-center">
              {/* Decorative wood grain divider above title */}
              <motion.div 
                className="w-24 h-2 mb-6 relative mx-auto"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8B5A2B] to-transparent opacity-60 rounded-full"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/20 to-transparent opacity-40 rounded-full"></div>
              </motion.div>

              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-amber-100 mb-4 tracking-tight [text-shadow:_0_4px_24px_rgba(0,0,0,0.9)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Dom Cabin
              </motion.h1>
              
              <motion.div 
                className="w-20 md:w-24 h-1 bg-amber-200/20 mx-auto mb-4 md:mb-6"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.8, ease: "backOut" }}
              />
              
              <motion.p 
                className="text-amber-50/90 text-base sm:text-lg md:text-xl max-w-md mx-auto leading-relaxed tracking-wide [text-shadow:_0_2px_8px_rgba(0,0,0,0.8)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                Descoperă luxul și confortul în inima naturii
              </motion.p>

              {/* Click indicator - visible on hover for desktop, always visible on mobile */}
              <motion.div 
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-amber-100/80 text-sm font-medium tracking-wider md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: !isMobile ? (hoveredSide === 'dom' ? 1 : 0) : 1,
                  y: !isMobile ? (hoveredSide === 'dom' ? 0 : 10) : 0 
                }}
                transition={{ duration: 0.3 }}
              >
                <span className="hidden md:inline">CLICK</span>
                <span className="md:hidden">APASĂ</span> PENTRU A EXPLORA
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Hideaway Side */}
        <motion.div 
          className="relative w-full md:w-1/2 h-1/2 md:h-full cursor-pointer group overflow-hidden"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          onHoverStart={() => setHoveredSide('hideaway')}
          onHoverEnd={() => setHoveredSide(null)}
          onClick={() => window.location.href = 'https://hideaway.domcabin.ro'}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/images/hideaway.PNG"
              alt="Hideaway"
              fill
              className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-black/80 via-black/60 to-black/40 group-hover:from-black/90 group-hover:via-black/70 group-hover:to-black/50 transition-all duration-700" />
          
          {/* Glowing border effect */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-200/20 transition-all duration-700" />
          
          <motion.div 
            className="absolute inset-0 flex items-center justify-center p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="text-center">
              {/* Decorative wood grain divider above title */}
              <motion.div 
                className="w-24 h-2 mb-6 relative mx-auto"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8B5A2B] to-transparent opacity-60 rounded-full"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/20 to-transparent opacity-40 rounded-full"></div>
              </motion.div>

              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-amber-100 mb-4 tracking-tight [text-shadow:_0_4px_24px_rgba(0,0,0,0.9)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                Hideaway
              </motion.h1>
              
              <motion.div 
                className="w-20 md:w-24 h-1 bg-amber-200/20 mx-auto mb-4 md:mb-6"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.8, ease: "backOut" }}
              />
              
              <motion.p 
                className="text-amber-50/90 text-base sm:text-lg md:text-xl max-w-md mx-auto leading-relaxed tracking-wide [text-shadow:_0_2px_8px_rgba(0,0,0,0.8)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                O retragere intimă pentru momente de neuitat
              </motion.p>

              {/* Click indicator - visible on hover for desktop, always visible on mobile */}
              <motion.div 
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-amber-100/80 text-sm font-medium tracking-wider md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: !isMobile ? (hoveredSide === 'hideaway' ? 1 : 0) : 1,
                  y: !isMobile ? (hoveredSide === 'hideaway' ? 0 : 10) : 0 
                }}
                transition={{ duration: 0.3 }}
              >
                <span className="hidden md:inline">CLICK</span>
                <span className="md:hidden">APASĂ</span> PENTRU A EXPLORA
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
