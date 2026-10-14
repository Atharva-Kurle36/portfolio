import { Profile, ServerContact } from "@/types";

export const profileData: Profile = {
  name: "Atharva Kurle",
  title: "Dual-Degree Software Engineering Student",
  tagline: "B.Eng. SE & B.Sc. CS Student • Hackathon Innovator • Web & Blockchain Crafter",
  avatar: "/avatar.png",
  coordinates: "X: 19.0760, Y: 14.000, Z: 72.8777",
  location: "Mumbai, Maharashtra, India (Bandra / Wadala)",
  stats: {
    level: 1, // First-year dual degree student
    health: 20, // 10 full hearts
    hunger: 20, // 10 drumsticks
    armor: 15,
    daysPlayed: 180,
  },
  bioPages: [
    {
      title: "Player Profile: Atharva Kurle",
      paragraphs: [
        "Welcome! I am Atharva Kurle, a first-year student pursuing a dual degree in B.Eng. Software Engineering and B.Sc. (Computer Science) – Software Engineering (NCC Education) under the University of Greater Manchester and Vidyalankar Institute of International Education in Mumbai.",
        "I am someone who is adaptable depending on the task, takes responsibilities seriously, and maintains consistent dedication to learning and growing.",
        "I completed my Diploma in Information Technology from Vidyalankar Polytechnic, Wadala, Mumbai, graduating with an outstanding 88.47%, after completing my SSC at St. Stanislaus High School, Bandra (West) (Batch 2022-2023).",
      ],
      quote: "Showcase skills and classroom learnings through live projects to gain practical industry knowledge.",
    },
    {
      title: "Work Experience & Hackathons",
      paragraphs: [
        "Frontend & Inventory Intern at Royal Trader (June - August 2025): Developed responsive, user-friendly frontend web pages, improved UX, and managed corporate inventory records utilizing advanced Excel tools, formulas, sorting, filtering, and conditional formatting.",
        "Active collegiate hackathon innovator: Built AI-powered study trackers (Learnify), phishing detection systems (Safenet), blockchain supply chain tracking systems (SherlockLogs), and student-teacher management portals.",
        "Passionate about applying modern engineering practices to build reliable, high-impact web, app, and decentralized applications.",
      ],
      quote: "Adaptable, consistent, and always ready to turn challenges into working code.",
    },
    {
      title: "Tech Arsenal & Languages",
      paragraphs: [
        "Core Skill Domains: Blockchain, Web Development, App Development, IoT, Prompt Engineering, and Database Management (MongoDB, SQL).",
        "Frontend & Tools: React 19, Next.js, TypeScript, JavaScript, HTML5/CSS3, Git/GitHub, and Microsoft Excel data analytics.",
        "Spoken Languages: English, Hindi, and Marathi.",
        "Phone: +91 8976619930 | Email: kurleatharva2007@gmail.com | Location: Mumbai, India.",
      ],
      quote: "Efficiency V applied to learning velocity and software craft.",
    },
  ],
  splashTexts: [
    "Vidyalankar & Greater Manchester Dual Degree!",
    "Diploma in IT: 88.47%!",
    "St. Stanislaus High School Alum!",
    "Royal Trader Frontend Intern!",
    "Learnify & Safenet Hackathon Builder!",
    "SherlockLogs Blockchain Tracker!",
    "Fluent in English, Hindi & Marathi!",
    "MongoDB & Full-Stack Crafter!",
    "Prompt Engineering & IoT Explorer!",
    "First-Year SE grind in Mumbai!",
    "100% bug-free (tested on localhost)!",
  ],
};

export const serverContacts: ServerContact[] = [
  {
    id: "linkedin",
    name: "LinkedIn Realm [Atharva Kurle]",
    address: "linkedin.com/in/atharva-kurle-032431355",
    type: "linkedin",
    url: "https://www.linkedin.com/in/atharva-kurle-032431355",
    ping: 18,
    motd: "Connect with Atharva on LinkedIn for software engineering roles & networking.",
    icon: "compass",
  },
  {
    id: "email",
    name: "Direct Connect Mail [Inbox]",
    address: "kurleatharva2007@gmail.com",
    type: "email",
    url: "mailto:kurleatharva2007@gmail.com",
    ping: 5,
    motd: "Send a direct message straight to kurleatharva2007@gmail.com.",
    icon: "book",
  },
  {
    id: "github",
    name: "GitHub Server [Atharva-Kurle36]",
    address: "github.com/Atharva-Kurle36",
    type: "github",
    url: "https://github.com/Atharva-Kurle36",
    ping: 14,
    motd: "Check out Atharva's hackathons, repositories, and source code.",
    icon: "sword",
  },
  {
    id: "phone",
    name: "Direct Voice / WhatsApp Relay",
    address: "+91 8976619930",
    type: "discord",
    url: "tel:+918976619930",
    ping: 2,
    motd: "Direct line for urgent inquiries & technical collaboration (+91 8976619930).",
    icon: "server",
  },
];
