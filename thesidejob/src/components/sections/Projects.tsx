"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Car, Palette, Globe } from "lucide-react";
import { GlassCard, MouseSpotlight } from "@/components/ui/Primitives";

const projects = [
    {
        title: "VelocityShare",
        status: "In Development",
        statusColor: "bg-emerald-500/20 text-emerald-600 dark:bg-emerald-500/30 dark:text-emerald-400",
        desc: "A smart, scalable ride-sharing ecosystem designed for bikes, cars, and other vehicles. Real-time matching, route optimization, and seamless payments.",
        icon: Car,
        iconBg: "bg-[#3B82F6]/10 dark:bg-[#3B82F6]/20",
        iconColor: "text-[#3B82F6]",
        progress: "60%",
    },
    {
        title: "Artful Threads Identity",
        status: "Branding",
        statusColor: "bg-amber-500/20 text-amber-600 dark:bg-amber-500/30 dark:text-amber-400",
        desc: "A complete brand identity and digital presence for a premium embroidery and sari design studio. Logo, web, and social media kit.",
        icon: Palette,
        iconBg: "bg-amber-500/10 dark:bg-amber-500/20",
        iconColor: "text-amber-500",
        progress: "45%",
    },
    {
        title: "Hacker House Alpha",
        status: "Coming Soon",
        statusColor: "bg-rose-500/20 text-rose-600 dark:bg-rose-500/30 dark:text-rose-400",
        comingSoon: true,
        desc: "Our custom-built real-time community platform featuring channel systems and a live build log. The command center for THESIDEJOB.",
        icon: Globe,
        iconBg: "bg-[#8B5CF6]/10 dark:bg-[#8B5CF6]/20",
        iconColor: "text-[#8B5CF6]",
        progress: "30%",
    },
];

export default function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    if (!mounted) return null;

    return (
        <MouseSpotlight>
            <section id="projects" className="py-20 sm:py-28 bg-[#F8FAFC] dark:bg-[#0F172A]">
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
                            Projects
                        </p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
                            What We&apos;re{" "}
                            <span className="bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
                                Building
                            </span>
                        </h2>
                        <p className="mt-4 text-gray-500 dark:text-slate-400 text-lg">
                            Real products, real deadlines, real impact.
                        </p>
                    </motion.div>

                    {/* Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {projects.map((project, i) => (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                                className={i === 0 ? "md:col-span-2" : ""}
                                suppressHydrationWarning
                            >
                                <GlassCard className="h-full p-6 md:p-8 flex flex-col relative">
                                    {/* Coming soon glow */}
                                    {project.comingSoon && (
                                        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#EC4899]/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
                                    )}

                                    <div className="flex items-start justify-between mb-6">
                                        <div className={`w-12 h-12 ${project.iconBg} rounded-xl flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform`}>
                                            <project.icon className={project.iconColor} size={22} />
                                        </div>
                                        <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${project.statusColor}`}>
                                            {project.status}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#3B82F6] transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed flex-1">
                                        {project.desc}
                                    </p>

                                    {/* Progress bar */}
                                    <div className="mt-6 pt-4 border-t border-gray-100/50 dark:border-slate-700/30">
                                        <div className="flex items-center justify-between text-xs mb-2">
                                            <span className="text-gray-400 dark:text-slate-500">Progress</span>
                                            <span className="font-semibold text-[#3B82F6]">{project.progress}</span>
                                        </div>
                                        <div className="h-2 bg-gray-100/80 dark:bg-slate-700/50 rounded-full overflow-hidden backdrop-blur-sm">
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#EC4899] rounded-full"
                                                initial={{ width: 0 }}
                                                animate={isInView ? { width: project.progress } : {}}
                                                transition={{ duration: 1.2, delay: 0.5 + i * 0.2 }}
                                            />
                                        </div>
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
