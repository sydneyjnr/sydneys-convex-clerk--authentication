import "./globals.css";
import type { Metadata } from "next";
import { Inter, Domine } from "next/font/google";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import LenisScroll from "@/components/lenis";

// Landing page fonts
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const domine = Domine({
  variable: "--font-domine",
  subsets: ["latin"],
});

// App fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://prompt2app.prebuiltui.com"),
  title: {
    default: "Build custom apps with AI - PrebuiltUI",
    template: "%s | Prompt2App - PrebuiltUI",
  },
  description:
    "Turn your ideas into production-ready web apps using AI. No code, no design skills needed — just describe what you want and launch instantly.",
  keywords: [
    "AI app builder",
    "no code app builder",
    "build apps with AI",
    "SaaS landing page",
    "AI website generator",
    "AI startup builder",
  ],
  icons: {
    icon: "/convex.svg",
  },
  appleWebApp: {
    title: "Prompt2App",
  },
  openGraph: {
    title: "Build custom apps with AI",
    description:
      "Create custom web apps by describing your idea in plain English. Launch faster with an AI-powered no-code builder.",
    url: "https://prompt2app.prebuiltui.com",
    siteName: "Prompt2App",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${inter.variable}
          ${domine.variable}
          ${geistSans.variable}
          ${geistMono.variable}
          antialiased
        `}
      >
        <ClerkProvider dynamic>
          <ConvexClientProvider>
            <LenisScroll />
            {children}
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
