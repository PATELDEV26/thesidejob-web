"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect, ReactNode } from "react";

/* ══════════════════════════════════════════════════════════════════════════
   3D TILT CARD - Parallax tilt effect based on mouse position
   ══════════════════════════════════════════════════════════════════════════ */
export function TiltCard({
    children,
    className = "",
    onClick,
    glowColor = "rgba(59, 130, 246, 0.5)", // Electric Blue
}: {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    glowColor?: string;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
    };

    return (
        <motion.div
            ref={cardRef}
            className={className}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                perspective: 1000,
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            whileTap={{ scale: 0.98 }}
        >
            {/* Glow effect on hover */}
            <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                    background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor}, transparent 40%)`,
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 0.3s",
                }}
            />
            {children}
        </motion.div>
    );
}

/* ══════════════════════════════════════════════════════════════════════════
   GLASS CARD - Glassmorphism with electric blue border
   ══════════════════════════════════════════════════════════════════════════ */
export function GlassCard({
    children,
    className = "",
    onClick,
    enableTilt = true,
}: {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    enableTilt?: boolean;
}) {
    const baseClasses = `
        relative overflow-hidden cursor-pointer
        bg-white/10 dark:bg-slate-900/40
        backdrop-blur-xl
        rounded-2xl
        border border-[#3B82F6]/20 dark:border-[#3B82F6]/30
        shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]
        hover:border-[#3B82F6]/50 dark:hover:border-[#3B82F6]/60
        hover:shadow-[0_8px_32px_rgba(59,130,246,0.15),0_0_0_1px_rgba(59,130,246,0.3)]
        dark:hover:shadow-[0_8px_32px_rgba(59,130,246,0.25),0_0_0_1px_rgba(59,130,246,0.4)]
        transition-all duration-300
    `;

    if (enableTilt) {
        return (
            <TiltCard className={`${baseClasses} ${className}`} onClick={onClick}>
                {/* Inner glow gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-[#3B82F6]/10 dark:from-slate-800/30 dark:via-transparent dark:to-[#3B82F6]/20 pointer-events-none" />
                <div className="relative z-10">{children}</div>
            </TiltCard>
        );
    }

    return (
        <div className={`${baseClasses} ${className}`} onClick={onClick}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-[#3B82F6]/10 dark:from-slate-800/30 dark:via-transparent dark:to-[#3B82F6]/20 pointer-events-none" />
            <div className="relative z-10">{children}</div>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════════════════════
   MAGNETIC BUTTON - Pulls toward cursor on hover
   ══════════════════════════════════════════════════════════════════════════ */
export function MagneticButton({
    children,
    className = "",
    onClick,
    strength = 0.3,
}: {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    strength?: number;
}) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { stiffness: 150, damping: 15 });
    const springY = useSpring(y, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * strength;
        const deltaY = (e.clientY - centerY) * strength;
        x.set(deltaX);
        y.set(deltaY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            ref={buttonRef}
            className={className}
            style={{ x: springX, y: springY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            whileTap={{ scale: 0.95 }}
        >
            {children}
        </motion.button>
    );
}

/* ══════════════════════════════════════════════════════════════════════════
   MOUSE SPOTLIGHT - Soft radial gradient that follows cursor
   ══════════════════════════════════════════════════════════════════════════ */
export function MouseSpotlight({ children, className = "" }: { children: ReactNode; className?: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            setMousePos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        };

        const container = containerRef.current;
        container?.addEventListener("mousemove", handleMouseMove);
        return () => container?.removeEventListener("mousemove", handleMouseMove);
    }, []);

    if (!mounted) return <div className={className}>{children}</div>;

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            {/* Spotlight gradient */}
            <div
                className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.06), transparent 40%)`,
                }}
            />
            <div className="relative z-10">{children}</div>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════════════════════
   STAGGER TEXT - Staggered fade-in animation for headings
   ══════════════════════════════════════════════════════════════════════════ */
export function StaggerText({
    text,
    className = "",
    delay = 0,
    staggerDelay = 0.03,
    as: Component = "span",
}: {
    text: string;
    className?: string;
    delay?: number;
    staggerDelay?: number;
    as?: keyof JSX.IntrinsicElements;
}) {
    const words = text.split(" ");

    return (
        <Component className={className}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.5,
                        delay: delay + i * staggerDelay,
                        ease: [0.25, 0.1, 0.25, 1],
                    }}
                >
                    {word}
                    {i < words.length - 1 && "\u00A0"}
                </motion.span>
            ))}
        </Component>
    );
}

/* ══════════════════════════════════════════════════════════════════════════
   ANIMATED GRADIENT TEXT - For hero headings
   ══════════════════════════════════════════════════════════════════════════ */
export function GradientText({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <span
            className={`bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent ${className}`}
        >
            {children}
        </span>
    );
}
