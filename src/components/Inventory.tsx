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
  icon: "diamond-helmet" | "diamond-chestplate" | "diamond-leggings" | "diamond-boots" | "shield-wood";
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
    icon: "diamond-helmet",
    equippedName: "Dual B.Eng & B.Sc Degree Cap",
    enchantment: "Protection IV • Promoted to Degree",
    description: "Promoted to Degree Engineering! Dual Degree in Software Engineering (B.Eng & B.Sc) at VSIT & University of Greater Manchester.",
    level: 96,
  },
  {
    id: "chestplate",
    name: "Chestplate Slot",
    slot: "chestplate",
    icon: "diamond-chestplate",
    equippedName: "Royal Trader Frontend Tunic",
    enchantment: "Efficiency V, Unbreaking III",
    description: "Frontend development intern building responsive web pages and managing inventory in Excel.",
    level: 94,
  },
  {
    id: "leggings",
    name: "Leggings Slot",
    slot: "leggings",
    icon: "diamond-leggings",
    equippedName: "Vidyalankar Diploma Greaves",
    enchantment: "Web & App Dev Mastered • 88.47%",
    description: "Learned everything of web and app building in Diploma at Vidyalankar Polytechnic, scoring 88.47% distinction.",
    level: 92,
  },
  {
    id: "boots",
    name: "Boots Slot",
    slot: "boots",
    icon: "diamond-boots",
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
  icon: "shield-wood",
  equippedName: "Shield of Resilience",
  enchantment: "Unbreaking III, Mending",
  description: "Learnify, Safenet, and collegiate hackathon builds protecting against production anomalies.",
  level: 95,
};

