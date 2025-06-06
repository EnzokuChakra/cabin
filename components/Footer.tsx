import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black text-white pt-8 pb-4 overflow-hidden">
      <div className="container mx-auto px-6 relative z-20">
        <motion.div 
          className="border-t border-[#2A2A2A] mt-8 pt-4 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-amber-50/60 text-sm">
            &copy; {currentYear} Dom Cabin. Toate drepturile rezervate.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-amber-50/60 hover:text-[#2f6310] text-sm transition-colors duration-300 hover:underline">
              Politica de Confidențialitate
            </Link>
            <Link href="#" className="text-amber-50/60 hover:text-[#2f6310] text-sm transition-colors duration-300 hover:underline">
              Termeni și Condiții
            </Link>
            <Link href="#" className="text-amber-50/60 hover:text-[#2f6310] text-sm transition-colors duration-300 hover:underline">
              Harta site-ului
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
