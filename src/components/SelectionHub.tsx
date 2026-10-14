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
  const { playPop, playClick, playWarp } = useSoundEffects();

  const gateways: {
    id: PortfolioView;
    title: string;
    realmName: string;
    icon: "book" | "crafting-table" | "pickaxe" | "beacon" | "server";
    floatingIcon: "book" | "pickaxe" | "globe" | "beacon" | "portal";
    badge: string;
    accentColor: string;
    glowBorder: string;
    bgGradient: string;
    stats: string;
    description: string;
    hotkey: string;
  }[] = [
    {
      id: "about",
      title: "Player Lore & Origins",
      realmName: "The Sanctuary",
      icon: "book",
      floatingIcon: "book",
      badge: "Mumbai Base • Story",
      accentColor: "#fbbf24",
      glowBorder: "group-hover:border-[#fbbf24] group-hover:shadow-[0_0_20px_rgba(251,191,36,0.35)]",
      bgGradient: "from-[#241a12] to-[#120e0a]",
      stats: "Biome: Cozy Study • Light Level: 15",
      description: "Step into Atharva's developer base. Read the adventurer's journal, academic roots, and software philosophy.",
      hotkey: "[2]",
    },
    {
      id: "skills",
      title: "Inventory & Armory",
      realmName: "The Tech Forge",
      icon: "crafting-table",
      floatingIcon: "pickaxe",
      badge: "27 Enchanted Slots",
      accentColor: "#38bdf8",
      glowBorder: "group-hover:border-[#38bdf8] group-hover:shadow-[0_0_20px_rgba(56,189,248,0.35)]",
      bgGradient: "from-[#0c2438] to-[#0a141e]",
      stats: "Station: Diamond Anvil • Efficiency V",
      description: "Inspect enchanted languages, Next.js, React 19, FastAPI, systems tooling, and 2x2 crafting recipes.",
      hotkey: "[3]",
    },
    {
      id: "projects",
      title: "World Select",
      realmName: "The Overworld Builds",
      icon: "pickaxe",
      floatingIcon: "globe",
      badge: "Hardcore & Creative",
      accentColor: "#4ade80",
      glowBorder: "group-hover:border-[#4ade80] group-hover:shadow-[0_0_20px_rgba(74,222,128,0.35)]",
      bgGradient: "from-[#0e2918] to-[#0a180f]",
      stats: "Difficulty: Hardcore • Mode: Survival",
      description: "Explore deployed production web applications, key-value storage engines, CLI utilities, and live demos.",
      hotkey: "[4]",
    },
    {
      id: "timeline",
      title: "Advancements & Quests",
      realmName: "The End Nexus",
      icon: "beacon",
      floatingIcon: "beacon",
      badge: "Tech Tree • Milestones",
      accentColor: "#c084fc",
      glowBorder: "group-hover:border-[#c084fc] group-hover:shadow-[0_0_20px_rgba(192,132,252,0.35)]",
      bgGradient: "from-[#25103a] to-[#12081d]",
      stats: "Quests: 7 Unlocked • +2,400 Total XP",
      description: "Trace academic achievements, first coding steps, collegiate hackathons, and future low-level frontiers.",
      hotkey: "[5]",
    },
    {
      id: "contact",
      title: "Play Multiplayer",
      realmName: "Nether Gateway",
      icon: "server",
      floatingIcon: "portal",
      badge: "Online Servers • 24ms",
      accentColor: "#f472b6",
      glowBorder: "group-hover:border-[#f472b6] group-hover:shadow-[0_0_20px_rgba(244,114,182,0.35)]",
      bgGradient: "from-[#2d0e23] to-[#160611]",
      stats: "Ping: 24ms • Direct Connect Ready",
      description: "Join Atharva's multiplayer network via GitHub, LinkedIn, owl mail, or copy direct server addresses.",
      hotkey: "[6]",
    },
  ];

  const handleSelect = (view: PortfolioView) => {
    playWarp();
    onSelectView(view);
  };

  return (
    <section
      aria-label="Selection Hub"
      className="min-h-screen py-16 px-4 flex flex-col items-center justify-center relative select-none overflow-hidden"
    >
      {/* Background Portal Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/minecraft_portal.jpg')",
          imageRendering: "pixelated",
        }}
      >
        <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
        {/* Player Status HUD Bar */}
        <div className="w-full max-w-3xl bg-[#18191f]/90 border-2 border-[#383a48] p-3 mb-6 shadow-2xl flex flex-wrap items-center justify-between gap-4">
          {/* Avatar & Player Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#2d303b] border-2 border-white flex items-center justify-center shrink-0">
              <PixelIcon name="totem" size={24} />
            </div>
            <div>
              <div className="font-minecraft text-xs font-bold text-white flex items-center gap-2">
                <span>Atharva_K36</span>
                <span className="text-[#80ff00] text-[10px] bg-[#14321d] border border-[#22c55e]/40 px-1.5 py-0.5">
                  LVL 24 SE
                </span>
              </div>
              <div className="font-minecraft text-[9px] text-[#9ca3af]">
                Mumbai Guild • Survival Mode
              </div>
            </div>
          </div>

          {/* Hearts & Food HUD */}
          <div className="flex flex-col items-end gap-1">
            {/* Hearts row (10 hearts) */}
            <div className="flex items-center gap-0.5">
              {[...Array(10)].map((_, i) => (
                <PixelIcon key={`heart-${i}`} name="heart" size={12} className="animate-pulse" />
              ))}
            </div>
            {/* Coordinates */}
            <div className="font-minecraft text-[9px] text-[#38bdf8]">
              XYZ: 19.0760 / 64.0 / 72.8777
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex items-center gap-2 mb-1">
          <PixelIcon name="compass" size={28} />
          <h2
            className="font-minecraft text-xl sm:text-2xl text-[#ffff55] tracking-wider uppercase"
            style={{ textShadow: "2px 2px 0 #000" }}
          >
            Dimensional Warp Hub
          </h2>
        </div>
        <p className="font-sans text-xs sm:text-sm text-[#cbd5e1] mb-6 text-center max-w-lg">
          Select a realm pedestal below to warp directly into Atharva&apos;s world.
        </p>

        {/* Gateways Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {gateways.map((gw, index) => (
            <div
              key={gw.id}
              onClick={() => handleSelect(gw.id)}
              onMouseEnter={() => playPop()}
              className={`
                group relative text-left p-4 sm:p-5 bg-gradient-to-b ${gw.bgGradient}
                border-3 border-[#333644] ${gw.glowBorder}
                cursor-pointer transition-all duration-300 shadow-xl
                hover:-translate-y-1.5 active:translate-y-0 flex flex-col justify-between
                ${index === 4 ? "md:col-span-2 lg:col-span-1" : ""}
              `}
            >
              {/* Corner Hotkey Tag */}
              <span className="absolute top-2.5 right-2.5 font-minecraft text-[10px] text-[#888888] group-hover:text-[#ffff55] transition-colors">
                {gw.hotkey}
              </span>

              {/* Top Realm Badge */}
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="font-minecraft text-[8px] uppercase tracking-wider px-1.5 py-0.5 border"
                  style={{
                    color: gw.accentColor,
                    borderColor: `${gw.accentColor}66`,
                    backgroundColor: `${gw.accentColor}15`,
                  }}
                >
                  {gw.badge}
                </span>
              </div>

              {/* Floating Iconic Item & Realm Title */}
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-12 h-12 bg-[#1b1c22] border-2 border-[#4b4e5c] group-hover:border-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <div className="animate-mc-bob">
                    <PixelIcon name={gw.floatingIcon} size={28} />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="font-minecraft text-[10px] text-[#9ca3af] uppercase">
                    {gw.realmName}
                  </div>
                  <h3 className="font-minecraft text-xs sm:text-sm font-bold text-white group-hover:text-[#ffff55] transition-colors truncate">
                    {gw.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="font-sans text-xs text-[#cbd5e1] leading-relaxed mb-4 line-clamp-3">
                {gw.description}
              </p>

              {/* Bottom Footer: Stats & Enter Action */}
              <div className="pt-3 border-t border-[#2d303d] flex items-center justify-between text-[10px] font-minecraft">
                <span className="text-[#888888] truncate max-w-[170px]">
                  {gw.stats}
                </span>
                <span
                  className="font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  style={{ color: gw.accentColor }}
                >
                  Warp ▶
                </span>
              </div>
            </div>
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
              Return to Title Screen
            </span>
          </MinecraftButton>
        </div>
      </div>
    </section>
  );
};

