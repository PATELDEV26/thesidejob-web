"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import { Github, Linkedin } from "lucide-react";
import { mockTeamMembers, type TeamMember } from "@/data/mockData";
import TeamProfileModal from "@/components/TeamProfileModal";

export default function Team() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [mounted, setMounted] = useState(false);
    const [activeSkill, setActiveSkill] = useState<string>("All");
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

    useEffect(() => { setMounted(true); }, []);

    /* Derive unique skills from all members */
    const allSkills = useMemo(() => {
        const set = new Set<string>();
        mockTeamMembers.forEach((m) => m.skills?.forEach((s) => set.add(s)));
        return ["All", ...Array.from(set).sort()];
    }, []);

    const filtered =
        activeSkill === "All"
            ? mockTeamMembers
            : mockTeamMembers.filter((m) => m.skills?.includes(activeSkill));

    if (!mounted) return null;

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
                    {allSkills.length > 1 && (
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

                    {/* Bento Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
                </div>
            </section>

            <TeamProfileModal member={selectedMember} onClose={() => setSelectedMember(null)} />
        </>
    );
}
