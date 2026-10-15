"use client";

import React, { useState, useEffect } from "react";
import { MinecraftButton } from "@/components/ui/MinecraftButton";
import { PixelIcon } from "@/components/ui/PixelIcon";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface TitleScreenProps {
  onEnter: (sectionId?: string) => void;
  onNavigate: (sectionId: string) => void;
  onTriggerTotem?: () => void;
  isEntered?: boolean;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  onEnter,
  onNavigate,
  onTriggerTotem,
  isEntered = false,
}) => {
  const [splashIndex, setSplashIndex] = useState(0);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [isNight, setIsNight] = useState<boolean>(false);
  const [showTimeToast, setShowTimeToast] = useState<boolean>(false);
  const { playPop, playClick, isMuted, toggleMute } = useSoundEffects();

  useEffect(() => {
    try {
      const saved = localStorage.getItem("mc_time_of_day");
      if (saved === "night") {
        setIsNight(true);
      }
    } catch {
      // safe fallback
    }
  }, []);

  const handleToggleNight = () => {
    playClick();
    setIsNight((prev) => {
      const nextVal = !prev;
      try {
        localStorage.setItem("mc_time_of_day", nextVal ? "night" : "day");
      } catch {
        // safe fallback
      }
      return nextVal;
    });
    setShowTimeToast(true);
    setTimeout(() => setShowTimeToast(false), 2400);
  };

  const splashes = [
    "It came from space.",
    "It came from Mumbai.",
    "Also try C++ & Linux!",
    "Crafting clean code!",
    "Now with 100% more chai!",
    "100% bug-free (tested on localhost)!",
    "Press [1-9] on your keyboard!",
    "Never dig straight down!",
    "Efficiency V on algorithms!",
  ];

  const handleSplashClick = () => {
    playPop();
    setSplashIndex((prev) => (prev + 1) % splashes.length);
  };

  const handleOptionsClick = () => {
    playClick();
    setShowOptionsModal(true);
  };

  const handleQuitClick = () => {
    playClick();
    setShowQuitModal(true);
  };

  return (
    <section
      id="hero"
      aria-label="Title Screen Hero"
      className="relative min-h-screen w-full flex flex-col justify-between items-center select-none overflow-hidden bg-black"
    >
      {/* Background Panorama - Layer 1: Sunrise / Sunset Panorama */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out pointer-events-none"
        style={{
          backgroundImage: "url('/images/minecraft_sunset_panorama.jpg')",
          imageRendering: "pixelated",
          opacity: isNight ? 0 : 1,
          willChange: "opacity",
          transform: "translateZ(0)",
        }}
      >
        {/* Warm sunrise/sunset golden vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-amber-950/15 to-black/30 pointer-events-none" />
      </div>

      {/* Background Panorama - Layer 2: Night Panorama with Moon, Stars & Illuminated Village */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out pointer-events-none"
        style={{
          backgroundImage: "url('/images/minecraft_night_panorama.jpg')",
          imageRendering: "pixelated",
          opacity: isNight ? 1 : 0,
          willChange: "opacity",
          transform: "translateZ(0)",
        }}
      >
        {/* Midnight indigo vignette & soft starlight */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-indigo-950/25 to-black/40 pointer-events-none" />
      </div>

      {/* Top Controls: Night Mode Toggle */}
      <div className="absolute top-4 right-4 z-30 flex flex-col items-end gap-1.5">
        <button
          type="button"
          onClick={handleToggleNight}
          aria-label={isNight ? "Switch to Sunrise / Day Mode" : "Switch to Night Mode"}
          title={isNight ? "Click to set time to Sunrise / Day" : "Click to set time to Sunset / Night"}
          className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#2a2b33]/90 hover:bg-[#393b47] active:bg-[#1a1b20] border-2 border-t-[#ffffff] border-l-[#ffffff] border-b-[#111111] border-r-[#111111] active:border-t-[#111111] active:border-l-[#111111] active:border-b-[#ffffff] active:border-r-[#ffffff] flex items-center gap-2 font-minecraft text-xs sm:text-sm text-white shadow-[0_4px_16px_rgba(0,0,0,0.85)] cursor-pointer transition-all backdrop-blur-xs group"
        >
          <PixelIcon
            name={isNight ? "moon" : "sun"}
            size={18}
            className="transform group-hover:rotate-12 transition-transform drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]"
          />
          <span className="text-[#ffff55] drop-shadow-[1px_1px_0_#000] font-bold">
            {isNight ? "Night Mode" : "Day Mode"}
          </span>
          <span className="text-[10px] text-[#4ade80] font-bold">
            [{isNight ? "NIGHT" : "DAY"}]
          </span>
        </button>

        {/* Chat Toast for Time Command (Minecraft Style) */}
        {showTimeToast && (
          <div className="bg-[#101010]/95 border-2 border-[#555555] px-3 py-1 text-[11px] font-minecraft text-white shadow-xl animate-fade-in flex items-center gap-2">
            <span className="text-[#55ff55]">/time set</span>
            <span className="text-[#ffff55]">{isNight ? "night (13000)" : "day (1000)"}</span>
          </div>
        )}
      </div>

      {/* Top Spacer */}
      <div className="w-full pt-8 sm:pt-12 z-10 flex flex-col items-center">
        {/* 3D Minecraft Logo matching Reference Image */}
        <div className="relative inline-block mt-4 sm:mt-8">
          {/* Main 3D Title */}
          <div className="relative">
            <h1
              className="font-minecraft text-4xl sm:text-6xl md:text-7xl font-black tracking-widest text-[#d8d8d8] uppercase"
              style={{
                textShadow: `
                  0px 1px 0px #9e9e9e,
                  0px 2px 0px #828282,
                  0px 3px 0px #6e6e6e,
                  0px 4px 0px #595959,
                  0px 5px 0px #424242,
                  0px 6px 0px #2e2e2e,
                  0px 7px 0px #1a1a1a,
                  0px 8px 0px #000000,
                  -2px -2px 0 #ffffff,
                  2px -2px 0 #ffffff,
                  -2px 2px 0 #000000,
                  2px 2px 0 #000000,
                  0 10px 15px rgba(0, 0, 0, 0.8)
                `,
                letterSpacing: "0.15em",
              }}
            >
              ATHARVA
            </h1>

            {/* Black Sub-Banner "STUDENT EDITION" (like "JAVA EDITION" in reference image) */}
            <div className="flex justify-center -mt-1 sm:-mt-2">
              <div
                className="bg-[#0b0c0e] px-4 py-0.5 border-2 border-[#3a3b42] shadow-[0_4px_10px_rgba(0,0,0,0.8)] inline-block transform -skew-x-6"
                style={{
                  boxShadow: "0 0 0 1px #000, inset 0 0 0 1px #222",
                }}
              >
                <span
                  className="font-minecraft text-xs sm:text-base font-bold text-white tracking-[0.25em] uppercase drop-shadow-[0_2px_0_#000]"
                  style={{ textShadow: "1px 1px 0 #000" }}
                >
                  STUDENT EDITION
                </span>
              </div>
            </div>
          </div>

          {/* Yellow Bouncing Splash Text at the Bottom-Right of the Logo */}
          <button
            type="button"
            onClick={handleSplashClick}
            aria-label="Change splash text"
            title="Click to cycle splash text!"
            className="absolute -bottom-8 -right-6 sm:-right-16 md:-right-24 transform -rotate-15 hover:scale-110 active:scale-95 transition-transform cursor-pointer group z-20"
          >
            <span
              className="inline-block font-minecraft text-xs sm:text-sm md:text-base text-[#ffff55] font-bold tracking-wide animate-bounce px-2 py-0.5"
              style={{
                textShadow: "2px 2px 0 #3f3f00, 3px 3px 0 #1f1f00",
              }}
            >
              {splashes[splashIndex]}
            </span>
          </button>
        </div>
      </div>

      {/* Main Minecraft Menu Buttons matching Reference Image */}
      <div className="z-10 w-full max-w-[420px] px-4 flex flex-col gap-2.5 my-auto pb-8">
        {/* Button 0: Dedicated ENTER Button */}
        <MinecraftButton
          fullWidth
          size="lg"
          variant="primary"
          onClick={() => onEnter("hub")}
          className="shadow-[0_0_12px_rgba(34,197,94,0.6)]"
        >
          <span className="flex items-center justify-center gap-2">
            <span className="text-[#ffff55]">▶</span>
            <span>{isEntered ? "Enter World (Explore)" : "Enter World"}</span>
          </span>
        </MinecraftButton>

        {/* Button 1: Singleplayer */}
        <MinecraftButton
          fullWidth
          size="lg"
          variant="default"
          onClick={() => onEnter("projects")}
        >
          Singleplayer
        </MinecraftButton>

        {/* Button 2: Multiplayer */}
        <MinecraftButton
          fullWidth
          size="lg"
          variant="default"
          onClick={() => onEnter("contact")}
        >
          Multiplayer
        </MinecraftButton>

        {/* Button 3: Minecraft Realms (Atharva's Realms / About & Journal) */}
        <MinecraftButton
          fullWidth
          size="lg"
          variant="default"
          onClick={() => onEnter("about")}
        >
          Atharva&apos;s Realms
        </MinecraftButton>

        {/* Split Row matching the Reference Image: [Globe] [Options...] [Quit Game] [Accessibility] */}
        <div className="flex items-center gap-2">
          {/* Globe Button (Square) */}
          <button
            type="button"
            onClick={() => onEnter("skills")}
            aria-label="Language & Skills"
            title="Inventory & Skills"
            className="w-12 h-11 bg-[#7c7c7c] hover:bg-[#8e8e8e] border-t-2 border-l-2 border-[#ffffff] border-b-2 border-r-2 border-[#2b2b2b] active:border-t-[#2b2b2b] active:border-l-[#2b2b2b] active:border-b-[#ffffff] active:border-r-[#ffffff] flex items-center justify-center cursor-pointer shadow-[inset_0_0_0_1px_rgba(0,0,0,0.5)] shrink-0"
          >
            <PixelIcon name="globe" size={20} />
          </button>

          {/* Options... Button */}
          <MinecraftButton
            size="md"
            className="flex-1"
            onClick={handleOptionsClick}
          >
            Options...
          </MinecraftButton>

          {/* Quit Game Button */}
          <MinecraftButton
            size="md"
            className="flex-1"
            onClick={handleQuitClick}
          >
            Quit Game
          </MinecraftButton>

          {/* Accessibility / Player Totem Button (Square) */}
          <button
            type="button"
            onClick={() => {
              playClick();
              if (onTriggerTotem) {
                onTriggerTotem();
              } else {
                onNavigate("timeline");
              }
            }}
            aria-label="Accessibility & Totem"
            title="Resurrection Easter Egg & Advancements"
            className="w-12 h-11 bg-[#7c7c7c] hover:bg-[#8e8e8e] border-t-2 border-l-2 border-[#ffffff] border-b-2 border-r-2 border-[#2b2b2b] active:border-t-[#2b2b2b] active:border-l-[#2b2b2b] active:border-b-[#ffffff] active:border-r-[#ffffff] flex items-center justify-center cursor-pointer shadow-[inset_0_0_0_1px_rgba(0,0,0,0.5)] shrink-0"
          >
            <PixelIcon name="accessibility" size={20} />
          </button>
        </div>
      </div>

      {/* Bottom Corner Labels matching Reference Image: "Minecraft 1.20.1" and "Copyright Mojang AB..." */}
      <div className="z-10 w-full px-3 py-2 flex flex-col sm:flex-row justify-between items-center text-[10px] sm:text-xs font-minecraft text-white select-none">
        <div
          className="tracking-wider"
          style={{ textShadow: "1px 1px 0 #000, 2px 2px 0 #000" }}
        >
          Atharva 1.0 (SE Student)
        </div>
        <div
          className="tracking-wider text-right"
          style={{ textShadow: "1px 1px 0 #000, 2px 2px 0 #000" }}
        >
          Crafted by Atharva Kurle • Mumbai, India
        </div>
      </div>

      {/* Options Dialog Modal */}
      {showOptionsModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
          onClick={() => setShowOptionsModal(false)}
        >
          <div
            className="w-full max-w-md bg-[#c6c6c6] p-6 border-4 border-[#ffffff] border-b-4 border-r-4 border-b-[#555555] border-r-[#555555] shadow-2xl relative text-[#222222]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="font-minecraft text-base font-bold text-center mb-6 text-[#1f2937]">
              Game Options
            </div>

            <div className="space-y-3 font-minecraft text-xs">
              <div className="flex justify-between items-center p-2 bg-[#8b8b8b] border-2 border-t-[#373737] border-l-[#373737] border-b-[#ffffff] border-r-[#ffffff] text-white">
                <span>Sound FX:</span>
                <button
                  type="button"
                  onClick={toggleMute}
                  className="px-3 py-1 bg-[#555555] border border-white hover:bg-[#666666] cursor-pointer"
                >
                  {isMuted ? "OFF" : "ON (100%)"}
                </button>
              </div>

              <div className="flex justify-between items-center p-2 bg-[#8b8b8b] border-2 border-t-[#373737] border-l-[#373737] border-b-[#ffffff] border-r-[#ffffff] text-white">
                <span className="flex items-center gap-1.5">
                  <PixelIcon name={isNight ? "moon" : "sun"} size={14} />
                  <span>Time of Day:</span>
                </span>
                <button
                  type="button"
                  onClick={handleToggleNight}
                  className="px-3 py-1 bg-[#555555] border border-white hover:bg-[#666666] cursor-pointer text-[#ffff55] font-bold"
                >
                  {isNight ? "NIGHT (Sunset)" : "DAY (Sunrise)"}
                </button>
              </div>

              <div className="flex justify-between items-center p-2 bg-[#8b8b8b] border-2 border-t-[#373737] border-l-[#373737] border-b-[#ffffff] border-r-[#ffffff] text-white">
                <span>Difficulty:</span>
                <span className="text-[#f87171] font-bold">Hardcore</span>
              </div>

              <div className="flex justify-between items-center p-2 bg-[#8b8b8b] border-2 border-t-[#373737] border-l-[#373737] border-b-[#ffffff] border-r-[#ffffff] text-white">
                <span>Location:</span>
                <span>Mumbai, IN</span>
              </div>

              <div className="flex justify-between items-center p-2 bg-[#8b8b8b] border-2 border-t-[#373737] border-l-[#373737] border-b-[#ffffff] border-r-[#ffffff] text-white">
                <span>Major:</span>
                <span className="text-[#38bdf8]">Software Engineering</span>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <MinecraftButton
                size="md"
                variant="default"
                onClick={() => setShowOptionsModal(false)}
              >
                Done
              </MinecraftButton>
            </div>
          </div>
        </div>
      )}

      {/* Quit Game Confirmation Modal */}
      {showQuitModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
          onClick={() => setShowQuitModal(false)}
        >
          <div
            className="w-full max-w-md bg-[#c6c6c6] p-6 border-4 border-[#ffffff] border-b-4 border-r-4 border-b-[#555555] border-r-[#555555] shadow-2xl relative text-[#222222] text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="font-minecraft text-sm font-bold text-[#1f2937] mb-3">
              Leaving Already?
            </div>
            <p className="font-sans text-xs text-[#374151] mb-6">
              You can never really quit crafting clean software! Would you like to explore Atharva&apos;s worlds or connect on GitHub instead?
            </p>

            <div className="flex justify-center gap-3">
              <MinecraftButton
                size="sm"
                variant="primary"
                onClick={() => {
                  setShowQuitModal(false);
                  onNavigate("projects");
                }}
              >
                View Worlds
              </MinecraftButton>

              <MinecraftButton
                size="sm"
                variant="dark"
                onClick={() => setShowQuitModal(false)}
              >
                Stay Here
              </MinecraftButton>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
