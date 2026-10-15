"use client";

import React, { useState } from "react";
import { skillsData } from "@/data/skills";
import { Skill } from "@/types";
import { PixelIcon } from "@/components/ui/PixelIcon";
import { MinecraftTooltipContent } from "@/components/Tooltip";
import { InteractiveSteve } from "@/components/InteractiveSteve";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface EquipmentItem {
  id: string;
  name: string;
  slot: "helmet" | "chestplate" | "leggings" | "boots" | "shield";
  icon: "helmet-silhouette" | "chestplate-silhouette" | "leggings-silhouette" | "boots-silhouette" | "shield-silhouette";
  equippedName: string;
  enchantment: string;
  description: string;
  level: number;
}

const armorItems: EquipmentItem[] = [
  {
    id: "helmet",
    name: "Helmet Slot",
    slot: "helmet",
    icon: "helmet-silhouette",
    equippedName: "Dual B.Eng & B.Sc Degree Cap",
    enchantment: "Protection IV, Respiration III",
    description: "B.Eng Software Engineering & B.Sc Computer Science at VSIT & University of Greater Manchester.",
    level: 96,
  },
  {
    id: "chestplate",
    name: "Chestplate Slot",
    slot: "chestplate",
    icon: "chestplate-silhouette",
    equippedName: "Royal Trader Frontend Tunic",
    enchantment: "Efficiency V, Unbreaking III",
    description: "Frontend development intern building responsive web pages and managing inventory in Excel.",
    level: 94,
  },
  {
    id: "leggings",
    name: "Leggings Slot",
    slot: "leggings",
    icon: "leggings-silhouette",
    equippedName: "Vidyalankar Diploma Greaves",
    enchantment: "Swift Sneak III, 88.47% Distinction",
    description: "Diploma in Information Technology from Vidyalankar Polytechnic, Wadala (88.47%).",
    level: 92,
  },
  {
    id: "boots",
    name: "Boots Slot",
    slot: "boots",
    icon: "boots-silhouette",
    equippedName: "St. Stanislaus SSC Boots",
    enchantment: "Feather Falling IV, Soul Speed III",
    description: "Completed SSC at St. Stanislaus High School, Bandra (West) (Batch 2022-2023).",
    level: 88,
  },
];

const offhandItem: EquipmentItem = {
  id: "shield",
  name: "Off-Hand Slot",
  slot: "shield",
  icon: "shield-silhouette",
  equippedName: "Hackathon Shield of Resilience",
  enchantment: "Unbreaking III, Mending",
  description: "Learnify, Safenet, and SherlockLogs hackathon builds protecting against production anomalies.",
  level: 95,
};

