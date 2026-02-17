"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { CalendarDays, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { mockEvents } from "@/data/mockData";

type Countdown = { days: number; hours: number; minutes: number; seconds: number };

function calcCountdown(target: string): Countdown | null {
    const diff = new Date(target).getTime() - Date.now();
    if (diff <= 0) return null;
    return {
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
    };
}

const typeBadge: Record<string, string> = {
    Hackathon: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
    Workshop: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    Meetup: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
};

export default function Events() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [mounted, setMounted] = useState(false);
    const [countdown, setCountdown] = useState<Countdown | null>(null);

    useEffect(() => { setMounted(true); }, []);

    /* Live countdown for nearest upcoming event */
    const nextEvent = mockEvents.find((e) => new Date(e.event_date).getTime() > Date.now());

    useEffect(() => {
        if (!nextEvent) return;
        const tick = () => setCountdown(calcCountdown(nextEvent.event_date));
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, [nextEvent]);

    const isPast = (date: string) => new Date(date).getTime() <= Date.now();

    if (!mounted) return null;

    return (
        <section id="events" className="py-24 sm:py-32 bg-white dark:bg-[#0F172A]">
            <div className="max-w-7xl mx-auto px-6" ref={ref}>
                <motion.div
                    className="text-center max-w-2xl mx-auto mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    <p className="text-sm font-semibold tracking-widest text-indigo-500 dark:text-indigo-400 uppercase mb-3">
                        Events
                    </p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
                        Upcoming <span className="gradient-text">Gatherings</span>
                    </h2>
                    <p className="mt-4 text-gray-500 dark:text-slate-400 text-lg">
                        Hackathons, workshops, and meetups — where builders collide.
                    </p>
                </motion.div>

                {/* Countdown Hero */}
                {nextEvent && countdown && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="relative overflow-hidden mb-14 max-w-3xl mx-auto rounded-2xl border border-gray-100 dark:border-slate-700/50 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-950/40 dark:via-[#1E293B] dark:to-purple-950/30 p-8 text-center"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-rose-500/5 dark:from-indigo-500/10 dark:via-purple-500/10 dark:to-rose-500/10" />
                        <div className="relative">
                            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-2">
                                Next Event
                            </p>
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                {nextEvent.title}
                            </h3>
                            <div className="flex justify-center gap-4 sm:gap-6">
                                {(["days", "hours", "minutes", "seconds"] as const).map((unit) => (
                                    <div key={unit} className="flex flex-col items-center">
                                        <span className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 bg-clip-text text-transparent tabular-nums">
                                            {String(countdown[unit]).padStart(2, "0")}
                                        </span>
                                        <span className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-slate-500 mt-1 font-semibold">
                                            {unit}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockEvents.map((evt, i) => {
                        const past = isPast(evt.event_date);
                        return (
                            <motion.div
                                key={evt.id}
                                className={`card-lift bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-slate-700/50 p-6 flex flex-col ${past ? "opacity-60" : ""}`}
                                initial={{ opacity: 0, y: 25 }}
                                animate={isInView ? { opacity: past ? 0.6 : 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                            >
                                <div className="flex items-center gap-2 mb-4">
                                    <span
                                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${typeBadge[evt.type] ??
                                            "bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-slate-300"
                                            }`}
                                    >
                                        {evt.type}
                                    </span>
                                    {past && (
                                        <span className="ml-auto flex items-center gap-1 text-[11px] text-emerald-500 font-semibold">
                                            <CheckCircle2 size={12} /> Completed
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 leading-snug">
                                    {evt.title}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed flex-1">
                                    {evt.description}
                                </p>
                                <div className="mt-4 pt-3 border-t border-gray-50 dark:border-slate-700/30 flex items-center gap-4 text-xs text-gray-400 dark:text-slate-500">
                                    <span className="flex items-center gap-1.5">
                                        <CalendarDays size={13} />
                                        {new Date(evt.event_date).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Clock size={13} />
                                        {new Date(evt.event_date).toLocaleTimeString("en-US", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </span>
                                    {evt.location && (
                                        <span className="flex items-center gap-1.5">
                                            <MapPin size={13} />
                                            {evt.location}
                                        </span>
                                    )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
            </div>
        </section>
    );
}
