"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send } from "lucide-react";

export default function Contact() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <section id="contact" className="py-24 sm:py-32 bg-white dark:bg-[#0F172A]">
            <div className="max-w-3xl mx-auto px-6" ref={ref}>
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    <p className="text-sm font-semibold tracking-widest text-indigo-500 dark:text-indigo-400 uppercase mb-3">
                        Get In Touch
                    </p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
                        Let&apos;s <span className="gradient-text">Connect</span>
                    </h2>
                    <p className="mt-4 text-gray-500 dark:text-slate-400 text-lg">
                        Have an idea? Want to collaborate? Drop us a line.
                    </p>
                </motion.div>

                <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-5"
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
                                type="text"
                                placeholder="Your name"
                                className="glow-focus-red w-full px-4 py-3 bg-[#F9FAFB] dark:bg-[#334155] border border-gray-200 dark:border-slate-600 rounded-xl text-sm text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 transition-all duration-200"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                                Email
                            </label>
                            <input
                                id="contact-email"
                                type="email"
                                placeholder="you@example.com"
                                className="glow-focus-red w-full px-4 py-3 bg-[#F9FAFB] dark:bg-[#334155] border border-gray-200 dark:border-slate-600 rounded-xl text-sm text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 transition-all duration-200"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                            Message
                        </label>
                        <textarea
                            id="contact-message"
                            rows={5}
                            placeholder="Tell us about your idea..."
                            className="glow-focus-red w-full px-4 py-3 bg-[#F9FAFB] dark:bg-[#334155] border border-gray-200 dark:border-slate-600 rounded-xl text-sm text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 transition-all duration-200 resize-none"
                            required
                        />
                    </div>

                    <motion.button
                        type="submit"
                        whileTap={{ scale: 0.95 }}
                        className="btn-primary w-full sm:w-auto px-8 py-3.5 text-sm font-semibold rounded-xl flex items-center justify-center gap-2"
                    >
                        {submitted ? (
                            "Message Sent! ✓"
                        ) : (
                            <>
                                Send Message <Send size={16} />
                            </>
                        )}
                    </motion.button>
                </motion.form>
            </div>
        </section>
    );
}
