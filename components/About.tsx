import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaStar, FaClock, FaGlobeAmericas, FaPlus } from 'react-icons/fa';
import ParticlesBackground from './ParticlesBackground';

export default function About() {
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
    <section id="despre" className="relative py-20 bg-black overflow-hidden">
      {/* Nature-themed background decorations */}
      <div className="absolute inset-0 overflow-hidden opacity-20 z-10">
        <div className="absolute top-10 right-10 transform rotate-180">
          <svg className="text-[#0D160B] opacity-5" width="280" height="280" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,22a8,8,0,0,1-8-8c0-3.5,2.33-6.15,6-7.41V4a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6.59c3.67,1.26,6,3.91,6,7.41A8,8,0,0,1,12,22Zm-1-9.37V16h2V12.63a1,1,0,0,1,.45-.83,4.62,4.62,0,0,0,2.3-3.65C15.31,6.11,13.46,5,12,5S8.69,6.11,8.25,8.15a4.62,4.62,0,0,0,2.3,3.65A1,1,0,0,1,11,12.63Z"/>
          </svg>
        </div>
      </div>

      {/* Add Particles Background */}
      <ParticlesBackground 
        theme="nature"
        particleCount={25}
        speed={0.6}
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
        {/* Mobile Image */}
        <motion.div 
          className="md:hidden mb-10 w-full"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            className="relative h-96 w-full rounded-lg overflow-hidden shadow-xl"
            whileHover={{ scale: 1.02, rotateY: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/images/cabin-interior.jpg"
              alt="Cabin interior"
              fill
              className="object-cover"
              sizes="100vw"
              quality={100}
              priority
            />
            <div className="absolute inset-0 bg-black/10" />
            
            {/* Floating elements */}
            <motion.div
              className="absolute top-4 right-4 w-3 h-3 bg-amber-200/60 rounded-full"
              animate={{
                y: [0, -10, 0],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-6 left-6 w-2 h-2 bg-[#2f6310]/60 rounded-full"
              animate={{
                y: [0, -8, 0],
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
        </motion.div>
        
        <motion.div 
          className="flex flex-col md:flex-row items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Desktop Image */}
          <motion.div 
            className="hidden md:block md:w-1/2 mb-10 md:mb-0 md:pr-10"
            variants={itemVariants}
          >
            <motion.div 
              className="relative h-96 w-full rounded-lg overflow-hidden shadow-xl"
              whileHover={{ 
                scale: 1.05, 
                rotateY: 8,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Image
                src="/images/cabin-interior.jpg"
                alt="Cabin interior"
                fill
                className="object-cover"
                sizes="50vw"
                quality={100}
                priority
              />
              <div className="absolute inset-0 bg-black/10" />
              
              {/* Enhanced floating elements */}
              <motion.div
                className="absolute top-4 right-4 w-3 h-3 bg-amber-200/60 rounded-full"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.6, 1, 0.6],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute bottom-6 left-6 w-2 h-2 bg-[#2f6310]/60 rounded-full"
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.6, 1, 0.6],
                  scale: [1, 1.3, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
              <motion.div
                className="absolute top-1/2 left-4 w-1.5 h-1.5 bg-amber-100/50 rounded-full"
                animate={{
                  x: [0, 5, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              />
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-1/2"
            variants={itemVariants}
          >
            {/* Enhanced Decorative wood grain divider above title */}
            <motion.div 
              className="w-24 h-2 mb-6 relative"
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
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Un Refugiu în Inima Pădurii
            </motion.h2>
            
            <motion.p 
              className="text-amber-50/90 mb-6 [text-shadow:_0_2px_8px_rgba(0,0,0,0.8)] leading-relaxed"
              variants={itemVariants}
            >
              Ascunsă printre brazi înalți și priveliști spectaculoase asupra munților, cabana noastră de lux oferă 
              scăparea perfectă de agitația vieții de zi cu zi. Fiecare detaliu a fost atent ales pentru a oferi o 
              experiență de neuitat care îmbina farmecul rustic cu confortul modern.
            </motion.p>
            
            <div className="grid grid-cols-2 gap-6 mt-8">
              <motion.div 
                className="flex items-start group"
                variants={itemVariants}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="text-[#D4AF37] mr-4 mt-1"
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: 360,
                    color: "#FFD700"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <FaStar className="w-6 h-6" />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-amber-100 group-hover:text-amber-50 transition-colors">Cazare de Lux</h3>
                  <p className="text-sm text-amber-50/80">Interioare lucrate manual cu finisaje premium</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start group"
                variants={itemVariants}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="text-[#D4AF37] mr-4 mt-1"
                  whileHover={{ 
                    scale: 1.2,
                    color: "#FFD700"
                  }}
                  animate={{
                    rotate: [0, 360]
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 0.3 }
                  }}
                >
                  <FaClock className="w-6 h-6" />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-amber-100 group-hover:text-amber-50 transition-colors">Deschis Tot Anul</h3>
                  <p className="text-sm text-amber-50/80">Frumusețe în fiecare anotimp</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start group"
                variants={itemVariants}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="text-[#D4AF37] mr-4 mt-1"
                  whileHover={{ 
                    scale: 1.2,
                    color: "#FFD700"
                  }}
                  animate={{
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  <FaGlobeAmericas className="w-6 h-6" />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-amber-100 group-hover:text-amber-50 transition-colors">Locație Izolată</h3>
                  <p className="text-sm text-amber-50/80">Confidențialitate și liniște garantate</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start group"
                variants={itemVariants}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="text-[#D4AF37] mr-4 mt-1"
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: 90,
                    color: "#FFD700"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <FaPlus className="w-6 h-6" />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-amber-100 group-hover:text-amber-50 transition-colors">Activități Nenumărate</h3>
                  <p className="text-sm text-amber-50/80">Drumeții, pescuit și multe altele</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}