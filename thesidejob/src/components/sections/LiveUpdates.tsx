"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Zap } from "lucide-react";
import { mockProjectUpdates } from "@/data/mockData";
import { GlassCard, MouseSpotlight } from "@/components/ui/Primitives";

const FILTERS = ["All", "Web", "AI", "Mobile"] as const;
type Filter = (typeof FILTERS)[number];

function timeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
}

const categoryColors: Record<string, string> = {
    Web: "bg-[#3B82F6]/20 text-[#3B82F6] dark:bg-[#3B82F6]/30 dark:text-[#60A5FA]",
    AI: "bg-purple-500/20 text-purple-600 dark:bg-purple-500/30 dark:text-purple-400",
    Mobile: "bg-emerald-500/20 text-emerald-600 dark:bg-emerald-500/30 dark:text-emerald-400",
};

export default function LiveUpdates() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [mounted, setMounted] = useState(false);
    const [activeFilter, setActiveFilter] = useState<Filter>("All");

    useEffect(() => { setMounted(true); }, []);

    const filtered =
        activeFilter === "All"
            ? mockProjectUpdates
            : mockProjectUpdates.filter((u) => u.category === activeFilter);

    if (!mounted) return null;

    return (
        <MouseSpotlight>
            <section id="updates" className="py-20 sm:py-28 bg-[#F8FAFC] dark:bg-[#0F172A]">
                <div className="max-w-7xl mx-auto px-6" ref={ref}>
                    {/* Header */}
                    <motion.div
                        className="text-center max-w-2xl mx-auto mb-12"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7 }}
                        suppressHydrationWarning
                    >
                        <p className="text-sm font-semibold tracking-widest text-[#3B82F6] uppercase mb-3">
                            Live Updates
                        </p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
                            What&apos;s{" "}
                            <span className="bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
                                Happening
                            </span>
                        </h2>
                        <p className="mt-4 text-gray-500 dark:text-slate-400 text-lg">
                            Real-time progress from every project across the collective.
                        </p>
                    </motion.div>

                    {/* Filter Tabs */}
                    <motion.div
                        className="flex justify-center gap-2 mb-10 flex-wrap"
                        initial={{ opacity: 0, y: 15 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        suppressHydrationWarning
                    >
                        {FILTERS.map((f) => (
                            <button
                                key={f}
                                onClick={() => setActiveFilter(f)}
                                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeFilter === f
                                    ? "bg-[#3B82F6] text-white shadow-lg shadow-[#3B82F6]/30"
                                    : "bg-white/80 dark:bg-[#1E293B]/80 backdrop-blur-sm text-gray-600 dark:text-slate-400 border border-gray-200/50 dark:border-slate-700/50 hover:border-[#3B82F6]/50 hover:text-[#3B82F6]"
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </motion.div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filtered.map((update, i) => (
                            <motion.div
                                key={update.id}
                                initial={{ opacity: 0, y: 25 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
                                suppressHydrationWarning
                            >
                                <GlassCard className="h-full p-6 flex flex-col group">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span
                                            className={`text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm ${categoryColors[update.category] ??
                                                "bg-gray-100/50 text-gray-600 dark:bg-slate-700/50 dark:text-slate-300"
                                                }`}
                                        >
                                            {update.category}
                                        </span>
                                        <span className="ml-auto text-[11px] text-gray-400 dark:text-slate-500">
                                            {timeAgo(update.created_at)}
                                        </span>
                                    </div>
                                    <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 leading-snug group-hover:text-[#3B82F6] transition-colors">
                                        {update.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed flex-1">
                                        {update.description}
                                    </p>
                                    <div className="mt-4 pt-3 border-t border-gray-100/50 dark:border-slate-700/30 flex items-center gap-2">
                                        <Zap size={13} className="text-[#3B82F6]" />
                                        <span className="text-xs text-gray-400 dark:text-slate-500">
                                            {update.author}
                                        </span>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </MouseSpotlight>
    );
}
