import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: {
    default: "SMS - Servis Montáž Solár s.r.o. | Solárne služby",
    template: "%s | SMS - Servis Montáž Solár",
  },
  description:
    "Profesionálny servis, montáž a údržba solárnych a fotovoltaických elektrární. Elektroinštalácie, revízie, monitoring. Spoľahlivý partner od roku 2011 — Veľký Krtíš, Lučenec a celé Slovensko.",
  keywords: [
    "solárne panely",
    "fotovoltaika",
    "solárna elektráreň",
    "montáž solárnych panelov",
    "servis fotovoltaiky",
    "údržba solárnych elektrární",
    "elektroinštalácie",
    "revízie elektrických zariadení",
    "fotovoltaické systémy",
    "solárna energia Slovensko",
    "SMS Servis Montáž Solár",
    "Veľký Krtíš",
    "Lučenec",
    "solárne služby",
    "vysoké napätie",
    "nízke napätie",
    "fotovoltaický park",
  ],
  authors: [{ name: "SMS - Servis Montáž Solár s.r.o." }],
  creator: "SMS - Servis Montáž Solár s.r.o.",
  publisher: "SMS - Servis Montáž Solár s.r.o.",
  metadataBase: new URL("https://sms-solar.sk"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "sk_SK",
    url: "https://sms-solar.sk",
    siteName: "SMS - Servis Montáž Solár s.r.o.",
    title: "SMS - Servis Montáž Solár s.r.o. | Solárne služby od roku 2011",
    description:
      "Kompletný servis, montáž a údržba fotovoltaických elektrární. Elektroinštalácie, revízie a monitoring. Spoľahlivý partner pre solárne projekty na Slovensku.",
    images: [
      {
        url: "/photos/20220311_105435.jpg",
        width: 1200,
        height: 630,
        alt: "SMS - Servis Montáž Solár — solárna elektráreň",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "SK-BB",
    "geo.placename": "Veľký Krtíš",
    "geo.position": "48.2131;19.3483",
    ICBM: "48.2131, 19.3483",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "SMS - Servis Montáž Solár s.r.o.",
  description:
    "Profesionálny servis, montáž a údržba solárnych a fotovoltaických elektrární. Elektroinštalácie, revízie, monitoring.",
  url: "https://sms-solar.sk",
  telephone: "+421907811018",
  email: "sms.budai@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "SNP 18",
    addressLocality: "Veľký Krtíš",
    postalCode: "990 01",
    addressCountry: "SK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 48.2131,
    longitude: 19.3483,
  },
  foundingDate: "2011",
  numberOfEmployees: "7",
  areaServed: {
    "@type": "Country",
    name: "Slovensko",
  },
  serviceType: [
    "Montáž solárnych panelov",
    "Servis fotovoltaických elektrární",
    "Elektroinštalácie",
    "Revízie elektrických zariadení",
    "Monitoring solárnych parkov",
  ],
  image: "https://sms-solar.sk/photos/20220311_105435.jpg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
