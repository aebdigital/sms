import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "SMS - Servis Montáž Solár s.r.o.",
  description:
    "Profesionálny servis, montáž a údržba solárnych elektrární. Spoľahlivý partner pre vaše solárne projekty vo Veľkom Krtíši a okolí.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk" className="scroll-smooth">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
