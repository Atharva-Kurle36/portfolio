"use client";

import React from "react";
import { PortfolioView } from "@/components/SelectionHub";
import { PixelIcon } from "@/components/ui/PixelIcon";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface TopNavBarProps {
  currentView: PortfolioView;
  onSelectView: (view: PortfolioView) => void;
  onBackToTitle: () => void;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  currentView,
  onSelectView,
  onBackToTitle,
}) => {
  const { playClick, playPop, isMuted, toggleMute } = useSoundEffects();

  const tabs: { id: PortfolioView; label: string; icon: "book" | "crafting-table" | "pickaxe" | "beacon" | "server" }[] = [
    { id: "about", label: "About", icon: "book" },
    { id: "skills", label: "Skills", icon: "crafting-table" },
    { id: "projects", label: "Projects", icon: "pickaxe" },
    { id: "timeline", label: "Timeline", icon: "beacon" },
    { id: "contact", label: "Contact", icon: "server" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#121316]/95 backdrop-blur-xs border-b-2 border-[#2b2d35] px-3 py-2 select-none">
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: Back Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => {
              playClick();
              onBackToTitle();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 font-minecraft text-[10px] bg-[#27282e] hover:bg-[#35363e] text-white border border-[#434653] active:translate-y-[1px] cursor-pointer"
          >
            <PixelIcon name="arrow-left" size={12} />
            <span>Title Screen</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playPop();
              onSelectView("hub");
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 font-minecraft text-[10px] bg-[#27282e] hover:bg-[#35363e] text-[#ffff55] border border-[#434653] active:translate-y-[1px] cursor-pointer"
          >
            <PixelIcon name="compass" size={12} />
            <span>Select View</span>
          </button>
        </div>

        {/* Center: Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto py-0.5">
          {tabs.map((tab) => {
            const isActive = currentView === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  playPop();
                  onSelectView(tab.id);
                }}
                className={`
                  flex items-center gap-1.5 px-2.5 py-1 font-minecraft text-[10px] cursor-pointer transition-all
                  ${
                    isActive
                      ? "bg-[#22c55e] text-white border-b-2 border-white font-bold shadow-[0_0_8px_rgba(34,197,94,0.5)]"
                      : "bg-[#1c1d22] hover:bg-[#282a32] text-[#aaaaaa] border border-transparent"
                  }
                `}
              >
                <PixelIcon name={tab.icon} size={14} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Sound toggle */}
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          className="flex items-center gap-1 px-2 py-1 font-minecraft text-[10px] bg-[#27282e] hover:bg-[#35363e] text-[#cccccc] border border-[#434653] cursor-pointer"
        >
          <PixelIcon name={isMuted ? "speaker-muted" : "speaker"} size={14} />
          <span className="hidden md:inline">{isMuted ? "Sound: OFF" : "Sound: ON"}</span>
        </button>
      </div>
    </header>
  );
};
