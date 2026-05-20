import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Dive | Scholarship Discovery & Application Readiness",
  description: "The premium roadmap for Nigerian students and creatives to secure global funding. Discover opportunities and prepare your documents with ease.",
};

import { Toaster } from 'sonner';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${jetbrains.variable}`}>
      <body className="antialiased font-sans">
        {children}
        <Toaster 
          position="bottom-right" 
          toastOptions={{
            className: 'font-sans font-medium text-xs rounded-xl shadow-2xl border-slate-100',
          }}
        />
      </body>
    </html>
  );
}

