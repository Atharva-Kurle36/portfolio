"use client";

import React, { useState, useEffect } from "react";
import { LoadingScreen } from "@/components/LoadingScreen";
import { TitleScreen } from "@/components/TitleScreen";
import { AboutBook } from "@/components/AboutBook";
import { Inventory } from "@/components/Inventory";
import { WorldSelect } from "@/components/WorldSelect";
import { AdvancementTree } from "@/components/AdvancementTree";
import { ServerList } from "@/components/ServerList";
import { Hotbar, HotbarSlot } from "@/components/Hotbar";
import { XpBar } from "@/components/XpBar";
import { ConfettiEasterEgg } from "@/components/ConfettiEasterEgg";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useKeyboardHotbar } from "@/hooks/useKeyboardHotbar";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export default function Home() {
  const [isEntered, setIsEntered] = useState(false);
  const [totemActive, setTotemActive] = useState(false);
  const { scrollPercent, level, currentSection } = useScrollProgress();
  const { isMuted, toggleMute, playLevelUp } = useSoundEffects();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleEnter = (sectionId: string = "about") => {
    setIsEntered(true);
    playLevelUp();
    setTimeout(() => {
      scrollToSection(sectionId);
    }, 150);
  };

  // Map section name to slot index
  const sectionToSlotIndex: Record<string, number> = {
    hero: 0,
    about: 1,
    skills: 2,
    projects: 3,
    timeline: 4,
    contact: 5,
  };

  const currentSlotIndex = sectionToSlotIndex[currentSection] ?? 0;

  const { activeSlot, selectSlot } = useKeyboardHotbar(currentSlotIndex, (slot) => {
    switch (slot) {
      case 0:
        scrollToSection("hero");
        break;
      case 1:
        scrollToSection("about");
        break;
      case 2:
        scrollToSection("skills");
        break;
      case 3:
        scrollToSection("projects");
        break;
      case 4:
        scrollToSection("timeline");
        break;
      case 5:
        scrollToSection("contact");
        break;
      case 6:
        setTotemActive(true);
        break;
      case 7:
        toggleMute();
        break;
      case 8:
        window.scrollTo({ top: 0, behavior: "smooth" });
        break;
      default:
        break;
    }
  });

  // Keep active slot synced with current scroll section if within the first 6 slots
  useEffect(() => {
    if (activeSlot < 6 && sectionToSlotIndex[currentSection] !== undefined) {
      selectSlot(sectionToSlotIndex[currentSection]);
    }
  }, [currentSection]); // eslint-disable-line react-hooks/exhaustive-deps

  const hotbarSlots: HotbarSlot[] = [
    {
      id: "spawn",
      name: "Compass [1]",
      icon: "compass",
      tooltip: "Title Screen / Spawn",
      action: () => scrollToSection("hero"),
    },
    {
      id: "about",
      name: "Book & Quill [2]",
      icon: "book",
      tooltip: "About Atharva's Journey",
      action: () => scrollToSection("about"),
    },
    {
      id: "skills",
      name: "Crafting Grid [3]",
      icon: "crafting-table",
      tooltip: "Inventory & Skills",
      action: () => scrollToSection("skills"),
    },
    {
      id: "projects",
      name: "Pickaxe [4]",
      icon: "pickaxe",
      tooltip: "World Select (Projects)",
      action: () => scrollToSection("projects"),
    },
    {
      id: "timeline",
      name: "Beacon [5]",
      icon: "beacon",
      tooltip: "Advancement Milestones",
      action: () => scrollToSection("timeline"),
    },
    {
      id: "contact",
      name: "Server List [6]",
      icon: "server",
      tooltip: "Multiplayer Realms & Contact",
      action: () => scrollToSection("contact"),
    },
    {
      id: "easter-egg",
      name: "Totem of Undying [7]",
      icon: "totem",
      tooltip: "Activate Resurrection Easter Egg!",
      action: () => setTotemActive(true),
    },
    {
      id: "audio",
      name: isMuted ? "Unmute [8]" : "Mute [8]",
      icon: isMuted ? "speaker-muted" : "speaker",
      tooltip: isMuted ? "Turn Sound FX ON" : "Turn Sound FX OFF",
      action: toggleMute,
    },
    {
      id: "clock",
      name: "Clock [9]",
      icon: "clock",
      tooltip: "Teleport to Spawn (Top)",
      action: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    },
  ];

  return (
    <main
      className={`relative text-[#f4f4f5] bg-[#121316] ${
        isEntered ? "min-h-screen overflow-x-hidden" : "h-screen overflow-hidden"
      }`}
    >
      {/* 1. Loading Screen */}
      <LoadingScreen />

      {/* 2. Title Screen (Hero) */}
      <TitleScreen
        onEnter={handleEnter}
        onNavigate={scrollToSection}
        onTriggerTotem={() => setTotemActive(true)}
        isEntered={isEntered}
      />

      {/* Everything below is only visible after clicking Enter */}
      {isEntered && (
        <div className="animate-fadeIn">
          {/* 3. About Book & Quill */}
          <AboutBook />

          {/* 4. Skills & Crafting Inventory */}
          <Inventory />

          {/* 5. World Select (Projects) */}
          <WorldSelect />

          {/* 6. Advancement Tree (Timeline) */}
          <AdvancementTree />

          {/* 7. Server List (Multiplayer Contact) */}
          <ServerList />

          {/* Footer info */}
          <footer className="py-16 pb-36 text-center text-xs font-minecraft text-[#71717a] select-none border-t border-[#27272a] bg-[#0c0d0f]">
            <div className="max-w-md mx-auto px-4 space-y-2">
              <div className="text-[#a1a1aa]">
                ATHARVA KURLE • MUMBAI, INDIA
              </div>
              <div className="text-[10px] text-[#52525b]">
                Crafted with Next.js App Router, React 19, TypeScript & Tailwind CSS.
              </div>
              <div className="text-[9px] text-[#3f3f46]">
                Zero copyrighted Mojang assets used. All vector icons & shaders custom designed.
              </div>
            </div>
          </footer>

          {/* Bottom Sticky UI: XP Bar + 9-slot Hotbar */}
          <div className="fixed bottom-0 left-0 right-0 z-40 pb-2 pointer-events-none">
            <div className="pointer-events-auto">
              <XpBar progress={scrollPercent} level={level} />
            </div>
            <div className="pointer-events-auto mt-1">
              <Hotbar
                activeSlot={activeSlot}
                onSelectSlot={selectSlot}
                slots={hotbarSlots}
              />
            </div>
          </div>
        </div>
      )}

      {/* Easter Egg Totem Animation */}
      <ConfettiEasterEgg
        active={totemActive}
        onComplete={() => setTotemActive(false)}
      />
    </main>
  );
}
