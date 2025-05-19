'use client';

import { motion } from '../motion';
import Link from 'next/link';

export default function DashboardFooter() {
  // Get current year for copyright
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { label: 'Help Center', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Contact', href: '#' }
  ];
  
  const networkStatus = {
    status: 'healthy', // 'healthy', 'degraded', 'issues'
    latency: '32ms',
    lastBlock: 830142
  };

  return (
    <motion.footer
      className="bg-[#0A0A0C] py-8 px-6 border-t border-white/5 mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left side with logo and copyright */}
          <div className="flex flex-col items-center md:items-start">
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#F7931A] to-[#13ADC7] flex items-center justify-center">
                <span className="font-bold text-white text-sm">BG</span>
              </div>
              <span className="font-bold text-lg text-white">BitGenius</span>
            </motion.div>
            <p className="text-white/40 text-sm mt-2">© {currentYear} BitGenius. All rights reserved.</p>
          </div>
          
          {/* Middle with links */}
          <div className="flex gap-6 my-6 md:my-0">
            {footerLinks.map((link, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -2, color: '#FFFFFF' }}
              >
                <Link href={link.href} className="text-white/60 text-sm hover:text-white transition-colors">
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>
          
          {/* Right side with network status */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <div className={`w-2.5 h-2.5 rounded-full ${
                networkStatus.status === 'healthy' 
                  ? 'bg-green-400 animate-pulse'
                  : networkStatus.status === 'degraded'
                  ? 'bg-yellow-400'
                  : 'bg-red-400'
              }`}></div>
              <span className="text-white/70">Network</span>
              <span className={`font-medium ${
                networkStatus.status === 'healthy' 
                  ? 'text-green-400'
                  : networkStatus.status === 'degraded'
                  ? 'text-yellow-400'
                  : 'text-red-400'
              }`}>
                {networkStatus.status === 'healthy' 
                  ? 'Healthy'
                  : networkStatus.status === 'degraded'
                  ? 'Degraded'
                  : 'Issues'
                }
              </span>
            </div>
            <div className="text-xs text-white/40">
              <span>Block {networkStatus.lastBlock}</span>
              <span className="mx-1">•</span>
              <span>{networkStatus.latency}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
