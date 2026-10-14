import React from "react";
import { IconName } from "@/types";

interface PixelIconProps {
  name:
    | IconName
    | "speaker"
    | "speaker-muted"
    | "arrow-left"
    | "arrow-right"
    | "close"
    | "external"
    | "check"
    | "globe"
    | "accessibility"
    | "map"
    | "eye-of-ender"
    | "trophy"
    | "hunger";
  className?: string;
  size?: number;
}

export const PixelIcon: React.FC<PixelIconProps> = ({
  name,
  className = "",
  size = 24,
}) => {
  const commonProps = {
    width: size,
    height: size,
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: `inline-block shrink-0 select-none ${className}`,
    style: {
      shapeRendering: "crispEdges" as const,
      imageRendering: "pixelated" as const,
    },
  };

  switch (name) {
    case "sword":
      return (
        <svg {...commonProps}>
          {/* Blade */}
          <rect x="13" y="1" width="2" height="2" fill="#55ffff" />
          <rect x="11" y="3" width="2" height="2" fill="#55ffff" />
          <rect x="9" y="5" width="2" height="2" fill="#00aaaa" />
          <rect x="7" y="7" width="2" height="2" fill="#00aaaa" />
          <rect x="12" y="2" width="2" height="2" fill="#ffffff" />
          <rect x="10" y="4" width="2" height="2" fill="#55ffff" />
          <rect x="8" y="6" width="2" height="2" fill="#00aaaa" />
          {/* Guard */}
          <rect x="5" y="7" width="2" height="2" fill="#855325" />
          <rect x="7" y="9" width="2" height="2" fill="#855325" />
          <rect x="6" y="8" width="2" height="2" fill="#ffd700" />
          <rect x="4" y="8" width="2" height="2" fill="#ffd700" />
          <rect x="8" y="10" width="2" height="2" fill="#ffd700" />
          {/* Handle */}
          <rect x="4" y="10" width="2" height="2" fill="#663300" />
          <rect x="3" y="11" width="2" height="2" fill="#663300" />
          {/* Pommel */}
          <rect x="1" y="13" width="2" height="2" fill="#ffd700" />
        </svg>
      );

    case "pickaxe":
      return (
        <svg {...commonProps}>
          {/* Head */}
          <rect x="10" y="2" width="4" height="2" fill="#55ffff" />
          <rect x="8" y="4" width="2" height="2" fill="#00aaaa" />
          <rect x="13" y="4" width="2" height="2" fill="#00aaaa" />
          <rect x="14" y="6" width="2" height="2" fill="#008080" />
          <rect x="4" y="2" width="6" height="2" fill="#55ffff" />
          <rect x="2" y="4" width="2" height="2" fill="#00aaaa" />
          <rect x="0" y="6" width="2" height="2" fill="#008080" />
          {/* Handle */}
          <rect x="7" y="5" width="2" height="2" fill="#855325" />
          <rect x="6" y="7" width="2" height="2" fill="#663300" />
          <rect x="5" y="9" width="2" height="2" fill="#663300" />
          <rect x="4" y="11" width="2" height="2" fill="#855325" />
          <rect x="3" y="13" width="2" height="2" fill="#663300" />
          <rect x="2" y="14" width="2" height="2" fill="#3b1f09" />
        </svg>
      );

    case "book":
      return (
        <svg {...commonProps}>
          {/* Cover */}
          <rect x="2" y="2" width="12" height="12" fill="#7a2419" />
          <rect x="2" y="2" width="2" height="12" fill="#50160e" />
          <rect x="12" y="2" width="2" height="12" fill="#50160e" />
          <rect x="2" y="12" width="12" height="2" fill="#50160e" />
          {/* Pages */}
          <rect x="4" y="3" width="8" height="9" fill="#fdf0d5" />
          <rect x="5" y="4" width="6" height="1" fill="#c69f6e" />
          <rect x="5" y="6" width="6" height="1" fill="#c69f6e" />
          <rect x="5" y="8" width="4" height="1" fill="#c69f6e" />
          {/* Corner gold ornaments */}
          <rect x="2" y="2" width="2" height="2" fill="#f5b041" />
          <rect x="12" y="2" width="2" height="2" fill="#f5b041" />
          <rect x="2" y="12" width="2" height="2" fill="#f5b041" />
          <rect x="12" y="12" width="2" height="2" fill="#f5b041" />
          {/* Bookmark ribbon */}
          <rect x="7" y="2" width="2" height="5" fill="#a83232" />
        </svg>
      );

    case "compass":
      return (
        <svg {...commonProps}>
          {/* Rim */}
          <rect x="4" y="1" width="8" height="2" fill="#d4af37" />
          <rect x="4" y="13" width="8" height="2" fill="#8c7320" />
          <rect x="1" y="4" width="2" height="8" fill="#d4af37" />
          <rect x="13" y="4" width="2" height="8" fill="#8c7320" />
          <rect x="2" y="2" width="3" height="3" fill="#b89326" />
          <rect x="11" y="2" width="3" height="3" fill="#b89326" />
          <rect x="2" y="11" width="3" height="3" fill="#6d5813" />
          <rect x="11" y="11" width="3" height="3" fill="#6d5813" />
          {/* Face */}
          <rect x="3" y="3" width="10" height="10" fill="#1b1c20" />
          {/* Needle - North (Red) */}
          <rect x="7" y="4" width="2" height="4" fill="#ff4444" />
          <rect x="6" y="6" width="1" height="2" fill="#ff6666" />
          {/* Needle - South (Silver) */}
          <rect x="7" y="8" width="2" height="4" fill="#cccccc" />
          <rect x="9" y="8" width="1" height="2" fill="#ffffff" />
          {/* Center Pivot */}
          <rect x="7" y="7" width="2" height="2" fill="#ffd700" />
        </svg>
      );

    case "redstone":
      return (
        <svg {...commonProps}>
          <rect x="6" y="2" width="4" height="2" fill="#ff2222" />
          <rect x="4" y="4" width="8" height="8" fill="#cc0000" />
          <rect x="2" y="6" width="12" height="4" fill="#990000" />
          <rect x="6" y="6" width="4" height="4" fill="#ff5555" />
          <rect x="7" y="7" width="2" height="2" fill="#ffffff" />
          <rect x="6" y="12" width="4" height="2" fill="#660000" />
        </svg>
      );

    case "chest":
      return (
        <svg {...commonProps}>
          {/* Body */}
          <rect x="1" y="2" width="14" height="12" fill="#b36224" />
          {/* Outer edge */}
          <rect x="1" y="2" width="14" height="1" fill="#3e230d" />
          <rect x="1" y="13" width="14" height="1" fill="#3e230d" />
          <rect x="1" y="2" width="1" height="12" fill="#3e230d" />
          <rect x="14" y="2" width="1" height="12" fill="#3e230d" />
          {/* Lid line */}
          <rect x="2" y="6" width="12" height="1" fill="#2d1909" />
          <rect x="2" y="7" width="12" height="1" fill="#753d14" />
          {/* Lock */}
          <rect x="7" y="5" width="2" height="4" fill="#dcdcdc" />
          <rect x="7" y="6" width="2" height="2" fill="#222222" />
        </svg>
      );

    case "potion":
      return (
        <svg {...commonProps}>
          {/* Stopper / Cork */}
          <rect x="6" y="1" width="4" height="2" fill="#8b5a2b" />
          {/* Neck */}
          <rect x="7" y="3" width="2" height="3" fill="#a4d8ec" />
          {/* Body */}
          <rect x="4" y="6" width="8" height="8" fill="#70b0cc" />
          <rect x="3" y="8" width="10" height="5" fill="#70b0cc" />
          <rect x="4" y="13" width="8" height="1" fill="#467e96" />
          {/* Liquid (Bright Purple) */}
          <rect x="4" y="9" width="8" height="4" fill="#c026d3" />
          <rect x="5" y="8" width="6" height="1" fill="#e879f9" />
          {/* Shine & bubbles */}
          <rect x="5" y="7" width="1" height="2" fill="#ffffff" />
          <rect x="6" y="10" width="1" height="1" fill="#fdf4ff" />
          <rect x="9" y="11" width="1" height="1" fill="#fae8ff" />
        </svg>
      );

    case "emerald":
      return (
        <svg {...commonProps}>
          <rect x="5" y="2" width="6" height="1" fill="#55ff55" />
          <rect x="3" y="3" width="10" height="2" fill="#22cc44" />
          <rect x="2" y="5" width="12" height="6" fill="#11aa33" />
          <rect x="3" y="11" width="10" height="2" fill="#008822" />
          <rect x="5" y="13" width="6" height="1" fill="#005511" />
          {/* Facet Highlights */}
          <rect x="5" y="4" width="4" height="2" fill="#aaffaa" />
          <rect x="4" y="6" width="2" height="4" fill="#ffffff" />
          <rect x="10" y="8" width="2" height="3" fill="#005511" />
        </svg>
      );

    case "gold-apple":
      return (
        <svg {...commonProps}>
          {/* Stem & Leaf */}
          <rect x="8" y="1" width="1" height="3" fill="#5d4037" />
          <rect x="9" y="1" width="2" height="2" fill="#4caf50" />
          {/* Body */}
          <rect x="4" y="4" width="8" height="9" fill="#ffd700" />
          <rect x="3" y="5" width="10" height="7" fill="#ffae00" />
          <rect x="4" y="13" width="3" height="1" fill="#c68a00" />
          <rect x="9" y="13" width="3" height="1" fill="#c68a00" />
          {/* Highlight */}
          <rect x="5" y="5" width="2" height="2" fill="#ffffff" />
          <rect x="4" y="7" width="1" height="3" fill="#fff5cc" />
        </svg>
      );

    case "furnace":
      return (
        <svg {...commonProps}>
          {/* Stone block */}
          <rect x="1" y="1" width="14" height="14" fill="#696969" />
          <rect x="1" y="1" width="14" height="1" fill="#999999" />
          <rect x="1" y="1" width="1" height="14" fill="#999999" />
          <rect x="1" y="14" width="14" height="1" fill="#333333" />
          <rect x="14" y="1" width="1" height="14" fill="#333333" />
          {/* Opening */}
          <rect x="4" y="5" width="8" height="7" fill="#1c1c1c" />
          {/* Fire */}
          <rect x="6" y="9" width="4" height="3" fill="#ff4500" />
          <rect x="7" y="8" width="2" height="3" fill="#ffd700" />
          <rect x="7" y="10" width="2" height="1" fill="#ffffff" />
        </svg>
      );

    case "crafting-table":
      return (
        <svg {...commonProps}>
          {/* Wooden Top */}
          <rect x="1" y="1" width="14" height="4" fill="#a0522d" />
          <rect x="2" y="2" width="12" height="2" fill="#cd853f" />
          {/* Grid lines on top */}
          <rect x="5" y="2" width="1" height="2" fill="#5c2e14" />
          <rect x="9" y="2" width="1" height="2" fill="#5c2e14" />
          {/* Base */}
          <rect x="1" y="5" width="14" height="10" fill="#8b4513" />
          <rect x="3" y="7" width="10" height="6" fill="#5c2e14" />
          {/* Tools carved */}
          <rect x="5" y="8" width="3" height="1" fill="#dcdcdc" />
          <rect x="6" y="9" width="1" height="3" fill="#cd853f" />
        </svg>
      );

    case "heart":
      return (
        <svg {...commonProps}>
          {/* Red Heart */}
          <rect x="2" y="3" width="4" height="2" fill="#ff2222" />
          <rect x="8" y="3" width="4" height="2" fill="#ff2222" />
          <rect x="1" y="4" width="6" height="4" fill="#cc0000" />
          <rect x="7" y="4" width="6" height="4" fill="#cc0000" />
          <rect x="2" y="8" width="10" height="2" fill="#990000" />
          <rect x="4" y="10" width="6" height="2" fill="#770000" />
          <rect x="6" y="12" width="2" height="2" fill="#440000" />
          {/* White shine */}
          <rect x="3" y="4" width="2" height="2" fill="#ffffff" />
        </svg>
      );

    case "xp":
      return (
        <svg {...commonProps}>
          {/* Glowing Green Experience Orb */}
          <rect x="5" y="3" width="6" height="2" fill="#80ff00" />
          <rect x="3" y="5" width="10" height="6" fill="#55ff00" />
          <rect x="5" y="11" width="6" height="2" fill="#33aa00" />
          <rect x="6" y="5" width="4" height="4" fill="#ffff55" />
          <rect x="7" y="6" width="2" height="2" fill="#ffffff" />
        </svg>
      );

    case "server":
      return (
        <svg {...commonProps}>
          {/* Server chassis */}
          <rect x="2" y="2" width="12" height="3" fill="#2d3748" />
          <rect x="2" y="6" width="12" height="3" fill="#2d3748" />
          <rect x="2" y="10" width="12" height="3" fill="#2d3748" />
          {/* Screws & borders */}
          <rect x="1" y="1" width="14" height="1" fill="#4a5568" />
          <rect x="1" y="14" width="14" height="1" fill="#1a202c" />
          {/* Blinking LEDs */}
          <rect x="3" y="3" width="1" height="1" fill="#48bb78" />
          <rect x="5" y="3" width="1" height="1" fill="#48bb78" />
          <rect x="3" y="7" width="1" height="1" fill="#4299e1" />
          <rect x="5" y="7" width="1" height="1" fill="#48bb78" />
          <rect x="3" y="11" width="1" height="1" fill="#ed8936" />
          <rect x="5" y="11" width="1" height="1" fill="#48bb78" />
        </svg>
      );

    case "shield":
      return (
        <svg {...commonProps}>
          {/* Shield shape */}
          <rect x="3" y="1" width="10" height="2" fill="#a0aec0" />
          <rect x="2" y="3" width="12" height="7" fill="#795548" />
          <rect x="3" y="10" width="10" height="2" fill="#5d4037" />
          <rect x="4" y="12" width="8" height="2" fill="#4e342e" />
          <rect x="6" y="14" width="4" height="1" fill="#3e2723" />
          {/* Iron boss & trim */}
          <rect x="7" y="4" width="2" height="6" fill="#cbd5e0" />
          <rect x="5" y="6" width="6" height="2" fill="#cbd5e0" />
          <rect x="7" y="6" width="2" height="2" fill="#ffffff" />
        </svg>
      );

    case "clock":
      return (
        <svg {...commonProps}>
          <rect x="4" y="1" width="8" height="2" fill="#ffd700" />
          <rect x="1" y="4" width="2" height="8" fill="#ffd700" />
          <rect x="13" y="4" width="2" height="8" fill="#c68a00" />
          <rect x="4" y="13" width="8" height="2" fill="#c68a00" />
          <rect x="3" y="3" width="10" height="10" fill="#2b6cb0" />
          {/* Sun */}
          <rect x="6" y="4" width="4" height="4" fill="#ecc94b" />
          {/* Moon horizon */}
          <rect x="4" y="9" width="8" height="4" fill="#1a365d" />
          <rect x="9" y="10" width="2" height="2" fill="#e2e8f0" />
        </svg>
      );

    case "portal":
      return (
        <svg {...commonProps}>
          {/* Obsidian frame */}
          <rect x="2" y="1" width="12" height="2" fill="#120c1f" />
          <rect x="2" y="13" width="12" height="2" fill="#120c1f" />
          <rect x="2" y="1" width="2" height="14" fill="#120c1f" />
          <rect x="12" y="1" width="2" height="14" fill="#120c1f" />
          {/* Swirling Nether energy */}
          <rect x="4" y="3" width="8" height="10" fill="#6b21a8" />
          <rect x="5" y="4" width="4" height="3" fill="#a855f7" />
          <rect x="7" y="8" width="4" height="4" fill="#c084fc" />
          <rect x="6" y="6" width="2" height="2" fill="#f3e8ff" />
        </svg>
      );

    case "beacon":
      return (
        <svg {...commonProps}>
          {/* Obsidian Base */}
          <rect x="2" y="12" width="12" height="3" fill="#1a1128" />
          {/* Glass encasing */}
          <rect x="3" y="3" width="10" height="9" fill="#90cdf4" />
          <rect x="4" y="4" width="8" height="7" fill="#e2e8f0" />
          {/* Cyan Energy Core */}
          <rect x="6" y="5" width="4" height="4" fill="#00ffff" />
          <rect x="7" y="6" width="2" height="2" fill="#ffffff" />
          {/* Light beam escaping up */}
          <rect x="6" y="0" width="4" height="3" fill="#a5f3fc" />
        </svg>
      );

    case "totem":
      return (
        <svg {...commonProps}>
          {/* Wings */}
          <rect x="1" y="4" width="14" height="2" fill="#ffd700" />
          <rect x="2" y="3" width="3" height="1" fill="#ffecb3" />
          <rect x="11" y="3" width="3" height="1" fill="#ffecb3" />
          {/* Head */}
          <rect x="5" y="2" width="6" height="5" fill="#f59e0b" />
          <rect x="6" y="3" width="1" height="2" fill="#10b981" />
          <rect x="9" y="3" width="1" height="2" fill="#10b981" />
          {/* Nose */}
          <rect x="7" y="4" width="2" height="2" fill="#d97706" />
          {/* Body */}
          <rect x="6" y="7" width="4" height="6" fill="#f59e0b" />
          <rect x="4" y="9" width="8" height="2" fill="#d97706" />
          <rect x="6" y="13" width="4" height="2" fill="#b45309" />
        </svg>
      );

    case "speaker":
      return (
        <svg {...commonProps}>
          <rect x="2" y="6" width="3" height="4" fill="#ffffff" />
          <rect x="5" y="4" width="3" height="8" fill="#ffffff" />
          <rect x="10" y="5" width="1" height="6" fill="#ffff55" />
          <rect x="12" y="3" width="1" height="10" fill="#ffff55" />
        </svg>
      );

    case "speaker-muted":
      return (
        <svg {...commonProps}>
          <rect x="2" y="6" width="3" height="4" fill="#aaaaaa" />
          <rect x="5" y="4" width="3" height="8" fill="#aaaaaa" />
          <rect x="10" y="5" width="2" height="2" fill="#ff4444" />
          <rect x="13" y="5" width="2" height="2" fill="#ff4444" />
          <rect x="11" y="7" width="3" height="2" fill="#ff4444" />
          <rect x="10" y="9" width="2" height="2" fill="#ff4444" />
          <rect x="13" y="9" width="2" height="2" fill="#ff4444" />
        </svg>
      );

    case "arrow-left":
      return (
        <svg {...commonProps}>
          <rect x="7" y="3" width="2" height="2" fill="#ffffff" />
          <rect x="5" y="5" width="2" height="2" fill="#ffffff" />
          <rect x="3" y="7" width="10" height="2" fill="#ffffff" />
          <rect x="5" y="9" width="2" height="2" fill="#ffffff" />
          <rect x="7" y="11" width="2" height="2" fill="#ffffff" />
        </svg>
      );

    case "arrow-right":
      return (
        <svg {...commonProps}>
          <rect x="7" y="3" width="2" height="2" fill="#ffffff" />
          <rect x="9" y="5" width="2" height="2" fill="#ffffff" />
          <rect x="3" y="7" width="10" height="2" fill="#ffffff" />
          <rect x="9" y="9" width="2" height="2" fill="#ffffff" />
          <rect x="7" y="11" width="2" height="2" fill="#ffffff" />
        </svg>
      );

    case "close":
      return (
        <svg {...commonProps}>
          <rect x="3" y="3" width="2" height="2" fill="#ffffff" />
          <rect x="11" y="3" width="2" height="2" fill="#ffffff" />
          <rect x="5" y="5" width="2" height="2" fill="#ffffff" />
          <rect x="9" y="5" width="2" height="2" fill="#ffffff" />
          <rect x="7" y="7" width="2" height="2" fill="#ffffff" />
          <rect x="5" y="9" width="2" height="2" fill="#ffffff" />
          <rect x="9" y="9" width="2" height="2" fill="#ffffff" />
          <rect x="3" y="11" width="2" height="2" fill="#ffffff" />
          <rect x="11" y="11" width="2" height="2" fill="#ffffff" />
        </svg>
      );

    case "external":
      return (
        <svg {...commonProps}>
          <rect x="7" y="2" width="7" height="2" fill="#ffffff" />
          <rect x="12" y="4" width="2" height="5" fill="#ffffff" />
          <rect x="10" y="4" width="2" height="2" fill="#ffffff" />
          <rect x="8" y="6" width="2" height="2" fill="#ffffff" />
          <rect x="6" y="8" width="2" height="2" fill="#ffffff" />
          <rect x="2" y="6" width="2" height="8" fill="#aaaaaa" />
          <rect x="2" y="12" width="8" height="2" fill="#aaaaaa" />
        </svg>
      );

    case "check":
      return (
        <svg {...commonProps}>
          <rect x="3" y="8" width="2" height="2" fill="#55ff55" />
          <rect x="5" y="10" width="2" height="2" fill="#55ff55" />
          <rect x="7" y="8" width="2" height="2" fill="#55ff55" />
          <rect x="9" y="6" width="2" height="2" fill="#55ff55" />
          <rect x="11" y="4" width="2" height="2" fill="#55ff55" />
        </svg>
      );

    case "globe":
      return (
        <svg {...commonProps}>
          {/* Outer circle */}
          <rect x="5" y="1" width="6" height="1" fill="#4a5568" />
          <rect x="3" y="2" width="10" height="1" fill="#4a5568" />
          <rect x="2" y="3" width="12" height="10" fill="#3182ce" />
          <rect x="3" y="13" width="10" height="1" fill="#4a5568" />
          <rect x="5" y="14" width="6" height="1" fill="#4a5568" />
          {/* Green continents */}
          <rect x="4" y="4" width="3" height="3" fill="#48bb78" />
          <rect x="9" y="3" width="3" height="4" fill="#48bb78" />
          <rect x="6" y="8" width="5" height="3" fill="#48bb78" />
          <rect x="3" y="9" width="3" height="2" fill="#48bb78" />
          <rect x="7" y="6" width="2" height="2" fill="#38a169" />
          {/* Grid lines */}
          <rect x="1" y="7" width="14" height="1" fill="#e2e8f0" fillOpacity="0.6" />
          <rect x="7" y="2" width="1" height="12" fill="#e2e8f0" fillOpacity="0.6" />
        </svg>
      );

    case "accessibility":
      return (
        <svg {...commonProps}>
          {/* Head */}
          <rect x="7" y="2" width="2" height="2" fill="#ffffff" />
          {/* Torso */}
          <rect x="7" y="5" width="2" height="5" fill="#ffffff" />
          {/* Outstretched Arms */}
          <rect x="3" y="5" width="10" height="2" fill="#ffffff" />
          {/* Legs */}
          <rect x="5" y="10" width="2" height="4" fill="#ffffff" />
          <rect x="9" y="10" width="2" height="4" fill="#ffffff" />
        </svg>
      );

    case "map":
      return (
        <svg {...commonProps}>
          {/* Outer Map Parchment */}
          <rect x="2" y="2" width="12" height="12" fill="#e8d5a8" />
          <rect x="2" y="2" width="12" height="1" fill="#bfa370" />
          <rect x="2" y="13" width="12" height="1" fill="#8c7042" />
          <rect x="2" y="2" width="1" height="12" fill="#bfa370" />
          <rect x="13" y="2" width="1" height="12" fill="#8c7042" />
          {/* Map Landmass (Green & Water Blue) */}
          <rect x="4" y="4" width="4" height="4" fill="#4ade80" />
          <rect x="8" y="5" width="4" height="5" fill="#38bdf8" />
          <rect x="5" y="8" width="5" height="3" fill="#86efac" />
          {/* Red X marks the spot */}
          <rect x="10" y="3" width="1" height="1" fill="#ef4444" />
          <rect x="12" y="3" width="1" height="1" fill="#ef4444" />
          <rect x="11" y="4" width="1" height="1" fill="#ef4444" />
          <rect x="10" y="5" width="1" height="1" fill="#ef4444" />
          <rect x="12" y="5" width="1" height="1" fill="#ef4444" />
        </svg>
      );

    case "eye-of-ender":
      return (
        <svg {...commonProps}>
          {/* Dark Green Outer Ring */}
          <rect x="4" y="2" width="8" height="2" fill="#064e3b" />
          <rect x="2" y="4" width="2" height="8" fill="#064e3b" />
          <rect x="12" y="4" width="2" height="8" fill="#064e3b" />
          <rect x="4" y="12" width="8" height="2" fill="#064e3b" />
          {/* Teal Inner Gem */}
          <rect x="4" y="4" width="8" height="8" fill="#0d9488" />
          <rect x="5" y="5" width="6" height="6" fill="#14b8a6" />
          {/* Vertical Slit Pupil (Magenta / Purple) */}
          <rect x="7" y="4" width="2" height="8" fill="#86198f" />
          <rect x="7" y="6" width="2" height="4" fill="#d946ef" />
          {/* Highlight */}
          <rect x="5" y="5" width="1" height="1" fill="#ccfbf1" />
        </svg>
      );

    case "trophy":
      return (
        <svg {...commonProps}>
          {/* Gold Cup Top */}
          <rect x="3" y="2" width="10" height="2" fill="#fbbf24" />
          <rect x="4" y="4" width="8" height="4" fill="#f59e0b" />
          <rect x="5" y="8" width="6" height="2" fill="#d97706" />
          {/* Handles */}
          <rect x="1" y="3" width="2" height="3" fill="#fbbf24" />
          <rect x="13" y="3" width="2" height="3" fill="#fbbf24" />
          {/* Stem & Base */}
          <rect x="7" y="10" width="2" height="2" fill="#b45309" />
          <rect x="4" y="12" width="8" height="2" fill="#78350f" />
          {/* Sparkle */}
          <rect x="5" y="3" width="2" height="2" fill="#ffffff" />
        </svg>
      );

    case "hunger":
      return (
        <svg {...commonProps}>
          {/* Meat Body */}
          <rect x="4" y="2" width="7" height="6" fill="#b45309" />
          <rect x="3" y="4" width="9" height="5" fill="#d97706" />
          <rect x="5" y="3" width="5" height="3" fill="#f59e0b" />
          {/* Bone tip */}
          <rect x="1" y="11" width="3" height="3" fill="#f1f5f9" />
          <rect x="3" y="9" width="3" height="3" fill="#cbd5e1" />
          <rect x="2" y="10" width="1" height="1" fill="#94a3b8" />
        </svg>
      );

    default:
      return (
        <svg {...commonProps}>
          <rect x="2" y="2" width="12" height="12" fill="#555555" />
          <rect x="4" y="4" width="8" height="8" fill="#888888" />
        </svg>
      );
  }
};
