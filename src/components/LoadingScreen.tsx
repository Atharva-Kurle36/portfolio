"use client";

import React, { useEffect, useState } from "react";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface LoadingScreenProps {
  onComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phaseText, setPhaseText] = useState("Generating chunks...");
  const [isFading, setIsFading] = useState(false);
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      return !sessionStorage.getItem("mc_loaded_once");
    } catch {
      return true;
    }
  });
  const { playLevelUp } = useSoundEffects();

  const tips = [
    "Tip: Atharva writes clean TypeScript before morning chai.",
    "Tip: Use number keys [1 - 9] on your keyboard to navigate the Hotbar!",
    "Tip: Never dig straight down into unhandled promise rejections.",
    "Tip: Your XP level climbs as you explore deeper down the page.",
    "Tip: Hover over inventory items to inspect enchantments and lore.",
  ];

  useEffect(() => {
    if (!isVisible) {
      onComplete?.();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = Math.floor(Math.random() * 12) + 6;
        const next = Math.min(100, prev + increment);

        if (next > 30 && next <= 65) {
          setPhaseText("Building terrain...");
        } else if (next > 65 && next < 100) {
          setPhaseText("Loading Atharva's worlds & skills...");
        } else if (next >= 100) {
          setPhaseText("Done! Entering world...");
        }

        return next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [isVisible, onComplete]);

  useEffect(() => {
    if (progress >= 100) {
      try {
        playLevelUp();
        sessionStorage.setItem("mc_loaded_once", "true");
      } catch {
        // ignore
      }

      const timer = setTimeout(() => {
        setIsFading(true);
        setTimeout(() => {
          setIsVisible(false);
          onComplete?.();
        }, 500);
      }, 350);

      return () => clearTimeout(timer);
    }
  }, [progress, playLevelUp, onComplete]);

  const handleSkip = () => {
    setIsFading(true);
    setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("mc_loaded_once", "true");
      onComplete?.();
    }, 200);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 select-none transition-opacity duration-500 bg-dirt-pattern ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="max-w-md w-full bg-[#1b1c20]/90 p-6 md:p-8 border-4 border-[#3a3b42] shadow-[0_0_0_4px_#000000] text-center">
        {/* Dirt Icon / Logo Header */}
        <div className="text-xl md:text-2xl font-minecraft text-[#ffff55] mb-2 tracking-wider" style={{ textShadow: "2px 2px 0px #000" }}>
          ATHARVA KURLE
        </div>
        <div className="text-xs font-minecraft text-[#aaaaaa] mb-6 tracking-wide">
          v2.4.0 (Software Engineering Student)
        </div>

        {/* Status text */}
        <div className="font-minecraft text-sm text-white mb-3 tracking-wide" style={{ textShadow: "2px 2px 0px #000" }}>
          {phaseText}
        </div>

        {/* Minecraft Beveled Progress Bar */}
        <div className="w-full h-7 bg-[#0d0e11] border-2 border-[#373737] p-0.5 shadow-inner relative overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-[#22c55e] via-[#4ade80] to-[#86efac] border-t-2 border-l-2 border-[#bbf7d0] border-b-2 border-r-2 border-[#15803d] transition-all duration-150 relative"
            style={{ width: `${progress}%` }}
          >
            {/* Striped pixel pattern */}
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.4)_25%,rgba(0,0,0,0.4)_50%,transparent_50%,transparent_75%,rgba(0,0,0,0.4)_75%)] bg-[length:16px_16px]" />
          </div>
          <span
            className="absolute inset-0 flex items-center justify-center font-minecraft text-xs text-white"
            style={{ textShadow: "1px 1px 0px #000" }}
          >
            {progress}%
          </span>
        </div>

        {/* Tip */}
        <p className="font-sans text-xs text-[#a3a3a3] italic mb-6 min-h-[32px]">
          {tips[Math.floor(progress / 25) % tips.length]}
        </p>

        {/* Skip button */}
        <button
          type="button"
          onClick={handleSkip}
          className="font-minecraft text-xs uppercase px-4 py-2 bg-[#4a4a4a] hover:bg-[#606060] text-white border-t-2 border-l-2 border-[#808080] border-b-2 border-r-2 border-[#202020] active:translate-y-[1px] cursor-pointer"
        >
          Skip Loading
        </button>
      </div>
    </div>
  );
};
