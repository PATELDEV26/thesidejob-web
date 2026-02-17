"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { Github, Linkedin, AlertTriangle, RefreshCw } from "lucide-react";
import { getSupabase } from "@/lib/supabase";
import TeamProfileModal from "@/components/TeamProfileModal";

type TeamMember = {
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

/* ── Skeleton ── */
function SkeletonCard({ large }: { large?: boolean }) {
    return (
        <div
            className={`bg-[#F9FAFB] dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-slate-700/50 overflow-hidden animate-pulse ${large ? "lg:col-span-2" : ""
                }`}
        >
            <div className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-gray-200 dark:bg-slate-700 mb-5" />
                <div className="w-40 h-5 bg-gray-200 dark:bg-slate-700 rounded mb-2" />
                <div className="w-24 h-4 bg-gray-200 dark:bg-slate-700 rounded mb-1" />
                <div className="w-48 h-3 bg-gray-200 dark:bg-slate-700 rounded" />
            </div>
        </div>
    );
}

export default function Team() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeSkill, setActiveSkill] = useState<string>("All");
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

    const fetchMembers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const supabase = getSupabase();
            const { data, error: sbError } = await supabase
                .from("team_members")
                .select("*");

            if (sbError) throw sbError;
            setMembers(data ?? []);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Failed to load team.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMembers();
    }, [fetchMembers]);

    /* Derive unique skills from all members */
    const allSkills = useMemo(() => {
        const set = new Set<string>();
        members.forEach((m) => m.skills?.forEach((s) => set.add(s)));
        return ["All", ...Array.from(set).sort()];
    }, [members]);

    const filtered =
        activeSkill === "All"
            ? members
            : members.filter((m) => m.skills?.includes(activeSkill));

    return (
        <>
            <section id="team" className="py-24 sm:py-32 bg-white dark:bg-[#0F172A]">
                <div className="max-w-7xl mx-auto px-6" ref={ref}>
                    <motion.div
                        className="text-center max-w-2xl mx-auto mb-12"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7 }}
                    >
                        <p className="text-sm font-semibold tracking-widest text-indigo-500 dark:text-indigo-400 uppercase mb-3">
                            The Team
                        </p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
                            Meet the <span className="gradient-text">Founders</span>
                        </h2>
                        <p className="mt-4 text-gray-500 dark:text-slate-400 text-lg">
                            Five builders united by a shared obsession with shipping great
                            software.
                        </p>
                    </motion.div>

                    {/* Skill Filter Pills */}
                    {!loading && !error && allSkills.length > 1 && (
                        <motion.div
                            className="flex justify-center gap-2 mb-10 flex-wrap"
                            initial={{ opacity: 0, y: 15 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.15 }}
                        >
                            {allSkills.map((skill) => (
                                <button
                                    key={skill}
                                    onClick={() => setActiveSkill(skill)}
                                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${activeSkill === skill
                                            ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                                            : "bg-white dark:bg-[#1E293B] text-gray-600 dark:text-slate-400 border border-gray-200 dark:border-slate-700/50 hover:border-indigo-300 dark:hover:border-indigo-500/40 hover:text-indigo-600 dark:hover:text-indigo-300"
                                        }`}
                                >
                                    {skill}
                                </button>
                            ))}
                        </motion.div>
                    )}

                    {/* Error */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-md mx-auto mb-10 flex items-center gap-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 rounded-xl px-5 py-4"
                        >
                            <AlertTriangle size={18} className="text-red-500 shrink-0" />
                            <p className="text-sm text-red-600 dark:text-red-400 flex-1">{error}</p>
                            <button
                                onClick={fetchMembers}
                                className="p-1.5 text-red-500 hover:text-red-700 dark:hover:text-red-300 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                                aria-label="Retry"
                            >
                                <RefreshCw size={16} />
                            </button>
                        </motion.div>
                    )}

                    {/* Loading */}
                    {loading && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            <SkeletonCard large />
                            <SkeletonCard />
                            <SkeletonCard />
                            <SkeletonCard />
                            <SkeletonCard />
                        </div>
                    )}

                    {/* Bento Grid */}
                    {!loading && !error && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {filtered.length === 0 && (
                                <p className="col-span-full text-center text-gray-400 dark:text-slate-500 py-12">
                                    No team members match this skill.
                                </p>
                            )}
                            {filtered.map((member, i) => {
                                const isLarge = i < 2;
                                return (
                                    <motion.div
                                        key={member.id}
                                        className={`card-lift group relative bg-[#F9FAFB] dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-slate-700/50 overflow-hidden cursor-pointer ${isLarge && i === 0 ? "lg:col-span-2 lg:row-span-1" : ""
                                            } ${isLarge && i === 1 ? "lg:col-span-1 lg:row-span-1" : ""}`}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
                                        onClick={() => setSelectedMember(member)}
                                    >
                                        <div className={`p-8 ${isLarge && i === 0 ? "lg:p-10" : ""}`}>
                                            {member.avatar_url ? (
                                                <img
                                                    src={member.avatar_url}
                                                    alt={member.name}
                                                    className="w-16 h-16 rounded-2xl object-cover mb-5 shadow-lg group-hover:scale-105 transition-transform duration-300"
                                                />
                                            ) : (
                                                <div
                                                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-105 transition-transform duration-300`}
                                                >
                                                    <span className="text-xl font-bold text-white">
                                                        {member.initials}
                                                    </span>
                                                </div>
                                            )}

                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                                {member.name}
                                            </h3>
                                            <p className="text-sm text-gray-400 dark:text-slate-500 mb-1">
                                                {member.role || "Co-Founder"}
                                            </p>

                                            {/* Skill pills (compact on card) */}
                                            {member.skills && member.skills.length > 0 && (
                                                <div className="flex flex-wrap gap-1 mt-3">
                                                    {member.skills.slice(0, 3).map((skill) => (
                                                        <span
                                                            key={skill}
                                                            className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 font-medium"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                    {member.skills.length > 3 && (
                                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-slate-400 font-medium">
                                                            +{member.skills.length - 3}
                                                        </span>
                                                    )}
                                                </div>
                                            )}

                                            <div className="mt-5 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                {member.github && member.github !== "#" && (
                                                    <a
                                                        href={member.github}
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="p-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-slate-500 transition-all"
                                                        aria-label={`${member.name} GitHub`}
                                                    >
                                                        <Github size={16} />
                                                    </a>
                                                )}
                                                {member.linkedin && member.linkedin !== "#" && (
                                                    <a
                                                        href={member.linkedin}
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="p-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-500/40 transition-all"
                                                        aria-label={`${member.name} LinkedIn`}
                                                    >
                                                        <Linkedin size={16} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            <TeamProfileModal member={selectedMember} onClose={() => setSelectedMember(null)} />
        </>
    );
}
