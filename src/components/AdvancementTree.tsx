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
  x: number;
  y: number;
  row: number;
  col: number;
  parentId?: string;
  description: string;
  xpReward: number;
  lootItem?: string;
  unlocked?: boolean;
}

// 15 rows (0-14) of advancements matching the exact icons, frame types, coordinates, and branching of reference image
const treeNodes: TimelineAdvancement[] = [
  // ROW 0: Vidyalankar Polytechnic (Banner Task -> Banner Challenge)
  {
    id: "polytechnic",
    title: "Vidyalankar Polytechnic, Wadala",
    subtitle: "Diploma in Information Technology",
    category: "Education",
    frameType: "task",
    icon: "banner",
    x: 200,
    y: 12,
    row: 0,
    col: 1,
    description: "Diploma in Information Technology from Vidyalankar Polytechnic, Wadala, Mumbai. Built solid foundations in algorithms, databases, web development, and computer architecture.",
    xpReward: 150,
    lootItem: "Diploma Guild Banner",
    unlocked: true,
  },
  {
    id: "polytechnic-distinction",
    title: "88.47% Academic Distinction",
    subtitle: "Vidyalankar Polytechnic Rank",
    category: "Academic Achievement",
    frameType: "challenge",
    icon: "banner",
    x: 259,
    y: 12,
    row: 0,
    col: 2,
    parentId: "polytechnic",
    description: "Graduated with 88.47% distinction ranking, demonstrating top-tier academic dedication, analytical consistency, and engineering aptitude.",
    xpReward: 350,
    lootItem: "88.47% Gold Distinction Standard",
    unlocked: true,
  },

  // ROW 1: Higher Education Dual Degree (3 Spyglasses: Task -> Task -> Task)
  {
    id: "vsit-admit",
    title: "Vidyalankar School of IT (VSIT)",
    subtitle: "Institute of International Education",
    category: "Education",
    frameType: "task",
    icon: "spyglass",
    x: 200,
    y: 68,
    row: 1,
    col: 1,
    description: "Enrolled in Vidyalankar Institute of International Education (NCC Education) in Mumbai, pursuing an accelerated global software engineering curriculum.",
    xpReward: 200,
    lootItem: "VSIT Observation Glass",
    unlocked: true,
  },
  {
    id: "greater-manchester",
    title: "Univ. of Greater Manchester Dual Degree",
    subtitle: "B.Eng. SE & B.Sc. (Hons) Computer Science",
    category: "Degree Quest",
    frameType: "task",
    icon: "spyglass",
    x: 259,
    y: 68,
    row: 1,
    col: 2,
    parentId: "vsit-admit",
    description: "Pursuing dual degrees: B.Eng. Software Engineering and B.Sc. (Hons) Computer Science under the University of Greater Manchester partnership.",
    xpReward: 400,
    lootItem: "International Degree Horizon",
    unlocked: true,
  },
  {
    id: "first-year-se",
    title: "First-Year SE Engineering Frontier",
    subtitle: "Active Dual-Degree Student",
    category: "Engineering Mastery",
    frameType: "task",
    icon: "spyglass",
    x: 318,
    y: 68,
    row: 1,
    col: 3,
    parentId: "greater-manchester",
    description: "First-year software engineering undergraduate mastering discrete mathematics, object-oriented systems architecture, and live projects.",
    xpReward: 500,
    lootItem: "High-Resolution Spyglass",
    unlocked: true,
  },

  // ROW 2: Royal Trader Frontend Internship (2 Tridents branching UP from Sword in Row 3)
  {
    id: "royal-trader",
    title: "Royal Trader (Frontend Internship)",
    subtitle: "Frontend Development Intern • Jun-Aug 2025",
    category: "Work Experience",
    frameType: "task",
    icon: "trident",
    x: 259,
    y: 125,
    row: 2,
    col: 2,
    parentId: "hackathons-lead",
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
    x: 318,
    y: 125,
    row: 2,
    col: 3,
    parentId: "royal-trader",
    description: "Collaborated with team to elevate site design, cross-device viewport responsiveness, and overall user interaction fidelity.",
    xpReward: 300,
    lootItem: "Enchanted UI Trident",
    unlocked: true,
  },

  // ROW 3: Collegiate Hackathons & Flagship Prototypes
  // Col 1: Sword (Task) -> branches to Anchor, Bow, Diamond Sword (Col 2)
  // Bow branches to Arrow, Target (Col 3)
  {
    id: "hackathons-lead",
    title: "Collegiate Hackathon Sprinter",
    subtitle: "Competitive Sprints & Fast Prototyping",
    category: "Hackathons",
    frameType: "task",
    icon: "iron-sword",
    x: 200,
    y: 239,
    row: 3,
    col: 1,
    description: "Collaborated in high-energy 24-hour collegiate hackathons, transforming complex problem statements into functional, deployed web prototypes.",
    xpReward: 300,
    lootItem: "Hackathon Iron Broadsword",
    unlocked: true,
  },
  {
    id: "learnify-ai",
    title: "Learnify: AI Study Tracker",
    subtitle: "Web Platform & Mobile App (Hackathon)",
    category: "AI & Education",
    frameType: "challenge",
    icon: "respawn-anchor",
    x: 259,
    y: 177,
    row: 3,
    col: 2,
    parentId: "hackathons-lead",
    description: "AI-driven study tracker combining a web platform and application. Features automated revision schedules and learner progress analytics.",
    xpReward: 500,
    lootItem: "Learnify Respawn Core",
    unlocked: true,
  },
  {
    id: "safenet-ai",
    title: "Safenet: Phishing Detection",
    subtitle: "AI Cybersecurity Simulation (Hackathon)",
    category: "Cybersecurity",
    frameType: "challenge",
    icon: "bow",
    x: 259,
    y: 239,
    row: 3,
    col: 2,
    parentId: "hackathons-lead",
    description: "AI-powered phishing detection and training simulation website protecting users from deceptive emails and fraudulent URLs.",
    xpReward: 500,
    lootItem: "Safenet Sniper Bow",
    unlocked: true,
  },
  {
    id: "sherlocklogs",
    title: "SherlockLogs: Blockchain Provenance",
    subtitle: "Supply Chain Tracker (Hackathon)",
    category: "Web3 Innovation",
    frameType: "challenge",
    icon: "diamond-sword",
    x: 259,
    y: 291,
    row: 3,
    col: 2,
    parentId: "hackathons-lead",
    description: "Blockchain-based supply chain tracker providing tamper-proof handoff logs and cryptographic authenticity checks for physical goods.",
    xpReward: 500,
    lootItem: "SherlockLogs Diamond Blade",
    unlocked: true,
  },
  {
    id: "hackathon-trophy",
    title: "Hackathon Top Recognition",
    subtitle: "Outstanding Prototype Award",
    category: "Achievement",
    frameType: "challenge",
    icon: "arrow",
    x: 318,
    y: 209,
    row: 3,
    col: 3,
    parentId: "safenet-ai",
    description: "Celebrated for delivering AI-driven solutions, sleek responsive UI, and resilient architectures during collegiate hackathons.",
    xpReward: 600,
    lootItem: "Piercing Arrow of Innovation",
    unlocked: true,
  },
  {
    id: "safenet-precision",
    title: "Bullseye Detection Precision",
    subtitle: "99% Model Accuracy in Phishing Simulation",
    category: "Precision Engineering",
    frameType: "challenge",
    icon: "target",
    x: 318,
    y: 269,
    row: 3,
    col: 3,
    parentId: "safenet-ai",
    description: "Trained heuristics to identify fraudulent email vectors with high accuracy and low false-positive rates.",
    xpReward: 600,
    lootItem: "Target Bullseye Block",
    unlocked: true,
  },

  // ROW 4: Corporate Inventory & Resilience (Barrel Task -> Totem Goal)
  {
    id: "excel-mgmt",
    title: "Corporate Inventory Management",
    subtitle: "Advanced Microsoft Excel",
    category: "Work Experience",
    frameType: "task",
    icon: "barrel",
    x: 200,
    y: 338,
    row: 4,
    col: 1,
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
    x: 259,
    y: 338,
    row: 4,
    col: 2,
    parentId: "excel-mgmt",
    description: "Adaptable depending on the task, taking responsibilities seriously, and maintaining consistent dedication to learning and growing.",
    xpReward: 400,
    lootItem: "Totem of Undying Dedication",
    unlocked: true,
  },

  // ROW 5: Academic & Systems Web Portals (Emerald Task -> Pumpkin Task & Emerald Goal)
  {
    id: "mgmt-system",
    title: "Student-Teacher Management System",
    subtitle: "Collegiate Web Portal (Hackathon)",
    category: "Web Development",
    frameType: "task",
    icon: "emerald",
    x: 200,
    y: 437,
    row: 5,
    col: 1,
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
    x: 259,
    y: 414,
    row: 5,
    col: 2,
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
    x: 259,
    y: 466,
    row: 5,
    col: 2,
    parentId: "mgmt-system",
    description: "Normalized relational schemas ensuring transactional integrity across student rosters and grade evaluations.",
    xpReward: 450,
    lootItem: "Flawless Emerald Gem",
    unlocked: true,
  },

  // ROW 6: ROOT NODE - St. Stanislaus High School (Map Task at Col 0, x=141)
  {
    id: "root-origin",
    title: "St. Stanislaus High School",
    subtitle: "SSC (Batch 2022-2023) • Bandra (West)",
    category: "Origins & Foundations",
    frameType: "task",
    icon: "map",
    x: 141,
    y: 466,
    row: 6,
    col: 0,
    description: "Completed SSC at St. Stanislaus High School, Bandra (West), Mumbai-400051. Cultivated discipline, logical thinking, and curiosity for computing.",
    xpReward: 100,
    lootItem: "Adventurer's Map of Bandra",
    unlocked: true,
  },

  // ROW 7: Cybersecurity & Career Guidance (Pottery Sherd Task -> Smithing Template Challenge)
  {
    id: "secure-cyber",
    title: "Secure Cyber Future Career Web",
    subtitle: "Cybersecurity Pathways (Hackathon)",
    category: "Web & Career",
    frameType: "task",
    icon: "pottery",
    x: 200,
    y: 523,
    row: 7,
    col: 1,
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
    x: 259,
    y: 523,
    row: 7,
    col: 2,
    parentId: "secure-cyber",
    description: "Skill diagnostic recommending custom certification paths across network security, pentesting, and digital forensics.",
    xpReward: 450,
    lootItem: "Netherite Security Template",
    unlocked: true,
  },

  // ROW 8: Artificial Intelligence & Voice Systems (Honey Task -> Crossbow Challenge)
  {
    id: "friday-ai",
    title: "FRIDAY: Personal AI Assistant",
    subtitle: "Voice-Driven System Automation",
    category: "Artificial Intelligence",
    frameType: "task",
    icon: "honey",
    x: 200,
    y: 571,
    row: 8,
    col: 1,
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
    x: 259,
    y: 571,
    row: 8,
    col: 2,
    parentId: "friday-ai",
    description: "Engineered prompt parsing pipelines, context management, and voice API integration for natural desktop dialogues.",
    xpReward: 500,
    lootItem: "Quick Charge Crossbow",
    unlocked: true,
  },

  // ROW 9: Full-Stack E-Commerce & NoSQL (Crossbow Task -> Crossbow Task)
  {
    id: "ecommerce-mongo",
    title: "E-Commerce Web Platform",
    subtitle: "Full-Stack Storefront with MongoDB",
    category: "Web Development",
    frameType: "task",
    icon: "crossbow",
    x: 200,
    y: 628,
    row: 9,
    col: 1,
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
    x: 259,
    y: 628,
    row: 9,
    col: 2,
    parentId: "ecommerce-mongo",
    description: "Document aggregation pipelines for product search, faceted filters, and persistent checkout cart states.",
    xpReward: 450,
    lootItem: "Precision Crossbow",
    unlocked: true,
  },

  // ROW 10: Financial Technology & Data Analytics (Lightning Rod Task -> Crossbow Challenge)
  {
    id: "expense-tracker",
    title: "Smart Expense Tracker",
    subtitle: "Financial Outflow Web Application",
    category: "Web Applications",
    frameType: "task",
    icon: "lightning-rod",
    x: 200,
    y: 685,
    row: 10,
    col: 1,
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
    x: 259,
    y: 685,
    row: 10,
    col: 2,
    parentId: "expense-tracker",
    description: "Interactive chart breakdowns of spending surpluses and monthly projections helping users maintain personal budget discipline.",
    xpReward: 450,
    lootItem: "Crossbow of Financial Focus",
    unlocked: true,
  },

  // ROW 11: Creative Web Engineering (Water Bucket Task)
  {
    id: "minecraft-portfolio",
    title: "Minecraft Retro Portfolio",
    subtitle: "Gamified Web Architecture",
    category: "Web Engineering",
    frameType: "task",
    icon: "water-bucket",
    x: 200,
    y: 742,
    row: 11,
    col: 1,
    description: "Retro Minecraft-inspired personal portfolio web application built with zero copyrighted assets, pure CSS bevels, and Web Audio API synthesized 8-bit sound effects.",
    xpReward: 500,
    lootItem: "Infinite Water Bucket",
    unlocked: true,
  },

  // ROW 12: Systems & Archaeology of Code (Brush Task -> Decorated Pot Task)
  {
    id: "blockchain-domain",
    title: "Blockchain & Cryptographic Ledgers",
    subtitle: "Decentralized Systems Domain",
    category: "Core Domain",
    frameType: "task",
    icon: "brush",
    x: 200,
    y: 799,
    row: 12,
    col: 1,
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
    x: 259,
    y: 799,
    row: 12,
    col: 2,
    parentId: "blockchain-domain",
    description: "Microcontroller circuit prototyping, sensor data ingestion, embedded logic, and network telemetry.",
    xpReward: 400,
    lootItem: "Decorated Telemetry Vessel",
    unlocked: true,
  },

  // ROW 13: Sensor Logic & High-Performance UI (Sculk Task -> Diamond Boots Challenge)
  {
    id: "embedded-logic",
    title: "Hardware-Software Integration",
    subtitle: "Embedded Firmware & Sensor Feeds",
    category: "IoT Systems",
    frameType: "task",
    icon: "sculk",
    x: 200,
    y: 856,
    row: 13,
    col: 1,
    description: "Prototyping responsive embedded control logic and peripheral interfaces bridging physical sensors with cloud software.",
    xpReward: 400,
    lootItem: "Sculk Acoustic Sensor",
    unlocked: true,
  },
  {
    id: "web-dev",
    title: "Fullstack Web & App Development",
    subtitle: "React 19, Next.js & Mobile Architecture",
    category: "Core Domain",
    frameType: "challenge",
    icon: "diamond-boots",
    x: 259,
    y: 856,
    row: 13,
    col: 2,
    parentId: "embedded-logic",
    description: "Building responsive, accessible web and cross-platform app interfaces with high performance and clean component hierarchy.",
    xpReward: 600,
    lootItem: "Enchanted Diamond Boots",
    unlocked: true,
  },

  // ROW 14: Global Horizons & Multilingual Dialogue (Bed Task -> Jukebox Task & Leather Boots Goal)
  {
    id: "rest-discipline",
    title: "Rest & Relentless Execution",
    subtitle: "Sustainable Engineering Practice",
    category: "Core Philosophy",
    frameType: "task",
    icon: "bed",
    x: 200,
    y: 913,
    row: 14,
    col: 1,
    description: "Balancing high-intensity development with disciplined recovery, ensuring consistent technical performance and clear focus.",
    xpReward: 300,
    lootItem: "Red Oak Bed of Repose",
    unlocked: true,
  },
  {
    id: "multilingual",
    title: "Multilingual Communication",
    subtitle: "English, Hindi & Marathi",
    category: "Communication",
    frameType: "task",
    icon: "jukebox",
    x: 259,
    y: 899,
    row: 14,
    col: 2,
    parentId: "rest-discipline",
    description: "Fluent communication and technical collaboration across English, Hindi, and Marathi for diverse teams and global clients.",
    xpReward: 450,
    lootItem: "Jukebox of Polyglot Harmony",
    unlocked: true,
  },
  {
    id: "live-projects",
    title: "Live Projects & Industry Engineering",
    subtitle: "Mumbai to the World • Practical Engineering",
    category: "Engineering Horizon",
    frameType: "goal",
    icon: "boots",
    x: 259,
    y: 957,
    row: 14,
    col: 2,
    parentId: "rest-discipline",
    description: "Showcasing classroom learnings and technical skills through live production systems, high-concurrency applications, and industry knowledge.",
    xpReward: 600,
    lootItem: "Adventurer's Leather Boots",
    unlocked: true,
  },
];

