'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const navItems = [
  { label: 'Acasă', target: 'home' },
  { label: 'Despre', target: 'despre' },
  { label: 'Facilități', target: 'facilitati-dotari' },
  { label: 'Galerie', target: 'gallery' },
  { label: 'Ce spun clienții?', target: 'pareri-oaspeti' },
  { label: 'Contact', target: 'contact' }
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const mobileMenu = document.querySelector('.mobile-menu');
      const menuButton = document.querySelector('.menu-button');
      
      if (isOpen && 
          mobileMenu && 
          !mobileMenu.contains(event.target as Node) && 
          menuButton && 
          !menuButton.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 140;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      requestAnimationFrame(() => {
        try {
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        } catch {
          // Fallback for browsers that don't support smooth scrolling
          window.scrollTo(0, offsetPosition);
        }
      });
    }
    setIsOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
      <motion.header 
        className={`fixed w-full z-50 transition-all duration-300 bg-black/80 backdrop-blur-sm shadow-md`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center h-16 w-auto p-2 rounded-xl shadow-lg" style={{boxShadow: '0 4px 24px rgba(0,0,0,0.18)', background: 'transparent'}} aria-label="Dom Cabin Home">
              <Image src="/logo.png" alt="Dom Cabin Logo" width={200} height={75} priority className="h-14 w-auto object-contain" />
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <button 
                    onClick={() => scrollToSection(item.target)}
                    className={`relative transition-colors duration-300 group text-white hover:text-gold`}
                  >
                    {item.label}
                    <motion.span 
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-wood transition-all duration-300 group-hover:w-full"
                      layoutId="nav-underline"
                    />
                  </button>
                </motion.div>
              ))}
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => scrollToSection('calendar')}
                className="bg-[#2f6310] hover:bg-[#3d7f15] text-white px-6 py-2 rounded-lg transition-colors duration-300"
              >
                Rezervă acum
              </motion.button>
            </nav>
            
            <motion.button 
              className="md:hidden text-white p-2 menu-button"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </motion.button>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isOpen && (
                <motion.div 
                  className="md:hidden absolute top-full left-0 right-0 bg-black/80 backdrop-blur-sm shadow-md overflow-hidden mobile-menu z-50"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="px-6 py-4 space-y-4">
                    {navItems.map((item) => (
                      <motion.div
                        key={item.label}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <button 
                          onClick={() => scrollToSection(item.target)}
                          className="block w-full text-center py-2 text-white hover:text-gold transition-colors"
                        >
                          {item.label}
                        </button>
                      </motion.div>
                    ))}
                    <motion.button
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => scrollToSection('calendar')}
                      className="w-full bg-[#2f6310] hover:bg-[#3d7f15] text-white px-6 py-2 rounded-lg transition-colors duration-300"
                    >
                      Rezervă acum
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.header>
    </>
  );
}
