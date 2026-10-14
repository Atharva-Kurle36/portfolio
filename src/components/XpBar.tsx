"use client";

import React from "react";
import { PixelIcon } from "@/components/ui/PixelIcon";

interface XpBarProps {
  progress: number; // 0 to 100
  level: number;
}

export const XpBar: React.FC<XpBarProps> = ({ progress, level }) => {
  return (
    <div className="w-full max-w-lg mx-auto px-2 select-none flex flex-col items-center">
      {/* Top Status Indicators (Hearts & Armor) */}
      <div className="w-full flex justify-between items-center px-1 mb-1 text-[10px] font-minecraft">
        {/* 10 Health Hearts */}
        <div className="flex items-center gap-0.5" title="Health: 20/20">
          {[...Array(10)].map((_, i) => (
            <PixelIcon key={`heart-${i}`} name="heart" size={13} />
          ))}
        </div>

        {/* Level in the middle */}
        <div className="relative -top-1">
          <span
            className="font-minecraft text-sm font-bold text-[#80ff00] drop-shadow-[0_2px_0_#000000]"
            style={{ textShadow: "1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000" }}
          >
            {level}
          </span>
        </div>

        {/* 10 Armor / Shields */}
        <div className="flex items-center gap-0.5" title="Armor: 20/20">
          {[...Array(10)].map((_, i) => (
            <PixelIcon key={`shield-${i}`} name="shield" size={13} />
          ))}
        </div>
      </div>

      {/* Segmented XP Progress Bar */}
      <div className="w-full h-3 bg-[#111111] border-2 border-[#2b2b2b] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] relative overflow-hidden flex items-center">
        {/* Fill */}
        <div
          className="h-full bg-gradient-to-r from-[#22c55e] via-[#84cc16] to-[#a3e635] transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />

        {/* XP Segments dividers */}
        <div className="absolute inset-0 grid grid-cols-10 pointer-events-none">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="border-r border-[#1a1a1a]/80 h-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
