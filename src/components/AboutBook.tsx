"use client";

import React, { useState } from "react";
import Image from "next/image";
import { profileData } from "@/data/profile";
import { MinecraftButton } from "@/components/ui/MinecraftButton";
import { PixelIcon } from "@/components/ui/PixelIcon";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export const AboutBook: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { playPop } = useSoundEffects();
  const totalPages = profileData.bioPages.length;

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      playPop();
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      playPop();
      setCurrentPage((prev) => prev - 1);
    }
  };

  const page = profileData.bioPages[currentPage];

  return (
    <section
      id="about"
      aria-label="About Atharva Kurle"
      className="min-h-screen py-16 px-4 flex flex-col items-center justify-center relative select-none overflow-hidden"
    >
      {/* Ambient Room Backdrop */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-30 filter blur-xs"
        style={{
          backgroundImage: "url('/images/about_cozy_coder.jpg')",
          imageRendering: "pixelated",
        }}
      >
        <div className="absolute inset-0 bg-black/75" />
      </div>

      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-2">
          <PixelIcon name="book" size={26} />
          <h2
            className="font-minecraft text-xl md:text-2xl text-[#ffff55] tracking-wider uppercase"
            style={{ textShadow: "2px 2px 0 #000" }}
          >
            Player Lore: Atharva&apos;s Base
          </h2>
        </div>
        <p className="font-sans text-xs sm:text-sm text-[#9ca3af] mb-8 text-center max-w-md">
          A glimpse into the late-night Mumbai developer desk and engineering journey.
        </p>

        {/* Dual-Pane Workstation Layout: Cozy Coder on Left, Book & Quill on Right */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Cozy Coder Artwork matching Reference Image */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Minecraft Frame around the Cozy Coder Image */}
            <div className="w-full bg-[#1b1c20] p-2.5 sm:p-3 border-4 border-[#3a3b42] shadow-[0_12px_36px_rgba(0,0,0,0.85)] relative">
              {/* Corner decorative rivets */}
              <div className="absolute top-1 left-1 w-2 h-2 bg-[#555555] border border-black" />
              <div className="absolute top-1 right-1 w-2 h-2 bg-[#555555] border border-black" />
              <div className="absolute bottom-1 left-1 w-2 h-2 bg-[#555555] border border-black" />
              <div className="absolute bottom-1 right-1 w-2 h-2 bg-[#555555] border border-black" />

              {/* Top Status Banner */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b-2 border-[#2b2d35] text-[10px] font-minecraft text-[#aaaaaa]">
                <div className="flex items-center gap-1.5 text-[#22c55e]">
                  <span className="w-1.5 h-1.5 bg-[#22c55e] inline-block animate-ping" />
                  <span>Late Night Grind</span>
                </div>
                <div className="text-[#38bdf8]">
                  Mumbai Server
                </div>
              </div>

              {/* Main Artwork Image */}
              <div className="relative overflow-hidden border-2 border-black group">
                <Image
                  src="/images/about_cozy_coder.jpg"
                  alt="Atharva Kurle coding late at night in a cozy Minecraft room"
                  width={640}
                  height={540}
                  priority
                  className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-102"
                />

                {/* Ambient Warm Glow Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Desk Details Tooltip Pill */}
                <div className="absolute bottom-2 left-2 right-2 bg-black/75 backdrop-blur-xs p-2 border border-[#444444] text-[10px] font-minecraft text-[#e0e0e0] flex items-center justify-between">
                  <span>☕ Chai & Coding Setup</span>
                  <span className="text-[#ffff55]">Light Level: 15</span>
                </div>
              </div>

              {/* Character Stats Bar below image */}
              <div className="mt-3 p-2.5 bg-[#121316] border border-[#2b2d35] grid grid-cols-2 gap-2 text-[10px] font-minecraft text-[#9ca3af]">
                <div className="flex justify-between">
                  <span>Player:</span>
                  <span className="text-white font-bold">Atharva_K36</span>
                </div>
                <div className="flex justify-between">
                  <span>Level:</span>
                  <span className="text-[#80ff00] font-bold">1st Year SE</span>
                </div>
                <div className="flex justify-between">
                  <span>Coords:</span>
                  <span className="text-[#38bdf8]">19.07° N, 72.87° E</span>
                </div>
                <div className="flex justify-between">
                  <span>Enchant:</span>
                  <span className="text-[#c084fc]">Efficiency V</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Minecraft Book & Quill Journal */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="relative w-full bg-[#f5e9c9] text-[#2c1d11] p-6 sm:p-8 border-4 border-[#78542c] shadow-[0_12px_40px_rgba(0,0,0,0.8)]">
              {/* Top/Left Leather Book Cover Bevel */}
              <div className="absolute -inset-2 -z-10 bg-[#4e2c14] border-4 border-[#2b1809] shadow-2xl" />

              {/* Book Spine center line */}
              <div className="hidden sm:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-transparent via-[#d4be92]/40 to-transparent pointer-events-none" />

              {/* Page Top Header */}
              <div className="flex items-center justify-between border-b-2 border-[#b89c6c]/60 pb-3 mb-6">
                <div className="flex items-center gap-2 font-minecraft text-xs text-[#603b17] font-bold">
                  <span>{page.title}</span>
                </div>
                <div className="font-minecraft text-xs text-[#8c6738]">
                  Page {currentPage + 1} of {totalPages}
                </div>
              </div>

              {/* Paragraphs */}
              <div className="space-y-4 font-sans text-sm md:text-base leading-relaxed text-[#3b2311]">
                {page.paragraphs.map((p, idx) => (
                  <p
                    key={idx}
                    className="first-letter:font-minecraft first-letter:text-lg first-letter:text-[#854d0e] leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>

              {/* Quote */}
              {page.quote && (
                <div className="mt-6 p-3 bg-[#e8d5a8] border-l-4 border-[#92400e] italic font-sans text-xs md:text-sm text-[#78350f]">
                  &ldquo;{page.quote}&rdquo;
                </div>
              )}

              {/* Book Bottom Controls */}
              <div className="mt-8 pt-4 border-t-2 border-[#b89c6c]/60 flex items-center justify-between">
                <MinecraftButton
                  size="sm"
                  variant="dark"
                  disabled={currentPage === 0}
                  onClick={prevPage}
                >
                  <span className="flex items-center gap-1">
                    <PixelIcon name="arrow-left" size={12} />
                    Previous
                  </span>
                </MinecraftButton>

                <div className="font-minecraft text-[10px] text-[#78350f] italic hidden sm:block">
                  *Signed: Atharva Kurle*
                </div>

                <MinecraftButton
                  size="sm"
                  variant="dark"
                  disabled={currentPage === totalPages - 1}
                  onClick={nextPage}
                >
                  <span className="flex items-center gap-1">
                    Next
                    <PixelIcon name="arrow-right" size={12} />
                  </span>
                </MinecraftButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
