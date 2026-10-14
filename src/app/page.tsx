"use client";

import React, { useState } from "react";
import { LoadingScreen } from "@/components/LoadingScreen";
import { TitleScreen } from "@/components/TitleScreen";
import { SelectionHub, PortfolioView } from "@/components/SelectionHub";
import { TopNavBar } from "@/components/TopNavBar";
import { AboutBook } from "@/components/AboutBook";
import { Inventory } from "@/components/Inventory";
import { WorldSelect } from "@/components/WorldSelect";
import { AdvancementTree } from "@/components/AdvancementTree";
import { ServerList } from "@/components/ServerList";
import { Hotbar, HotbarSlot } from "@/components/Hotbar";
import { XpBar } from "@/components/XpBar";
import { ConfettiEasterEgg } from "@/components/ConfettiEasterEgg";
import { useKeyboardHotbar } from "@/hooks/useKeyboardHotbar";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export default function Home() {
  const [currentView, setCurrentView] = useState<PortfolioView>("title");
  const [totemActive, setTotemActive] = useState(false);
  const { isMuted, toggleMute, playLevelUp } = useSoundEffects();

  const handleEnter = (view: PortfolioView = "hub") => {
    playLevelUp();
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectView = (view: PortfolioView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToTitle = () => {
    setCurrentView("title");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Map view to active hotbar slot
  const viewToSlotIndex: Record<PortfolioView, number> = {
    title: 0,
    hub: 8,
    about: 1,
    skills: 2,
    projects: 3,
    timeline: 4,
    contact: 5,
  };

  const activeSlotIndex = viewToSlotIndex[currentView] ?? 0;

  const { activeSlot, selectSlot } = useKeyboardHotbar(activeSlotIndex, (slot) => {
    switch (slot) {
      case 0:
        handleBackToTitle();
        break;
      case 1:
        handleSelectView("about");
        break;
      case 2:
        handleSelectView("skills");
        break;
      case 3:
        handleSelectView("projects");
        break;
      case 4:
        handleSelectView("timeline");
        break;
      case 5:
        handleSelectView("contact");
        break;
      case 6:
        setTotemActive(true);
        break;
      case 7:
        toggleMute();
        break;
      case 8:
        handleSelectView("hub");
        break;
      default:
        break;
    }
  });

  const hotbarSlots: HotbarSlot[] = [
    {
      id: "title",
      name: "Title Screen [1]",
      icon: "compass",
      tooltip: "Back to Title Screen",
      action: handleBackToTitle,
    },
    {
      id: "about",
      name: "Book & Quill [2]",
      icon: "book",
      tooltip: "About Atharva",
      action: () => handleSelectView("about"),
    },
    {
      id: "skills",
      name: "Crafting Grid [3]",
      icon: "crafting-table",
      tooltip: "Skills & Inventory",
      action: () => handleSelectView("skills"),
    },
    {
      id: "projects",
      name: "Pickaxe [4]",
      icon: "pickaxe",
      tooltip: "World Select (Projects)",
      action: () => handleSelectView("projects"),
    },
    {
      id: "timeline",
      name: "Beacon [5]",
      icon: "beacon",
      tooltip: "Advancements & Milestones",
      action: () => handleSelectView("timeline"),
    },
    {
      id: "contact",
      name: "Server List [6]",
      icon: "server",
      tooltip: "Multiplayer Realms & Contact",
      action: () => handleSelectView("contact"),
    },
    {
      id: "easter-egg",
      name: "Totem [7]",
      icon: "totem",
      tooltip: "Resurrection Easter Egg!",
      action: () => setTotemActive(true),
    },
    {
      id: "audio",
      name: isMuted ? "Unmute [8]" : "Mute [8]",
      icon: isMuted ? "speaker-muted" : "speaker",
      tooltip: isMuted ? "Sound ON" : "Sound OFF",
      action: toggleMute,
    },
    {
      id: "hub",
      name: "Select View [9]",
      icon: "clock",
      tooltip: "Select What to View",
      action: () => handleSelectView("hub"),
    },
  ];

  return (
    <main className="relative min-h-screen text-[#f4f4f5] bg-[#121316] select-none">
      {/* Loading Screen */}
      <LoadingScreen />

      {/* 1. Title Screen View */}
      {currentView === "title" && (
        <TitleScreen
          onEnter={(target) => handleEnter((target as PortfolioView) || "hub")}
          onNavigate={(target) => handleSelectView(target as PortfolioView)}
          onTriggerTotem={() => setTotemActive(true)}
          isEntered={false}
        />
      )}

      {/* When in a sub-view, show Top Navigation Bar */}
      {currentView !== "title" && (
        <TopNavBar
          currentView={currentView}
          onSelectView={handleSelectView}
          onBackToTitle={handleBackToTitle}
        />
      )}

      {/* 2. Selection Hub: Choose what to view */}
      {currentView === "hub" && (
        <SelectionHub
          onSelectView={handleSelectView}
          onBackToTitle={handleBackToTitle}
        />
      )}

      {/* 3. About View Only */}
      {currentView === "about" && (
        <div className="pt-12">
          <AboutBook />
        </div>
      )}

      {/* 4. Skills View Only */}
      {currentView === "skills" && (
        <div className="pt-12">
          <Inventory />
        </div>
      )}

      {/* 5. Projects View Only */}
      {currentView === "projects" && (
        <div className="pt-12">
          <WorldSelect />
        </div>
      )}

      {/* 6. Timeline View Only */}
      {currentView === "timeline" && (
        <div className="pt-12">
          <AdvancementTree />
        </div>
      )}

      {/* 7. Contact View Only */}
      {currentView === "contact" && (
        <div className="pt-12">
          <ServerList />
        </div>
      )}

      {/* Persistent Hotbar and XP Bar when inside any sub-view */}
      {currentView !== "title" && (
        <div className="fixed bottom-0 left-0 right-0 z-40 pb-2 pointer-events-none">
          <div className="pointer-events-auto">
            <XpBar
              progress={
                currentView === "about"
                  ? 20
                  : currentView === "skills"
                  ? 45
                  : currentView === "projects"
                  ? 70
                  : currentView === "timeline"
                  ? 85
                  : currentView === "contact"
                  ? 100
                  : 50
              }
              level={
                currentView === "about"
                  ? 1
                  : currentView === "skills"
                  ? 5
                  : currentView === "projects"
                  ? 10
                  : currentView === "timeline"
                  ? 15
                  : currentView === "contact"
                  ? 19
                  : 1
              }
            />
          </div>
          <div className="pointer-events-auto mt-1">
            <Hotbar
              activeSlot={activeSlot}
              onSelectSlot={selectSlot}
              slots={hotbarSlots}
            />
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
