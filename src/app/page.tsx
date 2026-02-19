"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Lenis from "lenis";

const NAV_LINKS = [
  { href: "#o-nas", label: "O nás" },
  { href: "#sluzby", label: "Služby" },
  { href: "#galeria", label: "Galéria" },
  { href: "#kariera", label: "Kariéra" },
  { href: "#kontakt", label: "Kontakt" },
];

const SERVICES = [
  {
    title: "Montáž solárnych panelov",
    description:
      "Kompletná montáž fotovoltaických systémov na kľúč — od návrhu po pripojenie do siete.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      </svg>
    ),
  },
  {
    title: "Servis a údržba",
    description:
      "Pravidelná údržba, diagnostika a oprava solárnych elektrární pre maximálny výkon a životnosť.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
      </svg>
    ),
  },
  {
    title: "Elektroinštalácie",
    description:
      "Profesionálne elektroinštalačné práce vrátane rozvádzačov, transformátorov a pripojení VN/NN.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
  },
  {
    title: "Monitoring a bezpečnosť",
    description:
      "Kamerové systémy, diaľkový monitoring výkonu a zabezpečenie solárnych parkov.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
  },
];

const GALLERY_IMAGES = [
  { src: "/photos/20220311_105435.jpg", alt: "Solárny park - pozemná inštalácia" },
  { src: "/photos/20210202_104803.jpg", alt: "Solárne panely v zimnom období" },
  { src: "/photos/20191030_132105.jpg", alt: "Rady solárnych panelov" },
  { src: "/photos/20210322_133655.jpg", alt: "Technické zázemie solárneho parku" },
  { src: "/photos/20220803_162849.jpg", alt: "Elektroinštalačné práce" },
  { src: "/photos/20191022_115002.jpg", alt: "Trafostanica a rozvodňa" },
  { src: "/photos/20210316_125037.jpg", alt: "Servis solárneho parku" },
  { src: "/photos/20220311_105428.jpg", alt: "Elektrická rozvodňa" },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [mapActive, setMapActive] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleScroll = () => {
      if (heroImageRef.current && heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const scrolled = -rect.top;
        if (scrolled >= 0 && scrolled <= rect.height) {
          heroImageRef.current.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
      }
    };

    lenis.on("scroll", handleScroll);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full bg-gradient-to-b from-black/70 via-black/30 to-transparent">
        <div className="flex w-full items-center justify-between px-6 py-5 sm:px-12 lg:px-24">
          <a href="#" className="group flex flex-col items-center sm:items-start gap-3 py-2">
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
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-10 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-base font-semibold text-white transition-opacity hover:opacity-70"
              >
                {link.label}
              </a>
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
            <a
              key={link.href}
              href={link.href}
              className="text-3xl font-semibold text-white transition-opacity hover:opacity-70"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative flex min-h-screen items-center overflow-hidden">
        <div ref={heroImageRef} className="absolute inset-0 will-change-transform" style={{ top: "-10%", bottom: "-10%" }}>
          <Image
            src="/photos/20210202_104803.jpg"
            alt="Solárny park"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/60 to-transparent" />
        </div>
        <div className="relative z-10 w-full px-6 py-32 sm:px-12 lg:px-24">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-200 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              Profesionálne solárne služby od roku 2011
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Energia zo slnka.{" "}
              <span className="text-blue-400">Spoľahlivý partner.</span>
            </h1>
            <p className="mb-10 max-w-lg text-lg leading-relaxed text-slate-300">
              Kompletný servis, montáž a údržba fotovoltaických elektrární.
              Zabezpečujeme maximálny výkon vašich solárnych systémov.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="#kontakt"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25"
              >
                Kontaktujte nás
                <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </a>
              <a
                href="#sluzby"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
              >
                Naše služby
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="o-nas" className="py-24">
        <div className="px-6 sm:px-12 lg:px-24">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
                O nás
              </p>
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Odborníci na fotovoltaiku a elektroinštalácie
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-slate-600">
                <p>
                  Firma SMS-Servis Montáž Solár s.r.o. bola založená v roku 2011 vo Veľkom Krtíši.
                  Prevádzka firmy sa nachádza v Lučenci v multifunkčnej budove, vybavenej kanceláriami,
                  skladovými priestormi, dielňami a garážami pre motorové vozidlá.
                </p>
                <p>
                  Momentálne má 7 zamestnancov, ale v rámci rozširovania firmy pracuje aj na prijatí
                  ďalších odborných zamestnancov. Firma je zástancom ekologickej výroby elektrickej energie,
                  preto sa zaoberá výstavbou a údržbou centrálnych aj decentrálnych fotovoltaických elektrární.
                </p>
                <p>
                  Firma sa podieľala na výstavbe 17ks fotovoltaických parkov. Momentálne má uzatvorené zmluvy
                  s firmami, pre ktoré spravuje, udržiava a zabezpečuje nepretržitú pohotovosť pre plynulý chod
                  62 fotovoltaických elektrární. V rámci údržby sa tiež vykonávajú revízie jednotlivých zariadení.
                </p>
                <p>
                  Firma má oprávnenie na činnosť v rozsahu nízkeho napätia a vysokého napätia bez obmedzenia,
                  aj do výbušného a banského prostredia v rozsahu kategórie C6. Zároveň má tiež certifikát na
                  inštalácie a opravy vysokonapäťových káblových súborov (RAYCHEM, CELLPACK, ENSTO) a ako
                  Inštalatér fotovoltaických systémov podľa zákona 309/2009.
                </p>
                <p>
                  V súčasnosti spolupracuje s viac ako 15 firmami. Jeden zo zakladateľov spoločnosti pôsobil
                  11 rokov na území Maďarskej republiky a bol vykonávateľom elektroinštalačných prác pri výstavbe
                  viacerých obchodných stredísk, nemocníc, kancelárskych budov a bytových komplexov.
                </p>
                <p>
                  Okrem fotovoltaických systémov vykonáva aj projektovanie r konštruovanie elektrických zariadení,
                  elektroinštalačné práce pre domácnosti, ako aj pre firmy pri väčších projektoch.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src="/photos/20220311_105435.jpg"
                  alt="Solárna elektráreň"
                  width={800}
                  height={500}
                  className="h-auto w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 hidden overflow-hidden rounded-xl border-4 border-white shadow-xl lg:block">
                <Image
                  src="/photos/20220803_162849.jpg"
                  alt="Elektroinštalačné práce"
                  width={240}
                  height={160}
                  className="h-40 w-60 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="sluzby" className="bg-slate-50 py-24">
        <div className="px-6 sm:px-12 lg:px-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
              Služby
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Naše služby pre vás
            </h2>
            <p className="text-base text-slate-600">
              Poskytujeme komplexné riešenia v oblasti solárnej energie — od
              počiatočného návrhu až po dlhodobý servis.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="group rounded-2xl border border-slate-100 bg-white p-8 transition-all hover:border-blue-100 hover:shadow-lg hover:shadow-blue-600/5"
              >
                <div className="mb-5 inline-flex rounded-xl bg-blue-50 p-3 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  {service.icon}
                </div>
                <h3 className="mb-3 text-lg font-semibold text-slate-900">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="galeria" className="py-24">
        <div className="px-6 sm:px-12 lg:px-24">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
              Galéria
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Naše realizácie
            </h2>
            <p className="text-base text-slate-600">
              Ukážky z našich projektov — inštalácie, servis a údržba solárnych
              elektrární po celom Slovensku.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {GALLERY_IMAGES.map((image, i) => (
              <button
                key={image.src}
                onClick={() => setLightboxImg(image.src)}
                className={`group relative overflow-hidden rounded-xl ${i === 0 || i === 3
                  ? "sm:col-span-2 sm:row-span-2"
                  : ""
                  }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={800}
                  height={600}
                  className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${i === 0 || i === 3
                    ? "h-64 sm:h-full sm:min-h-[400px]"
                    : "h-48 sm:h-48"
                    }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <p className="absolute bottom-4 left-4 text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {image.alt}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setLightboxImg(null)}
        >
          <button
            className="absolute right-6 top-6 text-white/80 transition-colors hover:text-white"
            onClick={() => setLightboxImg(null)}
            aria-label="Zavrieť"
          >
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
          <Image
            src={lightboxImg}
            alt="Zväčšený obrázok"
            width={1400}
            height={900}
            className="max-h-[85vh] max-w-full rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Career Section */}
      <section id="kariera" className="bg-slate-50 py-24">
        <div className="px-6 sm:px-12 lg:px-24">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
                Kariéra
              </p>
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Pracujte s nami na zelenšej budúcnosti
              </h2>
              <div className="rounded-2xl border border-blue-100 bg-white p-8 shadow-sm transition-all hover:shadow-md">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-900">Elektrikár, Elektrotechnik</h3>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    Plný úväzok
                  </span>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="mb-2 text-sm font-semibold text-slate-900">Požiadavky:</h4>
                    <ul className="list-inside list-disc space-y-1 text-sm text-slate-600">
                      <li>Odborné stredoškolské vzdelanie (elektrikár, elektrotechnik)</li>
                      <li>Výučný list, minimum odborná spôsobilosť §21</li>
                      <li>Vhodné aj pre absolventov</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-2 text-sm font-semibold text-slate-900">Čo ponúkame:</h4>
                    <ul className="list-inside list-disc space-y-1 text-sm text-slate-600">
                      <li>Dlhodobý pracovný úväzok v stabilnej firme</li>
                      <li>Možnosť rozšírenia odborného vzdelávania</li>
                      <li>Lokalita: Lučenec a okolie</li>
                      <li>Platové podmienky: podľa dohody na osobnom stretnutí</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
              <h3 className="mb-6 text-lg font-semibold text-slate-900">Pošlite nám svoj životopis</h3>
              <form className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-500">Meno a priezvisko</label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white"
                      placeholder="napr. Peter Novák"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-500">Telefónne číslo</label>
                    <input
                      type="tel"
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white"
                      placeholder="+421 900 000 000"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-500">E-mailová adresa</label>
                  <input
                    type="email"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white"
                    placeholder="email@priklad.sk"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-500">Znalosti a skúsenosti</label>
                  <textarea
                    rows={3}
                    className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white"
                    placeholder="Stručne popíšte vaše doterajšie skúsenosti..."
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-500">Životopis</label>
                  <div className="relative flex min-h-[100px] cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 transition-all hover:bg-slate-100">
                    <div className="text-center">
                      <svg className="mx-auto mb-2 h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1m-4-8-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      <p className="text-[10px] text-slate-500 px-4">Presuňte sem váš životopis (PDF) alebo kliknite pre výber</p>
                    </div>
                    <input type="file" className="absolute inset-0 opacity-0" />
                  </div>
                </div>
                <button
                  type="button"
                  className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-700 active:scale-[0.98]"
                >
                  Odoslať žiadosť
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="bg-slate-900 py-24">
        <div className="px-6 sm:px-12 lg:px-24">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-400">
                Kontakt
              </p>
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Spojte sa s nami
              </h2>
              <p className="mb-10 text-base leading-relaxed text-slate-400">
                Máte otázky alebo záujem o naše služby? Neváhajte nás kontaktovať.
                Radi vám poradíme a pripravíme nezáväznú ponuku.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-600/10">
                    <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Sídlo firmy</p>
                    <p className="mt-1 text-sm text-slate-400">
                      SNP 18, 990 01 Veľký Krtíš
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-600/10">
                    <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-3h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h18" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Adresa prevádzky</p>
                    <p className="mt-1 text-sm text-slate-400">
                      Ľudmily Podjavorinskej 1061/8
                      <br />
                      984 01 Lučenec
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-600/10">
                    <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a12.035 12.035 0 0 1-7.108-7.108c-.155-.44.011-.927.387-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Mobil</p>
                    <a href="tel:+421907811018" className="mt-1 block text-sm text-slate-400 transition-colors hover:text-blue-400">
                      +421 907 811 018
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-600/10">
                    <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">E-mail</p>
                    <a href="mailto:sms.budai@gmail.com" className="mt-1 block text-sm text-slate-400 transition-colors hover:text-blue-400">
                      sms.budai@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-8 backdrop-blur-sm">
                <h3 className="mb-6 text-lg font-semibold text-white">
                  Firemné údaje
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-700/50 pb-4">
                    <span className="text-sm text-slate-400">Obchodné meno</span>
                    <span className="text-sm font-medium text-white text-right">
                      SMS-Servis Montáž Solár s.r.o.
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-700/50 pb-4">
                    <span className="text-sm text-slate-400">IČO</span>
                    <span className="text-sm font-medium text-white">46 290 982</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-700/50 pb-4">
                    <span className="text-sm text-slate-400">IČ DPH</span>
                    <span className="text-sm font-medium text-white">SK2023 314 051</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-8 backdrop-blur-sm">
                <h3 className="mb-6 text-lg font-semibold text-white">
                  Bankové spojenie
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-700/50 pb-4">
                    <span className="text-sm text-slate-400">Banka</span>
                    <span className="text-sm font-medium text-white">Tatra banka a.s.</span>
                  </div>
                  <div className="flex flex-col border-b border-slate-700/50 pb-4">
                    <span className="mb-1 text-sm text-slate-400">IBAN</span>
                    <span className="text-sm font-medium text-white">SK69 1100 0000 0029 2086 1128</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">SWIFT</span>
                    <span className="text-sm font-medium text-white">TATRSKBX</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div
            className="relative mt-16 overflow-hidden rounded-2xl border border-slate-700/50"
            onMouseLeave={() => setMapActive(false)}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2645.1!2d19.652!3d48.339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471550c6d590e87d%3A0x6739d42858804680!2zbcS+ZG1pbHkgUG9kamF2b3JpbnNrZWogMTA2MS84LCA5ODQgMDEgTHXEjWVuZWM!5e0!3m2!1ssk!2ssk!4v1710000000000!5m2!1ssk!2ssk"
              width="100%"
              height="400"
              style={{ border: 0, pointerEvents: mapActive ? "auto" : "none" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SMS - Servis Montáž Solár s.r.o. - prevádzka Lučenec"
            />
            {!mapActive && (
              <button
                className="absolute inset-0 flex cursor-pointer items-end justify-center bg-transparent pb-8"
                onClick={() => setMapActive(true)}
              >
                <span className="rounded-full bg-black/50 px-4 py-2 text-xs text-white/80 backdrop-blur-sm">
                  Kliknite pre interakciu s mapou
                </span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
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
            <p className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()} Všetky práva vyhradené.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
