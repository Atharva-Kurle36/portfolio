export type IconName =
  | "compass"
  | "pickaxe"
  | "sword"
  | "book"
  | "redstone"
  | "chest"
  | "potion"
  | "emerald"
  | "gold-apple"
  | "furnace"
  | "crafting-table"
  | "heart"
  | "xp"
  | "server"
  | "shield"
  | "clock"
  | "portal"
  | "beacon"
  | "totem";

export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  mode: "hardcore" | "creative" | "survival";
  icon: IconName;
  version?: string;
  lastPlayed?: string;
  category?: "web" | "systems" | "tools" | "ai";
  links: {
    github?: string;
    demo?: string;
  };
  highlights?: string[];
}

export interface Skill {
  name: string;
  enchantment: string;
  description: string;
  icon: IconName;
  category: "languages" | "frontend" | "backend" | "cloud" | "tools" | "systems";
  level: number; // 1 - 100
  stackCount: number; // e.g. 64, 32, 16
}

export interface TimelineNode {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  status: "completed" | "in-progress";
  kind: "education" | "work" | "achievement";
  description: string;
  icon: IconName;
  advancementType: "task" | "goal" | "challenge";
  xpReward: number;
  parentId?: string;
  tab?: "story" | "adventure" | "nether" | "end";
  rewardItem?: string;
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  avatar: string;
  coordinates: string;
  location: string;
  stats: {
    level: number;
    health: number;
    hunger: number;
    armor: number;
    daysPlayed: number;
  };
  bioPages: {
    title: string;
    paragraphs: string[];
    quote?: string;
  }[];
  splashTexts: string[];
}

export interface ServerContact {
  id: string;
  name: string;
  address: string;
  type: "github" | "linkedin" | "email" | "discord" | "twitter";
  url: string;
  ping: number; // in ms
  motd: string;
  icon: IconName;
}
