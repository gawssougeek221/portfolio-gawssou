import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gawssou Thiam – Expert IA & Community Manager | Keur Massar, Dakar",
  description: "Solutions digitales innovantes pour booster les entreprises et entrepreneurs sénégalais. Visuels IA, sites web futuristes, automatisations business, branding IA. Basé à Keur Massar, Dakar, Sénégal.",
  keywords: ["Gawssou Thiam", "IA", "Intelligence Artificielle", "Community Manager", "Sénégal", "Dakar", "Keur Massar", "Digital", "Web Design", "Automatisation", "Branding", "KEUR'GEEK"],
  authors: [{ name: "Gawssou Thiam" }],
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Gawssou Thiam – Expert IA & Community Manager",
    description: "Solutions digitales innovantes pour booster les entreprises et entrepreneurs sénégalais",
    url: "https://gawssou.thiam",
    siteName: "Gawssou Thiam Portfolio",
    type: "website",
    images: ["/logo-gawssou.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gawssou Thiam – Expert IA & Community Manager",
    description: "Solutions digitales innovantes pour booster les entreprises et entrepreneurs sénégalais",
    images: ["/logo-gawssou.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
