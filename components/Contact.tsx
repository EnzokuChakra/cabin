'use client';

import { motion } from 'framer-motion';
import ParticlesBackground from './ParticlesBackground';

export default function Contact() {
  return (
    <section id="contact" className="relative py-20 bg-black overflow-hidden">
      {/* Nature-themed background decorations */}
      <div className="absolute inset-0 overflow-hidden opacity-20 z-10">
        {/* Enhanced decorative elements */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-[#2f6310]/5 blur-2xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-1/3 w-40 h-40 rounded-full bg-[#3d7f15]/5 blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.12, 0.05]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Enhanced Particles Background */}
      <ParticlesBackground 
        theme="nature"
        particleCount={25}
        speed={0.3}
        opacity={0.15}
        className="absolute inset-0 z-10"
      />

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

      <div className="container mx-auto px-6 relative z-20">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-serif font-bold text-amber-100 mb-6 [text-shadow:_0_4px_24px_rgba(0,0,0,0.9)]"
            whileInView={{
              scale: [0.95, 1, 0.95]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Contactați-ne
          </motion.h2>
          <motion.div 
            className="w-16 h-1 bg-[#A0522D] mx-auto mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <motion.p 
            className="text-lg text-amber-50/80 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Aveți întrebări despre șederea dumneavoastră? Suntem aici pentru a vă ajuta!
          </motion.p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div 
            className="bg-[#1A1A1A]/60 backdrop-blur-md p-6 md:p-8 rounded-lg border border-[#2A2A2A] shadow-xl relative overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            while hover={{ 
              scale: 1.02,
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.4)"
            }}
          >
            {/* Animated background glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#2f6310]/5 via-transparent to-[#2f6310]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <motion.h3 
              className="text-xl font-serif font-bold text-amber-100 mb-6 relative z-10"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              Informații de contact
            </motion.h3>
            <div className="space-y-6 relative z-10">
              <motion.div 
                className="flex items-start group"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="bg-[#2f6310]/10 p-3 rounded-full mr-4 border border-[#2f6310]/20 group-hover:bg-[#2f6310]/20 transition-colors"
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 360,
                    backgroundColor: "rgba(47, 99, 16, 0.3)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <svg className="w-6 h-6 text-[#2f6310]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                    <circle cx="12" cy="9" r="2.5"/>
                  </svg>
                </motion.div>
                <div>
                  <h4 className="font-medium text-amber-100 group-hover:text-amber-50 transition-colors">Locație</h4>
                  <p className="text-amber-50/90">Strada principala nr 93A, Măguri-Răcătău 407366</p>
                </div>
              </motion.div>

              {/* Enhanced Google Maps Embed */}
              <motion.div 
                className="mt-6 rounded-lg overflow-hidden border border-[#2A2A2A] group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2731.1234567890123!2d23.1498252!3d46.6323677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4749211ab37e5831%3A0xa957b4139ad2436d!2sDom%20Cabin!5e0!3m2!1sen!2sro!4v1710864000000!5m2!1sen!2sro"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-[250px] group-hover:brightness-110 transition-all duration-300"
                ></iframe>
                <motion.a 
                  href="https://www.google.com/maps/place/Dom+Cabin/@46.6323663,23.1497976,21z/data=!4m6!3m5!1s0x4749211ab37e5831:0xa957b4139ad2436d!8m2!3d46.6323677!4d23.1498252!16s%2Fg%2F11stgw5pfr?entry=ttu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#2f6310] hover:bg-[#3d7f15] text-white transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.svg 
                    className="w-5 h-5" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </motion.svg>
                  Deschide în Google Maps
                </motion.a>
              </motion.div>
              
              <motion.div 
                className="flex items-start group"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="bg-[#2f6310]/10 p-3 rounded-full mr-4 border border-[#2f6310]/20 group-hover:bg-[#2f6310]/20 transition-colors"
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: [0, -10, 10, 0],
                    backgroundColor: "rgba(47, 99, 16, 0.3)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <svg className="w-6 h-6 text-[#2f6310]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    <path d="M14.05 2.09l-2.83 2.83a1 1 0 0 0 0 1.41l1.41 1.41a1 1 0 0 0 1.41 0l2.83-2.83a1 1 0 0 0 0-1.41l-1.41-1.41a1 1 0 0 0-1.41 0z"/>
                  </svg>
                </motion.div>
                <div>
                  <h4 className="font-medium text-amber-100 group-hover:text-amber-50 transition-colors">Telefon</h4>
                  <motion.a 
                    href="tel:+40733456185" 
                    className="text-amber-50/90 hover:text-[#2f6310] transition-colors"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    +40 733 456 185
                  </motion.a>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start group"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="bg-[#2f6310]/10 p-3 rounded-full mr-4 border border-[#2f6310]/20 group-hover:bg-[#2f6310]/20 transition-colors"
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: [0, 5, -5, 0],
                    backgroundColor: "rgba(47, 99, 16, 0.3)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <svg className="w-6 h-6 text-[#2f6310]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <path d="M22 6l-10 7L2 6"/>
                    <path d="M2 6l10 7 10-7"/>
                  </svg>
                </motion.div>
                <div>
                  <h4 className="font-medium text-amber-100 group-hover:text-amber-50 transition-colors">Email</h4>
                  <motion.a 
                    href="mailto:juliacrisan07@yahoo.com" 
                    className="text-amber-50/90 hover:text-[#2f6310] transition-colors"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    juliacrisan07@yahoo.com
                  </motion.a>
                </div>
              </motion.div>
            </div>

            {/* Floating particles inside contact card */}
            <motion.div
              className="absolute top-4 right-4 w-2 h-2 bg-amber-200/40 rounded-full"
              animate={{
                y: [0, -15, 0],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-6 left-6 w-1 h-1 bg-[#2f6310]/60 rounded-full"
              animate={{
                x: [0, 8, 0],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}