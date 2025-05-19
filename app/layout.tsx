import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BitGenius | AI Agents for Bitcoin Sovereignty",
  description: "BitGenius is a Bitcoin-powered AI agent network for financial sovereignty. Create and deploy smart agents for automated BTC management.",
  keywords: "Bitcoin, AI agents, automation, bitcoin layer2, financial sovereignty, sBTC, BIP300, exSat, Rebar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0B0C0F] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
