"use client";

import React, { useState, useEffect } from "react";
import { timelineData } from "@/data/timeline";
import { TimelineNode } from "@/types";
import { PixelIcon } from "@/components/ui/PixelIcon";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface NodePosition {
  col: number;
  row: number;
}

const nodePositions: Record<string, NodePosition> = {
  "root-spawn": { col: 0, row: 0 },
  "high-school": { col: 1, row: 0 },
  "university-admit": { col: 2, row: 0 },
  "systems-craft": { col: 3, row: 0 },
  "future-frontiers": { col: 4, row: 0 },
  "hackathon-quest": { col: 2, row: 1 },
  "fullstack-mastery": { col: 3, row: 1 },
};

export const AdvancementTree: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<TimelineNode>(timelineData[4]); // Diamonds by default
  const [activeTab, setActiveTab] = useState<string>("all");
  const [toast, setToast] = useState<{ node: TimelineNode; show: boolean } | null>(null);
  const { playPop, playClick, playLevelUp, playDing } = useSoundEffects();

  const tabs = [
    { id: "all", label: "All Quests", icon: "compass" as const, bg: "stone" },
    { id: "story", label: "Story: Roots", icon: "book" as const, bg: "stone" },
    { id: "adventure", label: "Adventure: Craft", icon: "sword" as const, bg: "wood" },
    { id: "nether", label: "Nether: Systems", icon: "portal" as const, bg: "nether" },
    { id: "end", label: "The End: AI", icon: "beacon" as const, bg: "end" },
  ];

  const handleSelectNode = (node: TimelineNode, triggerToast = true) => {
    setSelectedNode(node);
    if (triggerToast) {
      if (node.advancementType === "challenge") {
        playLevelUp();
      } else {
        playDing();
      }
      setToast({ node, show: true });
    } else {
      playPop();
    }
  };

  // Auto-dismiss toast after 4 seconds
  useEffect(() => {
    if (toast?.show) {
      const timer = setTimeout(() => {
        setToast((prev) => (prev ? { ...prev, show: false } : null));
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const filteredNodes =
    activeTab === "all"
      ? timelineData
      : timelineData.filter((node) => node.tab === activeTab);

  // Background pattern per active tab
  const getCanvasBackground = () => {
    switch (activeTab) {
      case "adventure":
        return "bg-dirt-pattern";
      case "nether":
        return "bg-[#180816] bg-[radial-gradient(#4a0e4e_1px,transparent_1px)] [background-size:16px_16px]";
      case "end":
        return "bg-[#0b0c16] bg-[radial-gradient(#1e1b4b_1px,transparent_1px)] [background-size:16px_16px]";
      default:
        return "bg-stone-pattern";
    }
  };

  const getFrameDesign = (type: string, status: string, isSelected: boolean) => {
    if (type === "challenge") {
      // 8-pointed star challenge frame with gold border & purple enchanted glint
      return `
        w-16 h-16 relative flex items-center justify-center p-1
        ${status === "completed" ? "bg-[#3b0764] mc-enchanted shadow-[0_0_16px_rgba(234,179,8,0.7)]" : "bg-[#181124] opacity-80"}
        border-4 border-[#eab308]
        ${isSelected ? "ring-4 ring-white ring-offset-2 ring-offset-black scale-105" : "hover:scale-105"}
      `;
    }
    if (type === "goal") {
      // Rounded circular goal frame
      return `
        w-15 h-15 rounded-full relative flex items-center justify-center p-1
        ${status === "completed" ? "bg-[#0284c7] shadow-[0_0_12px_rgba(56,189,248,0.6)]" : "bg-[#0f172a] opacity-80"}
        border-4 border-[#38bdf8]
        ${isSelected ? "ring-4 ring-white ring-offset-2 ring-offset-black scale-105" : "hover:scale-105"}
      `;
    }
    // Standard square task frame
    return `
      w-14 h-14 relative flex items-center justify-center p-1
      ${status === "completed" ? "bg-[#14321d] shadow-[0_0_8px_rgba(34,197,94,0.4)]" : "bg-[#1e232a] opacity-80"}
      border-4 border-[#86efac]
      ${isSelected ? "ring-4 ring-white ring-offset-2 ring-offset-black scale-105" : "hover:scale-105"}
    `;
  };

  // Calculate coordinates for SVG connector lines in the canvas
  // Grid size: col width = 180px, row height = 140px, padding = 40px
  const colWidth = 190;
  const rowHeight = 150;
  const padX = 60;
  const padY = 60;

  const getNodeCenter = (nodeId: string) => {
    const pos = nodePositions[nodeId];
    if (!pos) return { x: 0, y: 0 };
    return {
      x: padX + pos.col * colWidth + 32,
      y: padY + pos.row * rowHeight + 32,
    };
  };

  return (
    <section
      id="timeline"
      aria-label="Atharva's Journey and Advancements"
      className="min-h-screen py-16 px-3 sm:px-6 flex flex-col items-center justify-center relative select-none overflow-hidden"
    >
      {/* Background Celestial End Dimension Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/minecraft_celestial.jpg')",
          imageRendering: "pixelated",
        }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
      </div>

      {/* Minecraft Toast Notification (Top Right) */}
      {toast?.show && (
        <aside
          aria-live="polite"
          aria-label="Advancement Notification"
          className="fixed top-20 right-4 z-50 max-w-sm bg-[#212121] border-4 border-[#ffff55] p-3 shadow-[0_8px_24px_rgba(0,0,0,0.9)] animate-bounce flex items-center gap-3"
        >
          <div className="w-12 h-12 bg-[#333333] border-2 border-white flex items-center justify-center shrink-0">
            <PixelIcon name={toast.node.icon} size={28} />
          </div>
          <div className="min-w-0">
            <div
              className={`font-minecraft text-[10px] uppercase font-bold tracking-wider ${
                toast.node.advancementType === "challenge"
                  ? "text-[#d946ef]"
                  : "text-[#ffff55]"
              }`}
            >
              {toast.node.advancementType === "challenge"
                ? "Challenge Complete!"
                : "Advancement Made!"}
            </div>
            <div className="font-minecraft text-xs text-white truncate font-bold">
              {toast.node.title}
            </div>
            <div className="font-minecraft text-[9px] text-[#4ade80]">
              +{toast.node.xpReward} Experience Points
            </div>
          </div>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="text-[#888888] hover:text-white font-minecraft text-xs px-1 cursor-pointer"
          >
            ✕
          </button>
        </aside>
      )}

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
        {/* Header Banner */}
        <div className="flex items-center gap-2 mb-1">
          <PixelIcon name="trophy" size={26} />
          <h2
            className="font-minecraft text-xl sm:text-2xl text-[#ffff55] tracking-wider uppercase"
            style={{ textShadow: "2px 2px 0 #000" }}
          >
            Advancements & Journey
          </h2>
        </div>
        <p className="font-sans text-xs sm:text-sm text-[#d1d5db] mb-4 text-center max-w-lg">
          Click any milestone to inspect quest lore, unlocked recipes, and XP rewards.
        </p>

        {/* Protruding Minecraft Folder Tabs */}
        <div className="w-full flex items-end justify-start sm:justify-center gap-1.5 overflow-x-auto pb-0 px-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  playClick();
                  setActiveTab(tab.id);
                }}
                className={`
                  flex items-center gap-2 px-3 sm:px-4 py-2 font-minecraft text-xs uppercase cursor-pointer transition-all
                  border-t-3 border-l-3 border-r-3
                  ${
                    isActive
                      ? "bg-[#2d3038] text-[#ffff55] border-[#ffffff] border-b-0 -mb-[2px] z-20 shadow-[0_-4px_12px_rgba(0,0,0,0.5)] translate-y-[-2px]"
                      : "bg-[#18191f] hover:bg-[#22242c] text-[#aaaaaa] border-[#444652] border-b-2 border-b-[#000000]"
                  }
                `}
              >
                <PixelIcon name={tab.icon} size={16} />
                <span className="whitespace-nowrap">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Authentic Minecraft Advancement GUI Window */}
        <div className="w-full bg-[#1b1c22] border-4 border-[#3f414d] p-3 sm:p-5 shadow-[0_16px_48px_rgba(0,0,0,0.9)] relative overflow-hidden">
          {/* Top Wooden / Iron Rivets */}
          <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 bg-[#666666] border border-black" />
          <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#666666] border border-black" />
          <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 bg-[#666666] border border-black" />
          <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 bg-[#666666] border border-black" />

          {/* Advancement Tree Canvas (Scrollable on small screens) */}
          <div
            className={`w-full overflow-x-auto relative p-4 border-2 border-black min-h-[340px] ${getCanvasBackground()}`}
          >
            {/* Inner Dark Vignette Shading */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 pointer-events-none" />

            <div className="relative min-w-[940px] h-[320px]">
              {/* SVG Connector Branch Lines */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <filter id="glow-gold" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#ffff55" />
                  </filter>
                  <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#38bdf8" />
                  </filter>
                </defs>

                {timelineData.map((node) => {
                  if (!node.parentId) return null;
                  const start = getNodeCenter(node.parentId);
                  const end = getNodeCenter(node.id);
                  if (start.x === 0 || end.x === 0) return null;

                  const parentNode = timelineData.find((n) => n.id === node.parentId);
                  const isBothDone =
                    parentNode?.status === "completed" && node.status === "completed";
                  const isInProgress = node.status === "in-progress";

                  const strokeColor = isBothDone
                    ? "#ffff55"
                    : isInProgress
                    ? "#38bdf8"
                    : "#4b5563";

                  const strokeWidth = isBothDone ? 4 : 3;
                  const strokeDash = isInProgress ? "6,4" : undefined;
                  const filter = isBothDone
                    ? "url(#glow-gold)"
                    : isInProgress
                    ? "url(#glow-cyan)"
                    : undefined;

                  // 90-degree orthogonal bend line
                  const midX = (start.x + end.x) / 2;
                  const pathD =
                    start.y === end.y
                      ? `M ${start.x} ${start.y} L ${end.x} ${end.y}`
                      : `M ${start.x} ${start.y} L ${midX} ${start.y} L ${midX} ${end.y} L ${end.x} ${end.y}`;

                  return (
                    <g key={`link-${node.parentId}-${node.id}`}>
                      {/* Shadow line */}
                      <path
                        d={pathD}
                        fill="none"
                        stroke="#000000"
                        strokeWidth={strokeWidth + 3}
                        strokeLinecap="square"
                        strokeLinejoin="miter"
                      />
                      {/* Main line */}
                      <path
                        d={pathD}
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                        strokeDasharray={strokeDash}
                        filter={filter}
                        strokeLinecap="square"
                        strokeLinejoin="miter"
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Advancement Nodes */}
              {timelineData.map((node) => {
                const pos = nodePositions[node.id];
                if (!pos) return null;

                const isSelected = selectedNode?.id === node.id;
                const isFiltered =
                  activeTab === "all" || node.tab === activeTab;
                const frameClass = getFrameDesign(
                  node.advancementType,
                  node.status,
                  isSelected
                );

                const left = padX + pos.col * colWidth;
                const top = padY + pos.row * rowHeight;

                return (
                  <div
                    key={node.id}
                    style={{ left: `${left}px`, top: `${top}px` }}
                    onClick={() => handleSelectNode(node, true)}
                    className={`
                      absolute z-10 flex flex-col items-center cursor-pointer transition-all duration-200
                      ${isFiltered ? "opacity-100" : "opacity-35 hover:opacity-75"}
                    `}
                  >
                    {/* Node Frame */}
                    <div className={frameClass}>
                      <PixelIcon
                        name={node.icon}
                        size={30}
                        className="transition-transform group-hover:scale-110"
                      />

                      {/* Status indicator pin */}
                      {node.status === "completed" ? (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#22c55e] border border-black flex items-center justify-center text-[10px] text-black font-bold">
                          ✓
                        </span>
                      ) : (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#0ea5e9] border border-black flex items-center justify-center text-[9px] text-white font-bold animate-pulse">
                          ⚙
                        </span>
                      )}
                    </div>

                    {/* Node Title & Period */}
                    <div
                      className={`font-minecraft text-xs font-bold mt-2 text-center max-w-[130px] truncate ${
                        isSelected ? "text-[#ffff55]" : "text-white"
                      }`}
                      style={{ textShadow: "1px 1px 0 #000" }}
                    >
                      {node.title}
                    </div>
                    <div
                      className="font-minecraft text-[9px] text-[#9ca3af]"
                      style={{ textShadow: "1px 1px 0 #000" }}
                    >
                      {node.period}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Horizontal scroll hint for mobile */}
          <div className="font-minecraft text-[9px] text-[#888888] text-center mt-2 sm:hidden">
            ◀ Swipe or scroll canvas to view full tech tree ▶
          </div>

          {/* Selected Quest Inspection Box (Authentic Minecraft Quest Terminal) */}
          {selectedNode && (
            <div className="mt-4 p-4 bg-[#14151a] border-3 border-[#363945] text-white relative">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-[#2b2d37] pb-2.5 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-[#252830] border border-white flex items-center justify-center shrink-0">
                    <PixelIcon name={selectedNode.icon} size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-minecraft text-[10px] uppercase font-bold px-1.5 py-0.5 border ${
                          selectedNode.advancementType === "challenge"
                            ? "bg-[#581c87] text-[#e879f9] border-[#c084fc]"
                            : selectedNode.advancementType === "goal"
                            ? "bg-[#0c4a6e] text-[#38bdf8] border-[#38bdf8]"
                            : "bg-[#14532d] text-[#4ade80] border-[#22c55e]"
                        }`}
                      >
                        {selectedNode.advancementType}
                      </span>
                      <h3 className="font-minecraft text-sm sm:text-base font-bold text-white">
                        {selectedNode.title}
                      </h3>
                    </div>
                    <div className="font-sans text-xs text-[#94a3b8]">
                      {selectedNode.subtitle} • ({selectedNode.period})
                    </div>
                  </div>
                </div>

                {/* XP & Rewards */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 font-minecraft text-xs text-[#4ade80] bg-[#14532d]/40 border border-[#22c55e]/50 px-2.5 py-1">
                    <PixelIcon name="xp" size={16} />
                    <span>+{selectedNode.xpReward} XP</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSelectNode(selectedNode, true)}
                    className="font-minecraft text-[10px] uppercase bg-[#252830] hover:bg-[#3b3f4d] text-[#ffff55] border border-[#525668] px-2.5 py-1 cursor-pointer transition-colors"
                  >
                    Test Fanfare
                  </button>
                </div>
              </div>

              {/* Description & Rewards Lore */}
              <p className="font-sans text-xs sm:text-sm text-[#e2e8f0] leading-relaxed mb-3">
                {selectedNode.description}
              </p>

              {/* Rewards Item Drop */}
              {selectedNode.rewardItem && (
                <div className="p-2.5 bg-[#0f1013] border border-[#23252d] flex items-center gap-2 text-xs font-minecraft text-[#fbbf24]">
                  <PixelIcon name="chest" size={16} />
                  <span className="text-[#a1a1aa]">Loot Dropped:</span>
                  <span className="text-[#ffff55]">{selectedNode.rewardItem}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

