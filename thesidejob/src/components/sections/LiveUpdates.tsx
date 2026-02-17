"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Zap, AlertTriangle, RefreshCw } from "lucide-react";
import { getSupabase } from "@/lib/supabase";

type ProjectUpdate = {
    id: string;
    title: string;
    description: string;
    category: string;
    author: string;
    created_at: string;
};

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

/* ── Skeleton Card ── */
function SkeletonCard() {
    return (
        <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-slate-700/50 p-6 animate-pulse">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-16 h-5 bg-gray-200 dark:bg-slate-700 rounded-full" />
                <div className="ml-auto w-12 h-4 bg-gray-200 dark:bg-slate-700 rounded" />
            </div>
            <div className="w-3/4 h-5 bg-gray-200 dark:bg-slate-700 rounded mb-3" />
            <div className="w-full h-4 bg-gray-200 dark:bg-slate-700 rounded mb-2" />
            <div className="w-2/3 h-4 bg-gray-200 dark:bg-slate-700 rounded" />
        </div>
    );
}

const categoryColors: Record<string, string> = {
    Web: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    AI: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    Mobile: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
};

export default function LiveUpdates() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [mounted, setMounted] = useState(false);
    const [updates, setUpdates] = useState<ProjectUpdate[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeFilter, setActiveFilter] = useState<Filter>("All");

    useEffect(() => { setMounted(true); }, []);

    const fetchUpdates = async () => {
        setLoading(true);
        setError(null);
        try {
            const supabase = getSupabase();
            const { data, error: sbError } = await supabase
                .from("project_updates")
                .select("*")
                .order("created_at", { ascending: false });

            if (sbError) throw sbError;
            setUpdates(data ?? []);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Failed to load updates.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUpdates();
    }, []);

    const filtered =
        activeFilter === "All"
            ? updates
            : updates.filter((u) => u.category === activeFilter);

    if (!mounted) return null;

    return (
        <section id="updates" className="py-24 sm:py-32 bg-[#F9FAFB] dark:bg-[#0F172A]">
            <div className="max-w-7xl mx-auto px-6" ref={ref}>
                <motion.div
                    className="text-center max-w-2xl mx-auto mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    <p className="text-sm font-semibold tracking-widest text-indigo-500 dark:text-indigo-400 uppercase mb-3">
                        Live Updates
                    </p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
                        What&apos;s <span className="gradient-text">Happening</span>
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
                >
                    {FILTERS.map((f) => (
                        <button
                            key={f}
                            onClick={() => setActiveFilter(f)}
                            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${activeFilter === f
                                ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                                : "bg-white dark:bg-[#1E293B] text-gray-600 dark:text-slate-400 border border-gray-200 dark:border-slate-700/50 hover:border-indigo-300 dark:hover:border-indigo-500/40 hover:text-indigo-600 dark:hover:text-indigo-300"
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </motion.div>

                {/* Error State */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-md mx-auto mb-10 flex items-center gap-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 rounded-xl px-5 py-4"
                    >
                        <AlertTriangle size={18} className="text-red-500 shrink-0" />
                        <p className="text-sm text-red-600 dark:text-red-400 flex-1">{error}</p>
                        <button
                            onClick={fetchUpdates}
                            className="p-1.5 text-red-500 hover:text-red-700 dark:hover:text-red-300 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                            aria-label="Retry"
                        >
                            <RefreshCw size={16} />
                        </button>
                    </motion.div>
                )}

                {/* Loading Skeletons */}
                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                )}

                {/* Cards */}
                {!loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.length === 0 && (
                            <p className="col-span-full text-center text-gray-400 dark:text-slate-500 py-12">
                                No updates in this category yet.
                            </p>
                        )}
                        {filtered.map((update, i) => (
                            <motion.div
                                key={update.id}
                                className="card-lift bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-slate-700/50 p-6 flex flex-col"
                                initial={{ opacity: 0, y: 25 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
                            >
                                <div className="flex items-center gap-2 mb-4">
                                    <span
                                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${categoryColors[update.category] ??
                                            "bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-slate-300"
                                            }`}
                                    >
                                        {update.category}
                                    </span>
                                    <span className="ml-auto text-[11px] text-gray-400 dark:text-slate-500">
                                        {timeAgo(update.created_at)}
                                    </span>
                                </div>
                                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 leading-snug">
                                    {update.title}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed flex-1">
                                    {update.description}
                                </p>
                                <div className="mt-4 pt-3 border-t border-gray-50 dark:border-slate-700/30 flex items-center gap-2">
                                    <Zap size={13} className="text-indigo-400" />
                                    <span className="text-xs text-gray-400 dark:text-slate-500">
                                        {update.author}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
