'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Play,
  Search,
  Menu,
  X,
  Radio,
  Calendar,
  Trophy,
  Newspaper,
  Shield,
  Activity
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import SearchModal from './SearchModal';
import { Match, NewsArticle } from '@/types';

interface NavbarProps {
  matches?: Match[];
  news?: NewsArticle[];
}

export default function Navbar({ matches = [], news = [] }: NavbarProps) {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Live Sports', href: '/live', isLive: true },
    { name: 'Cricket', href: '/cricket' },
    { name: 'Football', href: '/football' },
    { name: 'IPL', href: '/ipl' },
    { name: 'ISL', href: '/isl' },
    { name: 'Schedule', href: '/schedule' },
    { name: 'Standings', href: '/standings' },
    { name: 'News', href: '/news' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200 shadow-xs">
        {/* Top utility sub-header for India Sports Fans */}
        <div className="bg-slate-900 text-white text-[11px] py-1 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 font-medium text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                OFFICIAL INDIA BROADCAST HUB
              </span>
              <span className="hidden md:inline text-slate-400">|</span>
              <span className="hidden md:inline text-slate-300">
                Authorized Live Streaming Guides for JioCinema • Star Sports • Sony LIV • FanCode
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-300 font-mono">IST (UTC+05:30)</span>
              <Link
                href="/admin"
                className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px] transition-colors"
                title="Admin Control Panel"
              >
                <Shield className="w-3 h-3" />
                <span className="hidden sm:inline">Admin</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-9 h-9 rounded-lg bg-blue-600 group-hover:bg-blue-700 flex items-center justify-center text-white shadow-md shadow-blue-500/20 transition-all duration-200 group-hover:scale-105">
                  <Play className="w-4 h-4 fill-white translate-x-0.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
                    SPORTWAVE <span className="text-blue-600 dark:text-sky-400">LIVE</span>
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    India&apos;s Sports Hub
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-150 flex items-center gap-1.5 ${
                      isActive
                        ? 'text-blue-600 dark:text-sky-400 bg-blue-50 dark:bg-blue-950/40'
                        : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    {link.isLive && (
                      <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                    )}
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Action Buttons: Search, Theme Toggle, Mobile Menu */}
            <div className="flex items-center gap-2.5">
              {/* Search Trigger Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200/70 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700/60 transition-colors cursor-pointer"
                aria-label="Search matches and sports"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Search...</span>
                <kbd className="hidden sm:inline text-[10px] bg-white dark:bg-slate-900 px-1 py-0.2 rounded border border-slate-300 dark:border-slate-700 font-mono">
                  ⌘K
                </kbd>
              </button>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Mobile Menu Trigger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Category Sub-Nav for Medium screens */}
        <div className="hidden lg:flex xl:hidden px-4 border-t border-slate-100 dark:border-slate-800/60 overflow-x-auto py-2 gap-2 text-xs">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`whitespace-nowrap px-2.5 py-1 rounded-md font-medium ${
                pathname === link.href
                  ? 'bg-blue-50 text-blue-600 font-bold dark:bg-blue-950/40 dark:text-sky-400'
                  : 'text-slate-600 dark:text-slate-400 hover:text-blue-600'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="xl:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-sky-400'
                      : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {link.isLive && <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />}
                    {link.name}
                  </span>
                  {link.isLive && (
                    <span className="text-[10px] bg-red-100 dark:bg-red-950/80 text-red-600 dark:text-red-400 font-bold px-1.5 py-0.5 rounded">
                      LIVE NOW
                    </span>
                  )}
                </Link>
              );
            })}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between px-3">
              <span className="text-xs text-slate-500">Theme</span>
              <ThemeToggle />
            </div>
            <div className="pt-2 px-3">
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-lg"
              >
                <Shield className="w-3.5 h-3.5" />
                Admin Dashboard
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        matches={matches}
        news={news}
      />
    </>
  );
}
