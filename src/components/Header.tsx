"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
    { href: "/#o-nas", label: "O nás" },
    { href: "/#sluzby", label: "Služby" },
    { href: "/#galeria", label: "Galéria" },
    { href: "/#kariera", label: "Kariéra" },
    { href: "/#kontakt", label: "Kontakt" },
];

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <nav className="fixed top-0 z-50 w-full bg-gradient-to-b from-black/70 via-black/30 to-transparent">
                <div className="flex w-full items-center justify-between px-6 py-5 sm:px-12 lg:px-24">
                    <Link href="/" className="group flex flex-col items-center sm:items-start gap-3 py-2">
                        <div className="relative overflow-hidden rounded-xl bg-white/10 p-1 transition-transform group-hover:scale-105">
                            <Image
                                src="/smslogo.jpg"
                                alt="SMS Logo"
                                width={80}
                                height={80}
                                className="h-auto w-20 rounded-lg object-contain sm:w-24"
                            />
                        </div>
                        <div className="text-center sm:text-left">
                            <p className="text-[11px] font-bold leading-none text-white uppercase tracking-widest">
                                SMS - Servis Montáž Solár
                            </p>
                            <p className="mt-1 text-[9px] font-medium text-white/50">s.r.o.</p>
                        </div>
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden items-center gap-10 md:flex">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-base font-semibold text-white transition-opacity hover:opacity-70"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="relative z-50 md:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            )}
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Mobile fullscreen overlay */}
            <div
                className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-slate-900/95 backdrop-blur-md transition-opacity duration-300 md:pointer-events-none md:hidden ${mobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
            >
                <nav className="flex flex-col items-center gap-10">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-3xl font-semibold text-white transition-opacity hover:opacity-70"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </>
    );
}
