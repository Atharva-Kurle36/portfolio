"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface InteractiveSteveProps {
  className?: string;
}

export const InteractiveSteve: React.FC<InteractiveSteveProps> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [baseYaw, setBaseYaw] = useState<number>(-20); // Default classic Minecraft GUI angle
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

  // Dimensions:
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

      {/* 3D Steve Root - Classic Unarmored Steve */}
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
          {/* Head Front - Classic Steve Face */}
          <div
            className="absolute inset-0"
            style={{
              transform: "translateZ(13px)",
              imageRendering: "pixelated",
            }}
          >
            <svg viewBox="0 0 8 8" className="w-full h-full" style={{ shapeRendering: "crispEdges" }}>
              {/* Hair */}
              <rect x="0" y="0" width="8" height="2" fill="#492d19" />
              <rect x="0" y="2" width="2" height="1" fill="#492d19" />
              <rect x="6" y="2" width="2" height="1" fill="#492d19" />
              <rect x="0" y="3" width="1" height="1" fill="#492d19" />
              <rect x="7" y="3" width="1" height="1" fill="#492d19" />
              {/* Forehead Skin */}
              <rect x="2" y="2" width="4" height="1" fill="#db9d7b" />
              <rect x="1" y="3" width="6" height="1" fill="#db9d7b" />
              {/* Eyes */}
              <rect x="1" y="4" width="1" height="1" fill="#ffffff" />
              <rect x="2" y="4" width="1" height="1" fill="#2b4289" />
              <rect x="3" y="4" width="2" height="1" fill="#ab6b49" />
              <rect x="5" y="4" width="1" height="1" fill="#2b4289" />
              <rect x="6" y="4" width="1" height="1" fill="#ffffff" />
              {/* Nose & Cheeks */}
              <rect x="1" y="5" width="2" height="1" fill="#c68863" />
              <rect x="3" y="5" width="2" height="1" fill="#935133" />
              <rect x="5" y="5" width="2" height="1" fill="#c68863" />
              {/* Goatee / Mouth Smile */}
              <rect x="1" y="6" width="6" height="1" fill="#59321f" />
              {/* Chin */}
              <rect x="0" y="7" width="8" height="1" fill="#b87754" />
            </svg>
          </div>

          {/* Head Back - Classic Brown Hair */}
          <div
            className="absolute inset-0 bg-[#492d19]"
            style={{
              transform: "rotateY(180deg) translateZ(13px)",
              filter: "brightness(0.7)",
            }}
          />

          {/* Head Right Side */}
          <div
            className="absolute inset-0"
            style={{
              transform: "rotateY(90deg) translateZ(13px)",
              filter: "brightness(0.85)",
            }}
          >
            <svg viewBox="0 0 8 8" className="w-full h-full" style={{ shapeRendering: "crispEdges" }}>
              <rect x="0" y="0" width="8" height="4" fill="#492d19" />
              <rect x="0" y="4" width="8" height="4" fill="#db9d7b" />
              <rect x="0" y="4" width="3" height="2" fill="#492d19" />
            </svg>
          </div>

          {/* Head Left Side */}
          <div
            className="absolute inset-0"
            style={{
              transform: "rotateY(-90deg) translateZ(13px)",
              filter: "brightness(0.75)",
            }}
          >
            <svg viewBox="0 0 8 8" className="w-full h-full" style={{ shapeRendering: "crispEdges" }}>
              <rect x="0" y="0" width="8" height="4" fill="#492d19" />
              <rect x="0" y="4" width="8" height="4" fill="#db9d7b" />
              <rect x="5" y="4" width="3" height="2" fill="#492d19" />
            </svg>
          </div>

          {/* Head Top */}
          <div
            className="absolute inset-0 bg-[#492d19]"
            style={{
              transform: "rotateX(90deg) translateZ(13px)",
              filter: "brightness(1.1)",
            }}
          />

          {/* Head Bottom (Neck underside) */}
          <div
            className="absolute inset-0 bg-[#ab6b49]"
            style={{
              transform: "rotateX(-90deg) translateZ(13px)",
              filter: "brightness(0.5)",
            }}
          />
        </div>

        {/* Torso & Body - Classic Steve Cyan Shirt */}
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
              {/* Neck skin opening */}
              <rect x="0" y="0" width="8" height="12" fill="#00a8a8" />
              <rect x="2" y="0" width="4" height="2" fill="#db9d7b" />
              <rect x="3" y="2" width="2" height="1" fill="#c68863" />
              {/* Shirt shading */}
              <rect x="0" y="1" width="1" height="11" fill="#008b8b" />
              <rect x="7" y="1" width="1" height="11" fill="#008b8b" />
              <rect x="1" y="11" width="6" height="1" fill="#008080" />
            </svg>
          </div>

          {/* Torso Back */}
          <div
            className="absolute inset-0 bg-[#008b8b]"
            style={{
              transform: "rotateY(180deg) translateZ(6.5px)",
              filter: "brightness(0.75)",
            }}
          />

          {/* Torso Right */}
          <div
            className="absolute top-0 bottom-0 bg-[#008b8b]"
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
              filter: "brightness(0.7)",
            }}
          />

          {/* Torso Top (Shoulders) */}
          <div
            className="absolute left-0 right-0 bg-[#00a8a8]"
            style={{
              height: "13px",
              top: "12.5px",
              transform: "rotateX(90deg) translateZ(19px)",
              filter: "brightness(1.1)",
            }}
          />

          {/* Torso Bottom */}
          <div
            className="absolute left-0 right-0 bg-[#008080]"
            style={{
              height: "13px",
              top: "12.5px",
              transform: "rotateX(-90deg) translateZ(19px)",
              filter: "brightness(0.6)",
            }}
          />
        </div>

        {/* Right Arm (Classic Steve Arm with Cyan Sleeve + Skin) */}
        <div
          className="absolute"
          style={{
            top: "-26px",
            left: "13px",
            width: "13px",
            height: "38px",
            transformStyle: "preserve-3d",
            transformOrigin: "top center",
            transform: isPunching
              ? "rotateX(-50deg) rotateZ(10deg)"
              : `rotateX(${-headPitch * 0.4}deg) rotateZ(3deg)`,
            transition: "transform 0.15s ease-out",
          }}
        >
          {/* Arm Front */}
          <div
            className="absolute inset-0"
            style={{
              transform: "translateZ(6.5px)",
            }}
          >
            <svg viewBox="0 0 4 12" className="w-full h-full" style={{ shapeRendering: "crispEdges" }}>
              {/* Cyan sleeve */}
              <rect x="0" y="0" width="4" height="4" fill="#00a8a8" />
              {/* Skin arm */}
              <rect x="0" y="4" width="4" height="8" fill="#db9d7b" />
              <rect x="0" y="11" width="4" height="1" fill="#b87754" />
            </svg>
          </div>

          {/* Arm Back */}
          <div
            className="absolute inset-0 bg-[#b87754]"
            style={{
              transform: "rotateY(180deg) translateZ(6.5px)",
              filter: "brightness(0.75)",
            }}
          >
            <div className="w-full h-[12px] bg-[#008b8b]" />
          </div>

          {/* Arm Outer (Right) */}
          <div
            className="absolute top-0 bottom-0 bg-[#db9d7b]"
            style={{
              width: "13px",
              left: "0px",
              transform: "rotateY(90deg) translateZ(6.5px)",
              filter: "brightness(0.9)",
            }}
          >
            <div className="w-full h-[12px] bg-[#00a8a8]" />
          </div>

          {/* Arm Inner (Left) */}
          <div
            className="absolute top-0 bottom-0 bg-[#b87754]"
            style={{
              width: "13px",
              left: "0px",
              transform: "rotateY(-90deg) translateZ(6.5px)",
              filter: "brightness(0.7)",
            }}
          >
            <div className="w-full h-[12px] bg-[#008b8b]" />
          </div>

          {/* Arm Bottom (Hand) */}
          <div
            className="absolute left-0 right-0 bg-[#ab6b49]"
            style={{
              height: "13px",
              top: "12.5px",
              transform: "rotateX(-90deg) translateZ(19px)",
              filter: "brightness(0.6)",
            }}
          />
        </div>

        {/* Left Arm (Classic Steve Arm with Cyan Sleeve + Skin) */}
        <div
          className="absolute"
          style={{
            top: "-26px",
            left: "-26px",
            width: "13px",
            height: "38px",
            transformStyle: "preserve-3d",
            transformOrigin: "top center",
            transform: `rotateX(${headPitch * 0.3}deg) rotateZ(-3deg)`,
          }}
        >
          {/* Arm Front */}
          <div
            className="absolute inset-0"
            style={{
              transform: "translateZ(6.5px)",
            }}
          >
            <svg viewBox="0 0 4 12" className="w-full h-full" style={{ shapeRendering: "crispEdges" }}>
              {/* Cyan sleeve */}
              <rect x="0" y="0" width="4" height="4" fill="#00a8a8" />
              {/* Skin arm */}
              <rect x="0" y="4" width="4" height="8" fill="#db9d7b" />
              <rect x="0" y="11" width="4" height="1" fill="#b87754" />
            </svg>
          </div>

          {/* Arm Back */}
          <div
            className="absolute inset-0 bg-[#b87754]"
            style={{
              transform: "rotateY(180deg) translateZ(6.5px)",
              filter: "brightness(0.75)",
            }}
          >
            <div className="w-full h-[12px] bg-[#008b8b]" />
          </div>

          {/* Arm Outer (Left) */}
          <div
            className="absolute top-0 bottom-0 bg-[#db9d7b]"
            style={{
              width: "13px",
              left: "0px",
              transform: "rotateY(-90deg) translateZ(6.5px)",
              filter: "brightness(0.9)",
            }}
          >
            <div className="w-full h-[12px] bg-[#00a8a8]" />
          </div>

          {/* Arm Inner (Right) */}
          <div
            className="absolute top-0 bottom-0 bg-[#b87754]"
            style={{
              width: "13px",
              left: "0px",
              transform: "rotateY(90deg) translateZ(6.5px)",
              filter: "brightness(0.7)",
            }}
          >
            <div className="w-full h-[12px] bg-[#008b8b]" />
          </div>

          {/* Arm Bottom (Hand) */}
          <div
            className="absolute left-0 right-0 bg-[#ab6b49]"
            style={{
              height: "13px",
              top: "12.5px",
              transform: "rotateX(-90deg) translateZ(19px)",
              filter: "brightness(0.6)",
            }}
          />
        </div>

        {/* Right Leg (Classic Steve Blue Jeans + Gray Shoes) */}
        <div
          className="absolute"
          style={{
            top: "12px",
            left: "0px",
            width: "13px",
            height: "38px",
            transformStyle: "preserve-3d",
            transformOrigin: "top center",
            transform: "rotateX(-4deg)",
          }}
        >
          {/* Leg Front */}
          <div
            className="absolute inset-0"
            style={{
              transform: "translateZ(6.5px)",
            }}
          >
            <svg viewBox="0 0 4 12" className="w-full h-full" style={{ shapeRendering: "crispEdges" }}>
              {/* Blue Jeans */}
              <rect x="0" y="0" width="4" height="9" fill="#2b3d8b" />
              <rect x="0" y="0" width="1" height="9" fill="#1e2c66" />
              {/* Gray Shoes */}
              <rect x="0" y="9" width="4" height="3" fill="#4c4c4c" />
              <rect x="0" y="11" width="4" height="1" fill="#333333" />
            </svg>
          </div>

          {/* Leg Back */}
          <div
            className="absolute inset-0 bg-[#1e2c66]"
            style={{
              transform: "rotateY(180deg) translateZ(6.5px)",
              filter: "brightness(0.75)",
            }}
          >
            <div className="w-full h-[10px] bg-[#333333] mt-[28px]" />
          </div>

          {/* Leg Right */}
          <div
            className="absolute top-0 bottom-0 bg-[#2b3d8b]"
            style={{
              width: "13px",
              left: "0px",
              transform: "rotateY(90deg) translateZ(6.5px)",
              filter: "brightness(0.85)",
            }}
          >
            <div className="w-full h-[10px] bg-[#4c4c4c] mt-[28px]" />
          </div>

          {/* Leg Left */}
          <div
            className="absolute top-0 bottom-0 bg-[#1e2c66]"
            style={{
              width: "13px",
              left: "0px",
              transform: "rotateY(-90deg) translateZ(6.5px)",
              filter: "brightness(0.65)",
            }}
          >
            <div className="w-full h-[10px] bg-[#333333] mt-[28px]" />
          </div>

          {/* Shoe Bottom */}
          <div
            className="absolute left-0 right-0 bg-[#222222]"
            style={{
              height: "13px",
              top: "12.5px",
              transform: "rotateX(-90deg) translateZ(19px)",
            }}
          />
        </div>

        {/* Left Leg (Classic Steve Blue Jeans + Gray Shoes) */}
        <div
          className="absolute"
          style={{
            top: "12px",
            left: "-13px",
            width: "13px",
            height: "38px",
            transformStyle: "preserve-3d",
            transformOrigin: "top center",
            transform: "rotateX(4deg)",
          }}
        >
          {/* Leg Front */}
          <div
            className="absolute inset-0"
            style={{
              transform: "translateZ(6.5px)",
            }}
          >
            <svg viewBox="0 0 4 12" className="w-full h-full" style={{ shapeRendering: "crispEdges" }}>
              {/* Blue Jeans */}
              <rect x="0" y="0" width="4" height="9" fill="#2b3d8b" />
              <rect x="3" y="0" width="1" height="9" fill="#1e2c66" />
              {/* Gray Shoes */}
              <rect x="0" y="9" width="4" height="3" fill="#4c4c4c" />
              <rect x="0" y="11" width="4" height="1" fill="#333333" />
            </svg>
          </div>

          {/* Leg Back */}
          <div
            className="absolute inset-0 bg-[#1e2c66]"
            style={{
              transform: "rotateY(180deg) translateZ(6.5px)",
              filter: "brightness(0.75)",
            }}
          >
            <div className="w-full h-[10px] bg-[#333333] mt-[28px]" />
          </div>

          {/* Leg Left */}
          <div
            className="absolute top-0 bottom-0 bg-[#2b3d8b]"
            style={{
              width: "13px",
              left: "0px",
              transform: "rotateY(-90deg) translateZ(6.5px)",
              filter: "brightness(0.85)",
            }}
          >
            <div className="w-full h-[10px] bg-[#4c4c4c] mt-[28px]" />
          </div>

          {/* Leg Right */}
          <div
            className="absolute top-0 bottom-0 bg-[#1e2c66]"
            style={{
              width: "13px",
              left: "0px",
              transform: "rotateY(90deg) translateZ(6.5px)",
              filter: "brightness(0.65)",
            }}
          >
            <div className="w-full h-[10px] bg-[#333333] mt-[28px]" />
          </div>

          {/* Shoe Bottom */}
          <div
            className="absolute left-0 right-0 bg-[#222222]"
            style={{
              height: "13px",
              top: "12.5px",
              transform: "rotateX(-90deg) translateZ(19px)",
            }}
          />
        </div>
      </div>
    </div>
  );
};
