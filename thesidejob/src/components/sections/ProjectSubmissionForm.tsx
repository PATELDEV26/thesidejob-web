"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
    ChevronRight,
    ChevronLeft,
    Loader2,
    CheckCircle2,
    AlertTriangle,
    Layers,
    FileText,
    Send,
} from "lucide-react";
import { getSupabase } from "@/lib/supabase";

const CATEGORIES = ["Web App", "Mobile App", "AI / ML", "DevTool", "Other"] as const;

type FormData = {
    project_name: string;
    category: string;
    description: string;
    tech_stack: string[];
    team_size: string;
    submitter_email: string;
};

const INITIAL: FormData = {
    project_name: "",
    category: "",
    description: "",
    tech_stack: [],
    team_size: "",
    submitter_email: "",
};

export default function ProjectSubmissionForm() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [mounted, setMounted] = useState(false);
    const [step, setStep] = useState(0);
    const [form, setForm] = useState<FormData>(INITIAL);
    const [techInput, setTechInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => { setMounted(true); }, []);

    const update = <K extends keyof FormData>(key: K, val: FormData[K]) =>
        setForm((f) => ({ ...f, [key]: val }));

    const addTech = () => {
        const t = techInput.trim();
        if (t && !form.tech_stack.includes(t)) {
            update("tech_stack", [...form.tech_stack, t]);
        }
        setTechInput("");
    };

    const removeTech = (t: string) =>
        update(
            "tech_stack",
            form.tech_stack.filter((s) => s !== t)
        );

    const canNext =
        step === 0
            ? form.project_name.trim() && form.category && form.description.trim()
            : step === 1
                ? form.tech_stack.length > 0 && form.team_size && form.submitter_email.trim()
                : true;

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        try {
            const supabase = getSupabase();
            const { error: sbError } = await supabase.from("project_submissions").insert([
                {
                    project_name: form.project_name.trim(),
                    category: form.category,
                    description: form.description.trim(),
                    tech_stack: form.tech_stack,
                    team_size: parseInt(form.team_size, 10),
                    submitter_email: form.submitter_email.trim(),
                },
            ]);
            if (sbError) throw sbError;
            setSuccess(true);
            setForm(INITIAL);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Submission failed. Try again.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    const STEPS = [
        { label: "Basics", icon: FileText },
        { label: "Details", icon: Layers },
        { label: "Review", icon: Send },
    ];

    const inputClass =
        "glow-focus w-full px-4 py-3 bg-[#F9FAFB] dark:bg-[#334155] border border-gray-200 dark:border-slate-600 rounded-xl text-sm text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 transition-all";

    if (!mounted) return null;

    return (
        <section id="submit" className="py-24 sm:py-32 bg-[#F9FAFB] dark:bg-[#0F172A]">
            <div className="max-w-2xl mx-auto px-6" ref={ref}>
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    <p className="text-sm font-semibold tracking-widest text-indigo-500 dark:text-indigo-400 uppercase mb-3">
                        Submit a Project
                    </p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
                        Ship Your <span className="gradient-text">Idea</span>
                    </h2>
                    <p className="mt-4 text-gray-500 dark:text-slate-400 text-lg">
                        Got a project idea? Submit it and let&apos;s build together.
                    </p>
                </motion.div>

                <motion.div
                    className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-slate-700/50 shadow-sm overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.15 }}
                >
                    {/* ── Success ── */}
                    {success ? (
                        <div className="p-10 text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                className="w-16 h-16 mx-auto bg-emerald-100 dark:bg-emerald-950/40 rounded-full flex items-center justify-center mb-5"
                            >
                                <CheckCircle2 size={32} className="text-emerald-500" />
                            </motion.div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                Submission Received!
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-slate-400">
                                We&apos;ll review your project and get back to you soon.
                            </p>
                            <button
                                onClick={() => {
                                    setSuccess(false);
                                    setStep(0);
                                }}
                                className="mt-6 text-sm text-indigo-500 dark:text-indigo-400 font-semibold hover:underline"
                            >
                                Submit another project →
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* ── Step indicator ── */}
                            <div className="flex items-center border-b border-gray-100 dark:border-slate-700/50">
                                {STEPS.map((s, i) => (
                                    <div
                                        key={s.label}
                                        className={`flex-1 flex items-center justify-center gap-2 py-4 text-xs font-semibold transition-colors ${i === step
                                            ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50/60 dark:bg-indigo-950/20"
                                            : i < step
                                                ? "text-emerald-500 dark:text-emerald-400"
                                                : "text-gray-400 dark:text-slate-600"
                                            }`}
                                    >
                                        <s.icon size={14} />
                                        <span className="hidden sm:inline">{s.label}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="p-6 sm:p-8 space-y-5">
                                {/* ── Step 0: Basics ── */}
                                {step === 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="space-y-4"
                                    >
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">
                                                Project Name
                                            </label>
                                            <input
                                                className={inputClass}
                                                placeholder="e.g. VelocityShare"
                                                value={form.project_name}
                                                onChange={(e) => update("project_name", e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">
                                                Category
                                            </label>
                                            <select
                                                className={inputClass}
                                                value={form.category}
                                                onChange={(e) => update("category", e.target.value)}
                                            >
                                                <option value="">Select a category</option>
                                                {CATEGORIES.map((c) => (
                                                    <option key={c} value={c}>
                                                        {c}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">
                                                Description
                                            </label>
                                            <textarea
                                                className={`${inputClass} resize-none`}
                                                rows={4}
                                                placeholder="What does this project do?"
                                                value={form.description}
                                                onChange={(e) => update("description", e.target.value)}
                                            />
                                        </div>
                                    </motion.div>
                                )}

                                {/* ── Step 1: Details ── */}
                                {step === 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="space-y-4"
                                    >
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">
                                                Tech Stack
                                            </label>
                                            <div className="flex gap-2">
                                                <input
                                                    className={`${inputClass} flex-1`}
                                                    placeholder="e.g. Next.js"
                                                    value={techInput}
                                                    onChange={(e) => setTechInput(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault();
                                                            addTech();
                                                        }
                                                    }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={addTech}
                                                    className="px-4 py-2 bg-indigo-500 text-white text-sm font-semibold rounded-xl hover:bg-indigo-600 transition-colors"
                                                >
                                                    Add
                                                </button>
                                            </div>
                                            {form.tech_stack.length > 0 && (
                                                <div className="flex flex-wrap gap-1.5 mt-3">
                                                    {form.tech_stack.map((t) => (
                                                        <span
                                                            key={t}
                                                            className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 font-medium border border-indigo-100 dark:border-indigo-800/30"
                                                        >
                                                            {t}
                                                            <button
                                                                onClick={() => removeTech(t)}
                                                                className="hover:text-red-500 transition-colors ml-0.5"
                                                                aria-label={`Remove ${t}`}
                                                            >
                                                                ×
                                                            </button>
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">
                                                Team Size
                                            </label>
                                            <input
                                                type="number"
                                                min={1}
                                                className={inputClass}
                                                placeholder="e.g. 3"
                                                value={form.team_size}
                                                onChange={(e) => update("team_size", e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">
                                                Your Email
                                            </label>
                                            <input
                                                type="email"
                                                className={inputClass}
                                                placeholder="you@example.com"
                                                value={form.submitter_email}
                                                onChange={(e) => update("submitter_email", e.target.value)}
                                            />
                                        </div>
                                    </motion.div>
                                )}

                                {/* ── Step 2: Review ── */}
                                {step === 2 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="space-y-4"
                                    >
                                        <div className="bg-[#F9FAFB] dark:bg-[#334155]/50 rounded-xl p-5 space-y-3 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-500 dark:text-slate-400">Project</span>
                                                <span className="font-semibold text-gray-900 dark:text-white">{form.project_name}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500 dark:text-slate-400">Category</span>
                                                <span className="font-semibold text-gray-900 dark:text-white">{form.category}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500 dark:text-slate-400 block mb-1">Description</span>
                                                <p className="text-gray-700 dark:text-slate-300 leading-relaxed">{form.description}</p>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500 dark:text-slate-400">Tech Stack</span>
                                                <span className="font-semibold text-gray-900 dark:text-white">{form.tech_stack.join(", ")}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500 dark:text-slate-400">Team Size</span>
                                                <span className="font-semibold text-gray-900 dark:text-white">{form.team_size}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500 dark:text-slate-400">Email</span>
                                                <span className="font-semibold text-gray-900 dark:text-white">{form.submitter_email}</span>
                                            </div>
                                        </div>

                                        {error && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="flex items-center gap-2 text-sm text-red-500 dark:text-red-400 font-medium"
                                            >
                                                <AlertTriangle size={15} /> {error}
                                            </motion.div>
                                        )}
                                    </motion.div>
                                )}

                                {/* ── Navigation ── */}
                                <div className="flex items-center justify-between pt-2">
                                    {step > 0 ? (
                                        <button
                                            onClick={() => setStep(step - 1)}
                                            className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                                        >
                                            <ChevronLeft size={16} /> Back
                                        </button>
                                    ) : (
                                        <div />
                                    )}

                                    {step < 2 ? (
                                        <button
                                            onClick={() => setStep(step + 1)}
                                            disabled={!canNext}
                                            className="btn-primary px-6 py-2.5 text-sm font-semibold rounded-xl flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
                                        >
                                            Next <ChevronRight size={16} />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleSubmit}
                                            disabled={loading}
                                            className="btn-primary px-6 py-2.5 text-sm font-semibold rounded-xl flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                                        >
                                            {loading ? (
                                                <>
                                                    Submitting… <Loader2 size={16} className="animate-spin" />
                                                </>
                                            ) : (
                                                <>
                                                    Submit <Send size={14} />
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