// Advancement Golden-Bronze Frame Renderer
interface FrameProps {
  type: FrameType;
  isSelected: boolean;
  children: React.ReactNode;
}

const AdvancementFrameBadge: React.FC<FrameProps> = ({ type, isSelected, children }) => {
  if (type === "challenge") {
    // 8-pointed notched star frame matching the reference image!
    return (
      <div
        className={`relative -left-[2px] -top-[2px] w-[52px] h-[52px] flex items-center justify-center cursor-pointer transition-transform duration-150 hover:scale-108 ${
          isSelected ? "scale-108 drop-shadow-[0_0_8px_#ffff55]" : ""
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
    // Rounded circle / pill frame matching the reference image!
    return (
      <div
        className={`relative w-[48px] h-[48px] flex items-center justify-center cursor-pointer transition-transform duration-150 hover:scale-108 ${
          isSelected ? "scale-108 drop-shadow-[0_0_8px_#ffff55]" : ""
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

  // Standard Task Frame (Square with bevelled edges) matching reference image!
  return (
    <div
      className={`relative w-[48px] h-[48px] flex items-center justify-center cursor-pointer transition-transform duration-150 hover:scale-108 ${
        isSelected ? "scale-108 drop-shadow-[0_0_8px_#ffff55]" : ""
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
  const [selectedNode, setSelectedNode] = useState<TimelineAdvancement>(treeNodes[3]); // University Degree by default
  const [toast, setToast] = useState<{ node: TimelineAdvancement; show: boolean } | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { playPop, playLevelUp, playDing } = useSoundEffects();

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

  // Center scroll container on initial load so the Root Origin (Row 6) and central branches are immediately visible
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 220;
    }
  }, []);

  // Exact Trunk X and coordinates matching 493x1024 reference image
  const trunkX = 193;
  const rootNode = treeNodes.find((n) => n.id === "root-origin") || treeNodes[0];

  // Min and max Y for vertical trunk line
  const trunkMinY = 36;
  const trunkMaxY = 937;

  // Filter nodes that directly connect to the trunk line at Column 1
  const col1TrunkNodes = treeNodes.filter((n) => n.col === 1);

  return (
    <section
      id="timeline"
      aria-label="Atharva's Journey and Advancements"
      className="min-h-screen w-full relative bg-mc-sandstone-pattern select-none flex flex-col items-center py-8 px-2 sm:px-4"
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

      {/* Header Bar */}
      <div className="relative z-10 w-full max-w-[493px] flex items-center justify-between mb-3 px-2">
        <div className="flex items-center gap-2">
          <PixelIcon name="map" size={24} />
          <h2
            className="font-minecraft text-base sm:text-lg text-[#2c1e08] font-bold tracking-wide uppercase"
            style={{ textShadow: "1px 1px 0 rgba(255,255,255,0.6)" }}
          >
            Advancements
          </h2>
        </div>
        <span className="font-minecraft text-[10px] text-[#5c3e0e] bg-[#d5c292]/80 px-2 py-0.5 border border-[#8f6d2e]/40">
          15 Rows • 35 Milestones
        </span>
      </div>

      {/* Exact Canvas from Reference Image (493px width) */}
      <div className="w-full max-w-[493px] relative flex flex-col items-center">
        {/* Sandstone Pattern Canvas Container */}
        <div
          ref={scrollContainerRef}
          className="w-full h-[640px] sm:h-[720px] overflow-y-auto overflow-x-hidden relative bg-mc-sandstone-pattern border-2 border-[#805b14]/50 shadow-[inset_0_2px_10px_rgba(0,0,0,0.15)]"
        >
          {/* SVG Connector Lines Layer (1040px height) */}
          <svg
            className="absolute inset-0 w-full h-[1040px] pointer-events-none z-0"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Drop Shadow filter for connector lines */}
            <defs>
              <filter id="mc-line-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="1.5" stdDeviation="0.5" floodColor="#000000" floodOpacity="0.85" />
              </filter>
            </defs>

            {/* 1. Horizontal line from Root Map (Col 0) to Vertical Trunk */}
            <line
              x1={rootNode.x + 48}
              y1={rootNode.y + 24}
              x2={trunkX}
              y2={rootNode.y + 24}
              stroke="#2c1e08"
              strokeWidth="4.5"
              strokeLinecap="square"
            />
            <line
              x1={rootNode.x + 48}
              y1={rootNode.y + 24}
              x2={trunkX}
              y2={rootNode.y + 24}
              stroke="#f4ecd7"
              strokeWidth="2.5"
              strokeLinecap="square"
              filter="url(#mc-line-shadow)"
            />

            {/* 2. Long Vertical Trunk Line running from Row 0 branch to Row 14 branch */}
            <line
              x1={trunkX}
              y1={trunkMinY}
              x2={trunkX}
              y2={trunkMaxY}
              stroke="#2c1e08"
              strokeWidth="4.5"
              strokeLinecap="square"
            />
            <line
              x1={trunkX}
              y1={trunkMinY}
              x2={trunkX}
              y2={trunkMaxY}
              stroke="#f4ecd7"
              strokeWidth="2.5"
              strokeLinecap="square"
              filter="url(#mc-line-shadow)"
            />

            {/* 3. Horizontal branch lines from trunk into Col 1 for each row */}
            {col1TrunkNodes.map((node) => {
              const nodeCenterY = node.y + 24;
              return (
                <g key={`trunk-branch-${node.id}`}>
                  <line
                    x1={trunkX}
                    y1={nodeCenterY}
                    x2={node.x}
                    y2={nodeCenterY}
                    stroke="#2c1e08"
                    strokeWidth="4.5"
                    strokeLinecap="square"
                  />
                  <line
                    x1={trunkX}
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
            })}

            {/* 4. Horizontal lines and stepped forks connecting child nodes */}
            {treeNodes.map((node) => {
              if (node.col === 0 || !node.parentId) return null;

              const parent = treeNodes.find((p) => p.id === node.parentId);
              if (!parent) return null;

              const parentRightX = parent.x + 48;
              const parentCenterY = parent.y + 24;
              const nodeLeftX = node.x;
              const nodeCenterY = node.y + 24;

              // Straight horizontal link if aligned horizontally
              if (Math.abs(parentCenterY - nodeCenterY) < 3) {
                return (
                  <g key={`link-${node.id}`}>
                    <line
                      x1={parentRightX}
                      y1={nodeCenterY}
                      x2={nodeLeftX}
                      y2={nodeCenterY}
                      stroke="#2c1e08"
                      strokeWidth="4.5"
                      strokeLinecap="square"
                    />
                    <line
                      x1={parentRightX}
                      y1={nodeCenterY}
                      x2={nodeLeftX}
                      y2={nodeCenterY}
                      stroke="#f4ecd7"
                      strokeWidth="2.5"
                      strokeLinecap="square"
                      filter="url(#mc-line-shadow)"
                    />
                  </g>
                );
              }

              // Orthogonal stepped fork (right -> up/down -> right)
              const forkX = (parentRightX + nodeLeftX) / 2;
              return (
                <g key={`split-link-${node.id}`}>
                  <path
                    d={`M ${parentRightX} ${parentCenterY} L ${forkX} ${parentCenterY} L ${forkX} ${nodeCenterY} L ${nodeLeftX} ${nodeCenterY}`}
                    fill="none"
                    stroke="#2c1e08"
                    strokeWidth="4.5"
                    strokeLinecap="square"
                  />
                  <path
                    d={`M ${parentRightX} ${parentCenterY} L ${forkX} ${parentCenterY} L ${forkX} ${nodeCenterY} L ${nodeLeftX} ${nodeCenterY}`}
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

          {/* Nodes Layer (1040px height) */}
          <div className="relative w-full h-[1040px] z-10">
            {treeNodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;

              return (
                <div
                  key={node.id}
                  style={{ left: `${node.x}px`, top: `${node.y}px` }}
                  onClick={() => handleSelectNode(node)}
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
                  <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pointer-events-none z-50 whitespace-nowrap">
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

        {/* Selected Milestone Lore Terminal (Below Window) */}
        {selectedNode && (
          <div className="mt-3 w-full p-3 bg-[#18151f]/95 border-2 border-[#47306b] shadow-[0_6px_20px_rgba(0,0,0,0.8)] text-white">
            <div className="flex items-center justify-between border-b border-[#2d2242] pb-2 mb-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 bg-[#2a1c40] border border-[#a855f7] flex items-center justify-center shrink-0">
                  <PixelIcon name={selectedNode.icon} size={22} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
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
                    <h3 className="font-minecraft text-xs sm:text-sm font-bold text-white truncate max-w-[240px]">
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
    </section>
  );
};