export const Inventory: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeSkill, setActiveSkill] = useState<Skill | EquipmentItem | null>(skillsData[0]);
  const [activeHotbarSlot, setActiveHotbarSlot] = useState<number>(0);
  const [recipeIndex, setRecipeIndex] = useState<number>(0);
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
      outputIcon: "potion" as const,
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

  // 9 Hotbar slots (Bottom row) matching reference image
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

  const handleSelectSkill = (skill: Skill | EquipmentItem | null, hotbarIdx?: number) => {
    if (skill) {
      playPop();
      setActiveSkill(skill);
      if (hotbarIdx !== undefined) {
        setActiveHotbarSlot(hotbarIdx);
      }
    }
  };

  return (
    <section
      id="skills"
      aria-label="Atharva's Inventory and Skills"
      className="min-h-screen py-12 px-3 sm:px-6 flex flex-col items-center justify-center relative select-none overflow-hidden"
    >
      {/* Cozy Minecraft Room Background matching Reference Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/minecraft_cozy_cabin.jpg')",
        }}
      >
        {/* Subtle ambient warm lighting vignette */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-1">
          <PixelIcon name="chest" size={24} />
          <h2
            className="font-minecraft text-xl sm:text-2xl text-[#ffff55] tracking-wider uppercase font-bold"
            style={{ textShadow: "2px 2px 0 #000" }}
          >
            Inventory &amp; Crafting
          </h2>
        </div>
        <p className="font-sans text-xs sm:text-sm text-[#cbd5e1] mb-4 text-center max-w-md">
          Move your mouse to watch Steve look around, or click &amp; drag to spin him 360°!
        </p>

        {/* Category Filter Tabs (2-row layout matching reference image) */}
        <div className="flex flex-col items-center gap-1.5 mb-4">
          {/* Row 1: 5 categories */}
          <div className="flex flex-wrap justify-center gap-1.5">
            {categories.slice(0, 5).map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    playClick();
                    setSelectedCategory(cat.id);
                  }}
                  className={`
                    px-3 py-1 font-minecraft text-[10px] sm:text-xs transition-all cursor-pointer border-2
                    ${
                      isActive
                        ? "bg-[#123824] border-[#22c55e] text-[#4ade80] font-bold shadow-[0_0_8px_rgba(34,197,94,0.4)]"
                        : "bg-[#22232a] hover:bg-[#333540] text-[#cccccc] border-[#444654]"
                    }
                  `}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Row 2: Tools & Git centered */}
          <div className="flex justify-center">
            {categories.slice(5).map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    playClick();
                    setSelectedCategory(cat.id);
                  }}
                  className={`
                    px-3 py-1 font-minecraft text-[10px] sm:text-xs transition-all cursor-pointer border-2
                    ${
                      isActive
                        ? "bg-[#123824] border-[#22c55e] text-[#4ade80] font-bold shadow-[0_0_8px_rgba(34,197,94,0.4)]"
                        : "bg-[#22232a] hover:bg-[#333540] text-[#cccccc] border-[#444654]"
                    }
                  `}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Exact Authentic Minecraft Survival Inventory GUI Container */}
        <div
          className="w-full max-w-[430px] sm:max-w-[460px] bg-[#c6c6c6] p-2.5 sm:p-3.5 border-4 border-t-[#ffffff] border-l-[#ffffff] border-b-[#555555] border-r-[#555555] shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative text-[#373737]"
          style={{ imageRendering: "pixelated" }}
        >
          {/* Top Section: 4 Armor Slots + Steve Chamber + Shield Slot + Crafting 2x2 Grid & Output */}
          <div className="flex items-start justify-between gap-1.5 sm:gap-2 mb-2.5">
            {/* Left Column: 4 Armor Slots */}
            <div className="flex flex-col gap-[3px]">
              {armorItems.map((item) => {
                const isSelected = activeSkill?.name === item.equippedName;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectSkill(item)}
                    aria-label={`${item.name}: ${item.equippedName}`}
                    className={`
                      w-9 h-9 sm:w-10 sm:h-10 bg-[#8b8b8b] relative flex items-center justify-center cursor-pointer transition-colors
                      border-2 border-t-[#373737] border-l-[#373737] border-b-[#ffffff] border-r-[#ffffff]
                      hover:bg-[#9e9e9e] active:scale-95
                      ${isSelected ? "border-white ring-1 ring-white" : ""}
                    `}
                    title={`${item.equippedName} (${item.enchantment})`}
                  >
                    <PixelIcon name={item.icon} size={24} />
                  </button>
                );
              })}
            </div>

            {/* Center Area: Steve 3D Preview Chamber + Off-Hand Shield Slot */}
            <div className="flex items-end gap-1.5">
              <div className="w-[102px] sm:w-[112px] h-[142px] sm:h-[154px] bg-black border-2 border-t-[#373737] border-l-[#373737] border-b-[#ffffff] border-r-[#ffffff] flex flex-col items-center justify-between relative overflow-hidden">
                <InteractiveSteve className="w-full h-[126px] sm:h-[136px]" />
                {/* Drag to spin bar at bottom matching reference image */}
                <div className="w-full bg-[#111111]/90 py-0.5 text-center font-minecraft text-[7px] sm:text-[8px] text-[#aaaaaa] border-t border-[#333333] tracking-wider select-none pointer-events-none">
                  ◀ DRAG TO SPIN ▶
                </div>
              </div>

              {/* Offhand Slot (Beside Steve at bottom-right) */}
              <button
                type="button"
                onClick={() => handleSelectSkill(offhandItem)}
                aria-label="Off-Hand Shield Slot"
                className={`
                  w-9 h-9 sm:w-10 sm:h-10 bg-[#8b8b8b] relative flex items-center justify-center cursor-pointer transition-colors
                  border-2 border-t-[#373737] border-l-[#373737] border-b-[#ffffff] border-r-[#ffffff]
                  hover:bg-[#9e9e9e] active:scale-95
                  ${activeSkill?.name === offhandItem.equippedName ? "border-white ring-1 ring-white" : ""}
                `}
                title={`${offhandItem.equippedName} (${offhandItem.enchantment})`}
              >
                <PixelIcon name="shield-wood" size={24} />
              </button>
            </div>

            {/* Right Column: Crafting Area */}
            <div className="flex flex-col items-start self-start pt-0.5">
              <div className="font-minecraft text-xs text-[#373737] font-bold mb-1 ml-0.5 select-none">
                Crafting
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* 2x2 Slots Grid */}
                <div className="grid grid-cols-2 gap-[2px] bg-[#8b8b8b] p-0.5 border-t-2 border-l-2 border-[#373737] border-b-2 border-r-2 border-[#ffffff]">
                  {currentRecipe.inputs.map((inp, idx) => (
                    <div
                      key={`craft-${idx}`}
                      onClick={() => {
                        playClick();
                        setRecipeIndex((prev) => (prev + 1) % recipes.length);
                      }}
                      className="w-8 h-8 sm:w-9 sm:h-9 bg-[#8b8b8b] border-2 border-t-[#373737] border-l-[#373737] border-b-[#ffffff] border-r-[#ffffff] flex items-center justify-center cursor-pointer hover:bg-[#9e9e9e] transition-colors"
                      title={`${inp.name} (Click to cycle recipe)`}
                    >
                      <PixelIcon name={inp.icon} size={18} />
                    </div>
                  ))}
                </div>

                {/* Crafting Arrow */}
                <div
                  onClick={() => {
                    playClick();
                    setRecipeIndex((prev) => (prev + 1) % recipes.length);
                  }}
                  className="cursor-pointer hover:opacity-75 transition-opacity px-0.5"
                  title="Click to cycle crafting recipe"
                >
                  <PixelIcon name="crafting-arrow" size={24} />
                </div>

                {/* Output Slot */}
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
                  className="w-10 h-10 sm:w-11 sm:h-11 bg-[#8b8b8b] border-2 border-t-[#373737] border-l-[#373737] border-b-[#ffffff] border-r-[#ffffff] flex items-center justify-center cursor-pointer hover:bg-[#9e9e9e] transition-colors"
                  title={`${currentRecipe.outputName}: Click to inspect`}
                >
                  <PixelIcon name={currentRecipe.outputIcon} size={24} />
                </div>
              </div>

              {/* Minimal Recipe Cycle Indicator */}
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setRecipeIndex((prev) => (prev + 1) % recipes.length);
                }}
                className="font-minecraft text-[9px] text-[#555555] hover:text-[#111111] mt-1.5 ml-0.5 cursor-pointer text-left transition-colors"
                title="Click to cycle recipes"
              >
                Recipe: <span className="font-bold underline">{currentRecipe.name}</span>
              </button>
            </div>
          </div>

          {/* Middle Section: 3 Rows of 9 Main Inventory Slots (27 Slots) */}
          <div className="mb-1">
            <div className="grid grid-cols-9 gap-[2px] sm:gap-1 p-1 bg-[#8b8b8b] border-t-2 border-l-2 border-[#373737] border-b-2 border-r-2 border-[#ffffff]">
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
                        w-full h-full relative flex items-center justify-center outline-none transition-colors
                        border-2 border-t-[#373737] border-l-[#373737] border-b-[#ffffff] border-r-[#ffffff]
                        ${
                          skill
                            ? "bg-[#8b8b8b] hover:bg-[#a0a0a0] cursor-pointer"
                            : "bg-[#8b8b8b] cursor-default"
                        }
                        ${isSelected ? "border-white ring-1 ring-white" : ""}
                      `}
                    >
                      {skill && (
                        <>
                          <PixelIcon
                            name={skill.icon}
                            size={20}
                          />
                          <span
                            className="absolute bottom-0.5 right-0.5 font-minecraft text-[8px] sm:text-[9px] text-white font-bold pointer-events-none drop-shadow-[1px_1px_0_#000]"
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

          {/* Bottom Section: 1 Row of 9 Hotbar Slots with Authentic Separator Gap */}
          <div className="mt-1">
            <div className="grid grid-cols-9 gap-[2px] sm:gap-1 p-1 bg-[#8b8b8b] border-t-2 border-l-2 border-[#373737] border-b-2 border-r-2 border-[#ffffff]">
              {hotbarSkills.map((skill, index) => {
                const isSelected = activeSkill?.name === skill.name || activeHotbarSlot === index;

                return (
                  <div
                    key={`hotbar-${index}`}
                    className="relative group flex items-center justify-center aspect-square"
                  >
                    <button
                      type="button"
                      onClick={() => handleSelectSkill(skill, index)}
                      aria-label={`${skill.name}: Hotbar slot ${index + 1}`}
                      className={`
                        w-full h-full relative flex items-center justify-center outline-none transition-colors
                        border-2 border-t-[#373737] border-l-[#373737] border-b-[#ffffff] border-r-[#ffffff]
                        bg-[#8b8b8b] hover:bg-[#a0a0a0] cursor-pointer
                        ${isSelected ? "border-white ring-1 ring-white" : ""}
                      `}
                    >
                      <PixelIcon
                        name={skill.icon}
                        size={20}
                      />
                      <span
                        className="absolute bottom-0.5 right-0.5 font-minecraft text-[8px] sm:text-[9px] text-white font-bold pointer-events-none drop-shadow-[1px_1px_0_#000]"
                      >
                        {skill.stackCount}
                      </span>
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
                          rarity={skill.level >= 90 ? "legendary" : "rare"}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Item Details Footer Box */}
          {activeSkill && (
            <div className="mt-2.5 p-2 bg-[#1e2025] text-white border-2 border-t-[#111111] border-l-[#111111] border-b-[#555555] border-r-[#555555] flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {"icon" in activeSkill && typeof activeSkill.icon === "string" && (
                  <PixelIcon name={activeSkill.icon as unknown as Parameters<typeof PixelIcon>[0]["name"]} size={22} />
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

        {/* 1-9 Numbered Hotbar Selector at bottom matching reference image */}
        <div className="mt-3 flex items-center justify-center">
          <div className="flex items-center bg-[#1e1e1e]/90 p-1 border-2 border-[#555555] shadow-lg">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((slotNum, idx) => {
              const isSlotActive = activeHotbarSlot === idx;
              return (
                <div
                  key={`slot-num-${slotNum}`}
                  onClick={() => {
                    playPop();
                    setActiveHotbarSlot(idx);
                    if (hotbarSkills[idx]) {
                      setActiveSkill(hotbarSkills[idx]);
                    }
                  }}
                  className={`
                    w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center font-minecraft text-xs cursor-pointer transition-all
                    border border-[#333333]
                    ${
                      isSlotActive
                        ? "bg-[#333333] text-white border-2 border-[#ffffff] shadow-[inset_0_0_4px_#ffff55]"
                        : "bg-[#181818] text-[#888888] hover:text-white hover:bg-[#252525]"
                    }
                  `}
                >
                  {slotNum}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
