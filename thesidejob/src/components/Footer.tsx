import Logo from "./Logo";
import { Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-[#0F172A] border-t border-gray-100 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <Logo />
                        <p className="text-sm text-gray-400 dark:text-slate-500">
                            Building the future, one side project at a time.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <a href="#" className="p-2 text-gray-400 dark:text-slate-500 hover:text-gray-700 dark:hover:text-slate-300 transition-colors rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800" aria-label="GitHub">
                            <Github size={18} />
                        </a>
                        <a href="#" className="p-2 text-gray-400 dark:text-slate-500 hover:text-gray-700 dark:hover:text-slate-300 transition-colors rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800" aria-label="Twitter">
                            <Twitter size={18} />
                        </a>
                        <a href="#" className="p-2 text-gray-400 dark:text-slate-500 hover:text-gray-700 dark:hover:text-slate-300 transition-colors rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800" aria-label="LinkedIn">
                            <Linkedin size={18} />
                        </a>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-50 dark:border-slate-800 text-center">
                    <p className="text-xs text-gray-400 dark:text-slate-600">
                        &copy; {new Date().getFullYear()} THESIDEJOB. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
