'use client';

import { useState, useEffect } from 'react';
import AdminCalendar from '@/components/AdminCalendar';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Gallery from '@/components/Gallery';
import PhotoUpload from '@/components/PhotoUpload';

interface DatePrice {
  date: Date;
  price: number;
}

interface Category {
  id: number;
  name: string;
  season: string;
}

export default function AdminPage() {
  const [datePrices, setDatePrices] = useState<DatePrice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'prices' | 'gallery'>('prices');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchDatePrices();
    fetchCategories();
  }, []);

  const fetchDatePrices = async () => {
    try {
      const response = await fetch('/api/dates');
      if (!response.ok) {
        throw new Error('Failed to fetch dates');
      }
      const data = await response.json();
      const formattedData = data.map((item: { date: string; price: number }) => ({
        date: new Date(item.date),
        price: item.price
      }));
      setDatePrices(formattedData);
    } catch {
      setError('Error loading dates. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPhotos = async () => {
    try {
      const response = await fetch('/api/photos');
      if (!response.ok) {
        throw new Error('Failed to fetch photos');
      }
      // Just fetch the photos to refresh the Gallery component
      await response.json();
    } catch {
      setError('Error loading photos. Please try again.');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/photos/categories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
    } catch {
      setError('Error loading categories. Please try again.');
    }
  };

  const handleSaveDates = async (newDatePrices: DatePrice[]) => {
    try {
      const response = await fetch('/api/dates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDatePrices),
      });

      if (!response.ok) {
        throw new Error('Failed to save dates');
      }

      await fetchDatePrices();
    } catch {
      setError('Error saving dates. Please try again.');
    }
  };

  const handleTabChange = (tab: 'prices' | 'gallery') => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        router.push('/login');
      } else {
        setError('Error logging out. Please try again.');
      }
    } catch {
      setError('Error logging out. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-xl text-amber-100">Se încarcă...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex">
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        className={`fixed lg:static w-64 h-full bg-[#1A1A1A] border-r border-[#2A2A2A] z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-serif font-bold text-amber-100">
              Admin Panel
            </h1>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden text-amber-50/60 hover:text-amber-50/90"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="space-y-2 flex-1">
            <button
              onClick={() => handleTabChange('prices')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                activeTab === 'prices'
                  ? 'bg-[#2f6310] text-white'
                  : 'text-amber-50/60 hover:text-amber-50/90 hover:bg-[#2A2A2A]'
              }`}
            >
              Gestionare Prețuri
            </button>
            <button
              onClick={() => handleTabChange('gallery')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                activeTab === 'gallery'
                  ? 'bg-[#2f6310] text-white'
                  : 'text-amber-50/60 hover:text-amber-50/90 hover:bg-[#2A2A2A]'
              }`}
            >
              Galerie
            </button>
          </nav>
          <button
            onClick={handleLogout}
            className="mt-auto w-full text-left px-4 py-3 rounded-lg transition-all duration-300 text-red-400 hover:text-red-300 hover:bg-red-900/20"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Deconectare</span>
            </div>
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Header */}
        <header className="h-16 bg-[#1A1A1A] border-b border-[#2A2A2A] fixed w-full lg:w-[calc(100%-16rem)] z-30">
          <div className="h-full px-4 lg:px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden text-amber-50/60 hover:text-amber-50/90"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h2 className="text-xl font-serif font-bold text-amber-100">
                {activeTab === 'prices' ? 'Gestionare Prețuri Cabane' : 'Galerie'}
              </h2>
            </div>
            <motion.button
              onClick={() => router.push('/')}
              className="bg-[#2f6310] hover:bg-[#3d7f15] text-white px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#2f6310]/20"
              whileHover={{ scale: 1.05 }}
            >
              Înapoi la Pagina Principală
            </motion.button>
          </div>
        </header>

        {/* Content Area */}
        <main className="pt-20 p-4 lg:p-6">
          {error && (
            <motion.div 
              className="bg-red-100/10 backdrop-blur-sm border border-red-400/30 text-red-200 px-4 py-3 rounded-lg mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.div>
          )}

          <motion.div 
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === 'prices' ? (
              <AdminCalendar 
                initialDatePrices={datePrices}
                onSaveDates={handleSaveDates}
              />
            ) : (
              <div className="space-y-6">
                <PhotoUpload 
                  categories={categories}
                  onUploadComplete={fetchPhotos}
                />
                <div className="bg-[#1A1A1A] rounded-lg border border-[#2A2A2A] p-4 lg:p-6">
                  <Gallery />
                </div>
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
} 