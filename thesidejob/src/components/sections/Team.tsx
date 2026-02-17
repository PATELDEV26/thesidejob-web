"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Github, Linkedin } from "lucide-react";
import { mockTeamMembers, type TeamMember } from "@/data/mockData";
import TeamProfileModal from "@/components/TeamProfileModal";
import { GlassCard, MouseSpotlight } from "@/components/ui/Primitives";

export default function Team() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [mounted, setMounted] = useState(false);
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

    useEffect(() => { setMounted(true); }, []);

    if (!mounted) return null;

    // Bento grid layout pattern: [2-col, 1-col] for first row, then [1-col, 1-col, 1-col]
    const getBentoClass = (index: number) => {
        if (index === 0) return "md:col-span-2 md:row-span-1";
        return "";
    };

    return (
        <>
            <MouseSpotlight>
                <section id="team" className="py-20 sm:py-28 bg-[#F8FAFC] dark:bg-[#0F172A]">
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
                                The Team
                            </p>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
                                Meet the{" "}
                                <span className="bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
                                    Founders
                                </span>
                            </h2>
                            <p className="mt-4 text-gray-500 dark:text-slate-400 text-lg">
                                Five builders united by a shared obsession with shipping great software.
                            </p>
                        </motion.div>

                        {/* Bento Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {mockTeamMembers.map((member, i) => (
                                <motion.div
                                    key={member.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
                                    className={getBentoClass(i)}
                                    suppressHydrationWarning
                                >
                                    <GlassCard
                                        className="h-full"
                                        onClick={() => setSelectedMember(member)}
                                    >
                                        <div className={`p-6 ${i === 0 ? "md:p-8 md:flex md:items-center md:gap-8" : ""}`}>
                                            {/* Avatar */}
                                            {member.avatar_url ? (
                                                <img
                                                    src={member.avatar_url}
                                                    alt={member.name}
                                                    className={`rounded-2xl object-cover shadow-lg group-hover:scale-105 transition-transform duration-300 ${i === 0 ? "w-24 h-24 md:w-32 md:h-32" : "w-16 h-16"} mb-5 ${i === 0 ? "md:mb-0" : ""}`}
                                                />
                                            ) : (
                                                <div
                                                    className={`rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center shadow-lg group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300 ${i === 0 ? "w-24 h-24 md:w-32 md:h-32" : "w-16 h-16"} mb-5 ${i === 0 ? "md:mb-0 md:flex-shrink-0" : ""}`}
                                                >
                                                    <span className={`font-bold text-white drop-shadow-sm ${i === 0 ? "text-3xl md:text-4xl" : "text-xl"}`}>
                                                        {member.initials}
                                                    </span>
                                                </div>
                                            )}

                                            <div className={i === 0 ? "flex-1" : ""}>
                                                <h3 className={`font-bold text-gray-900 dark:text-white mb-1 ${i === 0 ? "text-2xl" : "text-xl"}`}>
                                                    {member.name}
                                                </h3>
                                                <p className="text-sm text-[#3B82F6] font-medium mb-3">
                                                    {member.role || "Co-Founder"}
                                                </p>

                                                {/* Skill pills */}
                                                {member.skills && member.skills.length > 0 && (
                                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                                        {member.skills.slice(0, i === 0 ? 4 : 3).map((skill) => (
                                                            <span
                                                                key={skill}
                                                                className="text-[10px] px-2.5 py-1 rounded-full bg-[#3B82F6]/10 text-[#3B82F6] dark:bg-[#3B82F6]/20 dark:text-[#60A5FA] font-medium"
                                                            >
                                                                {skill}
                                                            </span>
                                                        ))}
                                                        {member.skills.length > (i === 0 ? 4 : 3) && (
                                                            <span className="text-[10px] px-2.5 py-1 rounded-full bg-gray-100/80 dark:bg-slate-700/50 text-gray-500 dark:text-slate-400 font-medium">
                                                                +{member.skills.length - (i === 0 ? 4 : 3)}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Social links */}
                                                <div className="flex items-center gap-3">
                                                    {member.github && member.github !== "#" && (
                                                        <a
                                                            href={member.github}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-[#3B82F6]/20 rounded-xl text-gray-500 dark:text-slate-400 hover:text-[#3B82F6] hover:border-[#3B82F6]/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all"
                                                            aria-label={`${member.name} GitHub`}
                                                        >
                                                            <Github size={16} />
                                                        </a>
                                                    )}
                                                    {member.linkedin && member.linkedin !== "#" && (
                                                        <a
                                                            href={member.linkedin}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-[#3B82F6]/20 rounded-xl text-gray-500 dark:text-slate-400 hover:text-[#3B82F6] hover:border-[#3B82F6]/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all"
                                                            aria-label={`${member.name} LinkedIn`}
                                                        >
                                                            <Linkedin size={16} />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </MouseSpotlight>

            <TeamProfileModal member={selectedMember} onClose={() => setSelectedMember(null)} />
        </>
    );
}
