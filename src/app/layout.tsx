import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { GeistSans } from 'geist/font/sans';
import { Bot, GithubIcon } from 'lucide-react';
import HeaderWithBlurText from '@/components/header-with-blur-text';

export const metadata: Metadata = {
  title: '智视未来 - 机器人评估平台',
  description: '智视未来 - 洞察评估未来的机器人评估平台',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={GeistSans.variable}>
      <head>
        <link rel="canonical" href="https://zhishiweilai.com" />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <HeaderWithBlurText />
        
        <main className="flex-grow">
          {children}
        </main>
        
        <footer className="bg-slate-100 py-1 px-4 text-center text-sm text-slate-600">
          <div className="container mx-auto">
            <p className="flex items-center justify-center gap-1">
              <Bot className="h-4 w-4" /> 智视未来 © 2025 | 
              <a 
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center hover:text-slate-900 transition-colors"
              >
                <span className="font-medium">CC BY-NC-SA 4.0</span>
              </a> | 
              <a 
                href="https://github.com/xuconghu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center hover:text-slate-900 transition-colors ml-1"
              >
                <GithubIcon className="h-4 w-4 mr-1" />
                <span className="font-medium">xuconghu</span>
              </a>
            </p>
          </div>
        </footer>
        
        <Toaster />
      </body>
    </html>
  );
}
