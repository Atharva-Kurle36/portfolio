"use client";

import React, { useEffect } from "react";
import { Project } from "@/types";
import { MinecraftButton } from "@/components/ui/MinecraftButton";
import { PixelIcon } from "@/components/ui/PixelIcon";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
}) => {
  const { playClick } = useSoundEffects();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const handleAction = (url?: string) => {
    playClick();
    if (url && url !== "#") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const getModeColor = (mode: string) => {
    switch (mode) {
      case "hardcore":
        return "text-[#ef4444] border-[#ef4444]";
      case "creative":
        return "text-[#38bdf8] border-[#38bdf8]";
      default:
        return "text-[#22c55e] border-[#22c55e]";
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs select-none"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#c6c6c6] p-6 sm:p-8 border-4 border-[#ffffff] border-b-4 border-r-4 border-b-[#555555] border-r-[#555555] shadow-2xl relative text-[#222222]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-start justify-between border-b-2 border-[#8b8b8b] pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#8b8b8b] border-2 border-t-[#373737] border-l-[#373737] border-b-[#ffffff] border-r-[#ffffff] flex items-center justify-center">
              <PixelIcon name={project.icon} size={28} />
            </div>
            <div>
              <h3
                id="modal-title"
                className="font-minecraft text-lg sm:text-xl font-bold text-[#1f2937]"
              >
                {project.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`font-minecraft text-[10px] uppercase px-1.5 py-0.5 border bg-black/10 ${getModeColor(
                    project.mode
                  )}`}
                >
                  {project.mode} Mode
                </span>
                <span className="font-minecraft text-[10px] text-[#4b5563]">
                  {project.version || "v1.0.0"}
                </span>
              </div>
            </div>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 bg-[#8b8b8b] hover:bg-[#a0a0a0] border-2 border-t-[#ffffff] border-l-[#ffffff] border-b-[#373737] border-r-[#373737] flex items-center justify-center text-white cursor-pointer active:translate-y-[1px]"
          >
            <PixelIcon name="close" size={14} />
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {/* Detailed description */}
          <div>
            <div className="font-minecraft text-xs text-[#374151] mb-1 font-bold">
              World Description
            </div>
            <p className="font-sans text-sm text-[#374151] leading-relaxed bg-[#dfdfdf] p-3 border border-[#b0b0b0]">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Technical Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div>
              <div className="font-minecraft text-xs text-[#374151] mb-1 font-bold">
                Advancements & Architecture
              </div>
              <ul className="space-y-1.5 bg-[#dfdfdf] p-3 border border-[#b0b0b0] font-sans text-xs text-[#374151]">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#16a34a] font-bold">✔</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack Badges */}
          <div>
            <div className="font-minecraft text-xs text-[#374151] mb-2 font-bold">
              Enchanted Technologies
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="font-minecraft text-[10px] px-2.5 py-1 bg-[#8b8b8b] text-white border-t-2 border-l-2 border-[#ffffff] border-b-2 border-r-2 border-[#373737]"
                  style={{ textShadow: "1px 1px 0 #000" }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="mt-6 pt-4 border-t-2 border-[#8b8b8b] flex flex-wrap items-center justify-end gap-3">
          {project.links.github && (
            <MinecraftButton
              size="md"
              variant="default"
              onClick={() => handleAction(project.links.github)}
            >
              <span className="flex items-center gap-2">
                <PixelIcon name="sword" size={16} />
                View Source Code
              </span>
            </MinecraftButton>
          )}

          {project.links.demo && project.links.demo !== "#" && (
            <MinecraftButton
              size="md"
              variant="primary"
              onClick={() => handleAction(project.links.demo)}
            >
              <span className="flex items-center gap-2">
                <PixelIcon name="portal" size={16} />
                Enter World (Live Demo)
              </span>
            </MinecraftButton>
          )}

          <MinecraftButton size="md" variant="dark" onClick={onClose}>
            Back
          </MinecraftButton>
        </div>
      </div>
    </div>
  );
};