export const Inventory: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeSkill, setActiveSkill] = useState<Skill | EquipmentItem | null>(skillsData[0]);
  const [recipeIndex, setRecipeIndex] = useState<number>(0);
  const [showRecipeToast, setShowRecipeToast] = useState<boolean>(false);
  const { playPop, playChestOpen, playClick } = useSoundEffects();

  const recipes = [
    {
      name: "Next.js Fullstack",
      inputs: [
        { name: "React.js", icon: "redstone" as const },
        { name: "TypeScript", icon: "sword" as const },
        { name: "CSS3", icon: "totem" as const },
        { name: "Node.js", icon: "server" as const },
      ],
      outputName: "Modern Fullstack App (Next.js)",
      outputIcon: "beacon" as const,
      enchantment: "Server Actions • Turbopack",
      description: "Production Next.js application built with React, TypeScript, Node.js, and CSS3.",
    },
    {
      name: "FastAPI Engine",
      inputs: [
        { name: "Python", icon: "potion" as const },
        { name: "Supabase", icon: "portal" as const },
        { name: "Cloudflare", icon: "shield" as const },
        { name: "FastAPI", icon: "potion" as const },
      ],
      outputName: "High-Concurrency Backend",
      outputIcon: "sword" as const,
      enchantment: "Pydantic • Async Engine",
      description: "High-throughput asynchronous REST API backend with Supabase and Cloudflare.",
    },
    {
      name: "Mobile App Hub",
      inputs: [
        { name: "Dart & Flutter", icon: "compass" as const },
        { name: "Firebase", icon: "furnace" as const },
        { name: "Kotlin", icon: "beacon" as const },
        { name: "Git", icon: "book" as const },
      ],
      outputName: "Cross-Platform Mobile Suite",
      outputIcon: "totem" as const,
      enchantment: "Hot Reload • 60 FPS",
      description: "Cross-platform mobile application powered by Flutter, Kotlin, and Firebase realtime database.",
    },
  ];

  const currentRecipe = recipes[recipeIndex];

  const categories = [
    { id: "all", label: "All Items (21)" },
    { id: "languages", label: "Languages" },
    { id: "frontend", label: "Frontend & Mobile" },
    { id: "backend", label: "Backend" },
    { id: "cloud", label: "Cloud & DB" },
    { id: "tools", label: "Tools & Git" },
  ];

  const filteredSkills =
    selectedCategory === "all"
      ? skillsData
      : skillsData.filter((s) => s.category === selectedCategory);

  // Pad to 27 slots (9x3 grid standard Minecraft inventory)
  const totalSlots = 27;
  const inventorySlots: (Skill | null)[] = [...filteredSkills];
  while (inventorySlots.length < totalSlots) {
    inventorySlots.push(null);
  }

  // 9 Hotbar slots (Bottom row)
  const hotbarSkills: Skill[] = [
    skillsData.find((s) => s.name === "TypeScript") || skillsData[0],
    skillsData.find((s) => s.name.startsWith("JavaScript")) || skillsData[1],
    skillsData.find((s) => s.name.startsWith("React")) || skillsData[2],
    skillsData.find((s) => s.name.startsWith("Next")) || skillsData[3],
    skillsData.find((s) => s.name.startsWith("Node")) || skillsData[4],
    skillsData.find((s) => s.name === "Python") || skillsData[5],
    skillsData.find((s) => s.name === "FastAPI") || skillsData[6],
    skillsData.find((s) => s.name === "MongoDB") || skillsData[7],
    skillsData.find((s) => s.name === "Git") || skillsData[8],
  ];

  const handleSelectSkill = (skill: Skill | EquipmentItem | null) => {
    if (skill) {
      playPop();
      setActiveSkill(skill);
    }
  };

  const handleRecipeBookClick = () => {
    playChestOpen();
    setRecipeIndex((prev) => (prev + 1) % recipes.length);
    setShowRecipeToast(true);
    setTimeout(() => setShowRecipeToast(false), 2500);
  };

  return (
    <section
      id="skills"
      aria-label="Atharva's Inventory and Skills"
      className="min-h-screen py-16 px-3 sm:px-6 flex flex-col items-center justify-center relative select-none overflow-hidden bg-mc-stone-bricks-pattern"
    >
      {/* Ambient Forge Vignette Overlay */}
      <div className="absolute inset-0 z-0 bg-radial from-black/40 via-black/65 to-black/85 pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.9)]" />

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-1">
          <PixelIcon name="crafting-table" size={24} />
          <h2
            className="font-minecraft text-xl sm:text-2xl text-[#ffff55] tracking-wider uppercase"
            style={{ textShadow: "2px 2px 0 #000" }}
          >
            Inventory & Crafting
          </h2>
        </div>
        <p className="font-sans text-xs sm:text-sm text-[#cbd5e1] mb-5 text-center max-w-md">
          Move your mouse to watch Steve look around, or click & drag to spin him 360°!
        </p>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                playClick();
                setSelectedCategory(cat.id);
              }}
              className={`
                px-2.5 py-1 font-minecraft text-[10px] sm:text-xs transition-all cursor-pointer
                ${
                  selectedCategory === cat.id
                    ? "bg-[#22c55e] text-white border-2 border-[#86efac] shadow-[0_0_8px_rgba(34,197,94,0.5)]"
                    : "bg-[#22232a] hover:bg-[#333540] text-[#cccccc] border-2 border-[#444654]"
                }
              `}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Exact Authentic Minecraft Survival Inventory GUI Container */}
        <div
          className="w-full max-w-[430px] sm:max-w-[460px] bg-[#c6c6c6] p-3 sm:p-4 border-4 border-t-[#ffffff] border-l-[#ffffff] border-b-[#555555] border-r-[#555555] shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative text-[#373737]"
          style={{ imageRendering: "pixelated" }}
        >
          {/* Top Section: Armor + Steve + Shield + Crafting Area */}
          <div className="flex items-start justify-between gap-2 sm:gap-3 mb-3">
            {/* Left: 4 Armor Slots */}
            <div className="flex flex-col gap-1">
              {armorItems.map((item) => {
                const isSelected = activeSkill?.name === item.equippedName;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectSkill(item)}
                    aria-label={`${item.name}: ${item.equippedName}`}
                    className={`
                      w-9 h-9 sm:w-10 sm:h-10 bg-[#8b8b8b] relative flex items-center justify-center cursor-pointer transition-all
                      border-2 border-t-[#373737] border-l-[#373737] border-b-[#ffffff] border-r-[#ffffff]
                      hover:bg-[#9e9e9e] active:scale-95
                      ${isSelected ? "ring-2 ring-[#ffff55] ring-offset-1 ring-offset-[#8b8b8b]" : ""}
                    `}
                    title={`${item.equippedName} (${item.enchantment})`}
                  >
                    <PixelIcon name={item.icon} size={22} className="opacity-90 hover:opacity-100" />
                    {/* Small equipped indicator dot */}
                    <span className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 bg-[#4ade80] rounded-full" />
                  </button>
                );
              })}
            </div>

            {/* Center: Steve 3D Preview Chamber */}
            <div className="flex items-end gap-1.5">
              <div className="w-[105px] sm:w-[115px] h-[156px] bg-black border-2 border-t-[#373737] border-l-[#373737] border-b-[#ffffff] border-r-[#ffffff] flex items-center justify-center relative overflow-hidden">
                <InteractiveSteve className="w-full h-full" />
              </div>

              {/* Offhand Slot (Beside Steve at the bottom) */}
              <button
                type="button"
                onClick={() => handleSelectSkill(offhandItem)}
                aria-label="Off-Hand Shield Slot"
                className={`
                  w-9 h-9 sm:w-10 sm:h-10 bg-[#8b8b8b] relative flex items-center justify-center cursor-pointer transition-all
                  border-2 border-t-[#373737] border-l-[#373737] border-b-[#ffffff] border-r-[#ffffff]
                  hover:bg-[#9e9e9e] active:scale-95
                  ${activeSkill?.name === offhandItem.equippedName ? "ring-2 ring-[#ffff55] ring-offset-1 ring-offset-[#8b8b8b]" : ""}
                `}
                title={`${offhandItem.equippedName} (${offhandItem.enchantment})`}
              >
                <PixelIcon name="shield-silhouette" size={22} className="opacity-90 hover:opacity-100" />
                <span className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 bg-[#38bdf8] rounded-full" />
              </button>
            </div>

            {/* Right: Crafting 2x2 Grid + Green Recipe Book + Arrow + Result */}
            <div className="flex flex-col items-center">
              <div className="font-minecraft text-[11px] text-[#404040] font-bold mb-1 self-start">
                Crafting
              </div>

              <div className="flex items-center gap-2">
                {/* 2x2 Slots Grid */}
                <div className="grid grid-cols-2 gap-1 bg-[#8b8b8b] p-1 border-t-2 border-l-2 border-[#373737] border-b-2 border-r-2 border-[#ffffff]">
                  {currentRecipe.inputs.map((inp, idx) => (
                    <div
                      key={`craft-${idx}`}
                      className="w-8 h-8 sm:w-9 sm:h-9 bg-[#8b8b8b] border-2 border-t-[#373737] border-l-[#373737] border-b-[#ffffff] border-r-[#ffffff] flex items-center justify-center cursor-pointer group"
                      title={inp.name}
                    >
                      <PixelIcon name={inp.icon} size={18} className="group-hover:scale-110 transition-transform" />
                    </div>
                  ))}
                </div>

                {/* Arrow */}
                <div className="font-minecraft text-base sm:text-lg text-[#404040]">
                  ➔
                </div>

                {/* Result Slot */}
                <div
                  onClick={() => {
                    playPop();
                    setActiveSkill({
                      name: currentRecipe.outputName,
                      enchantment: currentRecipe.enchantment,
                      description: currentRecipe.description,
                      icon: currentRecipe.outputIcon,
                      category: "frontend",
                      level: 98,
                      stackCount: 1,
                    });
                  }}
                  className="w-12 h-12 sm:w-13 sm:h-13 bg-[#8b8b8b] border-2 border-t-[#373737] border-l-[#373737] border-b-[#ffffff] border-r-[#ffffff] flex items-center justify-center mc-enchanted cursor-pointer hover:scale-105 transition-transform"
                  title={`${currentRecipe.outputName}: Click to inspect`}
                >
                  <PixelIcon name={currentRecipe.outputIcon} size={28} className="animate-pulse" />
                </div>
              </div>

              {/* Green Recipe Book Button (Directly beneath 2x2 grid) */}
              <div className="w-full flex items-center justify-start mt-2 relative">
                <button
                  type="button"
                  onClick={handleRecipeBookClick}
                  className="w-8 h-8 sm:w-9 sm:h-9 bg-[#8b8b8b] hover:bg-[#a0a0a0] active:scale-95 border-2 border-t-[#ffffff] border-l-[#ffffff] border-b-[#373737] border-r-[#373737] flex items-center justify-center cursor-pointer shadow-xs transition-colors"
                  title="Click Recipe Book to cycle recipes!"
                  aria-label="Cycle Crafting Recipes"
                >
                  <PixelIcon name="recipe-book" size={20} />
                </button>

                <span className="font-minecraft text-[8px] text-[#555555] ml-2 leading-tight">
                  {currentRecipe.name}
                </span>

                {showRecipeToast && (
                  <div className="absolute top-full mt-1 left-0 z-50 bg-[#1c1c1c] text-white border border-[#ffff55] px-2 py-1 text-[9px] font-minecraft whitespace-nowrap shadow-lg">
                    📖 Cycled to: {currentRecipe.name}!
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Middle Section: 3 Rows of 9 Main Inventory Slots (27 Slots) */}
          <div className="mb-2">
            <div className="grid grid-cols-9 gap-1 sm:gap-1.5 p-1.5 sm:p-2 bg-[#8b8b8b] border-t-2 border-l-2 border-[#373737] border-b-2 border-r-2 border-[#ffffff]">
              {inventorySlots.map((skill, index) => {
                const isSelected = activeSkill?.name === skill?.name;

                return (
                  <div
                    key={`inv-${index}`}
                    className="relative group flex items-center justify-center aspect-square"
                  >
                    <button
                      type="button"
                      disabled={!skill}
                      onClick={() => handleSelectSkill(skill)}
                      aria-label={skill ? `${skill.name}: ${skill.enchantment}` : "Empty slot"}
                      className={`
                        w-full h-full relative flex items-center justify-center outline-none transition-all
                        border-2 border-t-[#373737] border-l-[#373737] border-b-[#ffffff] border-r-[#ffffff]
                        ${
                          skill
                            ? "bg-[#8b8b8b] hover:bg-[#a0a0a0] cursor-pointer"
                            : "bg-[#8b8b8b]/60 cursor-default"
                        }
                        ${skill && skill.level >= 88 ? "mc-enchanted" : ""}
                        ${isSelected ? "ring-2 ring-[#ffff55] ring-offset-1 ring-offset-[#8b8b8b]" : ""}
                      `}
                    >
                      {skill && (
                        <>
                          <PixelIcon
                            name={skill.icon}
                            size={20}
                            className={`transform group-hover:scale-110 transition-transform ${
                              skill.level > 90 ? "drop-shadow-[0_0_4px_#c084fc]" : ""
                            }`}
                          />
                          <span
                            className="absolute bottom-0.5 right-0.5 font-minecraft text-[8px] sm:text-[9px] text-white font-bold pointer-events-none"
                            style={{ textShadow: "1px 1px 0 #000" }}
                          >
                            {skill.stackCount}
                          </span>
                        </>
                      )}
                    </button>

                    {/* Tooltip on Hover */}
                    {skill && (
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pointer-events-none z-50">
                        <MinecraftTooltipContent
                          title={skill.name}
                          enchantment={skill.enchantment}
                          description={skill.description}
                          category={skill.category}
                          level={skill.level}
                          rarity={skill.level >= 90 ? "legendary" : skill.level >= 80 ? "rare" : "common"}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Section: 1 Row of 9 Hotbar Slots */}
          <div>
            <div className="grid grid-cols-9 gap-1 sm:gap-1.5 p-1.5 sm:p-2 bg-[#8b8b8b] border-t-2 border-l-2 border-[#373737] border-b-2 border-r-2 border-[#ffffff]">
              {hotbarSkills.map((skill, index) => {
                const isSelected = activeSkill?.name === skill.name;

                return (
                  <div
                    key={`hotbar-${index}`}
                    className="relative group flex items-center justify-center aspect-square"
                  >
                    <button
                      type="button"
                      onClick={() => handleSelectSkill(skill)}
                      aria-label={`${skill.name}: Hotbar slot ${index + 1}`}
                      className={`
                        w-full h-full relative flex items-center justify-center outline-none transition-all
                        border-2 border-t-[#373737] border-l-[#373737] border-b-[#ffffff] border-r-[#ffffff]
                        bg-[#8b8b8b] hover:bg-[#a0a0a0] cursor-pointer
                        ${skill.level >= 88 ? "mc-enchanted" : ""}
                        ${isSelected ? "ring-2 ring-[#ffff55] ring-offset-1 ring-offset-[#8b8b8b]" : ""}
                      `}
                    >
                      <PixelIcon
                        name={skill.icon}
                        size={20}
                        className="transform group-hover:scale-110 transition-transform"
                      />
                      <span
                        className="absolute bottom-0.5 right-0.5 font-minecraft text-[8px] sm:text-[9px] text-white font-bold pointer-events-none"
                        style={{ textShadow: "1px 1px 0 #000" }}
                      >
                        {skill.stackCount}
                      </span>
                    </button>

                    {/* Tooltip on Hover */}
                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pointer-events-none z-50">
                      <MinecraftTooltipContent
                        title={skill.name}
                        enchantment={skill.enchantment}
                        description={skill.description}
                        category={skill.category}
                        level={skill.level}
                        rarity={skill.level >= 90 ? "legendary" : "rare"}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Item Details Footer Box */}
          {activeSkill && (
            <div className="mt-3 p-2.5 bg-[#1a1b22] text-white border-2 border-[#333333] flex flex-col sm:flex-row items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5">
                {"icon" in activeSkill && typeof activeSkill.icon === "string" && (
                  <PixelIcon name={activeSkill.icon as unknown as Parameters<typeof PixelIcon>[0]["name"]} size={24} />
                )}
                <div>
                  <div className="font-minecraft text-xs text-[#ffff55] flex items-center gap-2">
                    <span>{"equippedName" in activeSkill ? activeSkill.equippedName : activeSkill.name}</span>
                    <span className="text-[#c084fc] text-[10px]">
                      {activeSkill.enchantment}
                    </span>
                  </div>
                  <div className="font-sans text-[11px] text-[#cbd5e1] line-clamp-1">
                    {activeSkill.description}
                  </div>
                </div>
              </div>
              <div className="shrink-0 flex items-center gap-2 font-minecraft text-[10px] text-[#4ade80]">
                <span>LVL {activeSkill.level}</span>
                {"stackCount" in activeSkill && (
                  <>
                    <span className="text-[#888888]">|</span>
                    <span>STACK {activeSkill.stackCount}</span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
