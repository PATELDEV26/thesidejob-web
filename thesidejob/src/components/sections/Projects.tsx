"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Car, Palette, Globe } from "lucide-react";

const projects = [
    {
        title: "VelocityShare",
        status: "In Development",
        statusColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        desc: "A smart, scalable ride-sharing ecosystem designed for bikes, cars, and other vehicles. Real-time matching, route optimization, and seamless payments.",
        icon: Car,
        iconBg: "bg-indigo-50 dark:bg-indigo-950/40",
        iconColor: "text-indigo-500",
        progress: "60%",
    },
    {
        title: "Artful Threads Identity",
        status: "Branding",
        statusColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
        desc: "A complete brand identity and digital presence for a premium embroidery and sari design studio. Logo, web, and social media kit.",
        icon: Palette,
        iconBg: "bg-amber-50 dark:bg-amber-950/40",
        iconColor: "text-amber-500",
        progress: "45%",
    },
    {
        title: "Hacker House Alpha",
        status: "Coming Soon",
        statusColor: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
        comingSoon: true,
        desc: "Our custom-built real-time community platform featuring channel systems and a live build log. The command center for THESIDEJOB.",
        icon: Globe,
        iconBg: "bg-blue-50 dark:bg-blue-950/40",
        iconColor: "text-blue-500",
        progress: "30%",
    },
];

export default function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="projects" className="py-24 sm:py-32 bg-[#F9FAFB] dark:bg-[#0F172A]">
            <div className="max-w-7xl mx-auto px-6" ref={ref}>
                <motion.div
                    className="text-center max-w-2xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    <p className="text-sm font-semibold tracking-widest text-indigo-500 dark:text-indigo-400 uppercase mb-3">
                        Projects
                    </p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
                        What We&apos;re <span className="gradient-text">Building</span>
                    </h2>
                    <p className="mt-4 text-gray-500 dark:text-slate-400 text-lg">
                        Real products, real deadlines, real impact.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.title}
                            className="card-lift bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-slate-700/50 p-8 flex flex-col relative overflow-hidden"
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            {project.comingSoon && (
                                <div className="absolute -top-12 -right-12 w-32 h-32 bg-red-400/10 dark:bg-red-500/15 rounded-full blur-2xl coming-soon-glow pointer-events-none" />
                            )}

                            <div className="flex items-start justify-between mb-6">
                                <div className={`w-12 h-12 ${project.iconBg} rounded-xl flex items-center justify-center`}>
                                    <project.icon className={project.iconColor} size={22} />
                                </div>
                                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${project.statusColor} ${project.comingSoon ? "coming-soon-badge" : ""}`}>
                                    {project.status}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                {project.title}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed flex-1">
                                {project.desc}
                            </p>
                            <div className="mt-6 pt-4 border-t border-gray-50 dark:border-slate-700/30">
                                <div className="h-1.5 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={isInView ? { width: project.progress } : {}}
                                        transition={{ duration: 1.2, delay: 0.5 + i * 0.2 }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
