import { Profile, ServerContact } from "@/types";

export const profileData: Profile = {
  name: "Atharva Kurle",
  title: "Dual-Degree Software Engineering Student",
  tagline: "Promoted to Degree Engineering (VSIT & Greater Manchester) • Mastered Web & App Building in Diploma (88.47%) • Creator of SwiftSum",
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
        "Welcome! I am Atharva Kurle, a software engineering student who learned everything of web and app building during my Diploma, and has now been promoted to Degree Engineering — pursuing a prestigious Dual Degree in Software Engineering (B.Eng. SE & B.Sc. CS) under the University of Greater Manchester and VSIT (Vidyalankar School of Information Technology) in Mumbai.",
        "I completed my Jr College (Diploma in Information Technology) from Vidyalankar Polytechnic, Wadala, graduating with an outstanding 88.47% academic distinction, after completing my Schooling at St. Stanislaus High School, Bandra (West) (Batch 2022-2023).",
        "During my diploma journey, I mastered the complete lifecycle of web and application creation, participated actively in multiple collegiate hackathons and tech events, and built end-to-end production systems.",
      ],
      quote: "Learned everything of web and app building in diploma, now promoted to degree engineering to craft scalable software.",
    },
    {
      title: "SwiftSum & Work Experience",
      paragraphs: [
        "Recently built and launched SwiftSum — a high-speed web application for rapid content and article summarization, demonstrating high-performance frontend and backend engineering.",
        "Frontend & Inventory Intern at Royal Trader (June - August 2025): Developed responsive, user-friendly frontend web pages, improved UX, and managed corporate inventory records utilizing advanced Excel tools, formulas, sorting, filtering, and conditional formatting.",
        "Active collegiate hackathon innovator: Built AI-powered study trackers (Learnify), phishing detection systems (Safenet), blockchain supply chain tracking systems (SherlockLogs), and student-teacher management portals.",
      ],
      quote: "Creator of SwiftSum • Adaptable, consistent, and always engineering with high velocity.",
    },
    {
      title: "Tech Arsenal & Languages",
      paragraphs: [
        "Core Skill Domains: Fullstack Web & Mobile Development, RESTful APIs, Cloud Services, and Distributed Version Control.",
        "Technical Stack: TypeScript, JavaScript, Python, Java, C, C++, C#, Kotlin, React.js, Next.js, Dart & Flutter, Node.js, FastAPI, MongoDB, Supabase, Firebase, Cloudflare, Git & GitHub.",
        "Spoken Languages: English, Hindi, and Marathi.",
        "Phone: +91 8976619930 | Email: kurleatharva2007@gmail.com | Location: Mumbai, India.",
      ],
      quote: "Efficiency V applied to learning velocity and software craft.",
    },
  ],
  splashTexts: [
    "Creator of SwiftSum!",
    "Mastered Web & App Building in Diploma!",
    "Promoted to Degree Engineering!",
    "Vidyalankar & Greater Manchester Dual Degree!",
    "Diploma in IT: 88.47% Distinction!",
    "St. Stanislaus High School Alum!",
    "Royal Trader Frontend Intern!",
    "Learnify & Safenet Hackathon Builder!",
    "SherlockLogs Blockchain Tracker!",
    "Fluent in English, Hindi & Marathi!",
    "MongoDB & Full-Stack Crafter!",
    "Prompt Engineering & IoT Explorer!",
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
