"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Hash,
    Volume2,
    ChevronDown,
    Plus,
    Smile,
    Send,
    Menu,
    X,
    Wrench,
} from "lucide-react";

/* ── Founders ── */
const founders = [
    { name: "Dhariya Patel", initials: "DP", role: "Lead Engineer", color: "from-indigo-400 to-blue-500" },
    { name: "Aditya Gupta", initials: "AG", role: "Design Lead", color: "from-amber-400 to-orange-500" },
    { name: "Dev Patel", initials: "DV", role: "Backend & Infra", color: "from-emerald-400 to-teal-500" },
    { name: "Harshit Patel", initials: "HP", role: "Auth & Security", color: "from-rose-400 to-red-500" },
    { name: "Vansh Kaushal", initials: "VK", role: "Frontend & DX", color: "from-violet-400 to-purple-500" },
];

/* ── Channels ── */
const houseChannels = [
    { id: "announcements", label: "announcements", icon: Hash, unread: 2 },
    { id: "general", label: "general", icon: Hash, unread: 0 },
    { id: "dev-logs", label: "dev-logs", icon: Hash, unread: 5 },
];

const projectChannels = [
    { id: "velocity-share", label: "velocity-share", icon: Hash, unread: 1 },
    { id: "hacker-house-dev", label: "hacker-house-dev", icon: Hash, unread: 3 },
];

/* ── Simulated messages ── */
type Message = { author: string; avatar: string; color: string; time: string; text: string };

const channelMessages: Record<string, Message[]> = {
    announcements: [
        { author: "Dhariya Patel", avatar: "DP", color: "from-indigo-400 to-blue-500", time: "Today at 10:12 AM", text: "🚀 THESIDEJOB v0.3 is live! Landing page, auth flows, and the Hacker House shell are all deployed. Great work team." },
        { author: "Aditya Gupta", avatar: "AG", color: "from-amber-400 to-orange-500", time: "Today at 10:15 AM", text: "Bento grid for the team section is looking 🔥. Let me know if anyone wants their card tweaked." },
    ],
    general: [
        { author: "Vansh Kaushal", avatar: "VK", color: "from-violet-400 to-purple-500", time: "Today at 9:30 AM", text: "Morning everyone! Who's shipping today?" },
        { author: "Dev Patel", avatar: "DV", color: "from-emerald-400 to-teal-500", time: "Today at 9:32 AM", text: "Just pushed the particle engine! 60fps on mobile too 🎉" },
        { author: "Harshit Patel", avatar: "HP", color: "from-rose-400 to-red-500", time: "Today at 9:35 AM", text: "Auth UI is Supabase-ready. Testing Google OAuth flow next." },
        { author: "Dhariya Patel", avatar: "DP", color: "from-indigo-400 to-blue-500", time: "Today at 9:40 AM", text: "Nice. Let's sync at 2 PM. Also — favicon is live, check the new red dot 🔴" },
        { author: "Aditya Gupta", avatar: "AG", color: "from-amber-400 to-orange-500", time: "Today at 9:45 AM", text: "SEO and OpenGraph meta are optimized. Lighthouse score should jump." },
        { author: "Vansh Kaushal", avatar: "VK", color: "from-violet-400 to-purple-500", time: "Today at 9:50 AM", text: "Dashboard layout is coming together. Check #hacker-house-dev for screenshots." },
    ],
    "dev-logs": [
        { author: "Dev Patel", avatar: "DV", color: "from-emerald-400 to-teal-500", time: "Today at 8:00 AM", text: "```\ngit commit -m \"feat: Canvas particle burst animation (60fps)\"\n```" },
        { author: "Vansh Kaushal", avatar: "VK", color: "from-violet-400 to-purple-500", time: "Today at 8:20 AM", text: "```\ngit commit -m \"feat: initialized Next.js project at c:\\Users\\patel\\Desktop\\MAIN\"\n```" },
        { author: "Harshit Patel", avatar: "HP", color: "from-rose-400 to-red-500", time: "Today at 8:45 AM", text: "```\ngit commit -m \"feat: Supabase-ready Auth UI with Google OAuth\"\n```" },
        { author: "Aditya Gupta", avatar: "AG", color: "from-amber-400 to-orange-500", time: "Today at 9:00 AM", text: "```\ngit commit -m \"design: Bento-grid layout for Founding Team\"\n```" },
        { author: "Dhariya Patel", avatar: "DP", color: "from-indigo-400 to-blue-500", time: "Today at 9:10 AM", text: "```\ngit commit -m \"seo: OpenGraph + Twitter meta + manifest.json\"\n```" },
    ],
    "velocity-share": [
        { author: "Dev Patel", avatar: "DV", color: "from-emerald-400 to-teal-500", time: "Today at 10:00 AM", text: "VelocityShare API schema is drafted — bike, car, and vehicle models are normalized." },
        { author: "Dhariya Patel", avatar: "DP", color: "from-indigo-400 to-blue-500", time: "Today at 10:05 AM", text: "Nice. Let's add a real-time matching engine. WebSockets or SSE?" },
    ],
    "hacker-house-dev": [
        { author: "Vansh Kaushal", avatar: "VK", color: "from-violet-400 to-purple-500", time: "Today at 10:30 AM", text: "Dashboard shell is built — channels, chat feed, and team sidebar. Framer Motion transitions feel smooth." },
        { author: "Aditya Gupta", avatar: "AG", color: "from-amber-400 to-orange-500", time: "Today at 10:32 AM", text: "The glassmorphism on the sidebar looks premium. Can we add a subtle gradient border?" },
        { author: "Harshit Patel", avatar: "HP", color: "from-rose-400 to-red-500", time: "Today at 10:35 AM", text: "Voice channels are next sprint. Adding them as placeholders for now with a 🔒 badge." },
    ],
};

