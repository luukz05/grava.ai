import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GRAVA.AI — Transformando ideias em produtos personalizados",
  description:
    "Personalização de produtos com Inteligência Artificial em totens automatizados. Conheça a GRAVA.AI e seja um franqueado.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Aviso global de protótipo */}
        <p className="bg-surface px-4 py-1.5 text-center text-[11px] text-muted">
          🧩 Wireframe de baixa-média fidelidade — estrutura e hierarquia.
        </p>
        <Navbar />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
