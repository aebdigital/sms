"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

function getStoredPreferences(): CookiePreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem("cookie-preferences");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function storePreferences(prefs: CookiePreferences) {
  localStorage.setItem("cookie-preferences", JSON.stringify(prefs));
  localStorage.setItem("cookie-consent-given", "true");
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] =
    useState<CookiePreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    const hasConsent = localStorage.getItem("cookie-consent-given");
    if (!hasConsent) {
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    storePreferences({ necessary: true, analytics: true, marketing: true });
    setVisible(false);
  };

  const rejectAll = () => {
    storePreferences(DEFAULT_PREFERENCES);
    setVisible(false);
  };

  const saveSettings = () => {
    storePreferences({ ...preferences, necessary: true });
    setShowSettings(false);
    setVisible(false);
  };

  if (!visible) return null;

  // Settings popup
  if (showSettings) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
        <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-blue-600 shadow-2xl">
          <div className="flex items-center justify-between border-b border-blue-500 px-6 py-4">
            <h3 className="text-lg font-semibold text-white">
              Nastavenia cookies
            </h3>
            <button
              onClick={() => setShowSettings(false)}
              className="text-blue-200 transition-colors hover:text-white"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-3 p-6">
            <CookieToggleRow
              label="Nevyhnutné cookies"
              description="Vždy aktívne — potrebné pre fungovanie stránky"
              checked={true}
              disabled
            />
            <CookieToggleRow
              label="Štatistické cookies"
              description="Pomáhajú nám pochopiť návštevnosť stránky"
              checked={preferences.analytics}
              onChange={() => setPreferences((p) => ({ ...p, analytics: !p.analytics }))}
            />
            <CookieToggleRow
              label="Marketingové cookies"
              description="Používajú sa na personalizáciu reklám"
              checked={preferences.marketing}
              onChange={() => setPreferences((p) => ({ ...p, marketing: !p.marketing }))}
            />
          </div>

          <div className="flex gap-2 border-t border-blue-500 px-6 py-4">
            <button
              onClick={saveSettings}
              className="flex-1 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-blue-600 transition-opacity hover:opacity-90"
            >
              Uložiť nastavenia
            </button>
            <button
              onClick={() => setShowSettings(false)}
              className="rounded-lg border border-white/30 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Späť
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Simple banner
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6">
      <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl bg-blue-600 shadow-2xl shadow-blue-900/30">
        <div className="p-6">
          <h3 className="mb-2 text-base font-semibold text-white">
            Súbory cookies
          </h3>
          <p className="mb-5 text-sm leading-relaxed text-blue-100">
            Táto stránka používa súbory cookies na zlepšenie vášho zážitku.{" "}
            <Link
              href="/ochrana-osobnych-udajov"
              className="underline transition-opacity hover:opacity-80"
            >
              Viac informácií
            </Link>
          </p>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              onClick={acceptAll}
              className="flex-1 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-blue-600 transition-opacity hover:opacity-90"
            >
              Prijať všetky
            </button>
            <button
              onClick={rejectAll}
              className="flex-1 rounded-lg border border-white/30 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Odmietnuť
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="flex-1 rounded-lg border border-white/20 px-4 py-2.5 text-sm font-medium text-blue-200 transition-colors hover:bg-blue-700 hover:text-white"
            >
              Nastavenia
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CookieToggleRow({
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: () => void;
}) {
  return (
    <div
      className={`flex items-center justify-between rounded-lg bg-blue-700/50 px-4 py-3 ${
        !disabled ? "cursor-pointer transition-colors hover:bg-blue-700/70" : ""
      }`}
      onClick={!disabled ? onChange : undefined}
    >
      <div>
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="text-xs text-blue-200">{description}</p>
      </div>
      <button
        type="button"
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation();
          if (!disabled && onChange) onChange();
        }}
        className="relative ml-4 h-6 w-10 shrink-0 rounded-full transition-colors"
        style={{ backgroundColor: checked ? "#60a5fa" : "#1e40af" }}
      >
        <span
          className="absolute top-[2px] h-5 w-5 rounded-full bg-white transition-all"
          style={{ left: checked ? "18px" : "2px" }}
        />
      </button>
    </div>
  );
}

export function CookieSettingsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [preferences, setPreferences] = useState<CookiePreferences>(
    () => getStoredPreferences() || DEFAULT_PREFERENCES
  );

  useEffect(() => {
    if (open) {
      const stored = getStoredPreferences();
      if (stored) setPreferences(stored);
    }
  }, [open]);

  const save = () => {
    storePreferences({ ...preferences, necessary: true });
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-2xl bg-blue-600 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-blue-500 px-6 py-4">
          <h3 className="text-lg font-semibold text-white">
            Nastavenia cookies
          </h3>
          <button
            onClick={onClose}
            className="text-blue-200 transition-colors hover:text-white"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-3 p-6">
          <CookieToggleRow
            label="Nevyhnutné cookies"
            description="Vždy aktívne — potrebné pre fungovanie stránky"
            checked={true}
            disabled
          />
          <CookieToggleRow
            label="Štatistické cookies"
            description="Pomáhajú nám pochopiť návštevnosť stránky"
            checked={preferences.analytics}
            onChange={() => setPreferences((p) => ({ ...p, analytics: !p.analytics }))}
          />
          <CookieToggleRow
            label="Marketingové cookies"
            description="Používajú sa na personalizáciu reklám"
            checked={preferences.marketing}
            onChange={() => setPreferences((p) => ({ ...p, marketing: !p.marketing }))}
          />
        </div>

        <div className="flex gap-2 border-t border-blue-500 px-6 py-4">
          <button
            onClick={save}
            className="flex-1 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-blue-600 transition-opacity hover:opacity-90"
          >
            Uložiť nastavenia
          </button>
          <button
            onClick={onClose}
            className="rounded-lg border border-white/30 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Zrušiť
          </button>
        </div>
      </div>
    </div>
  );
}
