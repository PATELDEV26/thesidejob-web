"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Github, Linkedin } from "lucide-react";
import { mockTeamMembers, type TeamMember } from "@/data/mockData";
import TeamProfileModal from "@/components/TeamProfileModal";

/* ── 3D Tilt Card Component ── */
function TiltCard({ 
    children, 
    className = "",
    onClick
}: { 
    children: React.ReactNode; 
    className?: string;
    onClick?: () => void;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg)");

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    };

    const handleMouseLeave = () => {
        setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    };

    return (
        <div
            ref={cardRef}
            className={className}
            style={{ transform, transition: "transform 0.15s ease-out" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
        >
            {children}
        </div>
    );
}

export default function Team() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [mounted, setMounted] = useState(false);
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

    useEffect(() => { setMounted(true); }, []);

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

                    {/* Bento Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {mockTeamMembers.map((member, i) => {
                            const isLarge = i < 2;
                            return (
                                <motion.div
                                    key={member.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
                                    className={`${isLarge && i === 0 ? "lg:col-span-2" : ""}`}
                                >
                                    <TiltCard
                                        className={`group relative cursor-pointer h-full
                                            bg-white/70 dark:bg-[#1E293B]/70
                                            backdrop-blur-xl
                                            rounded-2xl
                                            border border-white/20 dark:border-slate-700/50
                                            shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]
                                            hover:shadow-[0_20px_60px_rgba(99,102,241,0.15)] dark:hover:shadow-[0_20px_60px_rgba(99,102,241,0.2)]
                                            hover:border-indigo-200/50 dark:hover:border-indigo-500/30
                                            overflow-hidden
                                            transition-shadow duration-300`}
                                        onClick={() => setSelectedMember(member)}
                                    >
                                        {/* Glassmorphism gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-indigo-50/30 dark:from-slate-800/50 dark:via-transparent dark:to-indigo-900/20 pointer-events-none" />
                                        
                                        {/* Hover glow effect */}
                                        <div className="absolute -inset-px bg-gradient-to-r from-indigo-500/0 via-purple-500/0 to-rose-500/0 group-hover:from-indigo-500/10 group-hover:via-purple-500/10 group-hover:to-rose-500/10 rounded-2xl transition-all duration-500 pointer-events-none" />

                                        <div className={`relative p-8 ${isLarge && i === 0 ? "lg:p-10" : ""}`}>
                                            {member.avatar_url ? (
                                                <img
                                                    src={member.avatar_url}
                                                    alt={member.name}
                                                    className="w-16 h-16 rounded-2xl object-cover mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300"
                                                />
                                            ) : (
                                                <div
                                                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}
                                                >
                                                    <span className="text-xl font-bold text-white drop-shadow-sm">
                                                        {member.initials}
                                                    </span>
                                                </div>
                                            )}

                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                                {member.name}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-slate-400 mb-3">
                                                {member.role || "Co-Founder"}
                                            </p>

                                            {/* Skill pills */}
                                            {member.skills && member.skills.length > 0 && (
                                                <div className="flex flex-wrap gap-1.5 mt-3">
                                                    {member.skills.slice(0, 3).map((skill) => (
                                                        <span
                                                            key={skill}
                                                            className="text-[10px] px-2.5 py-1 rounded-full bg-indigo-100/80 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-medium backdrop-blur-sm"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                    {member.skills.length > 3 && (
                                                        <span className="text-[10px] px-2.5 py-1 rounded-full bg-gray-100/80 dark:bg-slate-700/50 text-gray-500 dark:text-slate-400 font-medium backdrop-blur-sm">
                                                            +{member.skills.length - 3}
                                                        </span>
                                                    )}
                                                </div>
                                            )}

                                            <div className="mt-5 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                {member.github && member.github !== "#" && (
                                                    <a
                                                        href={member.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="p-2 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm border border-gray-200/50 dark:border-slate-600/50 rounded-xl text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-slate-500 hover:scale-110 transition-all"
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
                                                        className="p-2 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm border border-gray-200/50 dark:border-slate-600/50 rounded-xl text-gray-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-500/40 hover:scale-110 transition-all"
                                                        aria-label={`${member.name} LinkedIn`}
                                                    >
                                                        <Linkedin size={16} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </TiltCard>
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
