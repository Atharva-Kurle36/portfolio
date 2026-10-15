"use client";

import React, { useState, useEffect, useRef } from "react";
import { PixelIcon } from "@/components/ui/PixelIcon";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export type FrameType = "task" | "goal" | "challenge";

export interface TimelineAdvancement {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  frameType: FrameType;
  icon: React.ComponentProps<typeof PixelIcon>["name"];
  x: number; // Horizontal coordinate (Left to Right progression)
  y: number; // Vertical coordinate (Trunk at y=220, top branches at y=80, bottom branches at y=350)
  parentId?: string;
  description: string;
  xpReward: number;
  lootItem?: string;
  unlocked?: boolean;
}

// 35 Advancements laid out HORIZONTALLY along the timeline from Left (School) to Right (Production & Future)
// Central trunk line runs horizontally along y=220
const treeNodes: TimelineAdvancement[] = [
  // ==========================================
  // STAGE 0: ORIGIN (SCHOOL) - X: 80
  // ==========================================
  {
    id: "root-origin",
    title: "School: St. Stanislaus High School",
    subtitle: "SSC (Batch 2022-2023) • Bandra (West)",
    category: "Origins & Foundations",
    frameType: "task",
    icon: "map",
    x: 80,
    y: 220,
    description: "Completed schooling and Secondary School Certificate (SSC) at St. Stanislaus High School, Bandra (West), Mumbai-400051. Cultivated discipline, analytical foundations, and curiosity for computing.",
    xpReward: 100,
    lootItem: "Adventurer's Map of Bandra",
    unlocked: true,
  },

  // ==========================================
  // STAGE 1: JR COLLEGE & HACKATHONS - X: 340
  // ==========================================
  {
    id: "polytechnic",
    title: "Jr College: Vidyalankar Polytechnic",
    subtitle: "Diploma in IT • Mastered Web & App Building",
    category: "Education",
    frameType: "task",
    icon: "banner",
    x: 340,
    y: 220,
    parentId: "root-origin",
    description: "Diploma in Information Technology from Vidyalankar Polytechnic, Wadala. Learned everything of web and app building across fullstack architectures, participated in multiple hackathons, and graduated with 88.47% distinction before getting promoted to degree engineering.",
    xpReward: 150,
    lootItem: "Diploma Guild Banner",
    unlocked: true,
  },
  // Top Branch: 88.47% Distinction
  {
    id: "polytechnic-distinction",
    title: "Scored 88.47% Distinction",
    subtitle: "Diploma Rank • Promoted to Degree",
    category: "Academic Achievement",
    frameType: "challenge",
    icon: "banner",
    x: 340,
    y: 80,
    parentId: "polytechnic",
    description: "Graduated with an outstanding academic distinction score of 88.47% at Vidyalankar Polytechnic after mastering web and app building, earning promotion to Degree Engineering.",
    xpReward: 350,
    lootItem: "88.47% Gold Distinction Standard",
    unlocked: true,
  },
  // Bottom Branch: Multiple Hackathons & Events (Built Interest in Web & App Dev)
  {
    id: "hackathons-lead",
    title: "Multiple Hackathons & Events",
    subtitle: "Built Interest in Web & App Dev",
    category: "Hackathons & Events",
    frameType: "task",
    icon: "iron-sword",
    x: 340,
    y: 350,
    parentId: "polytechnic",
    description: "Active participant in multiple collegiate hackathons and tech events, which built a strong interest and deep foundation in Web & App Development.",
    xpReward: 300,
    lootItem: "Hackathon Iron Broadsword",
    unlocked: true,
  },
  // Hackathon Project 1: Learnify AI
  {
    id: "learnify-ai",
    title: "Learnify: AI Study Tracker",
    subtitle: "Web Platform & Mobile App (Hackathon)",
    category: "AI & Education",
    frameType: "challenge",
    icon: "respawn-anchor",
    x: 480,
    y: 290,
    parentId: "hackathons-lead",
    description: "AI-driven study tracker combining a web platform and application. Features automated revision schedules and learner progress analytics.",
    xpReward: 500,
    lootItem: "Learnify Respawn Core",
    unlocked: true,
  },
  // Hackathon Project 2: Safenet
  {
    id: "safenet-ai",
    title: "Safenet: Phishing Detection",
    subtitle: "AI Cybersecurity Simulation (Hackathon)",
    category: "Cybersecurity",
    frameType: "challenge",
    icon: "bow",
    x: 480,
    y: 360,
    parentId: "hackathons-lead",
    description: "AI-powered phishing detection and training simulation website protecting users from deceptive emails and fraudulent URLs.",
    xpReward: 500,
    lootItem: "Safenet Sniper Bow",
    unlocked: true,
  },
  // Hackathon Project 3: SherlockLogs
  {
    id: "sherlocklogs",
    title: "SherlockLogs: Blockchain Provenance",
    subtitle: "Supply Chain Tracker (Hackathon)",
    category: "Web3 Innovation",
    frameType: "challenge",
    icon: "diamond-sword",
    x: 480,
    y: 430,
    parentId: "hackathons-lead",
    description: "Blockchain-based supply chain tracker providing tamper-proof handoff logs and cryptographic authenticity checks for physical goods.",
    xpReward: 500,
    lootItem: "SherlockLogs Diamond Blade",
    unlocked: true,
  },
  // Child of Learnify: Hackathon Recognition
  {
    id: "hackathon-trophy",
    title: "Hackathon Top Recognition",
    subtitle: "Outstanding Prototype Award",
    category: "Achievement",
    frameType: "challenge",
    icon: "arrow",
    x: 600,
    y: 290,
    parentId: "learnify-ai",
    description: "Celebrated for delivering AI-driven solutions, sleek responsive UI, and resilient architectures during collegiate hackathons.",
    xpReward: 600,
    lootItem: "Piercing Arrow of Innovation",
    unlocked: true,
  },
  // Child of Safenet: 99% Precision Bullseye
  {
    id: "safenet-precision",
    title: "Bullseye Detection Precision",
    subtitle: "99% Model Accuracy in Phishing Simulation",
    category: "Precision Engineering",
    frameType: "challenge",
    icon: "target",
    x: 600,
    y: 360,
    parentId: "safenet-ai",
    description: "Trained heuristics to identify fraudulent email vectors with high accuracy and low false-positive rates.",
    xpReward: 600,
    lootItem: "Target Bullseye Block",
    unlocked: true,
  },

  // ==========================================
  // STAGE 2: DEGREE & INTERNSHIP - X: 740 - 960
  // ==========================================
  // VSIT Admit
  {
    id: "vsit-admit",
    title: "Degree: VSIT (Vidyalankar School of IT)",
    subtitle: "Promoted to Degree Engineering",
    category: "Software Engineering",
    frameType: "task",
    icon: "spyglass",
    x: 740,
    y: 220,
    parentId: "polytechnic",
    description: "Promoted to Degree Engineering! Enrolled in VSIT (Vidyalankar School of Information Technology) in Mumbai, pursuing an accelerated international curriculum in Software Engineering.",
    xpReward: 200,
    lootItem: "VSIT Observation Glass",
    unlocked: true,
  },
  // Bottom Branch of VSIT: Student Management System
  {
    id: "mgmt-system",
    title: "Student-Teacher Management System",
    subtitle: "Collegiate Web Portal (Hackathon)",
    category: "Web Development",
    frameType: "task",
    icon: "emerald",
    x: 740,
    y: 350,
    parentId: "vsit-admit",
    description: "Comprehensive collegiate web portal managing student attendance, academic grades, lecture resources, and faculty communication.",
    xpReward: 350,
    lootItem: "Emerald Portal Shard",
    unlocked: true,
  },
  {
    id: "rbac-engine",
    title: "RBAC Authentication Engine",
    subtitle: "Role-Based Access Control",
    category: "Backend Systems",
    frameType: "task",
    icon: "pumpkin",
    x: 860,
    y: 320,
    parentId: "mgmt-system",
    description: "Secure role-based authentication dividing student and faculty privileges with automated continuous grading algorithms.",
    xpReward: 400,
    lootItem: "Carved RBAC Sentry",
    unlocked: true,
  },
  {
    id: "db-relational",
    title: "Relational Database Architecture",
    subtitle: "Structured Query Schemas & SQL",
    category: "Database Systems",
    frameType: "goal",
    icon: "emerald",
    x: 860,
    y: 390,
    parentId: "mgmt-system",
    description: "Normalized relational schemas ensuring transactional integrity across student rosters and grade evaluations.",
    xpReward: 450,
    lootItem: "Flawless Emerald Gem",
    unlocked: true,
  },

  // University of Greater Manchester Dual Degree
  {
    id: "greater-manchester",
    title: "Univ. of Greater Manchester Dual Degree",
    subtitle: "Dual Degree in Software Engineering",
    category: "Degree Quest",
    frameType: "task",
    icon: "spyglass",
    x: 980,
    y: 220,
    parentId: "vsit-admit",
    description: "Promoted to Degree Engineering under the University of Greater Manchester and VSIT partnership (B.Eng. Software Engineering & B.Sc. Hons Computer Science), taking diploma web and app building to advanced engineering domains.",
    xpReward: 400,
    lootItem: "International Degree Horizon",
    unlocked: true,
  },
  // Top Branch: Royal Trader Frontend Internship
  {
    id: "royal-trader",
    title: "Royal Trader (Frontend Internship)",
    subtitle: "Frontend Development Intern • Jun-Aug 2025",
    category: "Work Experience",
    frameType: "task",
    icon: "trident",
    x: 980,
    y: 80,
    parentId: "greater-manchester",
    description: "Worked on frontend development of the company website, building responsive and user-friendly web pages (June - August 2025).",
    xpReward: 250,
    lootItem: "Frontend Trident of Deployment",
    unlocked: true,
  },
  {
    id: "frontend-ux",
    title: "Responsive UI & UX Optimization",
    subtitle: "Production Frontend Engineering",
    category: "Industry Craft",
    frameType: "task",
    icon: "trident",
    x: 1110,
    y: 50,
    parentId: "royal-trader",
    description: "Collaborated with team to elevate site design, cross-device viewport responsiveness, and overall user interaction fidelity.",
    xpReward: 300,
    lootItem: "Enchanted UI Trident",
    unlocked: true,
  },
  {
    id: "excel-mgmt",
    title: "Corporate Inventory Management",
    subtitle: "Advanced Microsoft Excel",
    category: "Work Experience",
    frameType: "task",
    icon: "barrel",
    x: 1110,
    y: 110,
    parentId: "royal-trader",
    description: "Managed company inventory using Microsoft Excel, keeping stock records accurate, structured, and continuously synchronized.",
    xpReward: 200,
    lootItem: "Oak Inventory Barrel",
    unlocked: true,
  },
  {
    id: "consistency",
    title: "Adaptability & Consistency",
    subtitle: "Professional Ethics & Fast Learning",
    category: "Core Philosophy",
    frameType: "goal",
    icon: "totem",
    x: 1230,
    y: 110,
    parentId: "excel-mgmt",
    description: "Adaptable depending on the task, taking responsibilities seriously, and maintaining consistent dedication to learning and growing.",
    xpReward: 400,
    lootItem: "Totem of Undying Dedication",
    unlocked: true,
  },

  // Cybersecurity Pathways Portal
  {
    id: "secure-cyber",
    title: "Secure Cyber Future Career Web",
    subtitle: "Cybersecurity Pathways (Hackathon)",
    category: "Web & Career",
    frameType: "task",
    icon: "pottery",
    x: 1040,
    y: 350,
    parentId: "mgmt-system",
    description: "Career orientation and cybersecurity roadmap portal guiding students through technical certifications, pathways, and cyber defense skills.",
    xpReward: 300,
    lootItem: "Sherd of Cybersecurity Path",
    unlocked: true,
  },
  {
    id: "cyber-defense",
    title: "Cyber Pathway Diagnostics",
    subtitle: "Interactive Diagnostic Engine",
    category: "Cybersecurity",
    frameType: "challenge",
    icon: "smithing-template",
    x: 1170,
    y: 350,
    parentId: "secure-cyber",
    description: "Skill diagnostic recommending custom certification paths across network security, pentesting, and digital forensics.",
    xpReward: 450,
    lootItem: "Netherite Security Template",
    unlocked: true,
  },

  // ==========================================
  // STAGE 3: SOFTWARE ENGINEERING FRONTIER - X: 1290
  // ==========================================
  {
    id: "first-year-se",
    title: "Software Engineering Frontier",
    subtitle: "Degree Engineering • Creator of SwiftSum",
    category: "Engineering Mastery",
    frameType: "task",
    icon: "spyglass",
    x: 1290,
    y: 220,
    parentId: "greater-manchester",
    description: "Promoted to Degree Engineering! Dual-degree software engineering undergraduate mastering discrete algorithms, object-oriented systems architecture, and live projects in web and app development (including recently built SwiftSum).",
    xpReward: 500,
    lootItem: "High-Resolution Spyglass",
    unlocked: true,
  },
  // Top: SwiftSum (Recently Built Web Platform)
  {
    id: "swiftsum",
    title: "SwiftSum: Smart AI Summarizer",
    subtitle: "Recently Built Web Platform • Degree Engg",
    category: "Recent Website",
    frameType: "challenge",
    icon: "beacon",
    x: 1290,
    y: 80,
    parentId: "first-year-se",
    description: "Recently built and launched SwiftSum — a high-speed web application for rapid content, article, and document summarization. Built upon the comprehensive web and app building mastered during diploma at Vidyalankar Polytechnic, taking fullstack engineering to degree level.",
    xpReward: 750,
    lootItem: "SwiftSum Net Beacon of Clarity",
    unlocked: true,
  },
  // Top: FRIDAY AI
  {
    id: "friday-ai",
    title: "FRIDAY: Personal AI Assistant",
    subtitle: "Voice-Driven System Automation",
    category: "Artificial Intelligence",
    frameType: "task",
    icon: "honey",
    x: 1420,
    y: 80,
    parentId: "first-year-se",
    description: "Intelligent desktop and voice assistant capable of automated web searches, system task execution, and natural dialogue.",
    xpReward: 400,
    lootItem: "Amber Honey AI Core",
    unlocked: true,
  },
  {
    id: "prompt-eng",
    title: "Prompt Engineering & NLP Workflows",
    subtitle: "LLM Prompt Architecture",
    category: "AI & Automation",
    frameType: "challenge",
    icon: "crossbow",
    x: 1550,
    y: 80,
    parentId: "friday-ai",
    description: "Engineered prompt parsing pipelines, context management, and voice API integration for natural desktop dialogues.",
    xpReward: 500,
    lootItem: "Quick Charge Crossbow",
    unlocked: true,
  },

  // Bottom: E-Commerce & Financial Web Apps
  {
    id: "ecommerce-mongo",
    title: "E-Commerce Web Platform",
    subtitle: "Full-Stack Storefront with MongoDB",
    category: "Web Development",
    frameType: "task",
    icon: "crossbow",
    x: 1420,
    y: 330,
    parentId: "first-year-se",
    description: "Full-featured online shopping storefront with dynamic catalog filtering, shopping cart persistence, and MongoDB database storage.",
    xpReward: 400,
    lootItem: "Multi-Shot Storefront Bow",
    unlocked: true,
  },
  {
    id: "mongo-pipeline",
    title: "Aggregation Pipelines & Cart State",
    subtitle: "NoSQL Data Modeling",
    category: "Database Management",
    frameType: "task",
    icon: "crossbow",
    x: 1550,
    y: 330,
    parentId: "ecommerce-mongo",
    description: "Document aggregation pipelines for product search, faceted filters, and persistent checkout cart states.",
    xpReward: 450,
    lootItem: "Precision Crossbow",
    unlocked: true,
  },
  {
    id: "expense-tracker",
    title: "Smart Expense Tracker",
    subtitle: "Financial Outflow Web Application",
    category: "Web Applications",
    frameType: "task",
    icon: "lightning-rod",
    x: 1420,
    y: 410,
    parentId: "first-year-se",
    description: "Web application for budget tracking, expense categorization, financial visual reports, and savings goal projections.",
    xpReward: 300,
    lootItem: "Copper Lightning Rod",
    unlocked: true,
  },
  {
    id: "data-viz",
    title: "Visual Outflow Analytics",
    subtitle: "Interactive Budget Charts",
    category: "Data Visualization",
    frameType: "challenge",
    icon: "crossbow",
    x: 1550,
    y: 410,
    parentId: "expense-tracker",
    description: "Interactive chart breakdowns of spending surpluses and monthly projections helping users maintain personal budget discipline.",
    xpReward: 450,
    lootItem: "Crossbow of Financial Focus",
    unlocked: true,
  },

  // ==========================================
  // STAGE 4: ADVANCED WEB & IOT - X: 1670
  // ==========================================
  {
    id: "web-dev",
    title: "Fullstack Web & App Development",
    subtitle: "React 19, Next.js & Mobile Architecture",
    category: "Core Domain",
    frameType: "challenge",
    icon: "diamond-boots",
    x: 1670,
    y: 220,
    parentId: "first-year-se",
    description: "Building responsive, accessible web and cross-platform app interfaces with high performance and clean component hierarchy.",
    xpReward: 600,
    lootItem: "Enchanted Diamond Boots",
    unlocked: true,
  },
  // Top: Minecraft Portfolio
  {
    id: "minecraft-portfolio",
    title: "Minecraft Retro Portfolio",
    subtitle: "Gamified Web Architecture",
    category: "Web Engineering",
    frameType: "task",
    icon: "water-bucket",
    x: 1670,
    y: 80,
    parentId: "web-dev",
    description: "Retro Minecraft-inspired personal portfolio web application built with zero copyrighted assets, pure CSS bevels, and Web Audio API synthesized 8-bit sound effects.",
    xpReward: 500,
    lootItem: "Infinite Water Bucket",
    unlocked: true,
  },
  // Bottom: Blockchain & IoT Systems
  {
    id: "blockchain-domain",
    title: "Blockchain & Cryptographic Ledgers",
    subtitle: "Decentralized Systems Domain",
    category: "Core Domain",
    frameType: "task",
    icon: "brush",
    x: 1670,
    y: 350,
    parentId: "web-dev",
    description: "Exploration of cryptographic hashing, smart contract logic, immutable logs, and decentralized ledger trust mechanisms.",
    xpReward: 350,
    lootItem: "Archaeologist's Brush",
    unlocked: true,
  },
  {
    id: "iot-telemetry",
    title: "IoT & Connected Microcontrollers",
    subtitle: "Hardware-Software Telemetry",
    category: "Core Domain",
    frameType: "task",
    icon: "pottery",
    x: 1800,
    y: 330,
    parentId: "blockchain-domain",
    description: "Microcontroller circuit prototyping, sensor data ingestion, embedded logic, and network telemetry.",
    xpReward: 400,
    lootItem: "Decorated Telemetry Vessel",
    unlocked: true,
  },
  {
    id: "embedded-logic",
    title: "Hardware-Software Integration",
    subtitle: "Embedded Firmware & Sensor Feeds",
    category: "IoT Systems",
    frameType: "task",
    icon: "sculk",
    x: 1800,
    y: 410,
    parentId: "blockchain-domain",
    description: "Prototyping responsive embedded control logic and peripheral interfaces bridging physical sensors with cloud software.",
    xpReward: 400,
    lootItem: "Sculk Acoustic Sensor",
    unlocked: true,
  },

  // ==========================================
  // STAGE 5: SUMMIT (LIVE PROJECTS) - X: 1980
  // ==========================================
  {
    id: "live-projects",
    title: "Live Projects & Industry Engineering",
    subtitle: "Mumbai to the World • Practical Engineering",
    category: "Engineering Horizon",
    frameType: "goal",
    icon: "boots",
    x: 1980,
    y: 220,
    parentId: "web-dev",
    description: "Showcasing classroom learnings and technical skills through live production systems, high-concurrency applications, and industry knowledge.",
    xpReward: 600,
    lootItem: "Adventurer's Leather Boots",
    unlocked: true,
  },
  // Top: Multilingual Communication
  {
    id: "multilingual",
    title: "Multilingual Communication",
    subtitle: "English, Hindi & Marathi",
    category: "Communication",
    frameType: "task",
    icon: "jukebox",
    x: 1980,
    y: 80,
    parentId: "live-projects",
    description: "Fluent communication and technical collaboration across English, Hindi, and Marathi for diverse teams and global clients.",
    xpReward: 450,
    lootItem: "Jukebox of Polyglot Harmony",
    unlocked: true,
  },
  // Bottom: Rest & Discipline
  {
    id: "rest-discipline",
    title: "Rest & Relentless Execution",
    subtitle: "Sustainable Engineering Practice",
    category: "Core Philosophy",
    frameType: "task",
    icon: "bed",
    x: 1980,
    y: 350,
    parentId: "live-projects",
    description: "Balancing high-intensity development with disciplined recovery, ensuring consistent technical performance and clear focus.",
    xpReward: 300,
    lootItem: "Red Oak Bed of Repose",
    unlocked: true,
  },
];

