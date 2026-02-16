"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ParticleBurst from "./ParticleBurst";

export default function Hero() {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#F9FAFB] dark:bg-[#0F172A]"
        >
            <ParticleBurst />

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.p
                        className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 rounded-full mb-6 uppercase"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        Student-Led Tech Community
                    </motion.p>
                </motion.div>

                <motion.h1
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95]"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                >
                    <span className="gradient-text">Build.</span>{" "}
                    <span className="text-gray-900 dark:text-white">Collaborate.</span>
                    <br />
                    <span className="text-gray-900 dark:text-white">Launch.</span>
                </motion.h1>

                <motion.p
                    className="mt-6 text-lg sm:text-xl text-gray-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-light"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    <span className="font-semibold text-gray-700 dark:text-slate-200">THESIDEJOB</span> — A
                    student-led tech builder community turning ideas into scalable
                    products.
                </motion.p>

                <motion.div
                    className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                >
                    <motion.div whileTap={{ scale: 0.95 }}>
                        <Link
                            href="/signup"
                            className="btn-primary px-8 py-3.5 text-base font-semibold rounded-xl inline-block"
                        >
                            Join The Community
                        </Link>
                    </motion.div>
                    <motion.div whileTap={{ scale: 0.95 }}>
                        <a
                            href="#projects"
                            className="btn-secondary px-8 py-3.5 text-base font-semibold rounded-xl inline-block"
                        >
                            Explore Projects
                        </a>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="mt-16 flex items-center justify-center gap-8 sm:gap-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    {[
                        { value: "5+", label: "Founders" },
                        { value: "3", label: "Active Projects" },
                        { value: "∞", label: "Ideas" },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                                {stat.value}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-400 dark:text-slate-500 mt-1">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </motion.div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F9FAFB] dark:from-[#0F172A] to-transparent pointer-events-none" />
        </section>
    );
}
