import { Profile, ServerContact } from "@/types";

export const profileData: Profile = {
  name: "Atharva Kurle",
  title: "First-Year Software Engineering Student",
  tagline: "Mining ideas, crafting reliable software, and exploring systems.",
  avatar: "/avatar.png",
  coordinates: "X: 19.0760, Y: 14.000, Z: 72.8777",
  location: "Mumbai, Maharashtra, India",
  stats: {
    level: 1, // First-year student level!
    health: 20, // 10 full hearts
    hunger: 20, // 10 drumsticks
    armor: 15,
    daysPlayed: 180,
  },
  bioPages: [
    {
      title: "Player Profile: Atharva",
      paragraphs: [
        "Welcome traveller! I'm Atharva Kurle, a first-year software engineering undergraduate based in Mumbai, India.",
        "I spend my days crafting clean, reliable code, digging through low-level fundamentals, and building interactive web experiences.",
        "Current Spawn Location: Mumbai, IN (Coords: 19.0760° N, 72.8777° E). Weather: Tropical & humid; Ideal for coding marathons.",
      ],
      quote: "Every master architect started by placing a single dirt block.",
    },
    {
      title: "The Tech Quest",
      paragraphs: [
        "My passion began with curiosity about how virtual worlds and web applications communicate beneath the surface.",
        "As a first-year student, I balance core academics—computer systems, discrete math, data structures—with modern full-stack development using TypeScript, Next.js, and Python.",
        "I believe in building software that is fast, accessible, resilient, and joyful to use.",
      ],
      quote: "Clean code is like diamond armor: tough, polished, and built to last.",
    },
    {
      title: "Inventory & Habits",
      paragraphs: [
        "Primary Tools: VS Code, Linux terminal, Git, and plenty of hot chai.",
        "When I'm not in front of a keyboard, you can find me reading system design blogs, playing sandbox games, or sketching UI wireframes.",
        "Currently seeking opportunities to collaborate on impactful software engineering projects and internships.",
      ],
      quote: "Efficiency V applied to learning velocity.",
    },
  ],
  splashTexts: [
    "Also try C++ & Linux!",
    "First-year CS grind in Mumbai!",
    "Crafting clean code!",
    "Now with 0 copyrighted assets!",
    "Press 1-9 to switch hotbar!",
    "Building terrain in Next.js...",
    "Efficiency V on algorithms!",
    "100% bug-free (tested on localhost)!",
    "Never dig straight down!",
    "Powered by Chai & TypeScript!",
    "Mending applied to my sleep schedule!",
  ],
};

export const serverContacts: ServerContact[] = [
  {
    id: "github",
    name: "GitHub Server [Atharva-Kurle36]",
    address: "github.com/Atharva-Kurle36",
    type: "github",
    url: "https://github.com/Atharva-Kurle36",
    ping: 14,
    motd: "Check out my repositories, commits, and open-source explorations.",
    icon: "sword",
  },
  {
    id: "linkedin",
    name: "LinkedIn Realm [Atharva Kurle]",
    address: "linkedin.com/in/atharva-kurle",
    type: "linkedin",
    url: "https://www.linkedin.com/in/atharva-kurle",
    ping: 22,
    motd: "Connect for internships, software engineering roles, and networking.",
    icon: "compass",
  },
  {
    id: "email",
    name: "Direct Connect Mail [Inbox]",
    address: "atharvakurle.dev@gmail.com",
    type: "email",
    url: "mailto:atharvakurle.dev@gmail.com",
    ping: 5,
    motd: "Send a direct owl / email message straight into my inbox.",
    icon: "book",
  },
  {
    id: "discord",
    name: "Discord Hub [Atharva#36]",
    address: "atharva_36",
    type: "discord",
    url: "https://discord.com",
    ping: 18,
    motd: "Ping me for dev chats, hackathons, and gaming sessions.",
    icon: "server",
  },
];
