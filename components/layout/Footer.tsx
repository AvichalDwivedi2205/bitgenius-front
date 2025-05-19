'use client';

import { motion } from '../motion';
import Link from 'next/link';

type FooterLinkProps = {
  href: string;
  children: React.ReactNode;
};

const FooterLink = ({ href, children }: FooterLinkProps) => {
  return (
    <li>
      <Link 
        href={href}
        className="text-white/70 hover:text-white transition-colors hover:underline hover:underline-offset-4"
      >
        {children}
      </Link>
    </li>
  );
};

type SocialButtonProps = {
  href: string;
  aria: string;
  children: React.ReactNode;
};

const SocialButton = ({ href, aria, children }: SocialButtonProps) => {
  return (
    <motion.a
      href={href}
      aria-label={aria}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 bg-[#181820] rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-[#13ADC7]/20 transition-all"
      whileHover={{ scale: 1.1, boxShadow: "0 0 10px rgba(19, 173, 199, 0.4)" }}
    >
      {children}
    </motion.a>
  );
};

export default function Footer() {
  return (
    <footer className="bg-[#0B0C0F] border-t border-white/5 pt-12 pb-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#F7931A] to-[#13ADC7] flex items-center justify-center">
                <span className="font-bold text-white">BG</span>
              </div>
              <span className="font-bold text-xl text-white">BitGenius</span>
            </div>
            
            <p className="text-white/70 mb-6 max-w-md">
              A Bitcoin-powered AI agent network for financial sovereignty. Create and deploy smart agents for automated BTC management.
            </p>
            
            <div className="flex gap-4">
              <SocialButton href="https://twitter.com" aria="Twitter">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 5.8a8.5 8.5 0 0 1-2.4.7 4.2 4.2 0 0 0 1.9-2.4c-.9.5-1.8.9-2.8 1a4.3 4.3 0 0 0-7.3 3.9A12 12 0 0 1 2.8 4.3a4.3 4.3 0 0 0 1.3 5.7 4.2 4.2 0 0 1-1.9-.5v.1a4.3 4.3 0 0 0 3.4 4.2 4.2 4.2 0 0 1-1.9 0 4.3 4.3 0 0 0 4 3 8.5 8.5 0 0 1-5.3 1.5 12 12 0 0 0 18.4-10v-.5c.8-.6 1.6-1.4 2.2-2.3" />
                </svg>
              </SocialButton>
              
              <SocialButton href="https://github.com" aria="GitHub">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a10 10 0 0 0-3.2 19.4.5.5 0 0 0 .7-.5v-1.7C6.8 20 6 18 6 18c-.6-1.6-1.5-2-1.5-2-.9-.7 0-.7 0-.7 1 0 1.6 1 1.6 1 .9 1.6 2.4 1.1 3 .9 0-.7.3-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7 0-.3-.4-1.3.1-2.7 0 0 .8-.2 2.7 1a9.4 9.4 0 0 1 5 0c1.8-1.2 2.6-1 2.6-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .3.3.6.9.6 1.8v2.7c0 .3.2.6.7.5A10 10 0 0 0 12 2" />
                </svg>
              </SocialButton>
              
              <SocialButton href="https://discord.com" aria="Discord">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.3 4.4c-1.5-.7-3.1-1.2-4.8-1.5l-.2.5c-1.5-.3-3-.3-4.6 0l-.2-.5A17 17 0 0 0 5.7 4.4a18 18 0 0 0-3.6 14.4 17 17 0 0 0 5.3 2.7l.4-.7c-.7-.3-1.4-.6-2-1l.2-.1c.2 0 .3.1.4.2a12 12 0 0 0 10.4 0l.4-.2c.1 0 0 0 0 0-.7.4-1.3.7-2.1 1l.4.7c1.9-.6 3.7-1.5 5.3-2.7A17.3 17.3 0 0 0 20.3 4.4zM8.8 15.3c-1 0-1.9-.9-1.9-2.1s.8-2.1 1.9-2.1c1.1 0 2 1 1.9 2.1 0 1.2-.8 2.1-1.9 2.1zm6.5 0c-1.1 0-2-.9-2-2.1s.9-2.1 2-2.1c1 0 1.8 1 1.8 2.1 0 1.2-.7 2.1-1.8 2.1z" />
                </svg>
              </SocialButton>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Resources</h4>
            <ul className="space-y-2">
              <FooterLink href="/docs">Documentation</FooterLink>
              <FooterLink href="/api">API</FooterLink>
              <FooterLink href="/whitepaper">Whitepaper</FooterLink>
              <FooterLink href="/faq">FAQ</FooterLink>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Company</h4>
            <ul className="space-y-2">
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/team">Team</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/careers">Careers</FooterLink>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-white/50 text-sm gap-4">
          <p>© 2025 BitGenius. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/terms" className="hover:text-white transition-colors">Terms</a>
            <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
            <a href="/cookies" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
        
        {/* Back to top button */}
        <motion.a
          href="#"
          className="fixed bottom-8 right-8 w-10 h-10 bg-[#F7931A] rounded-full flex items-center justify-center z-30 shadow-lg"
          whileHover={{ y: -3, boxShadow: "0 0 15px rgba(247, 147, 26, 0.5)" }}
          whileTap={{ scale: 0.9 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </motion.a>
      </div>
    </footer>
  );
}
