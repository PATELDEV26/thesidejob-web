"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Github, Linkedin } from "lucide-react";
import { useEffect } from "react";

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

type Props = {
    member: TeamMember | null;
    onClose: () => void;
};

export default function TeamProfileModal({ member, onClose }: Props) {
    /* Close on Escape */
    useEffect(() => {
        if (!member) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [member, onClose]);

    return (
        <AnimatePresence>
            {member && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        className="relative w-full max-w-md bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-slate-700/50 shadow-2xl overflow-hidden"
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-gray-400 dark:text-slate-500 hover:text-gray-700 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors z-10"
                            aria-label="Close modal"
                        >
                            <X size={18} />
                        </button>

                        {/* Header gradient */}
                        <div className={`h-24 bg-gradient-to-br ${member.gradient} relative`}>
                            <div className="absolute inset-0 bg-gradient-to-t from-white/20 dark:from-[#1E293B]/40 to-transparent" />
                        </div>

                        {/* Avatar */}
                        <div className="px-6 -mt-10 relative">
                            {member.avatar_url ? (
                                <img
                                    src={member.avatar_url}
                                    alt={member.name}
                                    className="w-20 h-20 rounded-2xl border-4 border-white dark:border-[#1E293B] object-cover shadow-lg"
                                />
                            ) : (
                                <div
                                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center border-4 border-white dark:border-[#1E293B] shadow-lg`}
                                >
                                    <span className="text-2xl font-bold text-white">
                                        {member.initials}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="px-6 pt-4 pb-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                {member.name}
                            </h3>
                            <p className="text-sm text-indigo-500 dark:text-indigo-400 font-medium mt-0.5">
                                {member.role}
                            </p>

                            {member.bio && (
                                <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed mt-4">
                                    {member.bio}
                                </p>
                            )}

                            {/* Skills */}
                            {member.skills && member.skills.length > 0 && (
                                <div className="mt-5">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-2">
                                        Skills
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {member.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="text-xs px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 font-medium border border-indigo-100 dark:border-indigo-800/30"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Links */}
                            <div className="mt-6 flex items-center gap-3">
                                {member.github && member.github !== "#" && (
                                    <a
                                        href={member.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-slate-700 text-white text-sm font-medium rounded-xl hover:bg-gray-800 dark:hover:bg-slate-600 transition-colors"
                                    >
                                        <Github size={15} /> GitHub
                                    </a>
                                )}
                                {member.linkedin && member.linkedin !== "#" && (
                                    <a
                                        href={member.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors"
                                    >
                                        <Linkedin size={15} /> LinkedIn
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
