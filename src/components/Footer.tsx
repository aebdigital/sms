"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CookieConsent, CookieSettingsModal } from "@/components/CookieConsent";

export function Footer() {
    const [cookieSettingsOpen, setCookieSettingsOpen] = useState(false);

    return (
        <>
            <footer className="border-t border-slate-800 bg-slate-950 py-12">
                <div className="px-6 sm:px-12 lg:px-24">
                    <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                        <div className="flex items-center gap-3">
                            <Image
                                src="/smslogo.jpg"
                                alt="SMS Logo"
                                width={32}
                                height={32}
                                className="rounded-md object-contain"
                            />
                            <p className="text-sm text-slate-400">
                                SMS - Servis Montáž Solár s.r.o.
                            </p>
                        </div>
                        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
                            <Link
                                href="/ochrana-osobnych-udajov"
                                className="text-sm text-slate-500 transition-colors hover:text-slate-300"
                            >
                                Ochrana osobných údajov
                            </Link>
                            <button
                                onClick={() => setCookieSettingsOpen(true)}
                                className="text-sm text-slate-500 transition-colors hover:text-slate-300"
                            >
                                Nastavenia cookies
                            </button>
                            <p className="text-sm text-slate-500">
                                &copy; {new Date().getFullYear()} Všetky práva vyhradené.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>

            <CookieConsent />
            <CookieSettingsModal
                open={cookieSettingsOpen}
                onClose={() => setCookieSettingsOpen(false)}
            />
        </>
    );
}
