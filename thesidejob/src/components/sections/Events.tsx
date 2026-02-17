"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { CalendarDays, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { mockEvents } from "@/data/mockData";
import { GlassCard, MouseSpotlight } from "@/components/ui/Primitives";

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
    Hackathon: "bg-[#3B82F6]/20 text-[#3B82F6] dark:bg-[#3B82F6]/30 dark:text-[#60A5FA]",
    Workshop: "bg-amber-500/20 text-amber-600 dark:bg-amber-500/30 dark:text-amber-400",
    Meetup: "bg-emerald-500/20 text-emerald-600 dark:bg-emerald-500/30 dark:text-emerald-400",
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
        <MouseSpotlight>
            <section id="events" className="py-20 sm:py-28 bg-[#F8FAFC] dark:bg-[#0F172A]">
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
                            Events
                        </p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
                            Upcoming{" "}
                            <span className="bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
                                Gatherings
                            </span>
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
                            suppressHydrationWarning
                        >
                            <GlassCard className="mb-12 max-w-3xl mx-auto p-8 text-center" enableTilt={false}>
                                <p className="text-xs font-semibold uppercase tracking-widest text-[#3B82F6] mb-2">
                                    Next Event
                                </p>
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    {nextEvent.title}
                                </h3>
                                <div className="flex justify-center gap-4 sm:gap-6">
                                    {(["days", "hours", "minutes", "seconds"] as const).map((unit) => (
                                        <div key={unit} className="flex flex-col items-center">
                                            <span className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent tabular-nums">
                                                {String(countdown[unit]).padStart(2, "0")}
                                            </span>
                                            <span className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-slate-500 mt-1 font-semibold">
                                                {unit}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </GlassCard>
                        </motion.div>
                    )}

                    {/* Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {mockEvents.map((evt, i) => {
                            const past = isPast(evt.event_date);
                            return (
                                <motion.div
                                    key={evt.id}
                                    initial={{ opacity: 0, y: 25 }}
                                    animate={isInView ? { opacity: past ? 0.6 : 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                                    suppressHydrationWarning
                                >
                                    <GlassCard className={`h-full p-6 flex flex-col ${past ? "opacity-60" : ""}`}>
                                        <div className="flex items-center gap-2 mb-4">
                                            <span
                                                className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${typeBadge[evt.type] ??
                                                    "bg-gray-100/50 text-gray-600 dark:bg-slate-700/50 dark:text-slate-300"
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
                                        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 leading-snug group-hover:text-[#3B82F6] transition-colors">
                                            {evt.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed flex-1">
                                            {evt.description}
                                        </p>
                                        <div className="mt-4 pt-3 border-t border-gray-100/50 dark:border-slate-700/30 flex flex-wrap items-center gap-4 text-xs text-gray-400 dark:text-slate-500">
                                            <span className="flex items-center gap-1.5">
                                                <CalendarDays size={13} className="text-[#3B82F6]" />
                                                {new Date(evt.event_date).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Clock size={13} className="text-[#3B82F6]" />
                                                {new Date(evt.event_date).toLocaleTimeString("en-US", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </span>
                                            {evt.location && (
                                                <span className="flex items-center gap-1.5">
                                                    <MapPin size={13} className="text-[#3B82F6]" />
                                                    {evt.location}
                                                </span>
                                            )}
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </MouseSpotlight>
    );
}
