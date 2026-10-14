"use client";

import React, { useState } from "react";
import { projectsData } from "@/data/projects";
import { Project } from "@/types";
import { MinecraftButton } from "@/components/ui/MinecraftButton";
import { PixelIcon } from "@/components/ui/PixelIcon";
import { ProjectModal } from "@/components/ProjectModal";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export const WorldSelect: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project>(projectsData[0]);
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [modeFilter, setModeFilter] = useState<string>("all");
  const { playPop, playClick } = useSoundEffects();

  const filteredProjects = projectsData.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesMode = modeFilter === "all" || p.mode === modeFilter;
    return matchesSearch && matchesMode;
  });

  const handleSelect = (project: Project) => {
    playPop();
    setSelectedProject(project);
  };

  const handleOpenModal = (project?: Project) => {
    playClick();
    setModalProject(project || selectedProject);
  };

  return (
    <section
      id="projects"
      aria-label="Atharva's Projects and Worlds"
      className="min-h-screen py-20 px-4 flex flex-col items-center justify-center relative select-none"
    >
      <div className="w-full max-w-4xl flex flex-col items-center">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <PixelIcon name="compass" size={24} />
          <h2
            className="font-minecraft text-xl md:text-2xl text-[#ffff55] tracking-wider uppercase"
            style={{ textShadow: "2px 2px 0 #000" }}
          >
            Select World (Projects)
          </h2>
        </div>
        <p className="font-sans text-xs sm:text-sm text-[#9ca3af] mb-6 text-center max-w-md">
          Select a world to inspect architecture or launch the deployment.
        </p>

        {/* Filters and Search Bar */}
        <div className="w-full max-w-3xl mb-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search Input */}
          <div className="w-full sm:w-72 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search worlds or tech..."
              className="w-full px-3 py-2 bg-[#1b1c20] text-white font-minecraft text-xs border-2 border-t-[#0f1012] border-l-[#0f1012] border-b-[#3a3b42] border-r-[#3a3b42] focus:outline-none focus:border-[#ffff55]"
            />
          </div>

          {/* Mode Filters */}
          <div className="flex items-center gap-1.5 self-end sm:self-auto">
            {["all", "hardcore", "creative", "survival"].map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => {
                  playPop();
                  setModeFilter(mode);
                }}
                className={`
                  px-2.5 py-1 font-minecraft text-[10px] uppercase transition-all cursor-pointer
                  ${
                    modeFilter === mode
                      ? "bg-[#ffff55] text-black font-bold shadow-[0_0_8px_rgba(255,255,85,0.4)]"
                      : "bg-[#2b2b2b] hover:bg-[#3d3d3d] text-[#aaaaaa] border border-[#444444]"
                  }
                `}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* World Select List Box (Minecraft stone GUI container) */}
        <div className="w-full max-w-3xl bg-[#0e0e11]/90 border-4 border-[#3a3b42] p-2 sm:p-3 shadow-2xl">
          <div className="max-h-[460px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-12 font-minecraft text-xs text-[#888888]">
                No worlds found matching your query.
              </div>
            ) : (
              filteredProjects.map((project) => {
                const isSelected = selectedProject?.id === project.id;

                return (
                  <div
                    key={project.id}
                    onClick={() => handleSelect(project)}
                    onDoubleClick={() => handleOpenModal(project)}
                    className={`
                      flex items-start gap-3 p-3 transition-all cursor-pointer border-2
                      ${
                        isSelected
                          ? "bg-[#252830] border-white shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                          : "bg-[#18191e] hover:bg-[#202127] border-[#2b2d35]"
                      }
                    `}
                  >
                    {/* World Icon */}
                    <div className="shrink-0 w-12 h-12 bg-[#2c2d35] border-2 border-t-[#454752] border-l-[#454752] border-b-[#15161a] border-r-[#15161a] flex items-center justify-center">
                      <PixelIcon name={project.icon} size={28} />
                    </div>

                    {/* World Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-minecraft text-sm font-bold text-white truncate">
                          {project.name}
                        </h3>
                        <span
                          className={`shrink-0 font-minecraft text-[9px] uppercase px-1.5 py-0.5 border ${
                            project.mode === "hardcore"
                              ? "text-[#f87171] border-[#f87171]/40 bg-[#f87171]/10"
                              : project.mode === "creative"
                              ? "text-[#38bdf8] border-[#38bdf8]/40 bg-[#38bdf8]/10"
                              : "text-[#4ade80] border-[#4ade80]/40 bg-[#4ade80]/10"
                          }`}
                        >
                          {project.mode}
                        </span>
                      </div>

                      <div className="font-minecraft text-[10px] text-[#8c909e] truncate mt-0.5">
                        {project.id} ({project.lastPlayed || "Recent"})
                      </div>

                      <p className="font-sans text-xs text-[#b8bac2] line-clamp-1 mt-1">
                        {project.description}
                      </p>

                      {/* Tech stack pills */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.techStack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="font-minecraft text-[8px] sm:text-[9px] px-1.5 py-0.5 bg-[#2c2e38] text-[#cccccc] border border-[#3e414f]"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="font-minecraft text-[8px] sm:text-[9px] px-1.5 py-0.5 text-[#888888]">
                            +{project.techStack.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Action Controls Bar */}
        <div className="w-full max-w-3xl mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <MinecraftButton
            size="md"
            variant="primary"
            onClick={() => handleOpenModal()}
          >
            Play Selected World
          </MinecraftButton>

          {selectedProject?.links.github && (
            <MinecraftButton
              size="md"
              variant="default"
              onClick={() => {
                playClick();
                window.open(selectedProject.links.github, "_blank", "noopener,noreferrer");
              }}
            >
              Inspect Source (GitHub)
            </MinecraftButton>
          )}

          <MinecraftButton
            size="md"
            variant="dark"
            onClick={() => {
              playClick();
              const el = document.getElementById("contact");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Create New World (Contact)
          </MinecraftButton>
        </div>
      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={modalProject}
        onClose={() => setModalProject(null)}
      />
    </section>
  );
};
