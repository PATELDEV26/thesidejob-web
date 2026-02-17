"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, MouseEvent } from "react";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { GlassCard, MouseSpotlight, StaggerText, GradientText } from "@/components/ui/Primitives";

// Magnetic Button for Contact Form
function MagneticSubmitButton({ 
    loading, 
    submitted 
}: { 
    loading: boolean; 
    submitted: boolean;
}) {
    const ref = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 300, damping: 20 });
    const springY = useSpring(y, { stiffness: 300, damping: 20 });

    const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
        if (loading) return;
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;
        x.set(distX * 0.3);
        y.set(distY * 0.3);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            ref={ref}
            type="submit"
            disabled={loading}
            style={{ x: springX, y: springY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileTap={{ scale: 0.95 }}
            className="relative w-full sm:w-auto px-8 py-4 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 
                       bg-gradient-to-r from-blue-500 to-indigo-600 text-white
                       shadow-lg shadow-blue-500/25
                       hover:shadow-xl hover:shadow-blue-500/40
                       disabled:opacity-60 disabled:cursor-not-allowed
                       transition-shadow duration-300
                       overflow-hidden group"
        >
            {/* Glow effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
            <span className="relative z-10 flex items-center gap-2">
                {loading ? (
                    <>
                        Sending… <Loader2 size={16} className="animate-spin" />
                    </>
                ) : submitted ? (
                    "Message Sent! ✓"
                ) : (
                    <>
                        Send Message <Send size={16} />
                    </>
                )}
            </span>
        </motion.button>
    );
}

export default function Contact() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const form = e.currentTarget;
        const formData = new FormData(form);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const message = formData.get("message") as string;

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to send message.");
            }

            setSubmitted(true);
            form.reset();
            setTimeout(() => setSubmitted(false), 4000);
        } catch (err: unknown) {
            const errorMessage =
                err instanceof Error ? err.message : "Something went wrong. Please try again.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="relative py-24 sm:py-32 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-[#0F172A] dark:via-[#1E293B]/50 dark:to-[#0F172A] overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 opacity-30 dark:opacity-20">
                <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-3xl mx-auto px-6" ref={ref}>
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    <motion.span 
                        className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-blue-500 dark:text-blue-400 mb-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1 }}
                    >
                        Get In Touch
                    </motion.span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
                        Let&apos;s <GradientText>Connect</GradientText>
                    </h2>
                    <p className="mt-4 text-gray-500 dark:text-slate-400 text-lg max-w-md mx-auto">
                        Have an idea? Want to collaborate? Drop us a line.
                    </p>
                </motion.div>

                {/* Form in GlassCard */}
                <GlassCard className="p-8">
                    <MouseSpotlight>
                        <motion.form
                            onSubmit={handleSubmit}
                            className="space-y-6"
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                                        Name
                                    </label>
                                    <input
                                        id="contact-name"
                                        name="name"
                                        type="text"
                                        placeholder="Your name"
                                        className="w-full px-4 py-3 bg-white/50 dark:bg-slate-800/50 border border-gray-200/50 dark:border-slate-600/50 rounded-xl text-sm text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                                        Email
                                    </label>
                                    <input
                                        id="contact-email"
                                        name="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        className="w-full px-4 py-3 bg-white/50 dark:bg-slate-800/50 border border-gray-200/50 dark:border-slate-600/50 rounded-xl text-sm text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    rows={5}
                                    placeholder="Tell us about your idea..."
                                    className="w-full px-4 py-3 bg-white/50 dark:bg-slate-800/50 border border-gray-200/50 dark:border-slate-600/50 rounded-xl text-sm text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 transition-all duration-200 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-sm text-red-500 dark:text-red-400 font-medium"
                                >
                                    ⚠ {error}
                                </motion.p>
                            )}

                            {submitted && (
                                <motion.div
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-2 text-sm text-emerald-500 dark:text-emerald-400 font-medium"
                                >
                                    <CheckCircle2 size={18} />
                                    Your message has been sent successfully!
                                </motion.div>
                            )}

                            <MagneticSubmitButton loading={loading} submitted={submitted} />
                        </motion.form>
                    </MouseSpotlight>
                </GlassCard>
            </div>
        </section>
    );
}
