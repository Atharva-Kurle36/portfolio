"use client";

import React, { useState } from "react";
import { skillsData } from "@/data/skills";
import { Skill } from "@/types";
import { PixelIcon } from "@/components/ui/PixelIcon";
import { MinecraftTooltipContent } from "@/components/Tooltip";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export const Inventory: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeSkill, setActiveSkill] = useState<Skill | null>(skillsData[0]);
  const { playPop } = useSoundEffects();

  const categories = [
    { id: "all", label: "All Items" },
    { id: "languages", label: "Languages" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "tools", label: "Tools" },
    { id: "systems", label: "Systems" },
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

  const handleSelectSkill = (skill: Skill | null) => {
    if (skill) {
      playPop();
      setActiveSkill(skill);
    }
  };

  return (
    <section
      id="skills"
      aria-label="Atharva's Inventory and Skills"
      className="min-h-screen py-20 px-4 flex flex-col items-center justify-center relative select-none"
    >
      <div className="w-full max-w-4xl flex flex-col items-center">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <PixelIcon name="crafting-table" size={24} />
          <h2
            className="font-minecraft text-xl md:text-2xl text-[#ffff55] tracking-wider uppercase"
            style={{ textShadow: "2px 2px 0 #000" }}
          >
            Inventory & Crafting
          </h2>
        </div>
        <p className="font-sans text-xs sm:text-sm text-[#9ca3af] mb-6 text-center max-w-md">
          Hover to inspect enchantments, stack sizes, and proficiency levels.
        </p>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                playPop();
                setSelectedCategory(cat.id);
              }}
              className={`
                px-3 py-1.5 font-minecraft text-xs transition-all cursor-pointer
                ${
                  selectedCategory === cat.id
                    ? "bg-[#22c55e] text-white border-2 border-[#86efac] shadow-[0_0_8px_rgba(34,197,94,0.5)]"
                    : "bg-[#27272a] hover:bg-[#3f3f46] text-[#cccccc] border-2 border-[#52525b]"
                }
              `}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Minecraft Inventory GUI Container */}
        <div className="w-full max-w-3xl bg-[#c6c6c6] p-4 sm:p-6 border-4 border-[#ffffff] border-b-4 border-r-4 border-b-[#555555] border-r-[#555555] shadow-2xl relative text-[#373737]">
          {/* Top Row: Crafting 2x2 Area & Player Preview */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 mb-6 border-b-2 border-[#8b8b8b]">
            {/* Player Info Summary */}
            <div className="flex items-center gap-3 bg-[#8b8b8b] p-3 border-t-2 border-l-2 border-[#373737] border-b-2 border-r-2 border-[#ffffff]">
              <PixelIcon name="totem" size={36} />
              <div>
                <div className="font-minecraft text-xs font-bold text-white" style={{ textShadow: "1px 1px 0 #000" }}>
                  Atharva Kurle
                </div>
                <div className="font-sans text-[11px] text-[#e0e0e0]">
                  Full-Stack Crafting Station
                </div>
              </div>
            </div>

            {/* 2x2 Crafting Grid */}
            <div className="flex items-center gap-3">
              <div>
                <div className="font-minecraft text-[10px] text-[#4a4a4a] mb-1 text-center">
                  Crafting
                </div>
                <div className="grid grid-cols-2 gap-1 bg-[#8b8b8b] p-1.5 border-t-2 border-l-2 border-[#373737] border-b-2 border-r-2 border-[#ffffff]">
                  <div className="w-9 h-9 bg-[#8b8b8b] border-2 border-t-[#373737] border-l-[#373737] border-b-[#ffffff] border-r-[#ffffff] flex items-center justify-center">
                    <PixelIcon name="sword" size={18} />
                  </div>
                  <div className="w-9 h-9 bg-[#8b8b8b] border-2 border-t-[#373737] border-l-[#373737] border-b-[#ffffff] border-r-[#ffffff] flex items-center justify-center">
                    <PixelIcon name="redstone" size={18} />
                  </div>
                  <div className="w-9 h-9 bg-[#8b8b8b] border-2 border-t-[#373737] border-l-[#373737] border-b-[#ffffff] border-r-[#ffffff] flex items-center justify-center">
                    <PixelIcon name="beacon" size={18} />
                  </div>
                  <div className="w-9 h-9 bg-[#8b8b8b] border-2 border-t-[#373737] border-l-[#373737] border-b-[#ffffff] border-r-[#ffffff] flex items-center justify-center">
                    <PixelIcon name="gold-apple" size={18} />
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="font-minecraft text-lg text-[#4a4a4a] pt-4">
                ▶
              </div>

              {/* Result Slot */}
              <div>
                <div className="font-minecraft text-[10px] text-[#4a4a4a] mb-1 text-center">
                  Result
                </div>
                <div className="w-12 h-12 bg-[#8b8b8b] p-1 border-t-2 border-l-2 border-[#373737] border-b-2 border-r-2 border-[#ffffff] flex items-center justify-center">
                  <div className="relative group">
                    <PixelIcon name="beacon" size={28} className="animate-pulse" />
                    <span className="absolute bottom-0 right-0 font-minecraft text-[9px] text-[#ffff55]" style={{ textShadow: "1px 1px 0 #000" }}>
                      ★
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main 9x3 Inventory Grid */}
          <div className="mb-2">
            <div className="font-minecraft text-xs text-[#4a4a4a] mb-2 font-bold">
              Inventory
            </div>

            <div className="grid grid-cols-9 gap-1 sm:gap-1.5 p-2 bg-[#8b8b8b] border-t-2 border-l-2 border-[#373737] border-b-2 border-r-2 border-[#ffffff]">
              {inventorySlots.map((skill, index) => {
                const isSelected = activeSkill?.name === skill?.name;

                return (
                  <div
                    key={index}
                    className="relative group flex items-center justify-center aspect-square"
                  >
                    <button
                      type="button"
                      disabled={!skill}
                      onClick={() => handleSelectSkill(skill)}
                      aria-label={skill ? `${skill.name}: ${skill.enchantment}` : "Empty inventory slot"}
                      className={`
                        w-full h-full relative flex items-center justify-center outline-none transition-all
                        border-2 border-t-[#373737] border-l-[#373737] border-b-[#ffffff] border-r-[#ffffff]
                        ${
                          skill
                            ? "bg-[#8b8b8b] hover:bg-[#a0a0a0] cursor-pointer"
                            : "bg-[#8b8b8b]/60 cursor-default"
                        }
                        ${
                          isSelected
                            ? "ring-2 ring-[#ffff55] ring-offset-1 ring-offset-[#8b8b8b]"
                            : ""
                        }
                      `}
                    >
                      {skill && (
                        <>
                          {/* Pixel Icon */}
                          <PixelIcon
                            name={skill.icon}
                            size={22}
                            className={`transform group-hover:scale-110 transition-transform ${
                              skill.level > 90 ? "drop-shadow-[0_0_4px_#c084fc]" : ""
                            }`}
                          />

                          {/* Stack Count (e.g. 64) */}
                          <span
                            className="absolute bottom-0.5 right-1 font-minecraft text-[9px] sm:text-[10px] text-white font-bold pointer-events-none"
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

          {/* Active Item Details Footer */}
          {activeSkill && (
            <div className="mt-4 p-3 bg-[#1e1e24] text-white border-2 border-[#333333] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <PixelIcon name={activeSkill.icon} size={28} />
                <div>
                  <div className="font-minecraft text-xs text-[#ffff55]">
                    {activeSkill.name} - {activeSkill.enchantment}
                  </div>
                  <div className="font-sans text-xs text-[#a1a1aa]">
                    {activeSkill.description}
                  </div>
                </div>
              </div>
              <div className="shrink-0 flex items-center gap-2 font-minecraft text-xs text-[#4ade80]">
                <span>LVL {activeSkill.level}</span>
                <span className="text-[#a1a1aa]">|</span>
                <span>STACK {activeSkill.stackCount}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
