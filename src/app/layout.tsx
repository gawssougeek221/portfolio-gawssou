import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gawssou Thiam | Informaticien & Entrepreneur Numérique",
  description: "Portfolio de Gawssou Thiam – Informaticien & Entrepreneur Numérique (Keur'Geek Digital). IA, Développement Web, Automatisation et Formation en Informatique à Dakar, Sénégal.",
  keywords: [
    "Gawssou Thiam",
    "Informaticien",
    "Formateur Informatique",
    "Entrepreneur Numérique",
    "Keur'Geek Digital",
    "Dakar",
    "Sénégal",
    "Développement Web",
    "Intelligence Artificielle",
    "Automatisation n8n",
    "Sama Agent",
    "Stockplus",
    "Stafflow",
    "DocuAI"
  ],
  authors: [{ name: "Gawssou Thiam" }],
  openGraph: {
    title: "Gawssou Thiam | Informaticien & Entrepreneur Numérique",
    description: "Informaticien & Entrepreneur Numérique | IA, Développement Web & Automatisation. Fondateur de Keur'Geek Digital.",
    url: "https://portfolio-gawssou.vercel.app",
    siteName: "Portfolio Gawssou Thiam",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark scroll-smooth">
      <head>
        <Script
          src="https://unpkg.com/@splinetool/viewer@1.9.72/build/spline-viewer.js"
          type="module"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white selection:bg-purple-500 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}


