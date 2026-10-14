"use client";

import React from "react";
import { PixelIcon } from "@/components/ui/PixelIcon";
import { IconName } from "@/types";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export interface HotbarSlot {
  id: string;
  name: string;
  icon: IconName | "speaker" | "speaker-muted" | "clock";
  tooltip: string;
  action: () => void;
}

interface HotbarProps {
  activeSlot: number;
  onSelectSlot: (index: number) => void;
  slots: HotbarSlot[];
}

export const Hotbar: React.FC<HotbarProps> = ({
  activeSlot,
  onSelectSlot,
  slots,
}) => {
  const { playPop } = useSoundEffects();

  const handleSlotClick = (index: number, slot: HotbarSlot) => {
    playPop();
    onSelectSlot(index);
    slot.action();
  };

  return (
    <nav
      aria-label="Minecraft Hotbar Quick Navigation"
      className="fixed bottom-2 left-1/2 -translate-x-1/2 z-40 px-2 py-1 max-w-full select-none"
    >
      <div className="flex items-center gap-1 sm:gap-1.5 p-1 bg-[#1a1b1e]/90 backdrop-blur-sm border-2 sm:border-4 border-[#3a3b42] shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
        {slots.map((slot, index) => {
          const isActive = activeSlot === index;

          return (
            <div key={slot.id} className="relative group">
              <button
                type="button"
                onClick={() => handleSlotClick(index, slot)}
                aria-label={`Hotbar slot ${index + 1}: ${slot.name}`}
                className={`
                  relative flex items-center justify-center
                  w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12
                  transition-all cursor-pointer outline-none
                  ${
                    isActive
                      ? "bg-[#8b8b8b] border-2 sm:border-3 border-white shadow-[0_0_8px_rgba(255,255,255,0.7)] scale-105 z-10"
                      : "bg-[#555555] hover:bg-[#6e6e6e] border-t-2 border-l-2 border-[#373737] border-b-2 border-r-2 border-[#777777] active:translate-y-[1px]"
                  }
                  focus-visible:ring-2 focus-visible:ring-[#ffff55]
                `}
              >
                {/* Hotbar slot number */}
                <span
                  className="absolute top-0.5 left-1 font-minecraft text-[8px] sm:text-[9px] text-[#cccccc] pointer-events-none"
                  style={{ textShadow: "1px 1px 0 #000" }}
                >
                  {index + 1}
                </span>

                {/* Pixel Icon */}
                <PixelIcon
                  name={slot.icon}
                  size={20}
                  className="pointer-events-none transform transition-transform group-hover:scale-110"
                />
              </button>

              {/* Hover Tooltip */}
              <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pointer-events-none z-50">
                <div
                  className="bg-[#100010]/95 px-2.5 py-1 border border-[#28007f] shadow-[0_0_0_1px_#100010] text-center whitespace-nowrap"
                  style={{ boxShadow: "0 0 0 1px #100010, inset 0 0 0 1px #5000af" }}
                >
                  <div className="font-minecraft text-xs text-[#ffff55] tracking-wide">
                    {slot.name}
                  </div>
                  <div className="font-sans text-[10px] text-[#aaaaaa]">
                    {slot.tooltip}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </nav>
  );
};
