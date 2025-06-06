'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight, FiMaximize2 } from 'react-icons/fi';

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

  return (
    <section id="gallery" className="min-h-screen bg-[#0A0A0A] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1 
            className="text-5xl font-serif font-bold mb-6 text-amber-100"
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
          {/* Season Toggle */}
          <div className="relative bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] p-1">
            <div className="flex items-center relative">
              <button
                onClick={() => setSeason('Vara')}
                className={`relative z-10 px-6 py-2.5 rounded-lg transition-all duration-300 ${
                  season === 'Vara'
                    ? 'text-white'
                    : 'text-amber-50/60 hover:text-amber-50/90'
                }`}
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Vară
                </span>
              </button>
              <button
                onClick={() => setSeason('Iarna')}
                className={`relative z-10 px-6 py-2.5 rounded-lg transition-all duration-300 ${
                  season === 'Iarna'
                    ? 'text-white'
                    : 'text-amber-50/60 hover:text-amber-50/90'
                }`}
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  Iarnă
                </span>
              </button>
              <div 
                className={`absolute h-[calc(100%-8px)] bg-[#2f6310] rounded-lg transition-all duration-500 ease-in-out ${
                  season === 'Iarna' ? 'left-[calc(50%-4px)]' : 'left-[4px]'
                } w-[calc(50%-4px)]`}
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 justify-center max-w-3xl bg-[#1A1A1A] p-1.5 rounded-xl border border-[#2A2A2A]">
            <motion.button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-300 flex items-center gap-1.5 ${
                selectedCategory === null
                  ? 'bg-[#2f6310] text-white shadow-lg shadow-[#2f6310]/20'
                  : 'bg-[#1A1A1A] text-amber-50/60 hover:bg-[#2A2A2A] hover:text-amber-50/90'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Toate
            </motion.button>
            {filteredCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-300 flex items-center gap-1.5 ${
                  selectedCategory === category.id
                    ? 'bg-[#2f6310] text-white shadow-lg shadow-[#2f6310]/20'
                    : 'bg-[#1A1A1A] text-amber-50/60 hover:bg-[#2A2A2A] hover:text-amber-50/90'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {category.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <div 
                key={index}
                className="relative aspect-[4/3] rounded-lg bg-[#1A1A1A] animate-pulse"
              />
            ))
          ) : filteredPhotos.length === 0 ? (
            <motion.div 
              className="col-span-full text-center py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-amber-100/80 text-lg">
                Momentan nu sunt poze in aceasta categorie
              </p>
            </motion.div>
          ) : (
            filteredPhotos.map((photo, index) => (
              <motion.div 
                key={photo.id} 
                className="group relative overflow-hidden rounded-lg cursor-zoom-in bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#2f6310]/50 transition-all duration-500"
                onClick={() => openLightbox(index)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative aspect-[4/3]">
                  <div className={`absolute inset-0 bg-[#1A1A1A] transition-opacity duration-500 ${
                    loadedImages.has(photo.id) ? 'opacity-0' : 'opacity-100'
                  }`} />
                  <Image
                    src={photo.url}
                    alt={photo.alt}
                    fill
                    className={`object-cover transition-all duration-700 ${
                      loadedImages.has(photo.id) 
                        ? 'opacity-100 scale-100' 
                        : 'opacity-0 scale-105'
                    } group-hover:scale-105`}
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
                      <div className="backdrop-blur-sm px-4 py-2 rounded-lg inline-block text-sm bg-[#2f6310]/90 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        {photo.category.name}
                      </div>
                    </div>
                  </div>
                  <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                    loadedImages.has(photo.id) ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'
                  }`}>
                    <div className="backdrop-blur-sm p-4 rounded-lg bg-[#2f6310]/90 transform scale-90 group-hover:scale-100 transition-transform duration-500">
                      <FiMaximize2 className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center"
              onClick={closeLightbox}
            >
              <button
                className="absolute top-6 right-6 text-white p-3 hover:bg-white/10 rounded-lg transition-all duration-300"
                onClick={closeLightbox}
              >
                <FiX className="w-8 h-8" />
              </button>

              <button
                className="absolute left-6 text-white p-3 hover:bg-white/10 rounded-lg transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('prev');
                }}
              >
                <FiChevronLeft className="w-8 h-8" />
              </button>

              <div className="relative max-w-5xl w-full h-full flex items-center justify-center">
                <motion.div 
                  className="relative w-full h-full max-h-[85vh]"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={filteredPhotos[selectedImage].url}
                    alt={filteredPhotos[selectedImage].alt}
                    fill
                    className="object-contain"
                    priority
                    quality={100}
                  />
                  <div className="absolute bottom-6 left-0 right-0 text-center text-white/80 text-sm">
                    {selectedImage + 1} / {filteredPhotos.length}
                  </div>
                </motion.div>
              </div>

              <button 
                className="absolute right-6 text-white p-3 hover:bg-white/10 rounded-lg transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('next');
                }}
              >
                <FiChevronRight className="w-8 h-8" />
              </button>

              <div className="absolute bottom-6 left-6 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-lg bg-[#2f6310]/90">
                {filteredPhotos[selectedImage]?.category.name}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
