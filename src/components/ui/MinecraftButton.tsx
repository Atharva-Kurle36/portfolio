"use client";

import React from "react";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export interface MinecraftButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "danger" | "dark";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  active?: boolean;
}

export const MinecraftButton: React.FC<MinecraftButtonProps> = ({
  children,
  variant = "default",
  size = "md",
  fullWidth = false,
  active = false,
  disabled = false,
  className = "",
  onClick,
  ...props
}) => {
  const { playClick } = useSoundEffects();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    playClick();
    onClick?.(e);
  };

  // Base styling for 3D beveled Minecraft button
  const sizeClasses = {
    sm: "px-3 py-1 text-xs min-h-[34px]",
    md: "px-5 py-2 text-xs md:text-sm min-h-[44px]",
    lg: "px-6 py-3 text-sm md:text-base min-h-[52px]",
  }[size];

  // Colors & Bevels based on variant
  let colorClasses = "";
  switch (variant) {
    case "primary":
      colorClasses = disabled
        ? "bg-[#355235] text-[#7a9a7a] border-t-[#4a724a] border-l-[#4a724a] border-b-[#1c301c] border-r-[#1c301c]"
        : "bg-[#2e7d32] text-white hover:text-[#ffff55] hover:bg-[#388e3c] border-t-2 border-l-2 border-[#81c784] border-b-2 border-r-2 border-[#1b5e20] active:border-t-[#1b5e20] active:border-l-[#1b5e20] active:border-b-[#81c784] active:border-r-[#81c784]";
      break;
    case "danger":
      colorClasses = disabled
        ? "bg-[#542828] text-[#916b6b] border-t-[#6b3535] border-l-[#6b3535] border-b-[#2e1313] border-r-[#2e1313]"
        : "bg-[#b71c1c] text-white hover:text-[#ffff55] hover:bg-[#c62828] border-t-2 border-l-2 border-[#ef5350] border-b-2 border-r-2 border-[#5f0909] active:border-t-[#5f0909] active:border-l-[#5f0909] active:border-b-[#ef5350] active:border-r-[#ef5350]";
      break;
    case "dark":
      colorClasses = disabled
        ? "bg-[#252525] text-[#555555] border-t-[#3a3a3a] border-l-[#3a3a3a] border-b-[#111111] border-r-[#111111]"
        : "bg-[#2a2b2e] text-[#dddddd] hover:text-[#ffff55] hover:bg-[#35363a] border-t-2 border-l-2 border-[#4c4e54] border-b-2 border-r-2 border-[#18191c] active:border-t-[#18191c] active:border-l-[#18191c] active:border-b-[#4c4e54] active:border-r-[#4c4e54]";
      break;
    default: // Classic stone Minecraft button
      colorClasses = disabled
        ? "bg-[#555555] text-[#8c8c8c] border-t-[#777777] border-l-[#777777] border-b-[#333333] border-r-[#333333]"
        : "bg-[#7c7c7c] text-[#e0e0e0] hover:text-[#ffff55] hover:bg-[#8e8e8e] border-t-2 border-l-2 border-[#ffffff] border-b-2 border-r-2 border-[#2b2b2b] active:border-t-[#2b2b2b] active:border-l-[#2b2b2b] active:border-b-[#ffffff] active:border-r-[#ffffff]";
      break;
  }

  const activeClasses = active
    ? "border-t-[#2b2b2b] border-l-[#2b2b2b] border-b-[#ffffff] border-r-[#ffffff] translate-y-[1px]"
    : "";

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      className={`
        relative inline-flex items-center justify-center font-minecraft select-none uppercase tracking-wider
        shadow-[inset_0_0_0_1px_rgba(0,0,0,0.5)] cursor-pointer outline-none transition-all duration-75
        focus-visible:ring-2 focus-visible:ring-[#ffff55] focus-visible:ring-offset-2 focus-visible:ring-offset-black
        ${disabled ? "cursor-not-allowed opacity-60" : "hover:brightness-105 active:translate-y-[1px]"}
        ${fullWidth ? "w-full" : ""}
        ${sizeClasses}
        ${colorClasses}
        ${activeClasses}
        ${className}
      `}
      style={{
        textShadow: disabled
          ? "2px 2px 0px #303030"
          : "2px 2px 0px #1a1a1a",
      }}
      {...props}
    >
      {children}
    </button>
  );
};
