"use client";

import React from "react";

export interface TooltipProps {
  title: string;
  enchantment?: string;
  description?: string;
  category?: string;
  level?: number;
  stats?: string[];
  rarity?: "common" | "rare" | "epic" | "legendary";
  children?: React.ReactNode;
}

export const MinecraftTooltipContent: React.FC<TooltipProps> = ({
  title,
  enchantment,
  description,
  category,
  level,
  stats = [],
  rarity = "common",
}) => {
  const getTitleColor = () => {
    switch (rarity) {
      case "legendary":
        return "text-[#ffaa00]"; // Gold
      case "epic":
        return "text-[#ff55ff]"; // Light Purple
      case "rare":
        return "text-[#55ffff]"; // Aqua / Diamond
      default:
        return "text-[#ffffff]"; // White
    }
  };

  return (
    <div
      className="z-50 pointer-events-none min-w-[200px] max-w-[280px] p-2.5 bg-[#100010]/95 font-minecraft text-xs select-none border-2 border-[#28007f] shadow-[0_0_0_2px_#100010,0_4px_16px_rgba(0,0,0,0.8)]"
      style={{
        boxShadow: "0 0 0 2px #100010, inset 0 0 0 1px #5000af",
      }}
    >
      {/* Title */}
      <div className={`font-bold tracking-wide text-sm mb-1 ${getTitleColor()}`}>
        {title}
      </div>

      {/* Enchantment / Subtitle */}
      {enchantment && (
        <div className="text-[#a855f7] italic tracking-wide mb-1.5 flex items-center gap-1">
          <span className="inline-block w-1.5 h-1.5 bg-[#a855f7] animate-pulse" />
          {enchantment}
        </div>
      )}

      {/* Category */}
      {category && (
        <div className="text-[#55ff55] uppercase text-[10px] tracking-wider mb-1">
          [{category}]
        </div>
      )}

      {/* Description */}
      {description && (
        <p className="text-[#cccccc] font-sans text-xs leading-relaxed my-1.5 border-t border-[#3b0764]/60 pt-1.5">
          {description}
        </p>
      )}

      {/* Skill Level / XP Bar */}
      {level !== undefined && (
        <div className="mt-2 pt-1 border-t border-[#3b0764]/60">
          <div className="flex justify-between items-center text-[10px] mb-1">
            <span className="text-[#aaaaaa]">Proficiency</span>
            <span className="text-[#55ff55] font-bold">{level}%</span>
          </div>
          <div className="h-1.5 bg-[#200520] border border-[#3b0764] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#22c55e] to-[#86efac]"
              style={{ width: `${level}%` }}
            />
          </div>
        </div>
      )}

      {/* Custom Stats list */}
      {stats.length > 0 && (
        <div className="mt-2 space-y-0.5 text-[10px]">
          {stats.map((stat, i) => (
            <div key={i} className="text-[#5555ff]">
              + {stat}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const Tooltip: React.FC<{
  content: TooltipProps;
  children: React.ReactNode;
  position?: "top" | "bottom";
}> = ({ content, children, position = "top" }) => {
  return (
    <div className="relative group inline-block">
      {children}
      <div
        className={`absolute ${
          position === "top"
            ? "bottom-full mb-2 left-1/2 -translate-x-1/2"
            : "top-full mt-2 left-1/2 -translate-x-1/2"
        } opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-150 z-50`}
      >
        <MinecraftTooltipContent {...content} />
      </div>
    </div>
  );
};
