'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight, FiMaximize2 } from 'react-icons/fi';
import ParticlesBackground from './ParticlesBackground';

interface Photo {
  id: number;
  url: string;
  alt: string;
  categoryId: number;
  category: {
    id: number;
    name: string;
    season: string;
  };
}

interface Category {
  id: number;
  name: string;
  season: string;
}

export default function Gallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [season, setSeason] = useState<'Vara' | 'Iarna'>('Vara');
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const fetchPhotos = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/photos?season=${season}`);
      const data = await response.json();
      setPhotos(data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setIsLoading(false);
    }
  }, [season]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/photos/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    // Load saved season from localStorage or default to Vara
    const savedSeason = localStorage.getItem('selectedSeason');
    if (savedSeason) {
      setSeason(savedSeason as 'Vara' | 'Iarna');
    } else {
      setSeason('Vara');
    }
  }, []);

  // Save season to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('selectedSeason', season);
  }, [season]);

  useEffect(() => {
    fetchPhotos();
    fetchCategories();
  }, [season, fetchPhotos]);

  const handleImageLoad = (id: number) => {
    setLoadedImages(prev => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
  };

  const filteredPhotos = selectedCategory
    ? photos.filter(photo => photo.categoryId === selectedCategory)
    : photos;

  const filteredCategories = categories.filter(cat => cat.season === season);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigate = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    if (direction === 'prev') {
      setSelectedImage(selectedImage === 0 ? filteredPhotos.length - 1 : selectedImage - 1);
    } else {
      setSelectedImage(selectedImage === filteredPhotos.length - 1 ? 0 : selectedImage + 1);
    }
  };

  if (typeof window !== 'undefined') {
    window.onkeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(console.log);
        }
      }
    };
  }

  const isWinter = season === 'Iarna';

  return (
    <section 
      id="gallery" 
      className={`min-h-screen py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-all duration-1000 ${
        isWinter 
          ? 'bg-gradient-to-b from-[#0A0F1A] via-[#0D1420] to-[#0A0A0A]' 
          : 'bg-[#0A0A0A]'
      }`}
    >
      {/* Enhanced Winter/Summer Particles Background */}
      <ParticlesBackground 
        theme="nature"
        particleCount={isWinter ? 40 : 25}
        speed={isWinter ? 0.4 : 0.6}
        opacity={isWinter ? 0.25 : 0.15}
        isWinter={isWinter}
        className="absolute inset-0 z-10"
      />

      {/* Winter-specific background effects */}
      {isWinter && (
        <>
          {/* Frost overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/5 via-transparent to-blue-900/10 z-5" />
          
          {/* Animated aurora effect */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full opacity-20 z-5"
            animate={{
              background: [
                'radial-gradient(ellipse at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
                'radial-gradient(ellipse at 80% 30%, rgba(147, 197, 253, 0.15) 0%, transparent 50%)',
                'radial-gradient(ellipse at 40% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
                'radial-gradient(ellipse at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)'
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Icy crystalline decorations */}
          <div className="absolute inset-0 overflow-hidden opacity-10 z-10">
            <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-blue-200/20 blur-2xl animate-pulse"></div>
            <div className="absolute bottom-1/3 left-1/3 w-40 h-40 rounded-full bg-cyan-200/15 blur-2xl animate-pulse"></div>
          </div>
        </>
      )}

      {/* Summer-specific background effects */}
      {!isWinter && (
        <>
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
        </>
      )}

      <div className="max-w-7xl mx-auto relative z-20">
        <div className="text-center mb-16">
          <motion.h1 
            className={`text-5xl font-serif font-bold mb-6 transition-all duration-1000 ${
              isWinter 
                ? 'text-blue-100 drop-shadow-[0_0_20px_rgba(147,197,253,0.5)]' 
                : 'text-amber-100'
            }`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Galerie Foto
          </motion.h1>
        </div>

        <motion.div 
          className="mb-12 flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Enhanced Season Toggle */}
          <div className={`relative rounded-xl border p-1 backdrop-blur-md transition-all duration-1000 ${
            isWinter 
              ? 'bg-slate-900/80 border-blue-300/30 shadow-[0_0_30px_rgba(59,130,246,0.3)]' 
              : 'bg-[#1A1A1A] border-[#2A2A2A]'
          }`}>
            <div className="flex items-center relative">
              <motion.button
                onClick={() => setSeason('Vara')}
                className={`relative z-10 px-6 py-2.5 rounded-lg transition-all duration-500 ${
                  season === 'Vara'
                    ? 'text-white'
                    : isWinter 
                      ? 'text-blue-100/60 hover:text-blue-100/90' 
                      : 'text-amber-50/60 hover:text-amber-50/90'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  <motion.svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{ rotate: season === 'Vara' ? [0, 360] : 0 }}
                    transition={{ duration: 2, repeat: season === 'Vara' ? Infinity : 0, ease: "linear" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </motion.svg>
                  Vară
                </span>
              </motion.button>
              <motion.button
                onClick={() => setSeason('Iarna')}
                className={`relative z-10 px-6 py-2.5 rounded-lg transition-all duration-500 ${
                  season === 'Iarna'
                    ? 'text-white'
                    : isWinter 
                      ? 'text-blue-100/60 hover:text-blue-100/90' 
                      : 'text-amber-50/60 hover:text-amber-50/90'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  <motion.svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{ 
                      rotate: season === 'Iarna' ? [0, 10, -10, 0] : 0,
                      scale: season === 'Iarna' ? [1, 1.1, 1] : 1
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: season === 'Iarna' ? Infinity : 0, 
                      ease: "easeInOut" 
                    }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </motion.svg>
                  Iarnă
                </span>
              </motion.button>
              <motion.div 
                className={`absolute h-[calc(100%-8px)] rounded-lg transition-all duration-700 ease-in-out ${
                  season === 'Iarna' ? 'left-[calc(50%-4px)]' : 'left-[4px]'
                } w-[calc(50%-4px)] ${
                  isWinter 
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]' 
                    : 'bg-[#2f6310]'
                }`}
                layoutId="season-toggle"
              />
            </div>
          </div>

          {/* Enhanced Category Tabs */}
          <div className={`flex flex-wrap gap-1.5 justify-center max-w-3xl p-1.5 rounded-xl border backdrop-blur-md transition-all duration-1000 ${
            isWinter 
              ? 'bg-slate-900/80 border-blue-300/30' 
              : 'bg-[#1A1A1A] border-[#2A2A2A]'
          }`}>
            <motion.button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-500 flex items-center gap-1.5 ${
                selectedCategory === null
                  ? isWinter
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-[#2f6310] text-white shadow-lg shadow-[#2f6310]/20'
                  : isWinter
                    ? 'bg-slate-800/50 text-blue-100/60 hover:bg-slate-700/50 hover:text-blue-100/90'
                    : 'bg-[#1A1A1A] text-amber-50/60 hover:bg-[#2A2A2A] hover:text-amber-50/90'
              }`}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </motion.svg>
              Toate
            </motion.button>
            {filteredCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-500 flex items-center gap-1.5 ${
                  selectedCategory === category.id
                    ? isWinter
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20'
                      : 'bg-[#2f6310] text-white shadow-lg shadow-[#2f6310]/20'
                    : isWinter
                      ? 'bg-slate-800/50 text-blue-100/60 hover:bg-slate-700/50 hover:text-blue-100/90'
                      : 'bg-[#1A1A1A] text-amber-50/60 hover:bg-[#2A2A2A] hover:text-amber-50/90'
                }`}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </motion.svg>
                {category.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Enhanced Loading skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <motion.div 
                key={index}
                className={`relative aspect-[4/3] rounded-lg animate-pulse transition-all duration-1000 ${
                  isWinter 
                    ? 'bg-slate-800/50 border border-blue-300/20' 
                    : 'bg-[#1A1A1A]'
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              />
            ))
          ) : filteredPhotos.length === 0 ? (
            <motion.div 
              className="col-span-full text-center py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className={`text-lg transition-colors duration-1000 ${
                isWinter ? 'text-blue-100/80' : 'text-amber-100/80'
              }`}>
                Momentan nu sunt poze in aceasta categorie
              </p>
            </motion.div>
          ) : (
            filteredPhotos.map((photo, index) => (
              <motion.div 
                key={photo.id} 
                className={`group relative overflow-hidden rounded-lg cursor-zoom-in border transition-all duration-700 hover:scale-105 ${
                  isWinter 
                    ? 'bg-slate-900/50 border-blue-300/30 hover:border-blue-400/60 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]' 
                    : 'bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#2f6310]/50'
                }`}
                onClick={() => openLightbox(index)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative aspect-[4/3]">
                  <div className={`absolute inset-0 transition-opacity duration-500 ${
                    loadedImages.has(photo.id) ? 'opacity-0' : 'opacity-100'
                  } ${isWinter ? 'bg-slate-800/50' : 'bg-[#1A1A1A]'}`} />
                  <Image
                    src={photo.url}
                    alt={photo.alt}
                    fill
                    className={`object-cover transition-all duration-700 ${
                      loadedImages.has(photo.id) 
                        ? 'opacity-100 scale-100' 
                        : 'opacity-0 scale-105'
                    } group-hover:scale-110`}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={index < 6}
                    quality={90}
                    loading={index < 6 ? "eager" : "lazy"}
                    onLoad={() => handleImageLoad(photo.id)}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 transition-opacity duration-500 ${
                    loadedImages.has(photo.id) ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'
                  }`}>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <motion.div 
                        className={`backdrop-blur-sm px-4 py-2 rounded-lg inline-block text-sm text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ${
                          isWinter 
                            ? 'bg-gradient-to-r from-blue-600/90 to-cyan-500/90' 
                            : 'bg-[#2f6310]/90'
                        }`}
                        whileHover={{ scale: 1.05 }}
                      >
                        {photo.category.name}
                      </motion.div>
                    </div>
                  </div>
                  <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                    loadedImages.has(photo.id) ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'
                  }`}>
                    <motion.div 
                      className={`backdrop-blur-sm p-4 rounded-lg transform scale-90 group-hover:scale-100 transition-transform duration-500 ${
                        isWinter 
                          ? 'bg-gradient-to-r from-blue-600/90 to-cyan-500/90' 
                          : 'bg-[#2f6310]/90'
                      }`}
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FiMaximize2 className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Enhanced Lightbox */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center transition-all duration-500 ${
                isWinter 
                  ? 'bg-slate-900/95' 
                  : 'bg-black/95'
              }`}
              onClick={closeLightbox}
            >
              <motion.button
                className={`absolute top-6 right-6 text-white p-3 rounded-lg transition-all duration-300 ${
                  isWinter 
                    ? 'hover:bg-blue-500/20 border border-blue-300/30' 
                    : 'hover:bg-white/10'
                }`}
                onClick={closeLightbox}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiX className="w-8 h-8" />
              </motion.button>

              <motion.button
                className={`absolute left-6 text-white p-3 rounded-lg transition-all duration-300 ${
                  isWinter 
                    ? 'hover:bg-blue-500/20 border border-blue-300/30' 
                    : 'hover:bg-white/10'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('prev');
                }}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiChevronLeft className="w-8 h-8" />
              </motion.button>

              <div className="relative max-w-5xl w-full h-full flex items-center justify-center">
                <motion.div 
                  className="relative w-full h-full max-h-[85vh]"
                  initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
                  animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                  exit={{ scale: 0.8, opacity: 0, rotateY: 15 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={filteredPhotos[selectedImage].url}
                    alt={filteredPhotos[selectedImage].alt}
                    fill
                    className="object-contain rounded-lg"
                    priority
                    quality={100}
                  />
                  <motion.div 
                    className={`absolute bottom-6 left-0 right-0 text-center text-sm ${
                      isWinter ? 'text-blue-100/80' : 'text-white/80'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {selectedImage + 1} / {filteredPhotos.length}
                  </motion.div>
                </motion.div>
              </div>

              <motion.button 
                className={`absolute right-6 text-white p-3 rounded-lg transition-all duration-300 ${
                  isWinter 
                    ? 'hover:bg-blue-500/20 border border-blue-300/30' 
                    : 'hover:bg-white/10'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('next');
                }}
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiChevronRight className="w-8 h-8" />
              </motion.button>

              <motion.div 
                className={`absolute bottom-6 left-6 backdrop-blur-sm text-sm px-4 py-2 rounded-lg ${
                  isWinter 
                    ? 'bg-gradient-to-r from-blue-600/90 to-cyan-500/90 text-white' 
                    : 'bg-[#2f6310]/90 text-white'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {filteredPhotos[selectedImage]?.category.name}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}