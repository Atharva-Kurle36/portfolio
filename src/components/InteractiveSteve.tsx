"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface InteractiveSteveProps {
  className?: string;
}

export const InteractiveSteve: React.FC<InteractiveSteveProps> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [baseYaw, setBaseYaw] = useState<number>(-22); // Default classic Minecraft GUI angle
  const [headYaw, setHeadYaw] = useState<number>(0);
  const [headPitch, setHeadPitch] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStartX, setDragStartX] = useState<number>(0);
  const [isPunching, setIsPunching] = useState<boolean>(false);
  const { playPop } = useSoundEffects();

  // Mouse move listener to track cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - dragStartX;
        setBaseYaw((prev) => prev + deltaX * 0.8);
        setDragStartX(e.clientX);
        return;
      }

      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      // Limit yaw between -48deg and +48deg
      const targetYaw = Math.max(-48, Math.min(48, (dx / 350) * 48));
      // Limit pitch between -30deg and +30deg
      const targetPitch = Math.max(-30, Math.min(30, (-dy / 250) * 30));

      setHeadYaw(targetYaw);
      setHeadPitch(targetPitch);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragStartX]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
  };

  const handleClick = () => {
    playPop();
    setIsPunching(true);
    setTimeout(() => setIsPunching(false), 300);
  };

  // Dimensions (Scale factor 3.2 for crisp voxel rendering inside ~100x140 chamber)
  // Head: 26x26x26
  // Torso: 26x38x13
  // Arm: 13x38x13
  // Leg: 13x38x13

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      aria-label="Interactive 3D Steve. Move mouse to make Steve look around, or click and drag horizontally to spin him 360 degrees."
      className={`relative w-[110px] h-[140px] bg-black flex items-center justify-center cursor-grab active:cursor-grabbing select-none overflow-hidden ${className}`}
      style={{ perspective: "500px" }}
    >
      {/* Subtle bottom shadow on floor */}
      <div className="absolute bottom-2 w-14 h-4 bg-black/80 rounded-full blur-[2px] pointer-events-none" />

      {/* 3D Steve Root */}
      <div
        className="relative transition-transform duration-75"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateY(${baseYaw}deg) scale(0.95)`,
          transformOrigin: "center center",
        }}
      >
        {/* Head Pivot */}
        <div
          className="absolute"
          style={{
            top: "-52px",
            left: "-13px",
            width: "26px",
            height: "26px",
            transformStyle: "preserve-3d",
            transformOrigin: "bottom center",
            transform: `rotateY(${headYaw}deg) rotateX(${headPitch}deg)`,
          }}
        >
          {/* Head Front - Diamond Helmet */}
          <div
            className="absolute inset-0"
            style={{
              transform: "translateZ(13px)",
              imageRendering: "pixelated",
            }}
          >
            <svg viewBox="0 0 8 8" className="w-full h-full" style={{ shapeRendering: "crispEdges" }}>
              {/* Diamond Helmet Forehead */}
              <rect x="0" y="0" width="8" height="3" fill="#55ffff" />
              <rect x="1" y="0" width="6" height="1" fill="#ffffff" />
              <rect x="0" y="3" width="8" height="1" fill="#2dd4bf" />
              {/* Helmet Cheek Guards & Face Opening */}
              <rect x="0" y="4" width="1" height="3" fill="#55ffff" />
              <rect x="7" y="4" width="1" height="3" fill="#55ffff" />
              {/* Eyes */}
              <rect x="1" y="4" width="1" height="1" fill="#ffffff" />
              <rect x="2" y="4" width="1" height="1" fill="#2b4289" />
              <rect x="3" y="4" width="2" height="1" fill="#ab6b49" />
              <rect x="5" y="4" width="1" height="1" fill="#2b4289" />
              <rect x="6" y="4" width="1" height="1" fill="#ffffff" />
              {/* Nose & Mouth area */}
              <rect x="1" y="5" width="2" height="1" fill="#c68863" />
              <rect x="3" y="5" width="2" height="1" fill="#935133" />
              <rect x="5" y="5" width="2" height="1" fill="#c68863" />
              <rect x="1" y="6" width="6" height="1" fill="#59321f" />
              {/* Chin Guard */}
              <rect x="0" y="7" width="8" height="1" fill="#00aaaa" />
            </svg>
          </div>

          {/* Head Back */}
          <div
            className="absolute inset-0 bg-[#00aaaa]"
            style={{
              transform: "rotateY(180deg) translateZ(13px)",
              filter: "brightness(0.7)",
            }}
          />

          {/* Head Right */}
          <div
            className="absolute inset-0"
            style={{
              transform: "rotateY(90deg) translateZ(13px)",
              filter: "brightness(0.85)",
            }}
          >
            <svg viewBox="0 0 8 8" className="w-full h-full" style={{ shapeRendering: "crispEdges" }}>
              <rect x="0" y="0" width="8" height="8" fill="#55ffff" />
              <rect x="0" y="5" width="4" height="2" fill="#00aaaa" />
            </svg>
          </div>

          {/* Head Left */}
          <div
            className="absolute inset-0"
            style={{
              transform: "rotateY(-90deg) translateZ(13px)",
              filter: "brightness(0.75)",
            }}
          >
            <svg viewBox="0 0 8 8" className="w-full h-full" style={{ shapeRendering: "crispEdges" }}>
              <rect x="0" y="0" width="8" height="8" fill="#55ffff" />
              <rect x="4" y="5" width="4" height="2" fill="#00aaaa" />
            </svg>
          </div>

          {/* Head Top */}
          <div
            className="absolute inset-0 bg-[#55ffff]"
            style={{
              transform: "rotateX(90deg) translateZ(13px)",
              filter: "brightness(1.1)",
            }}
          />

          {/* Head Bottom */}
          <div
            className="absolute inset-0 bg-[#008080]"
            style={{
              transform: "rotateX(-90deg) translateZ(13px)",
              filter: "brightness(0.5)",
            }}
          />
        </div>

        {/* Torso & Body */}
        <div
          className="absolute"
          style={{
            top: "-26px",
            left: "-13px",
            width: "26px",
            height: "38px",
            transformStyle: "preserve-3d",
            transform: `rotateY(${headYaw * 0.35}deg)`,
          }}
        >
          {/* Torso Front */}
          <div
            className="absolute inset-0"
            style={{
              transform: "translateZ(6.5px)",
            }}
          >
            <svg viewBox="0 0 8 12" className="w-full h-full" style={{ shapeRendering: "crispEdges" }}>
              {/* Diamond Chestplate */}
              <rect x="0" y="0" width="8" height="12" fill="#55ffff" />
              <rect x="2" y="0" width="4" height="2" fill="#2dd4bf" />
              <rect x="1" y="2" width="6" height="7" fill="#55ffff" />
              <rect x="2" y="3" width="4" height="5" fill="#2dd4bf" />
              <rect x="0" y="9" width="8" height="3" fill="#00aaaa" />
            </svg>
          </div>

          {/* Torso Back */}
          <div
            className="absolute inset-0 bg-[#00aaaa]"
            style={{
              transform: "rotateY(180deg) translateZ(6.5px)",
              filter: "brightness(0.7)",
            }}
          />

          {/* Torso Right */}
          <div
            className="absolute top-0 bottom-0 bg-[#00aaaa]"
            style={{
              width: "13px",
              left: "6.5px",
              transform: "rotateY(90deg) translateZ(13px)",
              filter: "brightness(0.85)",
            }}
          />

          {/* Torso Left */}
          <div
            className="absolute top-0 bottom-0 bg-[#008080]"
            style={{
              width: "13px",
              left: "6.5px",
              transform: "rotateY(-90deg) translateZ(13px)",
              filter: "brightness(0.75)",
            }}
          />

          {/* Torso Top */}
          <div
            className="absolute left-0 right-0 bg-[#55ffff]"
            style={{
              height: "13px",
              top: "6.5px",
              transform: "rotateX(90deg) translateZ(19px)",
              filter: "brightness(1.1)",
            }}
          />
        </div>

        {/* Right Arm (Player's Right, Screen Left) with Fishing Rod */}
        <div
          className="absolute"
          style={{
            top: "-26px",
            left: "-26px",
            width: "13px",
            height: "38px",
            transformStyle: "preserve-3d",
            transformOrigin: "top center",
            transform: isPunching
              ? "rotateX(-45deg) rotateY(15deg)"
              : `rotateY(${headYaw * 0.25}deg) rotateZ(2deg)`,
            transition: "transform 0.15s ease-out",
          }}
        >
          {/* Arm Front */}
          <div
            className="absolute inset-0"
            style={{ transform: "translateZ(6.5px)" }}
          >
            <svg viewBox="0 0 4 12" className="w-full h-full" style={{ shapeRendering: "crispEdges" }}>
              {/* Diamond Pauldron / Sleeve */}
              <rect x="0" y="0" width="4" height="4" fill="#55ffff" />
              <rect x="0" y="3" width="4" height="1" fill="#2dd4bf" />
              {/* Skin arm */}
              <rect x="0" y="4" width="4" height="8" fill="#c68863" />
              <rect x="1" y="8" width="2" height="3" fill="#b97753" />
            </svg>

            {/* Held Item Rod like screenshot */}
            <div
              className="absolute -top-4 -left-1 w-1.5 h-14 bg-[#6b7280] border border-[#374151] origin-bottom pointer-events-none"
              style={{ transform: "rotate(-10deg)" }}
            />
          </div>
          {/* Arm Outer (Right) */}
          <div
            className="absolute top-0 bottom-0 bg-[#00aaaa]"
            style={{
              width: "13px",
              transform: "rotateY(-90deg) translateZ(6.5px)",
              filter: "brightness(0.8)",
            }}
          >
            <svg viewBox="0 0 4 12" className="w-full h-full" style={{ shapeRendering: "crispEdges" }}>
              <rect x="0" y="0" width="4" height="4" fill="#55ffff" />
              <rect x="0" y="4" width="4" height="8" fill="#b97753" />
            </svg>
          </div>
          {/* Arm Back */}
          <div
            className="absolute inset-0 bg-[#008080]"
            style={{
              transform: "rotateY(180deg) translateZ(6.5px)",
              filter: "brightness(0.7)",
            }}
          />
        </div>

        {/* Left Arm (Player's Left, Screen Right) */}
        <div
          className="absolute"
          style={{
            top: "-26px",
            left: "13px",
            width: "13px",
            height: "38px",
            transformStyle: "preserve-3d",
            transformOrigin: "top center",
            transform: `rotateY(${headYaw * 0.25}deg) rotateZ(-2deg)`,
          }}
        >
          {/* Arm Front */}
          <div
            className="absolute inset-0"
            style={{ transform: "translateZ(6.5px)" }}
          >
            <svg viewBox="0 0 4 12" className="w-full h-full" style={{ shapeRendering: "crispEdges" }}>
              {/* Diamond Pauldron / Sleeve */}
              <rect x="0" y="0" width="4" height="4" fill="#55ffff" />
              <rect x="0" y="3" width="4" height="1" fill="#2dd4bf" />
              {/* Skin arm */}
              <rect x="0" y="4" width="4" height="8" fill="#c68863" />
              <rect x="1" y="8" width="2" height="3" fill="#b97753" />
            </svg>
          </div>
          {/* Arm Outer (Left) */}
          <div
            className="absolute top-0 bottom-0"
            style={{
              width: "13px",
              transform: "rotateY(90deg) translateZ(6.5px)",
              filter: "brightness(0.85)",
            }}
          >
            <svg viewBox="0 0 4 12" className="w-full h-full" style={{ shapeRendering: "crispEdges" }}>
              <rect x="0" y="0" width="4" height="4" fill="#00aaaa" />
              <rect x="0" y="4" width="4" height="8" fill="#c68863" />
            </svg>
          </div>
          {/* Arm Back */}
          <div
            className="absolute inset-0 bg-[#008080]"
            style={{
              transform: "rotateY(180deg) translateZ(6.5px)",
              filter: "brightness(0.7)",
            }}
          />
        </div>

        {/* Right Leg (Screen Left) - Diamond Leggings & Boots */}
        <div
          className="absolute"
          style={{
            top: "12px",
            left: "-13px",
            width: "13px",
            height: "38px",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Front */}
          <div className="absolute inset-0" style={{ transform: "translateZ(6.5px)" }}>
            <svg viewBox="0 0 4 12" className="w-full h-full" style={{ shapeRendering: "crispEdges" }}>
              {/* Diamond Legging */}
              <rect x="0" y="0" width="4" height="9" fill="#55ffff" />
              <rect x="1" y="2" width="2" height="5" fill="#2dd4bf" />
              {/* Diamond Boot */}
              <rect x="0" y="9" width="4" height="3" fill="#00aaaa" />
              <rect x="0" y="11" width="4" height="1" fill="#008080" />
            </svg>
          </div>
          {/* Side */}
          <div
            className="absolute top-0 bottom-0 bg-[#00aaaa]"
            style={{
              width: "13px",
              transform: "rotateY(-90deg) translateZ(6.5px)",
              filter: "brightness(0.8)",
            }}
          />
          {/* Back */}
          <div
            className="absolute inset-0 bg-[#008080]"
            style={{
              transform: "rotateY(180deg) translateZ(6.5px)",
              filter: "brightness(0.7)",
            }}
          />
        </div>

        {/* Left Leg (Screen Right) - Diamond Leggings & Boots */}
        <div
          className="absolute"
          style={{
            top: "12px",
            left: "0px",
            width: "13px",
            height: "38px",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Front */}
          <div className="absolute inset-0" style={{ transform: "translateZ(6.5px)" }}>
            <svg viewBox="0 0 4 12" className="w-full h-full" style={{ shapeRendering: "crispEdges" }}>
              {/* Diamond Legging */}
              <rect x="0" y="0" width="4" height="9" fill="#55ffff" />
              <rect x="1" y="2" width="2" height="5" fill="#2dd4bf" />
              {/* Diamond Boot */}
              <rect x="0" y="9" width="4" height="3" fill="#00aaaa" />
              <rect x="0" y="11" width="4" height="1" fill="#008080" />
            </svg>
          </div>
          {/* Side */}
          <div
            className="absolute top-0 bottom-0 bg-[#00aaaa]"
            style={{
              width: "13px",
              transform: "rotateY(90deg) translateZ(6.5px)",
              filter: "brightness(0.85)",
            }}
          />
          {/* Back */}
          <div
            className="absolute inset-0 bg-[#008080]"
            style={{
              transform: "rotateY(180deg) translateZ(6.5px)",
              filter: "brightness(0.7)",
            }}
          />
        </div>
      </div>

      {/* Interactive Helper Hint */}
      <div className="absolute bottom-1 font-minecraft text-[7px] text-[#777777] tracking-tighter pointer-events-none select-none text-center">
        ◀ DRAG TO SPIN ▶
      </div>
    </div>
  );
};