// Quick jump tab destinations along the horizontal timeline
const TIMELINE_CHAPTERS = [
  { id: "all", label: "📜 All Journey", scrollX: 0 },
  { id: "school", label: "🏫 School & Jr College", scrollX: 0 },
  { id: "degree", label: "🎓 Promoted to Degree", scrollX: 620 },
  { id: "swiftsum", label: "⚡ SwiftSum (Recent)", scrollX: 1100 },
  { id: "internship", label: "💼 Royal Trader", scrollX: 860 },
  { id: "hackathons", label: "⚔️ Hackathons & AI", scrollX: 300 },
  { id: "production", label: "🚀 Production Scale", scrollX: 1450 },
];

// Advancement Golden-Bronze Frame Renderer
interface FrameProps {
  type: FrameType;
  isSelected: boolean;
  children: React.ReactNode;
}

const AdvancementFrameBadge: React.FC<FrameProps> = ({ type, isSelected, children }) => {
  if (type === "challenge") {
    // 8-pointed notched star frame
    return (
      <div
        className={`relative -left-[2px] -top-[2px] w-[52px] h-[52px] flex items-center justify-center cursor-pointer transition-transform duration-150 hover:scale-110 ${
          isSelected ? "scale-110 drop-shadow-[0_0_8px_#ffff55]" : ""
        }`}
      >
        <svg
          width="52"
          height="52"
          viewBox="0 0 52 52"
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        >
          {/* Outer dark brown/black outline with pointy ears & concave notches */}
          <path
            d="
              M 9 1 
              L 43 1 
              L 51 9 
              L 45 17 
              Q 49 26 45 35 
              L 51 43 
              L 43 51 
              L 35 45 
              Q 26 49 17 45 
              L 9 51 
              L 1 43 
              L 7 35 
              Q 3 26 7 17 
              L 1 9 
              Z"
            fill="#2c1e08"
          />
          {/* Golden bronze outer bevel */}
          <path
            d="
              M 10 3 
              L 42 3 
              L 49 10 
              L 43 18 
              Q 47 26 43 34 
              L 49 42 
              L 42 49 
              L 34 43 
              Q 26 47 18 43 
              L 10 49 
              L 3 42 
              L 9 34 
              Q 5 26 9 18 
              L 3 10 
              Z"
            fill="#c29a38"
          />
          {/* Top/Left golden highlight */}
          <path
            d="M 10 3 L 42 3 L 49 10 L 45 14 L 40 8 L 12 8 L 6 14 L 3 10 Z"
            fill="#deb757"
          />
          {/* Bottom/Right golden shadow */}
          <path
            d="M 49 42 L 42 49 L 10 49 L 6 45 L 12 44 L 40 44 L 45 38 L 49 42 Z"
            fill="#805b14"
          />
          {/* Inner golden-amber plate */}
          <path
            d="
              M 11 6 
              L 41 6 
              L 46 11 
              L 41 19 
              Q 45 26 41 33 
              L 46 41 
              L 41 46 
              L 33 41 
              Q 26 45 19 41 
              L 11 46 
              L 6 41 
              L 11 33 
              Q 7 26 11 19 
              L 6 11 
              Z"
            fill="#a1761e"
          />
        </svg>
        <div className="relative z-10 flex items-center justify-center">
          {children}
        </div>
      </div>
    );
  }

  if (type === "goal") {
    // Rounded circle / pill frame
    return (
      <div
        className={`relative w-[48px] h-[48px] flex items-center justify-center cursor-pointer transition-transform duration-150 hover:scale-110 ${
          isSelected ? "scale-110 drop-shadow-[0_0_8px_#ffff55]" : ""
        }`}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        >
          {/* Outer dark border */}
          <rect x="0" y="0" width="48" height="48" rx="24" fill="#2c1e08" />
          {/* Golden bronze bevel */}
          <rect x="2" y="2" width="44" height="44" rx="22" fill="#c29a38" />
          {/* Top/Left highlight */}
          <path
            d="M 24 2 A 22 22 0 0 0 2 24 L 6 24 A 18 18 0 0 1 24 6 Z"
            fill="#deb757"
          />
          {/* Bottom/Right shadow */}
          <path
            d="M 24 46 A 22 22 0 0 0 46 24 L 42 24 A 18 18 0 0 1 24 42 Z"
            fill="#805b14"
          />
          {/* Inner golden-amber plate */}
          <rect x="5" y="5" width="38" height="38" rx="19" fill="#a1761e" />
        </svg>
        <div className="relative z-10 flex items-center justify-center">
          {children}
        </div>
      </div>
    );
  }

  // Standard Task Frame (Square with beveled edges)
  return (
    <div
      className={`relative w-[48px] h-[48px] flex items-center justify-center cursor-pointer transition-transform duration-150 hover:scale-110 ${
        isSelected ? "scale-110 drop-shadow-[0_0_8px_#ffff55]" : ""
      }`}
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
      >
        {/* Outer dark border with clipped corners */}
        <path
          d="M 4 0 L 44 0 L 48 4 L 48 44 L 44 48 L 4 48 L 0 44 L 0 4 Z"
          fill="#2c1e08"
        />
        {/* Golden bronze bevel */}
        <path
          d="M 5 2 L 43 2 L 46 5 L 46 43 L 43 46 L 5 46 L 2 43 L 2 5 Z"
          fill="#c29a38"
        />
        {/* Top/Left highlight */}
        <path
          d="M 5 2 L 43 2 L 46 5 L 41 5 L 39 4 L 7 4 L 4 7 L 4 41 L 2 43 L 2 5 Z"
          fill="#deb757"
        />
        {/* Bottom/Right shadow */}
        <path
          d="M 46 5 L 46 43 L 43 46 L 5 46 L 6 44 L 41 44 L 44 41 L 44 6 Z"
          fill="#805b14"
        />
        {/* Inner golden-amber plate */}
        <path
          d="M 6 5 L 42 5 L 43 6 L 43 42 L 42 43 L 6 43 L 5 42 L 5 6 Z"
          fill="#a1761e"
        />
      </svg>
      <div className="relative z-10 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export const AdvancementTree: React.FC = () => {
  // Vidyalankar Polytechnic / Degree selected by default
  const [selectedNode, setSelectedNode] = useState<TimelineAdvancement>(treeNodes[1]);
  const [toast, setToast] = useState<{ node: TimelineAdvancement; show: boolean } | null>(null);
  const [activeChapter, setActiveChapter] = useState<string>("all");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { playPop, playLevelUp, playDing } = useSoundEffects();

  // Mouse drag-to-scroll support for the horizontal canvas
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeftState(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const scrollToX = (x: number, chapterId?: string) => {
    if (chapterId) setActiveChapter(chapterId);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: x,
        behavior: "smooth",
      });
    }
  };

  const handleScrollPrev = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const handleScrollNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  const handleSelectNode = (node: TimelineAdvancement) => {
    setSelectedNode(node);
    if (node.frameType === "challenge") {
      playLevelUp();
    } else {
      playDing();
    }
    setToast({ node, show: true });
  };

  // Auto-dismiss toast after 4s
  useEffect(() => {
    if (toast?.show) {
      const timer = setTimeout(() => {
        setToast((prev) => (prev ? { ...prev, show: false } : null));
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Center horizontally on initial load so the Origin (School) and Polytechnic are right in view
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, []);

  // Main horizontal trunk coordinates
  const trunkY = 244; // Center Y of trunk line
  const trunkMinX = 80 + 24; // Origin center
  const trunkMaxX = 1980 + 24; // Live projects center

  const CANVAS_WIDTH = 2120;
  const CANVAS_HEIGHT = 490;

  return (
    <section
      id="timeline"
      aria-label="Atharva's Journey and Advancements"
      className="min-h-screen w-full relative bg-mc-sandstone-pattern select-none flex flex-col items-center py-6 px-2 sm:px-4"
    >
      {/* Minecraft Toast Notification (Top Right) */}
      {toast?.show && (
        <aside
          aria-live="polite"
          aria-label="Advancement Notification"
          className="fixed top-20 right-4 z-50 max-w-sm bg-[#212121] border-4 border-[#ffff55] p-3 shadow-[0_8px_24px_rgba(0,0,0,0.9)] animate-bounce flex items-center gap-3"
        >
          <div className="w-12 h-12 bg-[#333333] border-2 border-white flex items-center justify-center shrink-0">
            <PixelIcon name={toast.node.icon} size={28} />
          </div>
          <div className="min-w-0">
            <div
              className={`font-minecraft text-[10px] uppercase font-bold tracking-wider ${
                toast.node.frameType === "challenge" ? "text-[#d946ef]" : "text-[#ffff55]"
              }`}
            >
              {toast.node.frameType === "challenge" ? "Challenge Complete!" : "Advancement Made!"}
            </div>
            <div className="font-minecraft text-xs text-white truncate font-bold">
              {toast.node.title}
            </div>
            <div className="font-minecraft text-[9px] text-[#4ade80]">
              +{toast.node.xpReward} Experience Points
            </div>
          </div>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="text-[#888888] hover:text-white font-minecraft text-xs px-1 cursor-pointer"
          >
            ✕
          </button>
        </aside>
      )}

      {/* Main Container - Widescreen Landscape Oriented */}
      <div className="w-full max-w-6xl relative flex flex-col items-center">
        {/* Minecraft Advancements GUI Window Frame */}
        <div className="w-full bg-[#c6c6c6] border-4 border-t-[#ffffff] border-l-[#ffffff] border-b-[#555555] border-r-[#555555] shadow-[0_12px_32px_rgba(0,0,0,0.7)] p-2 sm:p-3 flex flex-col">
          {/* Header Row: Title + Stats + Navigation Controls */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b-2 border-[#555555] mb-2 px-1">
            <div className="flex items-center gap-2">
              <PixelIcon name="map" size={24} />
              <h2
                className="font-minecraft text-sm sm:text-base md:text-lg text-[#2c1e08] font-bold tracking-wide uppercase"
                style={{ textShadow: "1px 1px 0 rgba(255,255,255,0.7)" }}
              >
                Advancements: Atharva&apos;s Journey
              </h2>
            </div>

            <div className="flex items-center gap-2">
              {/* Pan Left / Right Navigation */}
              <div className="flex items-center gap-1 bg-[#8b8b8b] p-0.5 border border-t-[#373737] border-l-[#373737] border-b-[#ffffff] border-r-[#ffffff]">
                <button
                  type="button"
                  onClick={handleScrollPrev}
                  className="font-minecraft text-xs px-2 py-0.5 bg-[#c6c6c6] text-[#2c1e08] hover:bg-[#dedede] active:translate-y-0.5 border border-t-[#ffffff] border-l-[#ffffff] border-b-[#555555] border-r-[#555555] cursor-pointer"
                  title="Scroll Left"
                >
                  ◀
                </button>
                <button
                  type="button"
                  onClick={handleScrollNext}
                  className="font-minecraft text-xs px-2 py-0.5 bg-[#c6c6c6] text-[#2c1e08] hover:bg-[#dedede] active:translate-y-0.5 border border-t-[#ffffff] border-l-[#ffffff] border-b-[#555555] border-r-[#555555] cursor-pointer"
                  title="Scroll Right"
                >
                  ▶
                </button>
              </div>

              {/* Stats Badge */}
              <span className="font-minecraft text-[10px] sm:text-xs text-[#2c1e08] bg-[#d5c292] px-2 py-1 border border-[#805b14]/40 font-bold">
                35 Milestones • Horizontal Landscape
              </span>
            </div>
          </div>

          {/* Minecraft GUI Tabs along Top: Chapter Navigation */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1.5 scrollbar-none mb-1">
            {TIMELINE_CHAPTERS.map((chapter) => {
              const isActive = activeChapter === chapter.id;
              return (
                <button
                  key={chapter.id}
                  type="button"
                  onClick={() => scrollToX(chapter.scrollX, chapter.id)}
                  className={`font-minecraft text-[10px] sm:text-xs px-2.5 py-1 whitespace-nowrap transition-colors cursor-pointer border ${
                    isActive
                      ? "bg-[#d5c292] text-[#2c1e08] font-bold border-t-[#ffffff] border-l-[#ffffff] border-b-[#805b14] border-r-[#805b14] shadow-[inset_0_1px_0_#fff]"
                      : "bg-[#a8a8a8] text-[#333333] hover:bg-[#bcbcbc] border-t-[#ffffff] border-l-[#ffffff] border-b-[#555555] border-r-[#555555]"
                  }`}
                >
                  {chapter.label}
                </button>
              );
            })}
          </div>

          {/* Hint for mobile portrait users */}
          <div className="block sm:hidden text-center py-0.5 mb-1 bg-[#2c1e08]/10 text-[9px] font-minecraft text-[#5c3e0e]">
            ↔ Drag or swipe horizontally • Rotate phone to landscape for widescreen view
          </div>

          {/* Horizontal Canvas Inner Container (Inset Minecraft Border) */}
          <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className={`w-full h-[470px] sm:h-[500px] overflow-x-auto overflow-y-hidden relative bg-mc-sandstone-pattern border-4 border-t-[#373737] border-l-[#373737] border-b-[#ffffff] border-r-[#ffffff] shadow-[inset_0_4px_12px_rgba(0,0,0,0.35)] ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
          >
            {/* SVG Connector Lines Layer */}
            <svg
              className="absolute inset-0 pointer-events-none z-0"
              style={{ width: `${CANVAS_WIDTH}px`, height: `${CANVAS_HEIGHT}px` }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="mc-line-shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="1.5" stdDeviation="0.5" floodColor="#000000" floodOpacity="0.85" />
                </filter>
              </defs>

              {/* 1. Primary Horizontal Trunk Line running across the entire landscape canvas */}
              <line
                x1={trunkMinX}
                y1={trunkY}
                x2={trunkMaxX}
                y2={trunkY}
                stroke="#2c1e08"
                strokeWidth="5"
                strokeLinecap="square"
              />
              <line
                x1={trunkMinX}
                y1={trunkY}
                x2={trunkMaxX}
                y2={trunkY}
                stroke="#f4ecd7"
                strokeWidth="3"
                strokeLinecap="square"
                filter="url(#mc-line-shadow)"
              />

              {/* 2. Stepped and Orthogonal Connector Lines for every child advancement */}
              {treeNodes.map((node) => {
                if (!node.parentId) return null;
                const parent = treeNodes.find((p) => p.id === node.parentId);
                if (!parent) return null;

                const parentCenterX = parent.x + 24;
                const parentCenterY = parent.y + 24;
                const nodeCenterX = node.x + 24;
                const nodeCenterY = node.y + 24;

                // Case A: Aligned directly horizontally (horizontal branch)
                if (Math.abs(parentCenterY - nodeCenterY) < 4) {
                  return (
                    <g key={`h-link-${node.id}`}>
                      <line
                        x1={parent.x + 48}
                        y1={nodeCenterY}
                        x2={node.x}
                        y2={nodeCenterY}
                        stroke="#2c1e08"
                        strokeWidth="4.5"
                        strokeLinecap="square"
                      />
                      <line
                        x1={parent.x + 48}
                        y1={nodeCenterY}
                        x2={node.x}
                        y2={nodeCenterY}
                        stroke="#f4ecd7"
                        strokeWidth="2.5"
                        strokeLinecap="square"
                        filter="url(#mc-line-shadow)"
                      />
                    </g>
                  );
                }

                // Case B: Aligned vertically (vertical branch straight from parent)
                if (Math.abs(parentCenterX - nodeCenterX) < 4) {
                  const yStart = node.y < parent.y ? parent.y : parent.y + 48;
                  const yEnd = node.y < parent.y ? node.y + 48 : node.y;
                  return (
                    <g key={`v-link-${node.id}`}>
                      <line
                        x1={nodeCenterX}
                        y1={yStart}
                        x2={nodeCenterX}
                        y2={yEnd}
                        stroke="#2c1e08"
                        strokeWidth="4.5"
                        strokeLinecap="square"
                      />
                      <line
                        x1={nodeCenterX}
                        y1={yStart}
                        x2={nodeCenterX}
                        y2={yEnd}
                        stroke="#f4ecd7"
                        strokeWidth="2.5"
                        strokeLinecap="square"
                        filter="url(#mc-line-shadow)"
                      />
                    </g>
                  );
                }

                // Case C: Orthogonal Stepped Fork (Right -> Vertical -> Right)
                const startX = parent.x + 48;
                const startY = parentCenterY;
                const endX = node.x;
                const endY = nodeCenterY;
                const midX = startX + (endX - startX) / 2;

                const pathData = `M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${endY} L ${endX} ${endY}`;

                return (
                  <g key={`step-link-${node.id}`}>
                    <path
                      d={pathData}
                      fill="none"
                      stroke="#2c1e08"
                      strokeWidth="4.5"
                      strokeLinecap="square"
                    />
                    <path
                      d={pathData}
                      fill="none"
                      stroke="#f4ecd7"
                      strokeWidth="2.5"
                      strokeLinecap="square"
                      filter="url(#mc-line-shadow)"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Nodes Layer: Positioned along the Horizontal Canvas */}
            <div
              className="relative z-10"
              style={{ width: `${CANVAS_WIDTH}px`, height: `${CANVAS_HEIGHT}px` }}
            >
              {treeNodes.map((node) => {
                const isSelected = selectedNode?.id === node.id;

                return (
                  <div
                    key={node.id}
                    style={{ left: `${node.x}px`, top: `${node.y}px` }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectNode(node);
                    }}
                    onMouseEnter={() => {
                      playPop();
                    }}
                    className="absolute group select-none"
                  >
                    {/* Golden-Bronze Frame Badge */}
                    <AdvancementFrameBadge type={node.frameType} isSelected={isSelected}>
                      <PixelIcon
                        name={node.icon}
                        size={28}
                        className="transform group-hover:scale-110 transition-transform"
                      />
                    </AdvancementFrameBadge>

                    {/* Classic Minecraft Tooltip on Hover */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pointer-events-none z-50 whitespace-nowrap">
                      <div className="bg-[#100c1c]/95 border-2 border-[#541f92] p-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.9)] max-w-xs">
                        <div className="font-minecraft text-xs font-bold text-[#ffff55]">
                          {node.title}
                        </div>
                        <div
                          className={`font-minecraft text-[9px] uppercase tracking-wider mt-0.5 ${
                            node.frameType === "challenge"
                              ? "text-[#d946ef]"
                              : node.frameType === "goal"
                              ? "text-[#38bdf8]"
                              : "text-[#4ade80]"
                          }`}
                        >
                          {node.frameType.toUpperCase()}: {node.category}
                        </div>
                        <div className="font-sans text-[11px] text-[#e2e8f0] mt-1 leading-tight whitespace-normal">
                          {node.subtitle}
                        </div>
                        <div className="font-minecraft text-[9px] text-[#4ade80] mt-1.5 pt-1 border-t border-[#372458]">
                          +{node.xpReward} XP Unlocked
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Milestone Lore Terminal (Below Canvas, Inside Minecraft Window) */}
          {selectedNode && (
            <div className="mt-2.5 w-full p-3 bg-[#18151f]/95 border-2 border-[#47306b] shadow-[0_4px_16px_rgba(0,0,0,0.6)] text-white">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2d2242] pb-2 mb-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-10 h-10 bg-[#2a1c40] border border-[#a855f7] flex items-center justify-center shrink-0">
                    <PixelIcon name={selectedNode.icon} size={24} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span
                        className={`font-minecraft text-[8px] uppercase font-bold px-1 py-0.5 border ${
                          selectedNode.frameType === "challenge"
                            ? "bg-[#581c87] text-[#e879f9] border-[#c084fc]"
                            : selectedNode.frameType === "goal"
                            ? "bg-[#0c4a6e] text-[#38bdf8] border-[#38bdf8]"
                            : "bg-[#14532d] text-[#4ade80] border-[#22c55e]"
                        }`}
                      >
                        {selectedNode.frameType}
                      </span>
                      <h3 className="font-minecraft text-xs sm:text-sm font-bold text-white truncate max-w-sm">
                        {selectedNode.title}
                      </h3>
                    </div>
                    <div className="font-sans text-[11px] text-[#cbd5e1] truncate">
                      {selectedNode.subtitle}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 font-minecraft text-xs text-[#4ade80] bg-[#14532d]/40 border border-[#22c55e]/50 px-2 py-0.5 shrink-0">
                  <PixelIcon name="xp" size={14} />
                  <span>+{selectedNode.xpReward} XP</span>
                </div>
              </div>

              <p className="font-sans text-xs text-[#e2e8f0] leading-relaxed mb-2">
                {selectedNode.description}
              </p>

              {selectedNode.lootItem && (
                <div className="p-1.5 bg-[#0e0a16] border border-[#281b3d] flex items-center gap-2 text-[10px] font-minecraft text-[#ffff55]">
                  <PixelIcon name="chest" size={14} />
                  <span className="text-[#94a3b8]">Reward Item:</span>
                  <span>{selectedNode.lootItem}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
