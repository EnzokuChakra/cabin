'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import ParticlesBackground from './ParticlesBackground';

interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  profile_photo_url: string;
}

const localTestimonials = [
  {
    id: 1,
    quote: "Minunat! Un loc de vis cu o priveliste magnifica din cel mai inalt punct. Cabana este incredibil de frumoasa la interior, spațioasă, deține toate dotarile iar despre jacuzzi-ul din fata cabanei nici nu am cuvinte. Cu siguranta voi reveni!🙌🏾",
    author: "Matei Cretiu Codreanu",
    rating: 5,
  },
  {
    id: 2,
    quote: "Ne-am simțit tare bine la DOM CABIN. Indiferent dacă ai nevoie de liniște sau de o petrecere cu oameni dragi, aici este locul potrivit, pentru ca ai parte de toate. In plus, cabana beneficiază și de un view spectaculos, jacuzzi, curățenie impecabila și o gazda atenta și amabila. Recomandam cu drag! ❤️",
    author: "Tania Aldea",
    rating: 5,
  },
  {
    id: 3,
    quote: `Absolut minunat!!! ❤️❤️❤️
Un loc de rasfat si relaxare!!! ❤️❤️❤️`,
    author: "Ana-Maria Călăcean",
    rating: 5,
  },
];

const Star = ({ filled }: { filled: boolean }) => (
  <motion.svg
    className={`w-5 h-5 ${filled ? 'text-[#FFD700]' : 'text-amber-50/30'}`}
    fill="currentColor"
    viewBox="0 0 20 20"
    whileHover={{ 
      scale: 1.2, 
      rotate: 360,
      color: filled ? "#FFA500" : undefined
    }}
    transition={{ duration: 0.3 }}
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </motion.svg>
);

const TestimonialCard = ({ testimonial, index, isGoogleReview = false }: { 
  testimonial: typeof localTestimonials[0] | GoogleReview, 
  index: number,
  isGoogleReview?: boolean 
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const rating = 'rating' in testimonial ? testimonial.rating : 5;
  const author = 'author_name' in testimonial ? testimonial.author_name : testimonial.author;
  const quote = 'text' in testimonial ? testimonial.text : testimonial.quote;
  const profilePhoto = 'profile_photo_url' in testimonial ? testimonial.profile_photo_url : null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ 
        y: -10,
        scale: 1.02,
        rotateY: 5,
        boxShadow: "0 25px 50px rgba(0, 0, 0, 0.4)"
      }}
      className="bg-[#1A1A1A]/80 backdrop-blur-sm p-8 rounded-lg border border-[#2A2A2A] relative overflow-hidden group cursor-pointer"
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

      <motion.div 
        className="flex mb-4 relative z-10"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
      >
        {[...Array(5)].map((_, i) => (
          <Star key={i} filled={i < rating} />
        ))}
      </motion.div>
      
      <motion.p 
        className="text-amber-50/90 italic mb-6 [text-shadow:_0_2px_8px_rgba(0,0,0,0.8)] relative z-10 group-hover:text-amber-50 transition-colors" 
        dangerouslySetInnerHTML={{ __html: `"${quote.replace(/\n/g, '<br />')}"` }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
      />
      
      <motion.div 
        className="flex items-center relative z-10"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
      >
        {profilePhoto ? (
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <Image 
              src={profilePhoto} 
              alt={author}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full mr-4 border-2 border-amber-200/30 object-cover"
            />
          </motion.div>
        ) : (
          <motion.div 
            className="bg-[#FFD700]/20 w-10 h-10 rounded-full flex items-center justify-center text-amber-50/90 font-bold mr-4 border border-amber-200/30"
            whileHover={{ 
              scale: 1.1, 
              backgroundColor: "rgba(255, 215, 0, 0.3)",
              rotate: 360
            }}
            transition={{ duration: 0.3 }}
          >
            {author.charAt(0)}
          </motion.div>
        )}
        <div>
          <motion.p 
            className="font-semibold text-amber-100 group-hover:text-amber-50 transition-colors"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            {author}
          </motion.p>
          {isGoogleReview && (
            <p className="text-sm text-amber-50/60">Google Review</p>
          )}
        </div>
      </motion.div>

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
  );
};

export default function Testimonials() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="pareri-oaspeti" className="relative py-20 bg-black overflow-hidden">
      {/* Nature-themed background decorations */}
      <div className="absolute inset-0 overflow-hidden opacity-20 z-10">
        {/* Enhanced decorative elements */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-[#2f6310]/5 blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-1/3 w-40 h-40 rounded-full bg-[#3d7f15]/5 blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.12, 0.05]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Enhanced Particles Background */}
      <ParticlesBackground 
        theme="nature"
        particleCount={30}
        speed={0.4}
        opacity={0.18}
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
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
        >
          {/* Enhanced Decorative wood grain divider above title */}
          <motion.div 
            className="w-24 h-2 mb-6 relative mx-auto"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
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
              scale: [0.95, 1, 0.95]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Părerile Oaspeților Noștri
          </motion.h2>
          <motion.p 
            className="text-amber-50/90 max-w-2xl mx-auto [text-shadow:_0_2px_8px_rgba(0,0,0,0.8)]"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Nu ne credeți pe cuvânt. Iată ce spun oaspeții noștri despre șederea lor.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {localTestimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={`local-${testimonial.id}`} 
              testimonial={testimonial} 
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}