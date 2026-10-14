"use client";

import { useCallback, useRef, useState } from "react";

export function useSoundEffects() {
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      return localStorage.getItem("minecraft_sfx_muted") === "true";
    } catch {
      return false;
    }
  });
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!audioCtxRef.current) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume().catch(() => {});
    }
    return audioCtxRef.current;
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("minecraft_sfx_muted", String(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  // 1. Classic button click: crisp short mechanical impulse
  const playClick = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "square";
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.025);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.03);
    } catch {
      // Audio playback failed
    }
  }, [isMuted, getAudioContext]);

  // 2. Hotbar / Item Pop: buoyant wooden click
  const playPop = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(900, now + 0.04);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // ignore
    }
  }, [isMuted, getAudioContext]);

  // 3. Level Up Arpeggio: iconic ascending chime
  const playLevelUp = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      const step = 0.08;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * step);

        gain.gain.setValueAtTime(0.001, now + idx * step);
        gain.gain.linearRampToValueAtTime(0.2, now + idx * step + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * step + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * step);
        osc.stop(now + idx * step + 0.25);
      });
    } catch {
      // ignore
    }
  }, [isMuted, getAudioContext]);

  // 4. Chest Open: mechanical creak
  const playChestOpen = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.linearRampToValueAtTime(320, now + 0.15);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.18);
    } catch {
      // ignore
    }
  }, [isMuted, getAudioContext]);

  // 5. Totem of Undying / Easter egg celebration sound
  const playTotem = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const shimmerNotes = [392, 523, 659, 784, 1046, 1318];

      shimmerNotes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + i * 0.06);

        gain.gain.setValueAtTime(0.15, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.45);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.45);
      });
    } catch {
      // ignore
    }
  }, [isMuted, getAudioContext]);

  // 6. Dimension Warp: Nether / End Portal travel whoosh
  const playWarp = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(480, now + 0.2);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.4);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.45);
    } catch {
      // ignore
    }
  }, [isMuted, getAudioContext]);

  // 7. Achievement Bell Ding
  const playDing = useCallback(() => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(1760, now); // A6
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch {
      // ignore
    }
  }, [isMuted, getAudioContext]);

  return {
    isMuted,
    toggleMute,
    playClick,
    playPop,
    playLevelUp,
    playChestOpen,
    playTotem,
    playWarp,
    playDing,
  };
}
