"use client";

import { useEffect, useState } from "react";

export function useKeyboardHotbar(
  initialSlot: number = 0,
  onSlotChange?: (slot: number) => void
) {
  const [activeSlot, setActiveSlot] = useState<number>(initialSlot);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Don't intercept if user is typing in an input or textarea
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      const key = e.key;
      const num = parseInt(key, 10);
      if (!isNaN(num) && num >= 1 && num <= 9) {
        const slotIndex = num - 1;
        setActiveSlot(slotIndex);
        onSlotChange?.(slotIndex);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSlotChange]);

  const selectSlot = (slot: number) => {
    setActiveSlot(slot);
    onSlotChange?.(slot);
  };

  return { activeSlot, selectSlot };
}
