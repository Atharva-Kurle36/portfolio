"use client";

import React, { useEffect, useState } from "react";
import { PixelIcon } from "@/components/ui/PixelIcon";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface ConfettiEasterEggProps {
  active: boolean;
  onComplete: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  vx: number;
  vy: number;
}

export const ConfettiEasterEgg: React.FC<ConfettiEasterEggProps> = ({
  active,
  onComplete,
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const { playTotem } = useSoundEffects();

  useEffect(() => {
    if (!active) return;

    playTotem();

    // Generate 45 pixel confetti particles
    const colors = ["#ffd700", "#55ff55", "#55ffff", "#ff55ff", "#ffffff", "#ff5555"];
    const newParticles: Particle[] = [];

    for (let i = 0; i < 50; i++) {
      const angle = (Math.PI * 2 * i) / 50 + (Math.random() - 0.5);
      const speed = Math.random() * 8 + 4;
      newParticles.push({
        id: i,
        x: 50,
        y: 50,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.floor(Math.random() * 6) + 4,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
      });
    }

    const animFrame = requestAnimationFrame(() => {
      setParticles(newParticles);
    });

    const timer = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      cancelAnimationFrame(animFrame);
      clearTimeout(timer);
    };
  }, [active, playTotem, onComplete]);

  if (!active) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center select-none overflow-hidden"
    >
      {/* Golden Screen Flash */}
      <div className="absolute inset-0 bg-yellow-400/15 animate-pulse" />

      {/* Floating Center Totem */}
      <div className="relative z-10 flex flex-col items-center animate-bounce">
        <div className="p-4 bg-black/60 border-4 border-[#ffd700] shadow-[0_0_40px_#ffd700] scale-150 mb-6">
          <PixelIcon name="totem" size={64} className="animate-pulse" />
        </div>

        <div
          className="font-minecraft text-lg sm:text-2xl text-[#ffff55] tracking-widest uppercase text-center px-4 py-2 bg-black/80 border-2 border-[#ffd700]"
          style={{ textShadow: "3px 3px 0 #000" }}
        >
          Totem of Undying Activated!
        </div>

        <div className="font-sans text-xs sm:text-sm text-[#e2e8f0] bg-black/70 px-3 py-1 mt-2">
          All bugs neutralized • Code resilience +100%
        </div>
      </div>

      {/* Pixel Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute animate-ping"
            style={{
              left: `calc(50% + ${p.vx * 24}px)`,
              top: `calc(50% + ${p.vy * 24}px)`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              boxShadow: `0 0 6px ${p.color}`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
