"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function PrivacyPolicy() {
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
      <Header />

      {/* Hero Section */}
      <section ref={heroRef} className="relative flex min-h-[50vh] items-center overflow-hidden pt-20">
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
        <div className="relative z-10 w-full px-6 py-20 sm:px-12 lg:px-24">
          <div className="max-w-2xl">
            <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Ochrana osobných údajov
            </h1>
            <p className="text-lg leading-relaxed text-slate-300">
              Zásady spracúvania a ochrany vašich údajov v spoločnosti SMS - Servis Montáž Solár s.r.o.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="px-6 py-16 sm:px-12 lg:px-24">
        <div className="max-w-4xl">
          <div className="space-y-6 text-base leading-relaxed text-slate-600">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-8 shadow-sm">
              <p className="mb-2 font-bold text-slate-900">
                Prevádzkovateľ:
              </p>
              <p className="text-lg font-semibold text-blue-600">SMS - Servis Montáž Solár s.r.o.</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-slate-400 uppercase tracking-wider font-semibold">IČO</p>
                  <p className="text-slate-900">46 290 982</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400 uppercase tracking-wider font-semibold">Sídlo</p>
                  <p className="text-slate-900">SNP 18, 990 01 Veľký Krtíš</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400 uppercase tracking-wider font-semibold">E-mail</p>
                  <a
                    href="mailto:sms.budai@gmail.com"
                    className="text-blue-600 hover:underline"
                  >
                    sms.budai@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-sm text-slate-400 uppercase tracking-wider font-semibold">Telefón</p>
                  <a
                    href="tel:+421907811018"
                    className="text-blue-600 hover:underline"
                  >
                    +421 907 811 018
                  </a>
                </div>
              </div>
            </div>

            <p className="pt-4">
              Tieto Zásady ochrany osobných údajov (ďalej len „Zásady")
              popisujú, aké osobné údaje spracúvame v súvislosti s používaním
              našej webovej stránky a kontaktných formulárov.
            </p>
          </div>

          {/* Section I */}
          <section className="mt-16">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              I. Kontaktný formulár
            </h2>
            <div className="space-y-6 text-base leading-relaxed text-slate-600">
              <p>
                Na našej webovej stránke prevádzkujeme kontaktný formulár, ktorého
                účelom je umožniť vám:
              </p>
              <ul className="list-inside list-disc space-y-2 pl-4">
                <li>Položiť otázku k našim produktom a službám</li>
                <li>Požiadať o cenovú ponuku</li>
                <li>Zaslať žiadosť o zamestnanie</li>
              </ul>

              <div className="pt-4 grid gap-8 sm:grid-cols-2">
                <div className="rounded-xl border border-blue-50 bg-blue-50/30 p-6">
                  <h3 className="mb-2 font-bold text-slate-900">Rozsah spracúvaných údajov:</h3>
                  <ul className="list-inside list-disc space-y-1 text-slate-600">
                    <li>Meno a priezvisko</li>
                    <li>E-mailová adresa</li>
                    <li>Telefónne číslo</li>
                  </ul>
                </div>

                <div className="rounded-xl border border-blue-50 bg-blue-50/30 p-6">
                  <h3 className="mb-2 font-bold text-slate-900">Účel spracovania:</h3>
                  <p>
                    Spracúvame uvedené údaje, aby sme vás mohli kontaktovať a
                    reagovať na váš dopyt.
                  </p>
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <div>
                  <h3 className="mb-1 font-bold text-slate-900">Právny základ:</h3>
                  <p>
                    Článok 6 ods. 1 písm. b) GDPR – plnenie opatrení pred
                    uzavretím zmluvy na žiadosť dotknutej osoby.
                  </p>
                </div>

                <div>
                  <h3 className="mb-1 font-bold text-slate-900">Doba uchovávania:</h3>
                  <p>
                    Osobné údaje budeme uchovávať maximálne 10 rokov od odozvy na
                    váš dopyt, pokiaľ nevznikne ďalší zmluvný vzťah.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section II */}
          <section className="mt-16">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              II. Súbory cookies
            </h2>
            <div className="space-y-6 text-base leading-relaxed text-slate-600">
              <p>
                Na našej webovej stránke používame cookies výlučne na nasledujúce
                účely:
              </p>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
                  <h3 className="mb-2 font-bold text-slate-900">Nevyhnutné cookies</h3>
                  <p className="text-sm">Zabezpečujú základnú funkčnosť stránky (napr. ukladanie relácie, nastavení prehliadača).</p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
                  <h3 className="mb-2 font-bold text-slate-900">Štatistické cookies</h3>
                  <p className="text-sm">Pomáhajú nám pochopiť, ako návštevníci stránku používajú (nasadzujeme ich len so súhlasom používateľa).</p>
                </div>
              </div>

              <div className="pt-4">
                <h3 className="mb-1 font-bold text-slate-900">Správa súhlasov:</h3>
                <p>
                  Používateľ môže kedykoľvek odvolať súhlas s využívaním
                  štatistických cookies prostredníctvom nastavení cookie lišty
                  alebo priamo v prehliadači.
                </p>
              </div>
            </div>
          </section>

          {/* Section III */}
          <section className="mt-16">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              III. Práva dotknutej osoby
            </h2>
            <div className="space-y-6 text-base leading-relaxed text-slate-600">
              <p>Podľa nariadenia GDPR máte nasledujúce práva:</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <ul className="list-inside list-disc space-y-2 pl-4">
                  <li>Prístup k osobným údajom</li>
                  <li>Oprava nepresných údajov</li>
                  <li>Vymazanie („právo zabudnutia")</li>
                  <li>Obmedzenie spracovania</li>
                </ul>
                <ul className="list-inside list-disc space-y-2 pl-4">
                  <li>Prenosnosť údajov</li>
                  <li>Odvolanie súhlasu</li>
                  <li>Namietať proti spracúvaniu</li>
                  <li>Podať sťažnosť na ÚOOÚ SR</li>
                </ul>
              </div>

              <div className="rounded-xl bg-slate-900 p-8 text-white mt-8">
                <h3 className="mb-4 text-xl font-bold">Máte otázky?</h3>
                <p className="mb-6 text-slate-400">
                  V prípade otázok alebo uplatnenia Vašich práv nás môžete
                  kontaktovať prostredníctvom nasledujúcich údajov:
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-12">
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">E-mail</p>
                    <a href="mailto:sms.budai@gmail.com" className="text-blue-400 hover:text-blue-300">sms.budai@gmail.com</a>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Telefón</p>
                    <a href="tel:+421907811018" className="text-blue-400 hover:text-blue-300">+421 907 811 018</a>
                  </div>
                </div>
              </div>

              <p className="pt-8 text-xs text-slate-400 text-center">
                Tieto Zásady nadobúdajú účinnosť dňom 1. 3. 2026.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
