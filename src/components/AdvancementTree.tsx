"use client";

import React, { useState } from "react";
import { timelineData } from "@/data/timeline";
import { TimelineNode } from "@/types";
import { PixelIcon } from "@/components/ui/PixelIcon";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export const AdvancementTree: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<TimelineNode>(timelineData[2]);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const { playPop } = useSoundEffects();

  const handleSelect = (node: TimelineNode) => {
    playPop();
    setSelectedNode(node);
  };

  const filteredNodes =
    activeFilter === "all"
      ? timelineData
      : timelineData.filter((node) => node.kind === activeFilter);

  const getFrameStyle = (type: string, status: string) => {
    if (type === "challenge") {
      return status === "completed"
        ? "border-4 border-[#eab308] bg-[#3b0764] shadow-[0_0_12px_rgba(234,179,8,0.7)]"
        : "border-4 border-[#ca8a04]/50 bg-[#1e1b2e]";
    }
    if (type === "goal") {
      return status === "completed"
        ? "border-4 border-[#38bdf8] bg-[#0c2e42] shadow-[0_0_8px_rgba(56,189,248,0.5)]"
        : "border-4 border-[#0284c7]/50 bg-[#0f172a]";
    }
    return status === "completed"
      ? "border-3 border-[#22c55e] bg-[#14321d] shadow-[0_0_6px_rgba(34,197,94,0.4)]"
      : "border-3 border-[#6b7280] bg-[#1f2937]";
  };

  return (
    <section
      id="timeline"
      aria-label="Atharva's Journey and Advancements"
      className="min-h-screen py-20 px-4 flex flex-col items-center justify-center relative select-none"
    >
      <div className="w-full max-w-4xl flex flex-col items-center">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <PixelIcon name="beacon" size={24} />
          <h2
            className="font-minecraft text-xl md:text-2xl text-[#ffff55] tracking-wider uppercase"
            style={{ textShadow: "2px 2px 0 #000" }}
          >
            Advancements & Timeline
          </h2>
        </div>
        <p className="font-sans text-xs sm:text-sm text-[#9ca3af] mb-6 text-center max-w-md">
          Trace the quests, education, and pivotal milestones of Atharva&apos;s journey.
        </p>

        {/* Tab Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {[
            { id: "all", label: "All Advancements" },
            { id: "education", label: "Education" },
            { id: "work", label: "Craft & Projects" },
            { id: "achievement", label: "Achievements" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                playPop();
                setActiveFilter(tab.id);
              }}
              className={`
                px-3 py-1 font-minecraft text-xs uppercase cursor-pointer transition-all
                ${
                  activeFilter === tab.id
                    ? "bg-[#eab308] text-black font-bold border-2 border-white shadow-[0_0_8px_rgba(234,179,8,0.5)]"
                    : "bg-[#252830] hover:bg-[#323642] text-[#cccccc] border-2 border-[#3f4352]"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Advancement Tree Board */}
        <div className="w-full max-w-3xl bg-[#111216] border-4 border-[#3a3b42] p-4 sm:p-6 shadow-2xl relative overflow-hidden">
          {/* Subtle grid backdrop pattern */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#4b5563_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

          {/* Advancement Nodes Grid / Tree */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 py-4">
            {filteredNodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              const frameClasses = getFrameStyle(node.advancementType, node.status);

              return (
                <div
                  key={node.id}
                  onClick={() => handleSelect(node)}
                  className={`
                    relative flex flex-col items-center p-3 transition-all cursor-pointer group
                    ${isSelected ? "scale-105" : "hover:scale-102"}
                  `}
                >
                  {/* Badge Frame */}
                  <div
                    className={`
                      w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center relative
                      ${frameClasses}
                      ${isSelected ? "ring-2 ring-white ring-offset-2 ring-offset-black" : ""}
                    `}
                  >
                    <PixelIcon
                      name={node.icon}
                      size={30}
                      className="group-hover:scale-110 transition-transform"
                    />

                    {/* Status corner badge */}
                    {node.status === "completed" && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#22c55e] border border-black flex items-center justify-center text-[9px] text-black font-bold">
                        ✓
                      </span>
                    )}
                  </div>

                  {/* Node Title */}
                  <div className="font-minecraft text-xs text-center font-bold text-white mt-2 group-hover:text-[#ffff55] transition-colors truncate max-w-full">
                    {node.title}
                  </div>
                  <div className="font-minecraft text-[9px] text-[#9ca3af] mt-0.5">
                    {node.period}
                  </div>
                  <div
                    className={`font-minecraft text-[8px] uppercase mt-1 px-1 py-0.5 border ${
                      node.status === "completed"
                        ? "text-[#4ade80] border-[#4ade80]/40"
                        : "text-[#fbbf24] border-[#fbbf24]/40"
                    }`}
                  >
                    {node.status === "completed" ? "Unlocked" : "In Progress"}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Node Details Box (Minecraft Toast style) */}
          {selectedNode && (
            <div className="mt-6 p-4 bg-[#1f2026] border-2 border-[#4b4e5c] text-white relative">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#363945] pb-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-minecraft text-xs text-[#eab308] uppercase tracking-wider">
                    {selectedNode.advancementType} Advancement:
                  </span>
                  <span className="font-minecraft text-sm font-bold text-white">
                    {selectedNode.title}
                  </span>
                </div>
                <div className="font-minecraft text-xs text-[#22c55e]">
                  +{selectedNode.xpReward} XP Unlocked
                </div>
              </div>

              <div className="font-minecraft text-xs text-[#38bdf8] mb-1">
                {selectedNode.subtitle} ({selectedNode.period})
              </div>

              <p className="font-sans text-xs sm:text-sm text-[#d1d5db] leading-relaxed">
                {selectedNode.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
