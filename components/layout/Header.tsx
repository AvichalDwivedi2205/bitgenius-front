'use client';

import { useState, useEffect } from 'react';
import { motion } from '../motion';
import Link from 'next/link';
import { useUIStore } from '../../lib/store';

// Navigation Items
const navItems = [
  { title: "What is BitGenius", href: "#what-is" },
  { title: "Features", href: "#features" },
  { title: "Agent Previews", href: "#agent-previews" },
  { title: "Stack", href: "#stack" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { isMenuOpen, toggleMenu } = useUIStore();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
        scrolled ? "bg-[#0B0C0F]/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#F7931A] to-[#13ADC7] flex items-center justify-center">
            <span className="font-bold text-white">BG</span>
          </div>
          <span className="font-bold text-xl text-white">BitGenius</span>
        </motion.div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink key={item.title} href={item.href}>{item.title}</NavLink>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <motion.button
            className="hidden md:block px-4 py-2 rounded-full border border-[#13ADC7] text-[#13ADC7] hover:bg-[#13ADC7]/10 transition-all"
            whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(19, 173, 199, 0.5)" }}
            whileTap={{ scale: 0.98 }}
          >
            Docs
          </motion.button>
          
          <motion.button
            className="px-4 py-2 rounded-full bg-gradient-to-r from-[#F7931A] to-[#13ADC7] hover:opacity-90 text-white font-medium transition-all"
            whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(247, 147, 26, 0.5)" }}
            whileTap={{ scale: 0.98 }}
          >
            Launch App
          </motion.button>
          
          {/* Mobile menu button */}
          <motion.button
            className="block md:hidden text-white"
            onClick={toggleMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </motion.button>
        </div>
      </nav>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          className="fixed inset-0 z-40 bg-[#0B0C0F]/95 flex flex-col items-center justify-center gap-8 pt-20 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {navItems.map((item) => (
            <Link 
              key={item.title}
              href={item.href}
              onClick={toggleMenu}
              className="text-xl text-white hover:text-[#13ADC7] transition-colors"
            >
              {item.title}
            </Link>
          ))}
          <motion.button
            className="mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-[#F7931A] to-[#13ADC7] hover:opacity-90 text-white font-medium"
            whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(247, 147, 26, 0.5)" }}
            whileTap={{ scale: 0.98 }}
          >
            Launch App
          </motion.button>
        </motion.div>
      )}
    </motion.header>
  );
}

const NavLink = ({ 
  href, 
  children 
}: { 
  href: string; 
  children: React.ReactNode 
}) => {
  return (
    <motion.a
      href={href}
      className="text-white/80 hover:text-white relative"
      whileHover={{ scale: 1.1 }}
    >
      <span>{children}</span>
      <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-[#13ADC7] transform scale-x-0 transition-transform origin-left hover:scale-x-100 duration-300"></span>
    </motion.a>
  );
};