export default function DashboardPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeChannel, setActiveChannel] = useState("general");
    const [messageInput, setMessageInput] = useState("");
    const [localMessages, setLocalMessages] = useState<Record<string, Message[]>>({});
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const currentMessages = [
        ...(channelMessages[activeChannel] || []),
        ...(localMessages[activeChannel] || []),
    ];

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [currentMessages.length]);

    const handleSend = () => {
        if (!messageInput.trim()) return;
        const newMsg: Message = {
            author: "You",
            avatar: "YO",
            color: "from-gray-400 to-gray-600",
            time: "Just now",
            text: messageInput.trim(),
        };
        setLocalMessages((prev) => ({
            ...prev,
            [activeChannel]: [...(prev[activeChannel] || []), newMsg],
        }));
        setMessageInput("");
    };

    const selectChannel = (id: string) => {
        setActiveChannel(id);
        setSidebarOpen(false);
    };

    return (
        <div className="h-screen flex flex-col bg-[#F9FAFB] dark:bg-[#0F172A] pt-16">
            <div className="flex flex-1 overflow-hidden">
                {/* ═══════════════ LEFT SIDEBAR ═══════════════ */}
                <AnimatePresence>
                    {sidebarOpen && (
                        <motion.div
                            className="fixed inset-0 bg-black/30 dark:bg-black/50 z-40 lg:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSidebarOpen(false)}
                        />
                    )}
                </AnimatePresence>

                <motion.aside
                    className={`
            fixed lg:static top-16 bottom-0 z-50 w-60
            bg-white/80 dark:bg-[#1E293B]/90 backdrop-blur-xl border-r border-gray-200/60 dark:border-slate-700/50
            flex flex-col
            transition-transform duration-300 ease-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
                >
                    <div className="p-4 border-b border-gray-100 dark:border-slate-700/50">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">
                                Hacker House
                            </span>
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF4444] opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EF4444]" />
                            </span>
                            <ChevronDown size={14} className="text-gray-400 dark:text-slate-500 ml-auto" />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
                        <div>
                            <p className="px-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-1.5 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                                House Channels
                            </p>
                            {houseChannels.map((ch) => (
                                <motion.button
                                    key={ch.id}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => selectChannel(ch.id)}
                                    className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sm transition-colors ${activeChannel === ch.id
                                            ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-semibold"
                                            : "text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700/50 hover:text-gray-900 dark:hover:text-white"
                                        }`}
                                >
                                    <ch.icon size={15} className="shrink-0 opacity-60" />
                                    <span className="truncate">{ch.label}</span>
                                    {ch.unread > 0 && (
                                        <span className="ml-auto bg-[#EF4444] text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center leading-none">
                                            {ch.unread}
                                        </span>
                                    )}
                                </motion.button>
                            ))}
                        </div>

                        <div>
                            <p className="px-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-1.5 flex items-center gap-1.5">
                                <Wrench size={10} className="opacity-60" />
                                Projects
                            </p>
                            {projectChannels.map((ch) => (
                                <motion.button
                                    key={ch.id}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => selectChannel(ch.id)}
                                    className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sm transition-colors ${activeChannel === ch.id
                                            ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-semibold"
                                            : "text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700/50 hover:text-gray-900 dark:hover:text-white"
                                        }`}
                                >
                                    <ch.icon size={15} className="shrink-0 opacity-60" />
                                    <span className="truncate">{ch.label}</span>
                                    {ch.unread > 0 && (
                                        <span className="ml-auto bg-[#EF4444] text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center leading-none">
                                            {ch.unread}
                                        </span>
                                    )}
                                </motion.button>
                            ))}
                        </div>

                        <div>
                            <p className="px-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-1.5">
                                Voice
                            </p>
                            <button className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sm text-gray-400 dark:text-slate-600 cursor-not-allowed">
                                <Volume2 size={15} className="opacity-40" />
                                <span className="truncate">Lounge</span>
                                <span className="ml-auto text-[9px] bg-gray-100 dark:bg-slate-700 text-gray-400 dark:text-slate-500 px-1.5 py-0.5 rounded font-semibold">
                                    SOON
                                </span>
                            </button>
                        </div>
                    </div>
                </motion.aside>

                {/* ═══════════════ MAIN CHAT AREA ═══════════════ */}
                <div className="flex-1 flex flex-col min-w-0">
                    <div className="h-12 border-b border-gray-100 dark:border-slate-700/50 bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-lg flex items-center px-4 gap-3 shrink-0">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden p-1.5 text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                            aria-label="Toggle channels"
                        >
                            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                        <Hash size={18} className="text-gray-400 dark:text-slate-500 shrink-0" />
                        <h2 className="font-bold text-gray-900 dark:text-white text-sm truncate">
                            {activeChannel}
                        </h2>
                        <div className="ml-auto flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-[11px] text-gray-400 dark:text-slate-500 hidden sm:inline">
                                {founders.length} online
                            </span>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                        {currentMessages.map((msg, i) => (
                            <motion.div
                                key={`${activeChannel}-${i}`}
                                className="flex items-start gap-3 group"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.04 }}
                            >
                                <div
                                    className={`w-9 h-9 rounded-full bg-gradient-to-br ${msg.color} flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5`}
                                >
                                    {msg.avatar}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex items-baseline gap-2">
                                        <span className="font-semibold text-sm text-gray-900 dark:text-slate-100">
                                            {msg.author}
                                        </span>
                                        <span className="text-[11px] text-gray-400 dark:text-slate-500">
                                            {msg.time}
                                        </span>
                                    </div>
                                    {msg.text.startsWith("```") ? (
                                        <pre className="mt-1 text-sm text-emerald-700 dark:text-emerald-400 bg-gray-50 dark:bg-slate-800/80 border border-gray-100 dark:border-slate-700/50 rounded-lg p-3 font-mono overflow-x-auto whitespace-pre-wrap">
                                            {msg.text.replace(/```\n?/g, "").trim()}
                                        </pre>
                                    ) : (
                                        <p className="text-sm text-gray-700 dark:text-slate-300/90 leading-relaxed mt-0.5">
                                            {msg.text}
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-3 border-t border-gray-100 dark:border-slate-700/50 bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-lg shrink-0">
                        <div className="flex items-center gap-2 bg-[#F3F4F6] dark:bg-[#334155] rounded-xl px-3 py-2">
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                className="p-1.5 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 rounded-lg hover:bg-gray-200/60 dark:hover:bg-slate-600/50 transition-colors"
                                aria-label="Attach"
                            >
                                <Plus size={18} />
                            </motion.button>
                            <input
                                type="text"
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                placeholder={`Message #${activeChannel}`}
                                className="flex-1 bg-transparent text-sm text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 outline-none"
                            />
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                className="p-1.5 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 rounded-lg hover:bg-gray-200/60 dark:hover:bg-slate-600/50 transition-colors"
                                aria-label="Emoji"
                            >
                                <Smile size={18} />
                            </motion.button>
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={handleSend}
                                className={`p-1.5 rounded-lg transition-colors ${messageInput.trim()
                                        ? "text-white bg-indigo-500 hover:bg-indigo-600"
                                        : "text-gray-300 dark:text-slate-600 cursor-not-allowed"
                                    }`}
                                aria-label="Send"
                            >
                                <Send size={16} />
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* ═══════════════ RIGHT SIDEBAR — TEAM ═══════════════ */}
                <aside className="hidden xl:flex w-56 bg-white/80 dark:bg-[#1E293B]/90 backdrop-blur-xl border-l border-gray-200/60 dark:border-slate-700/50 flex-col">
                    <div className="p-4 border-b border-gray-100 dark:border-slate-700/50">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-slate-500">
                            Online — {founders.length}
                        </p>
                    </div>
                    <div className="flex-1 overflow-y-auto p-3 space-y-1">
                        {founders.map((f) => (
                            <div
                                key={f.name}
                                className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/40 transition-colors group"
                            >
                                <div className="relative">
                                    <div
                                        className={`w-8 h-8 rounded-full bg-gradient-to-br ${f.color} flex items-center justify-center text-white text-[11px] font-bold`}
                                    >
                                        {f.initials}
                                    </div>
                                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-[#1E293B]">
                                        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-40" />
                                    </span>
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-gray-900 dark:text-slate-100 truncate leading-tight">
                                        {f.name}
                                    </p>
                                    <p className="text-[11px] text-gray-400 dark:text-slate-500 truncate">
                                        {f.role}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>
            </div>
        </div>
    );
}
