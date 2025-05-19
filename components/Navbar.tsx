'use client';

import { useState, useEffect } from 'react';
import { motion } from './motion';
import Link from 'next/link';
import { useUIStore } from '../lib/store';

// Dashboard Navigation Items
const navItems = [
  { title: "Dashboard", href: "/dashboard", icon: "bx-home-alt" },
  { title: "Agents", href: "/agents", icon: "bx-bot" },
  { title: "Wallet", href: "/wallet", icon: "bx-wallet" },
  { title: "Analytics", href: "/analytics", icon: "bx-chart" },
  { title: "Settings", href: "/settings", icon: "bx-cog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { isMenuOpen, toggleMenu } = useUIStore();
  const [btcPrice, setBtcPrice] = useState("$44,256.78");
  
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
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-3 transition-all duration-300 ${
        scrolled ? "bg-[#0B0C0F]/90 backdrop-blur-md shadow-lg" : "bg-[#0B0C0F]"
      } border-b border-white/5`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.4 }}
    >
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/dashboard">
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#F7931A] to-[#13ADC7] flex items-center justify-center">
              <span className="font-bold text-white">BG</span>
            </div>
            <span className="font-bold text-xl text-white">BitGenius</span>
          </motion.div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink key={item.title} href={item.href} icon={item.icon}>{item.title}</NavLink>
          ))}
        </div>
        
        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* BTC Price Ticker */}
          <motion.div
            className="hidden md:flex items-center gap-2 bg-[#181820] px-3 py-1.5 rounded-full border border-white/5"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-white/70 text-sm">BTC</span>
            <span className="text-white text-sm font-medium">{btcPrice}</span>
          </motion.div>
          
          {/* User Profile */}
          <motion.div 
            className="relative flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#F7931A]/20 to-[#13ADC7]/20 flex items-center justify-center border border-white/10">
              <span className="font-medium text-white text-sm">JS</span>
            </div>
            <span className="hidden md:inline text-white text-sm font-medium">John Satoshi</span>
          </motion.div>
          
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
          className="fixed inset-0 z-40 bg-[#0B0C0F]/95 flex flex-col items-center justify-center gap-6 pt-20 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {navItems.map((item) => (
            <Link 
              key={item.title}
              href={item.href}
              onClick={toggleMenu}
              className="flex items-center gap-3 text-xl text-white hover:text-[#13ADC7] transition-colors"
            >
              <i className={`bx ${item.icon} text-2xl`}></i>
              {item.title}
            </Link>
          ))}
          
          {/* BTC Price in Mobile Menu */}
          <div className="mt-6 flex items-center gap-2 bg-[#181820] px-4 py-2 rounded-xl border border-white/10">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <span className="text-white/70">BTC</span>
            <span className="text-white font-medium">{btcPrice}</span>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}

const NavLink = ({ 
  href, 
  icon,
  children 
}: { 
  href: string;
  icon: string;
  children: React.ReactNode 
}) => {
  return (
    <Link href={href} className="group">
      <motion.div
        className="flex items-center gap-2 text-white/80 hover:text-white relative"
        whileHover={{ scale: 1.05 }}
      >
        <i className={`bx ${icon} text-xl`}></i>
        <span>{children}</span>
        <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-[#13ADC7] transform scale-x-0 transition-transform origin-left group-hover:scale-x-100 duration-300"></span>
      </motion.div>
    </Link>
  );
};
