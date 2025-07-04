'use client';

import { motion } from 'framer-motion';
import ParticlesBackground from './ParticlesBackground';

// Tree SVG for background decoration
const TreeSVG = () => (
  <svg className="absolute text-[#0D160B] opacity-5" width="280" height="280" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,22a8,8,0,0,1-8-8c0-3.5,2.33-6.15,6-7.41V4a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6.59c3.67,1.26,6,3.91,6,7.41A8,8,0,0,1,12,22Zm-1-9.37V16h2V12.63a1,1,0,0,1,.45-.83,4.62,4.62,0,0,0,2.3-3.65C15.31,6.11,13.46,5,12,5S8.69,6.11,8.25,8.15a4.62,4.62,0,0,0,2.3,3.65A1,1,0,0,1,11,12.63Z"/>
  </svg>
);

// Log SVG for background decoration
const LogSVG = () => (
  <svg className="absolute text-[#2E1A0F] opacity-5" width="320" height="180" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18,9a1,1,0,0,0-1,1v4a1,1,0,0,0,2,0V10A1,1,0,0,0,18,9Zm-4,1a1,1,0,0,0-2,0v4a1,1,0,0,0,2,0Zm6-6H4A1,1,0,0,0,3,5V19a1,1,0,0,0,1,1H20a1,1,0,0,0,1-1V5A1,1,0,0,0,20,4ZM19,18H5V6H19Z"/>
  </svg>
);

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 18
      }
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-black overflow-hidden">
      {/* Enhanced Nature-themed background decorations */}
      <div className="absolute inset-0 overflow-hidden opacity-20 z-10">
        <motion.div 
          className="absolute top-10 left-10"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 40, repeat: Infinity, ease: "linear" },
            scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <TreeSVG />
        </motion.div>
        <motion.div 
          className="absolute top-1/3 right-40"
          animate={{ 
            rotate: [360, 0],
            scale: [1, 1.05, 1],
            x: [0, 10, 0]
          }}
          transition={{ 
            rotate: { duration: 35, repeat: Infinity, ease: "linear" },
            scale: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 },
            x: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <TreeSVG />
        </motion.div>
        <motion.div 
          className="absolute bottom-40 left-40"
          animate={{ 
            rotate: [0, 180, 360],
            y: [0, -10, 0]
          }}
          transition={{ 
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <TreeSVG />
        </motion.div>
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{ 
            x: [0, 20, 0],
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <LogSVG />
        </motion.div>
        <motion.div 
          className="absolute bottom-20 right-20"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
        >
          <LogSVG />
        </motion.div>
        {/* Enhanced decorative elements */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-black/20 blur-2xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 20, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/3 w-40 h-40 rounded-full bg-black/20 blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2],
            y: [0, -15, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>
      
      {/* Enhanced Particles Background */}
      <ParticlesBackground 
        theme="nature"
        particleCount={35}
        speed={0.8}
        opacity={0.25}
        className="absolute inset-0 z-10"
      />
      
      {/* Enhanced Layered Backgrounds */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Main Image with parallax effect */}
        <motion.div 
          className="absolute inset-0 bg-[url('/images/cabin-exterior.jpg')] bg-cover bg-center scale-110"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          whileInView={{
            scale: [1, 1.05, 1]
          }}
          viewport={{ once: false }}
          style={{
            backgroundAttachment: 'fixed'
          }}
        />
        {/* Enhanced darker overlay for more dramatic look */}
        <motion.div 
          className="absolute inset-0 bg-black/50 md:bg-black/70"
          animate={{
            opacity: [0.5, 0.7, 0.5]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {/* Enhanced Wood-textured gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 md:from-black/90 md:via-black/60 md:to-black/40 mix-blend-color-burn" />
        {/* Enhanced wood grain texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj4KICA8ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj4KICAgIDxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIuNzUiIG51bU9jdGF2ZXM9IjQiIHN0aXRjaFRpbGVzPSJzdGl0Y2giIC8+CiAgICA8ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIiAvPgogIDwvZmlsdGVyPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1IiAvPgo8L3N2Zz4=')] opacity-20 md:opacity-30 mix-blend-overlay" />
        {/* Enhanced Vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{boxShadow: 'inset 0 0 150px 60px rgba(0,0,0,0.6) md:inset 0 0 200px 80px rgba(0,0,0,0.7)'}} />
        {/* Enhanced Animated rustic light overlay */}
        <motion.div
          className="absolute -top-32 left-1/2 w-[120vw] h-64 bg-gradient-to-r from-black/5 via-black/10 to-black/5 md:from-black/10 md:via-black/20 md:to-black/10 rounded-full blur-3xl opacity-20 md:opacity-30"
          animate={{ 
            x: [0, 60, -60, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: 'easeInOut' 
          }}
        />
      </motion.div>

      {/* Enhanced Decorative SVG (mountains with rustic color) */}
      <motion.svg
        className="absolute bottom-0 left-0 w-full h-[15vh] min-h-[120px] max-h-[200px] z-10 opacity-80 pointer-events-none"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        <motion.path
          d="M0,256L80,229.3C160,203,320,149,480,154.7C640,160,800,224,960,229.3C1120,235,1280,181,1360,154.7L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          fill="#8B5A2B"
          fillOpacity="0.15"
          className="transition-all duration-300"
          animate={{
            d: [
              "M0,256L80,229.3C160,203,320,149,480,154.7C640,160,800,224,960,229.3C1120,235,1280,181,1360,154.7L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z",
              "M0,266L80,239.3C160,213,320,159,480,164.7C640,170,800,234,960,239.3C1120,245,1280,191,1360,164.7L1440,138L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z",
              "M0,256L80,229.3C160,203,320,149,480,154.7C640,160,800,224,960,229.3C1120,235,1280,181,1360,154.7L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.path
          d="M0,288L80,266.7C160,245,320,203,480,197.3C640,192,800,224,960,229.3C1120,235,1280,213,1360,202.7L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          fill="#8B5A2B"
          fillOpacity="0.1"
          className="transition-all duration-300"
          animate={{
            d: [
              "M0,288L80,266.7C160,245,320,203,480,197.3C640,192,800,224,960,229.3C1120,235,1280,213,1360,202.7L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z",
              "M0,298L80,276.7C160,255,320,213,480,207.3C640,202,800,234,960,239.3C1120,245,1280,223,1360,212.7L1440,202L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z",
              "M0,288L80,266.7C160,245,320,203,480,197.3C640,192,800,224,960,229.3C1120,235,1280,213,1360,202.7L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </motion.svg>
      
      {/* Enhanced Additional decorative forest silhouette */}
      <motion.svg
        className="absolute bottom-0 left-0 w-full h-[20vh] min-h-[160px] max-h-[240px] z-10 opacity-40 pointer-events-none"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 0.4, y: 0 }}
        transition={{ duration: 1.4, delay: 0.7 }}
      >
        <motion.path
          d="M0,224L48,208C96,192,192,160,288,144C384,128,480,128,576,149.3C672,171,768,213,864,218.7C960,224,1056,192,1152,165.3C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          fill="#4A2B1A"
          fillOpacity="0.20"
          className="transition-all duration-300"
          animate={{
            fillOpacity: [0.20, 0.25, 0.20]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.path
          d="M0,256L48,240C96,224,192,192,288,176C384,160,480,160,576,181.3C672,203,768,245,864,250.7C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          fill="#4A2B1A"
          fillOpacity="0.15"
          className="transition-all duration-300"
          animate={{
            fillOpacity: [0.15, 0.20, 0.15]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </motion.svg>

      {/* Enhanced Main Content */}
      <motion.div 
        className="container mx-auto px-8 z-20 text-center flex flex-col items-center gap-10 md:gap-14"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Enhanced Decorative wood grain divider above title */}
        <motion.div
          className="w-24 h-2 mb-2 relative"
          variants={itemVariants}
          whileInView={{
            scaleX: [1, 1.2, 1],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8B5A2B] to-transparent opacity-60 rounded-full"></div>
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2f6310]/20 to-transparent opacity-40 rounded-full"
            animate={{
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
        
        <motion.h1 
          className="text-5xl md:text-7xl font-serif font-extrabold mb-4 text-amber-100 drop-shadow-2xl [text-shadow:_0_4px_24px_rgba(0,0,0,0.9)] tracking-tight"
          variants={itemVariants}
          whileInView={{
            scale: [1, 1.02, 1],
            textShadow: [
              "0 4px 24px rgba(0,0,0,0.9)",
              "0 6px 30px rgba(212,175,55,0.3)",
              "0 4px 24px rgba(0,0,0,0.9)"
            ]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Evadați în Brațele Naturii
        </motion.h1>
        <motion.p 
          className="text-2xl md:text-3xl mb-6 max-w-3xl mx-auto text-amber-50/90 font-medium [text-shadow:_0_2px_8px_rgba(0,0,0,0.8)]"
          variants={itemVariants}
          whileInView={{
            opacity: [0.9, 1, 0.9]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Descoperiți combinația perfectă între farmecul rustic și luxul modern în refugiul nostru din munți
        </motion.p>
      </motion.div>

      {/* Enhanced Scroll Down Indicator */}
      <motion.div 
        className="absolute bottom-10 left-0 right-0 flex justify-center z-30"
        initial={{ opacity: 0, y: 24 }}
        animate={{ 
          opacity: [0, 1, 1, 0],
          y: [24, 0, 0, -12]
        }}
        transition={{ 
          duration: 3.5,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut'
        }}
      >
        <motion.a 
          href="#about" 
          aria-label="Scroll down" 
          className="flex flex-col items-center group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* Enhanced Rustic decorative element with green tint */}
          <motion.div 
            className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#8B5A2B]/50 to-transparent mb-3"
            animate={{
              scaleX: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#2f6310]/30 to-transparent mb-3 absolute"
            animate={{
              scaleX: [1, 1.3, 1],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
          <motion.svg 
            className="w-9 h-9 text-amber-200/80 drop-shadow-lg animate-bounce-slow group-hover:text-amber-100" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            whileHover={{
              scale: 1.2,
              y: [0, -5, 0]
            }}
            transition={{
              scale: { duration: 0.2 },
              y: { duration: 1, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </motion.svg>
        </motion.a>
      </motion.div>
      
      {/* Enhanced Animated floating particles (like dust in cabin light) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { left: '10%', top: '20%' },
          { left: '25%', top: '45%' },
          { left: '40%', top: '15%' },
          { left: '55%', top: '35%' },
          { left: '70%', top: '25%' },
          { left: '85%', top: '40%' },
          { left: '15%', top: '60%' },
          { left: '30%', top: '75%' },
          { left: '45%', top: '85%' },
          { left: '60%', top: '65%' },
          { left: '75%', top: '80%' },
          { left: '90%', top: '70%' },
          { left: '20%', top: '90%' },
          { left: '35%', top: '95%' },
          { left: '50%', top: '90%' }
        ].map((position, i) => (
          <motion.div 
            key={i}
            className={`absolute w-1.5 h-1.5 rounded-full ${i % 3 === 0 ? 'bg-[#2f6310]/20' : 'bg-amber-100/10'}`}
            style={{
              left: position.left,
              top: position.top,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.2, 0.5],
              x: [0, Math.sin(i) * 10, 0]
            }}
            transition={{
              duration: 6 + (i % 3) * 2,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      <style jsx global>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(12px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2.5s infinite;
        }
      `}</style>
    </section>
  );
}