'use client';

import React from 'react';
import { Info } from 'lucide-react';

interface AdSlotProps {
  slotId?: string;
  format?: 'leaderboard' | 'banner' | 'rectangle' | 'sidebar' | 'in-article';
  className?: string;
  label?: string;
}

export default function AdSlot({
  slotId = 'default-slot',
  format = 'banner',
  className = '',
  label = 'ADVERTISEMENT'
}: AdSlotProps) {
  // Format configurations
  const formatStyles: Record<string, { height: string; width: string; iabName: string }> = {
    leaderboard: { height: 'min-h-[90px] sm:min-h-[90px]', width: 'max-w-[728px] lg:max-w-[970px]', iabName: 'Leaderboard (728x90 / 970x90)' },
    banner: { height: 'min-h-[90px] sm:min-h-[100px]', width: 'max-w-4xl', iabName: 'Content Banner (Responsive)' },
    rectangle: { height: 'min-h-[250px]', width: 'w-[300px] sm:w-[336px]', iabName: 'Medium Rectangle (300x250)' },
    sidebar: { height: 'min-h-[600px]', width: 'w-[300px]', iabName: 'Half Page Skyscraper (300x600)' },
    'in-article': { height: 'min-h-[120px]', width: 'max-w-3xl', iabName: 'In-Article Responsive Ad' }
  };

  const currentConfig = formatStyles[format] || formatStyles.banner;

  return (
    <div
      className={`my-6 mx-auto flex flex-col items-center justify-center p-2 ad-slot-container ${className}`}
      aria-label="Advertising Placement"
    >
      {/* Policy compliant distinct label */}
      <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 mb-1.5 select-none">
        <Info className="w-3 h-3 text-slate-400 dark:text-slate-500" />
        <span>{label}</span>
      </div>

      {/* Visually distinct Ad Container */}
      <div
        className={`w-full ${currentConfig.width} ${currentConfig.height} bg-slate-50 dark:bg-slate-900/60 border border-dashed border-slate-300 dark:border-slate-800 rounded-lg flex flex-col items-center justify-center p-4 text-center transition-all duration-150 hover:border-slate-400 relative overflow-hidden`}
      >
        <div className="text-slate-400 dark:text-slate-500 text-xs font-medium space-y-1">
          <p className="font-semibold text-slate-500 dark:text-slate-400">Google AdSense Partner Placement</p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500">{currentConfig.iabName}</p>
          <p className="text-[10px] text-slate-400/80 dark:text-slate-600">Reserved for verified publisher code (Slot ID: {slotId})</p>
        </div>

        {/* Decorative corner accents showing compliant boundary */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-slate-300 dark:border-slate-700" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-slate-300 dark:border-slate-700" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-slate-300 dark:border-slate-700" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-slate-300 dark:border-slate-700" />
      </div>
    </div>
  );
}
