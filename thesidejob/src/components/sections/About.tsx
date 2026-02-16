"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Users, Rocket } from "lucide-react";

const pillars = [
    {
        icon: Code2,
        title: "Build Real Products",
        desc: "We don't do tutorials. We ship production-grade software that solves real problems.",
        color: "text-indigo-500",
        bg: "bg-indigo-50 dark:bg-indigo-950/40",
    },
    {
        icon: Users,
        title: "Builder Community",
        desc: "A tight-knit collective of engineers, designers, and makers who push each other forward.",
        color: "text-blue-500",
        bg: "bg-blue-50 dark:bg-blue-950/40",
    },
    {
        icon: Rocket,
        title: "Launch & Scale",
        desc: "From side project to scalable product. We take ideas from zero to market.",
        color: "text-red-500",
        bg: "bg-red-50 dark:bg-red-950/40",
    },
];

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="about" className="py-24 sm:py-32 bg-[#F9FAFB] dark:bg-[#0F172A]">
            <div className="max-w-7xl mx-auto px-6" ref={ref}>
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    <p className="text-sm font-semibold tracking-widest text-indigo-500 dark:text-indigo-400 uppercase mb-3">
                        About Us
                    </p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
                        A Tech Collective Built
                        <br />
                        <span className="gradient-text">by Students, for the Future</span>
                    </h2>
                    <p className="mt-6 text-gray-500 dark:text-slate-400 leading-relaxed text-lg">
                        THESIDEJOB is a dynamic tech collective founded by 5 Computer
                        Science Engineering students from{" "}
                        <span className="font-medium text-gray-700 dark:text-slate-200">
                            Parul University, Vadodara
                        </span>
                        . We&apos;re obsessed with building real-world products, creating a
                        thriving builder community, and launching scalable side projects that
                        matter.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {pillars.map((pillar, i) => (
                        <motion.div
                            key={pillar.title}
                            className="card-lift bg-white dark:bg-[#1E293B] rounded-2xl p-8 border border-gray-100 dark:border-slate-700/50"
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                        >
                            <div
                                className={`w-12 h-12 ${pillar.bg} rounded-xl flex items-center justify-center mb-5`}
                            >
                                <pillar.icon className={pillar.color} size={22} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                {pillar.title}
                            </h3>
                            <p className="text-gray-500 dark:text-slate-400 leading-relaxed text-sm">
                                {pillar.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
