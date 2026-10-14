import type { Metadata } from "next";
import { Press_Start_2P, Inter } from "next/font/google";
import "./globals.css";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-minecraft",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Atharva Kurle | Software Engineering Student",
  description:
    "Personal portfolio of Atharva Kurle, a first-year software engineering student from Mumbai, India. Built with Next.js, React, TypeScript, and a Minecraft-inspired UI.",
  keywords: [
    "Atharva Kurle",
    "Software Engineer",
    "Portfolio",
    "Mumbai",
    "Next.js",
    "TypeScript",
    "React",
    "Minecraft UI",
  ],
  authors: [{ name: "Atharva Kurle" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${pressStart2P.variable} ${inter.variable}`}>
      <body className="font-sans bg-[#121316] text-[#e4e4e7] antialiased selection:bg-[#ffff55] selection:text-black min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
