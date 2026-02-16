import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }) {
    return (
        <Link href="/" className={`flex items-center gap-0 select-none ${className}`}>
            <span className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Thesidejob
            </span>
            <span className="text-xl font-extrabold text-[#EF4444]">.</span>
        </Link>
    );
}
