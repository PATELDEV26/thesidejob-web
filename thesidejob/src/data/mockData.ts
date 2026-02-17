// Mock data for UI sections - used instead of fetching from Supabase

export type TeamMember = {
    id: string;
    name: string;
    initials: string;
    role: string;
    bio: string;
    skills: string[];
    gradient: string;
    github: string;
    linkedin: string;
    avatar_url?: string;
};

export type ProjectUpdate = {
    id: string;
    title: string;
    description: string;
    category: string;
    author: string;
    created_at: string;
};

export type EventRow = {
    id: string;
    title: string;
    description: string;
    event_date: string;
    location: string;
    type: string;
    created_at: string;
};

export const mockTeamMembers: TeamMember[] = [
    {
        id: "1",
        name: "Dhariya Patel",
        initials: "DP",
        role: "Lead Engineer",
        bio: "Full-stack architect with a passion for scalable systems and clean code. Leading technical vision at THESIDEJOB.",
        skills: ["React", "Node.js", "System Design", "TypeScript"],
        gradient: "from-indigo-400 to-blue-500",
        github: "https://github.com/dhariya",
        linkedin: "https://linkedin.com/in/dhariya",
    },
    {
        id: "2",
        name: "Aditya Gupta",
        initials: "AG",
        role: "Design Lead",
        bio: "Creating pixel-perfect interfaces and cohesive brand experiences. Design systems enthusiast.",
        skills: ["UI/UX", "Figma", "Branding", "Motion Design"],
        gradient: "from-amber-400 to-orange-500",
        github: "https://github.com/aditya",
        linkedin: "https://linkedin.com/in/aditya",
    },
    {
        id: "3",
        name: "Dev Patel",
        initials: "DV",
        role: "Backend & Infra",
        bio: "Database wizard and infrastructure specialist. Building robust backends that scale.",
        skills: ["PostgreSQL", "AWS", "Docker", "Python"],
        gradient: "from-emerald-400 to-teal-500",
        github: "https://github.com/devpatel",
        linkedin: "https://linkedin.com/in/devpatel",
    },
    {
        id: "4",
        name: "Harshit Patel",
        initials: "HP",
        role: "Auth & Security",
        bio: "Security-first engineer focused on authentication systems and data protection.",
        skills: ["Security", "OAuth", "Supabase", "Encryption"],
        gradient: "from-rose-400 to-red-500",
        github: "https://github.com/harshit",
        linkedin: "https://linkedin.com/in/harshit",
    },
    {
        id: "5",
        name: "Vansh Kaushal",
        initials: "VK",
        role: "Frontend & DX",
        bio: "Frontend craftsman obsessed with developer experience and performance optimization.",
        skills: ["Next.js", "Tailwind", "Framer Motion", "Web"],
        gradient: "from-violet-400 to-purple-500",
        github: "https://github.com/vansh",
        linkedin: "https://linkedin.com/in/vansh",
    },
];

export const mockProjectUpdates: ProjectUpdate[] = [
    {
        id: "1",
        title: "VelocityShare API v0.2 Released",
        description: "Real-time vehicle matching engine with WebSocket support. 50ms average response times achieved.",
        category: "Web",
        author: "Dev Patel",
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2h ago
    },
    {
        id: "2",
        title: "AI-Powered Route Optimization",
        description: "Integrated ML model for smarter route suggestions. Reduces average trip time by 18%.",
        category: "AI",
        author: "Dhariya Patel",
        created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5h ago
    },
    {
        id: "3",
        title: "Mobile App Beta Launch",
        description: "iOS and Android apps now available for internal testing. Push notifications enabled.",
        category: "Mobile",
        author: "Vansh Kaushal",
        created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8h ago
    },
    {
        id: "4",
        title: "Dashboard Redesign Complete",
        description: "New bento-grid layout with glassmorphism effects. Dark mode fully supported.",
        category: "Web",
        author: "Aditya Gupta",
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1d ago
    },
    {
        id: "5",
        title: "Smart Notifications System",
        description: "Context-aware notifications using NLP to prioritize alerts based on user behavior.",
        category: "AI",
        author: "Harshit Patel",
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2d ago
    },
    {
        id: "6",
        title: "Payment Gateway Integration",
        description: "Stripe and Razorpay support added. Secure tokenized payments with 3D Secure.",
        category: "Web",
        author: "Dev Patel",
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3d ago
    },
];

export const mockEvents: EventRow[] = [
    {
        id: "1",
        title: "THESIDEJOB Hackathon 2026",
        description: "48-hour building sprint. Form teams, pick challenges, and ship something amazing. Pizza and energy drinks provided.",
        event_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
        location: "Virtual + Discord",
        type: "Hackathon",
        created_at: new Date().toISOString(),
    },
    {
        id: "2",
        title: "Next.js 15 Deep Dive Workshop",
        description: "Hands-on session covering Server Components, App Router, and the latest optimizations.",
        event_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        location: "Zoom",
        type: "Workshop",
        created_at: new Date().toISOString(),
    },
    {
        id: "3",
        title: "Founders Weekly Sync",
        description: "Weekly standup for all founding members. Sprint review and roadmap planning.",
        event_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
        location: "Google Meet",
        type: "Meetup",
        created_at: new Date().toISOString(),
    },
];
