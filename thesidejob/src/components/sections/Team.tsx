"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin } from "lucide-react";

const founders = [
    { name: "Dhariya Patel", initials: "DP", gradient: "from-indigo-400 to-blue-500", github: "#", linkedin: "#" },
    { name: "Aditya Gupta", initials: "AG", gradient: "from-blue-400 to-cyan-500", github: "#", linkedin: "#" },
    { name: "Dev Patel", initials: "DP", gradient: "from-red-400 to-orange-500", github: "#", linkedin: "#" },
    { name: "Harshit Patel", initials: "HP", gradient: "from-orange-400 to-yellow-500", github: "#", linkedin: "#" },
    { name: "Vansh Kaushal", initials: "VK", gradient: "from-purple-400 to-indigo-500", github: "#", linkedin: "#" },
];

export default function Team() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="team" className="py-24 sm:py-32 bg-white dark:bg-[#0F172A]">
            <div className="max-w-7xl mx-auto px-6" ref={ref}>
                <motion.div
                    className="text-center max-w-2xl mx-auto mb-16"
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
                    {founders.map((founder, i) => {
                        const isLarge = i < 2;
                        return (
                            <motion.div
                                key={founder.name}
                                className={`
                  card-lift group relative bg-[#F9FAFB] dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-slate-700/50 overflow-hidden
                  ${isLarge && i === 0 ? "lg:col-span-2 lg:row-span-1" : ""}
                  ${isLarge && i === 1 ? "lg:col-span-1 lg:row-span-1" : ""}
                `}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
                            >
                                <div className={`p-8 ${isLarge && i === 0 ? "lg:p-10" : ""}`}>
                                    <div
                                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${founder.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-105 transition-transform duration-300`}
                                    >
                                        <span className="text-xl font-bold text-white">
                                            {founder.initials}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                        {founder.name}
                                    </h3>
                                    <p className="text-sm text-gray-400 dark:text-slate-500 mb-1">Co-Founder</p>
                                    <p className="text-xs text-gray-400 dark:text-slate-500">
                                        B.Tech CSE, 3rd Year — Parul University
                                    </p>

                                    <div className="mt-5 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <a
                                            href={founder.github}
                                            className="p-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-slate-500 transition-all"
                                            aria-label={`${founder.name} GitHub`}
                                        >
                                            <Github size={16} />
                                        </a>
                                        <a
                                            href={founder.linkedin}
                                            className="p-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-500/40 transition-all"
                                            aria-label={`${founder.name} LinkedIn`}
                                        >
                                            <Linkedin size={16} />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
