'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const applyTheme = () => {
      const saved = localStorage.getItem('sportwave-theme');
      if (saved === 'dark') {
        setIsDark(true);
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        setIsDark(false);
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
      }
    };

    applyTheme();

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'sportwave-theme') {
        applyTheme();
      }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('sportwave-theme-change', applyTheme);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('sportwave-theme-change', applyTheme);
    };
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('sportwave-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('sportwave-theme', 'light');
    }
    window.dispatchEvent(new Event('sportwave-theme-change'));
  };

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="p-2 rounded-lg text-slate-500 hover:text-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
      >
        <Sun className="w-4 h-4" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark/light mode"
      title={isDark ? "Switch to White Mode" : "Switch to Dark Stadium Mode"}
      className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-400 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 transition-all duration-200 shadow-xs flex items-center gap-1.5 text-xs font-medium cursor-pointer"
    >
      {isDark ? (
        <>
          <Sun className="w-4 h-4 text-amber-400" />
          <span className="hidden sm:inline">Light</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 text-blue-600" />
          <span className="hidden sm:inline">Dark</span>
        </>
      )}
    </button>
  );
}
