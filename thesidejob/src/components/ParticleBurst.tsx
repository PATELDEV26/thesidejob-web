"use client";

import { useEffect, useRef, useCallback } from "react";
import { useTheme } from "next-themes";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    type: "dot" | "dash";
    angle: number;
    speed: number;
    life: number;
    maxLife: number;
    color: string;
}

const COLORS_LIGHT = [
    "99, 102, 241",
    "59, 130, 246",
    "239, 68, 68",
    "249, 115, 22",
    "156, 163, 175",
];

const COLORS_DARK = [
    "129, 140, 248",  // indigo-400
    "96, 165, 250",   // blue-400
    "248, 113, 113",  // red-400
    "251, 146, 60",   // orange-400
    "148, 163, 184",  // slate-400
];

export default function ParticleBurst() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animFrameRef = useRef<number>(0);
    const mouseRef = useRef({ x: 0, y: 0, active: false });
    const { resolvedTheme } = useTheme();
    const themeRef = useRef(resolvedTheme);

    // Keep theme ref synced for the animation loop
    useEffect(() => {
        themeRef.current = resolvedTheme;
    }, [resolvedTheme]);

    const createParticle = useCallback(
        (cx: number, cy: number): Particle => {
            const angle = Math.random() * Math.PI * 2;
            const speed = 0.15 + Math.random() * 0.6;
            const maxLife = 200 + Math.random() * 300;
            const colors = themeRef.current === "dark" ? COLORS_DARK : COLORS_LIGHT;
            const color = colors[Math.floor(Math.random() * colors.length)];

            return {
                x: cx + (Math.random() - 0.5) * 40,
                y: cy + (Math.random() - 0.5) * 40,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: Math.random() < 0.6 ? 1.5 + Math.random() * 2 : 2 + Math.random() * 3,
                opacity: 0.2 + Math.random() * 0.5,
                type: Math.random() < 0.65 ? "dot" : "dash",
                angle,
                speed,
                life: 0,
                maxLife,
                color,
            };
        },
        []
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = 0;
        let height = 0;

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.scale(dpr, dpr);
        };

        resize();
        window.addEventListener("resize", resize);

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
        };
        const handleMouseLeave = () => {
            mouseRef.current.active = false;
        };
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);

        const cx = width / 2;
        const cy = height / 2;
        const particleCount = Math.min(350, Math.floor((width * height) / 3000));
        particlesRef.current = Array.from({ length: particleCount }, () =>
            createParticle(cx, cy)
        );
        particlesRef.current.forEach((p) => {
            p.life = Math.random() * p.maxLife;
            p.x += p.vx * p.life;
            p.y += p.vy * p.life;
        });

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            const centerX = width / 2;
            const centerY = height / 2;
            const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);
            const isDark = themeRef.current === "dark";

            for (let i = 0; i < particlesRef.current.length; i++) {
                const p = particlesRef.current[i];

                p.x += p.vx;
                p.y += p.vy;
                p.life += 1;

                if (mouseRef.current.active) {
                    const dx = p.x - mouseRef.current.x;
                    const dy = p.y - mouseRef.current.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120 && dist > 0) {
                        const force = ((120 - dist) / 120) * 0.3;
                        p.vx += (dx / dist) * force;
                        p.vy += (dy / dist) * force;
                    }
                }

                p.vx *= 0.999;
                p.vy *= 0.999;

                const distFromCenter = Math.sqrt(
                    (p.x - centerX) ** 2 + (p.y - centerY) ** 2
                );
                const distFade = Math.max(0, 1 - distFromCenter / maxDist);

                const lifeFade =
                    p.life < 30
                        ? p.life / 30
                        : p.life > p.maxLife - 50
                            ? (p.maxLife - p.life) / 50
                            : 1;

                const alpha = p.opacity * distFade * lifeFade;

                if (alpha <= 0.01) {
                    particlesRef.current[i] = createParticle(centerX, centerY);
                    continue;
                }

                ctx.save();
                ctx.globalAlpha = alpha;

                if (p.type === "dot") {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${p.color}, ${alpha})`;
                    ctx.fill();
                } else {
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.angle);
                    ctx.beginPath();
                    ctx.roundRect(
                        -p.size * 2,
                        -p.size * 0.4,
                        p.size * 4,
                        p.size * 0.8,
                        p.size * 0.4
                    );
                    ctx.fillStyle = `rgba(${p.color}, ${alpha})`;
                    ctx.fill();
                }

                ctx.restore();

                if (
                    p.x < -50 ||
                    p.x > width + 50 ||
                    p.y < -50 ||
                    p.y > height + 50 ||
                    p.life > p.maxLife
                ) {
                    particlesRef.current[i] = createParticle(centerX, centerY);
                }
            }

            // Center glow — adapts to theme
            const gradient = ctx.createRadialGradient(
                centerX, centerY, 0,
                centerX, centerY, Math.min(width, height) * 0.3
            );
            if (isDark) {
                gradient.addColorStop(0, "rgba(15, 23, 42, 0.7)");
                gradient.addColorStop(1, "rgba(15, 23, 42, 0)");
            } else {
                gradient.addColorStop(0, "rgba(249, 250, 251, 0.7)");
                gradient.addColorStop(1, "rgba(249, 250, 251, 0)");
            }
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            animFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animFrameRef.current);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [createParticle]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ pointerEvents: "none" }}
        />
    );
}
