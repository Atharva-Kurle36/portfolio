import { Skill } from "@/types";

export const skillsData: Skill[] = [
  // ==========================================
  // 1. LANGUAGES (8 items)
  // ==========================================
  {
    name: "TypeScript",
    enchantment: "Efficiency V • Strict Null",
    description: "Static type systems, complex generics, interface contracts, and compiler strictness eliminating runtime bugs.",
    icon: "sword",
    category: "languages",
    level: 94,
    stackCount: 64,
  },
  {
    name: "JavaScript (ES6+)",
    enchantment: "Unbreaking III • Async Power",
    description: "Modern ECMAScript, event loop mastery, closures, async/await pipelines, and dynamic client-side scripting.",
    icon: "gold-apple",
    category: "languages",
    level: 95,
    stackCount: 64,
  },
  {
    name: "Python",
    enchantment: "Fortune III • Scripting Core",
    description: "Clean scripting, automation, algorithm design, data manipulation, and high-performance backend logic.",
    icon: "potion",
    category: "languages",
    level: 90,
    stackCount: 64,
  },
  {
    name: "Java",
    enchantment: "Smite V • JVM Concurrency",
    description: "Robust OOP architecture, JVM multithreading, memory management, and cross-platform enterprise software design.",
    icon: "furnace",
    category: "languages",
    level: 86,
    stackCount: 48,
  },
  {
    name: "C",
    enchantment: "Sharpness V • Pointer Arithmetic",
    description: "Low-level memory management, dynamic heap allocation, pointers, structs, and computer engineering foundations.",
    icon: "pickaxe",
    category: "languages",
    level: 84,
    stackCount: 32,
  },
  {
    name: "C++",
    enchantment: "Power V • Zero-Cost Abstractions",
    description: "High-performance computing, STL containers, references, RAII, and optimized systems engineering.",
    icon: "sword",
    category: "languages",
    level: 82,
    stackCount: 32,
  },
  {
    name: "C#",
    enchantment: "Protection IV • .NET Runtime",
    description: "Modern object-oriented programming, LINQ queries, asynchronous tasks, and scalable .NET application development.",
    icon: "shield",
    category: "languages",
    level: 80,
    stackCount: 32,
  },
  {
    name: "Kotlin",
    enchantment: "Swift Sneak III • Coroutine Flow",
    description: "Modern expressive JVM language, coroutines for asynchronous flows, null-safety, and native Android development.",
    icon: "beacon",
    category: "languages",
    level: 82,
    stackCount: 48,
  },

  // ==========================================
  // 2. FRONTEND & MOBILE (5 items)
  // ==========================================
  {
    name: "HTML5",
    enchantment: "Fire Aspect II • Semantic Structure",
    description: "Semantic document trees, accessible ARIA landmarks, modern media elements, and SEO-optimized structures.",
    icon: "book",
    category: "frontend",
    level: 96,
    stackCount: 64,
  },
  {
    name: "CSS3",
    enchantment: "Silk Touch I • Responsive Layouts",
    description: "Flexbox, CSS Grid, custom properties, keyframe animations, and pixel-perfect responsive layouts.",
    icon: "totem",
    category: "frontend",
    level: 94,
    stackCount: 64,
  },
  {
    name: "React.js",
    enchantment: "Efficiency V • Virtual DOM",
    description: "Custom hooks, component state machines, interactive reactive UI, context API, and high-performance render cycles.",
    icon: "redstone",
    category: "frontend",
    level: 95,
    stackCount: 64,
  },
  {
    name: "Next.js",
    enchantment: "Mending I • SSR & Server Actions",
    description: "Fullstack React framework with App Router, Server Components, SSR/SSG, route handlers, and optimized bundles.",
    icon: "beacon",
    category: "frontend",
    level: 92,
    stackCount: 64,
  },
  {
    name: "Dart & Flutter",
    enchantment: "Channeling I • Cross-Platform UI",
    description: "Reactive widget trees, state management, hot reload, and natively compiled mobile apps for iOS and Android.",
    icon: "compass",
    category: "frontend",
    level: 83,
    stackCount: 48,
  },

  // ==========================================
  // 3. BACKEND & APIS (2 items)
  // ==========================================
  {
    name: "Node.js",
    enchantment: "Power IV • Event-Driven Runtime",
    description: "Non-blocking asynchronous I/O, RESTful backend microservices, middleware pipelines, and scalable APIs.",
    icon: "server",
    category: "backend",
    level: 88,
    stackCount: 64,
  },
  {
    name: "FastAPI",
    enchantment: "Quick Charge III • Async Pydantic",
    description: "High-concurrency Python REST APIs, asynchronous request handling, OpenAPI auto-docs, and Pydantic validation.",
    icon: "potion",
    category: "backend",
    level: 87,
    stackCount: 48,
  },

  // ==========================================
  // 4. CLOUD & DATABASES (4 items)
  // ==========================================
  {
    name: "MongoDB",
    enchantment: "Looting III • NoSQL Aggregation",
    description: "Document modeling, dynamic JSON schemas, aggregation pipelines, and high-throughput database queries.",
    icon: "emerald",
    category: "cloud",
    level: 89,
    stackCount: 64,
  },
  {
    name: "Supabase",
    enchantment: "Respiration III • PostgreSQL BaaS",
    description: "Open-source Firebase alternative featuring PostgreSQL, instant REST/realtime subscriptions, auth, and edge storage.",
    icon: "portal",
    category: "cloud",
    level: 86,
    stackCount: 48,
  },
  {
    name: "Firebase",
    enchantment: "Flame I • Realtime Firestore",
    description: "Google Cloud backend suite, NoSQL Firestore, instant authentication, cloud messaging, and serverless hosting.",
    icon: "furnace",
    category: "cloud",
    level: 85,
    stackCount: 48,
  },
  {
    name: "Cloudflare",
    enchantment: "Protection IV • Edge Workers & CDN",
    description: "Global edge network, low-latency DNS routing, edge serverless workers, caching, and DDoS defense.",
    icon: "shield",
    category: "cloud",
    level: 84,
    stackCount: 32,
  },

  // ==========================================
  // 5. TOOLS & VERSION CONTROL (2 items)
  // ==========================================
  {
    name: "Git",
    enchantment: "Infinity I • Distributed VCS",
    description: "Branch management, atomic commits, interactive rebasing, merge conflict resolution, and version history.",
    icon: "book",
    category: "tools",
    level: 92,
    stackCount: 64,
  },
  {
    name: "GitHub",
    enchantment: "Unbreaking III • Pull Requests & Actions",
    description: "Collaborative repository hosting, GitHub Actions CI/CD workflows, issue tracking, and open source management.",
    icon: "chest",
    category: "tools",
    level: 92,
    stackCount: 64,
  },
];
