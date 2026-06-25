import type { Metadata } from "next";
import { Inter, Bebas_Neue, Space_Grotesk } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { AudioToggle } from "@/components/site/audio-toggle";
import { Preloader } from "@/components/site/preloader";
import { StructuredData } from "@/components/site/structured-data";
import { siteConfig } from "@/lib/constants";

import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: [
    "The OldVerse",
    "production house",
    "creative studio",
    "short films",
    "cinematic reels",
    "web series",
    "music videos"
  ],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    url: siteConfig.siteUrl,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - ${siteConfig.tagline}`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/twitter-image"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${bebas.variable} ${spaceGrotesk.variable}`}>
        <SmoothScrollProvider>
          <StructuredData />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-cream focus:px-4 focus:py-2 focus:text-charcoal"
          >
            Skip to content
          </a>

          <Preloader />

          <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute left-[-10%] top-[8%] h-72 w-72 rounded-full bg-[#8b6f47]/10 blur-3xl" />
            <div className="absolute bottom-[-8%] right-[-5%] h-80 w-80 rounded-full bg-[#f5e6d3]/8 blur-3xl" />
          </div>

          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
            <AudioToggle />
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
