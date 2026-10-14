"use client";

import React, { useState } from "react";
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
      aria-label="About Atharva Kurle Book and Quill"
      className="min-h-screen py-20 px-4 flex flex-col items-center justify-center relative select-none"
    >
      <div className="w-full max-w-4xl flex flex-col items-center">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-2">
          <PixelIcon name="book" size={24} />
          <h2
            className="font-minecraft text-xl md:text-2xl text-[#ffff55] tracking-wider uppercase"
            style={{ textShadow: "2px 2px 0 #000" }}
          >
            Book & Quill: Atharva&apos;s Journal
          </h2>
        </div>
        <p className="font-sans text-xs sm:text-sm text-[#9ca3af] mb-8 text-center max-w-md">
          Inspect the adventurer&apos;s lore, spawn history, and engineering philosophy.
        </p>

        {/* The Open Book */}
        <div className="relative w-full max-w-2xl bg-[#f5e9c9] text-[#2c1d11] p-6 sm:p-10 border-4 border-[#78542c] shadow-[0_12px_40px_rgba(0,0,0,0.7)]">
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

          {/* Page Content Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Left column: Player Card / Skin portrait */}
            {currentPage === 0 && (
              <div className="md:col-span-5 flex flex-col items-center p-4 bg-[#ecd9b0] border-2 border-[#b89c6c] text-center">
                {/* Handcrafted Pixel Avatar */}
                <div className="w-24 h-24 mb-3 border-2 border-[#603b17] bg-[#d97706]/20 relative overflow-hidden flex items-center justify-center">
                  <svg
                    viewBox="0 0 16 16"
                    className="w-full h-full"
                    style={{ shapeRendering: "crispEdges", imageRendering: "pixelated" }}
                  >
                    {/* Hair */}
                    <rect x="3" y="1" width="10" height="4" fill="#1e1b18" />
                    <rect x="2" y="2" width="2" height="6" fill="#1e1b18" />
                    <rect x="12" y="2" width="2" height="6" fill="#1e1b18" />
                    {/* Face Skin */}
                    <rect x="4" y="4" width="8" height="7" fill="#fcd34d" />
                    {/* Eyes */}
                    <rect x="5" y="6" width="2" height="2" fill="#1e1b18" />
                    <rect x="9" y="6" width="2" height="2" fill="#1e1b18" />
                    <rect x="5" y="6" width="1" height="1" fill="#ffffff" />
                    <rect x="9" y="6" width="1" height="1" fill="#ffffff" />
                    {/* Mouth / Smile */}
                    <rect x="7" y="9" width="2" height="1" fill="#b45309" />
                    {/* Jacket / Hoodie */}
                    <rect x="2" y="11" width="12" height="5" fill="#0284c7" />
                    <rect x="6" y="11" width="4" height="5" fill="#f8fafc" />
                  </svg>
                </div>

                <div className="font-minecraft text-xs font-bold text-[#451a03]">
                  Atharva_K36
                </div>
                <div className="font-sans text-[11px] text-[#78350f] mt-0.5">
                  Mumbai, India
                </div>

                {/* Player Mini Stats */}
                <div className="w-full mt-3 pt-2 border-t border-[#b89c6c]/70 text-[10px] font-minecraft text-[#6b350f] space-y-1 text-left">
                  <div className="flex justify-between">
                    <span>Year:</span>
                    <span className="font-bold">1st Year SE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Biome:</span>
                    <span>Mumbai Urban</span>
                  </div>
                  <div className="flex justify-between">
                    <span>HP:</span>
                    <span className="text-[#dc2626]">20/20</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Enchant:</span>
                    <span className="text-[#7c3aed]">Efficiency V</span>
                  </div>
                </div>
              </div>
            )}

            {/* Right / Main Story Text */}
            <div className={currentPage === 0 ? "md:col-span-7" : "md:col-span-12"}>
              <div className="space-y-4 font-sans text-sm md:text-base leading-relaxed text-[#3b2311]">
                {page.paragraphs.map((p, idx) => (
                  <p key={idx} className="first-letter:font-minecraft first-letter:text-lg first-letter:text-[#854d0e]">
                    {p}
                  </p>
                ))}
              </div>

              {page.quote && (
                <div className="mt-6 p-3 bg-[#e8d5a8] border-l-4 border-[#92400e] italic font-sans text-xs md:text-sm text-[#78350f]">
                  &ldquo;{page.quote}&rdquo;
                </div>
              )}
            </div>
          </div>

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
                Previous Page
              </span>
            </MinecraftButton>

            <div className="font-minecraft text-[10px] text-[#78350f] italic hidden sm:block">
              *Stamped by Atharva Kurle*
            </div>

            <MinecraftButton
              size="sm"
              variant="dark"
              disabled={currentPage === totalPages - 1}
              onClick={nextPage}
            >
              <span className="flex items-center gap-1">
                Next Page
                <PixelIcon name="arrow-right" size={12} />
              </span>
            </MinecraftButton>
          </div>
        </div>
      </div>
    </section>
  );
};
