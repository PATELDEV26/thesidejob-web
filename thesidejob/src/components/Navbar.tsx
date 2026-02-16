"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Team", href: "#team" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("#hero");
    const pathname = usePathname();
    const isLandingPage = pathname === "/";

    const handleScroll = useCallback(() => {
        if (!isLandingPage) return;
        const sections = navLinks.map((l) => l.href.replace("#", ""));
        let current = "#hero";
        for (const id of sections) {
            const el = document.getElementById(id);
            if (el) {
                const rect = el.getBoundingClientRect();
                if (rect.top <= 120) current = `#${id}`;
            }
        }
        setActiveLink(current);
    }, [isLandingPage]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <Logo />

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-1">
                    {isLandingPage &&
                        navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setActiveLink(link.href)}
                                className="relative px-4 py-2 text-sm font-medium text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                            >
                                {link.label}
                                {activeLink === link.href && (
                                    <motion.div
                                        layoutId="navbar-underline"
                                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </a>
                        ))}

                    <Link
                        href="/dashboard"
                        className={`relative px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2 ${pathname === "/dashboard"
                                ? "text-gray-900 dark:text-white"
                                : "text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"
                            }`}
                    >
                        Dashboard
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF4444] opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EF4444]" />
                        </span>
                    </Link>
                </div>

                {/* Desktop CTA + Theme Toggle */}
                <div className="hidden md:flex items-center gap-3">
                    <ThemeToggle />
                    <Link
                        href="/login"
                        className="text-sm font-medium text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors px-4 py-2"
                    >
                        Log In
                    </Link>
                    <motion.div whileTap={{ scale: 0.95 }}>
                        <Link
                            href="/signup"
                            className="btn-primary text-sm font-semibold px-5 py-2.5 rounded-xl inline-block"
                        >
                            Join Us
                        </Link>
                    </motion.div>
                </div>

                {/* Mobile: theme toggle + hamburger */}
                <div className="flex md:hidden items-center gap-2">
                    <ThemeToggle />
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="p-2 text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden glass border-t border-white/20 dark:border-slate-700/30 overflow-hidden"
                    >
                        <div className="px-6 py-4 space-y-1">
                            {isLandingPage &&
                                navLinks.map((link) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => { setActiveLink(link.href); setMobileOpen(false); }}
                                        className="block px-4 py-3 text-sm font-medium text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-800 rounded-xl transition-all"
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-800 rounded-xl transition-all"
                                onClick={() => setMobileOpen(false)}
                            >
                                Dashboard
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF4444] opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EF4444]" />
                                </span>
                            </Link>
                            <div className="pt-3 border-t border-gray-100 dark:border-slate-700/50 flex flex-col gap-2">
                                <Link href="/login" className="text-sm font-medium text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white px-4 py-3" onClick={() => setMobileOpen(false)}>
                                    Log In
                                </Link>
                                <Link href="/signup" className="btn-primary text-sm font-semibold px-5 py-3 rounded-xl text-center" onClick={() => setMobileOpen(false)}>
                                    Join Us
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
