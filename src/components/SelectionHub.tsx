"use client";

import React from "react";
import { PixelIcon } from "@/components/ui/PixelIcon";
import { MinecraftButton } from "@/components/ui/MinecraftButton";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export type PortfolioView =
  | "title"
  | "hub"
  | "about"
  | "skills"
  | "projects"
  | "timeline"
  | "contact";

interface SelectionHubProps {
  onSelectView: (view: PortfolioView) => void;
  onBackToTitle: () => void;
}

export const SelectionHub: React.FC<SelectionHubProps> = ({
  onSelectView,
  onBackToTitle,
}) => {
  const { playPop, playClick } = useSoundEffects();

  const options: {
    id: PortfolioView;
    title: string;
    subtitle: string;
    icon: "book" | "crafting-table" | "pickaxe" | "beacon" | "server";
    badge: string;
    badgeColor: string;
    description: string;
    hotkey: string;
  }[] = [
    {
      id: "about",
      title: "Book & Quill",
      subtitle: "About Atharva",
      icon: "book",
      badge: "Player Lore",
      badgeColor: "text-[#f59e0b] border-[#f59e0b]/40 bg-[#f59e0b]/10",
      description: "Open the adventurer's journal to read Atharva's background, education, and engineering philosophy.",
      hotkey: "[2]",
    },
    {
      id: "skills",
      title: "Inventory & Crafting",
      subtitle: "Tech Stack & Skills",
      icon: "crafting-table",
      badge: "27 Slots",
      badgeColor: "text-[#38bdf8] border-[#38bdf8]/40 bg-[#38bdf8]/10",
      description: "Inspect enchanted languages, frameworks, backend tooling, and proficiency levels in the 9x3 grid.",
      hotkey: "[3]",
    },
    {
      id: "projects",
      title: "World Select",
      subtitle: "Projects & Builds",
      icon: "pickaxe",
      badge: "Hardcore / Creative",
      badgeColor: "text-[#4ade80] border-[#4ade80]/40 bg-[#4ade80]/10",
      description: "Explore deployed web applications, CLI tools, key-value engines, and inspect GitHub source code.",
      hotkey: "[4]",
    },
    {
      id: "timeline",
      title: "Advancements",
      subtitle: "Journey & Milestones",
      icon: "beacon",
      badge: "Quests Unlocked",
      badgeColor: "text-[#c084fc] border-[#c084fc]/40 bg-[#c084fc]/10",
      description: "Trace academic achievements, first coding steps, hackathon sprints, and future frontiers.",
      hotkey: "[5]",
    },
    {
      id: "contact",
      title: "Play Multiplayer",
      subtitle: "Server List & Contact",
      icon: "server",
      badge: "Online Servers",
      badgeColor: "text-[#34d399] border-[#34d399]/40 bg-[#34d399]/10",
      description: "Connect via GitHub, LinkedIn, direct owl mail, or copy server IPs to initiate communication.",
      hotkey: "[6]",
    },
  ];

  const handleSelect = (view: PortfolioView) => {
    playPop();
    onSelectView(view);
  };

  return (
    <section
      aria-label="Selection Hub"
      className="min-h-screen py-16 px-4 flex flex-col items-center justify-center relative select-none"
    >
      <div className="w-full max-w-4xl flex flex-col items-center">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <PixelIcon name="compass" size={28} />
          <h2
            className="font-minecraft text-xl sm:text-2xl text-[#ffff55] tracking-wider uppercase"
            style={{ textShadow: "2px 2px 0 #000" }}
          >
            Select What to Explore
          </h2>
        </div>
        <p className="font-sans text-xs sm:text-sm text-[#9ca3af] mb-8 text-center max-w-md">
          Choose a dimension in Atharva&apos;s portfolio to enter.
        </p>

        {/* Options Grid */}
        <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
          {options.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleSelect(opt.id)}
              className="group text-left p-4 bg-[#18191e] hover:bg-[#23252d] border-2 border-[#2f313b] hover:border-white transition-all cursor-pointer shadow-lg active:translate-y-[1px] relative overflow-hidden"
            >
              {/* Corner Hotkey Tag */}
              <span className="absolute top-2 right-2 font-minecraft text-[9px] text-[#6b7280] group-hover:text-[#ffff55]">
                {opt.hotkey}
              </span>

              <div className="flex items-start gap-3.5">
                {/* Icon box */}
                <div className="shrink-0 w-12 h-12 bg-[#2a2c35] border-2 border-t-[#474a58] border-l-[#474a58] border-b-[#14151a] border-r-[#14151a] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <PixelIcon name={opt.icon} size={28} />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0 pr-6">
                  <div className="flex items-center gap-2">
                    <h3 className="font-minecraft text-xs sm:text-sm font-bold text-white group-hover:text-[#ffff55] transition-colors truncate">
                      {opt.title}
                    </h3>
                  </div>

                  <span
                    className={`inline-block font-minecraft text-[8px] uppercase px-1.5 py-0.5 border mt-1 ${opt.badgeColor}`}
                  >
                    {opt.badge}
                  </span>

                  <p className="font-sans text-xs text-[#a1a1aa] mt-1.5 line-clamp-2 leading-relaxed">
                    {opt.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Back Button */}
        <div className="flex justify-center">
          <MinecraftButton
            size="md"
            variant="dark"
            onClick={() => {
              playClick();
              onBackToTitle();
            }}
          >
            <span className="flex items-center gap-2">
              <PixelIcon name="arrow-left" size={14} />
              Back to Title Screen
            </span>
          </MinecraftButton>
        </div>
      </div>
    </section>
  );
};
