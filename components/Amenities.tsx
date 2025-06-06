import { motion } from 'framer-motion';
import { FaUtensils, FaHotTub, FaFire, FaWifi, FaMountain, FaUmbrellaBeach } from 'react-icons/fa';
import ParticlesBackground from './ParticlesBackground';

// Custom nature-themed icons and amenities
const amenities = [
  {
    title: 'Bucătrie Complet Echipată',
    description: 'Electrocasnice moderne și tot ce ai nevoie pentru a găti mâncare delicioasă',
    icon: <FaUtensils className="w-10 h-10 text-[#D4AF37]" />,
  },
  {
    title: 'Cadă cu Apă Caldă în Aer Liber',
    description: 'Relaxare sub cerul înstelat în cadra noastră privată de hidromasaj',
    icon: <FaHotTub className="w-10 h-10 text-[#D4AF37]" />,
  },
  {
    title: 'Șemineu',
    description: 'Atmosferă călduroasă lângă șemineu în serile răcoroase',
    icon: <FaFire className="w-10 h-10 text-[#D4AF37]" />,
  },
  {
    title: 'WiFi Viteză Mare',
    description: 'Conectare la internet rapidă pentru nevoile dumneavoastră',
    icon: <FaWifi className="w-10 h-10 text-[#D4AF37]" />,
  },
  {
    title: 'Vedere la Munți',
    description: 'Peisaje uluitoare vizibile din fiecare fereastră',
    icon: <FaMountain className="w-10 h-10 text-[#D4AF37]" />,
  },
  {
    title: 'Terasă Privată',
    description: 'Spațiu de relaxare în aer liber cu vederi spectaculoase',
    icon: <FaUmbrellaBeach className="w-10 h-10 text-[#D4AF37]" />,
  },
];

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

export default function Amenities() {
  return (
    <section id="facilitati-dotari" className="relative py-20 bg-black overflow-hidden">
      {/* Nature-themed background decorations */}
      <div className="absolute inset-0 overflow-hidden opacity-20 z-10">
        <motion.div 
          className="absolute top-10 right-10"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <TreeSVG />
        </motion.div>
        <motion.div 
          className="absolute bottom-40 left-40"
          animate={{ 
            rotate: [360, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            scale: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }
          }}
        >
          <TreeSVG />
        </motion.div>
        <motion.div 
          className="absolute top-1/3 left-1/3"
          animate={{ 
            x: [0, 10, 0],
            y: [0, -5, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <LogSVG />
        </motion.div>
        {/* Enhanced decorative elements */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-black/20 blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-1/3 w-40 h-40 rounded-full bg-black/20 blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Add Particles Background */}
      <ParticlesBackground 
        theme="nature"
        particleCount={20}
        speed={0.5}
        opacity={0.12}
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
          {/* Enhanced Decorative wood grain divider above title */}
          <motion.div 
            className="w-24 h-2 mb-6 relative mx-auto"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8B5A2B] to-transparent opacity-60 rounded-full"></div>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/20 to-transparent opacity-40 rounded-full"
              animate={{
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          <motion.h2 
            className="text-3xl md:text-4xl font-serif font-bold text-amber-100 mb-6 [text-shadow:_0_4px_24px_rgba(0,0,0,0.9)]"
            whileInView={{
              scale: [0.9, 1, 0.9]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Facilități & Dotări
          </motion.h2>
          <motion.p 
            className="text-amber-50/90 max-w-2xl mx-auto [text-shadow:_0_2px_8px_rgba(0,0,0,0.8)]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Fiecare detaliu a fost atent gândit pentru a vă asigura o ședere de neuitat.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenities.map((amenity, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                rotateY: 5,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)"
              }}
              className="flex flex-col p-6 bg-[#1A1A1A]/80 backdrop-blur-sm rounded-lg border border-[#2A2A2A] relative overflow-hidden group cursor-pointer"
              style={{
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                background: 'linear-gradient(135deg, rgba(32, 32, 32, 0.9) 0%, rgba(24, 24, 24, 0.8) 100%)'
              }}
            >
              {/* Animated background glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#2f6310]/5 via-transparent to-[#2f6310]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <div className="flex items-start relative z-10">
                <motion.div 
                  className="bg-[#1A1A1A] p-3 rounded-md mr-4 group-hover:bg-[#2f6310]/20 transition-colors duration-300"
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: [0, -10, 10, 0],
                    backgroundColor: "rgba(47, 99, 16, 0.3)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {amenity.icon}
                </motion.div>
                <div className="flex-1">
                  <motion.h3 
                    className="text-lg font-semibold text-amber-100 mb-2 group-hover:text-amber-50 transition-colors"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {amenity.title}
                  </motion.h3>
                  <motion.p 
                    className="text-amber-50/80 text-sm group-hover:text-amber-50/90 transition-colors"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {amenity.description}
                  </motion.p>
                </div>
              </div>

              {/* Floating particles inside cards */}
              <motion.div
                className="absolute top-2 right-2 w-1 h-1 bg-amber-200/40 rounded-full"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{
                  duration: 2 + index * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute bottom-4 left-4 w-0.5 h-0.5 bg-[#2f6310]/60 rounded-full"
                animate={{
                  x: [0, 5, 0],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 3 + index * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.5
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}