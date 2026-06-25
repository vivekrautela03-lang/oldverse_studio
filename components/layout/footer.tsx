"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Container } from "@/components/ui/container";
import { navigationItems, siteConfig } from "@/lib/constants";

export function Footer() {
  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-[rgba(10,8,7,0.68)] py-10">
      <Container className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr_0.9fr]">
        <div>
          <p className="font-bebas text-4xl tracking-wider text-cream">{siteConfig.name}</p>
          <p className="mt-3 max-w-md text-sm leading-7 text-cream/70">
            {siteConfig.description}
          </p>
        </div>

        <div>
          <p className="mb-4 font-space text-xs uppercase tracking-[0.35em] text-cream/55">Navigation</p>
          <nav className="flex flex-col gap-3 font-space">
            {navigationItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-cream/75 transition-colors hover:text-cream">
                {item.label}
              </Link>
            ))}
            <Link href="/casting" className="text-sm text-cream/75 transition-colors hover:text-cream">
              Casting Calls
            </Link>
            <Link href="/search" className="text-sm text-cream/75 transition-colors hover:text-cream">
              Search
            </Link>
          </nav>
        </div>

        <div>
          <p className="mb-4 font-space text-xs uppercase tracking-[0.35em] text-cream/55">Connect</p>
          <div className="space-y-3 text-sm text-cream/75">
            <p>
              <a href={siteConfig.instagram} target="_blank" rel="noreferrer" className="transition-colors hover:text-cream">
                Instagram: {siteConfig.instagramHandle}
              </a>
            </p>
            <p>
              <a href={siteConfig.youtube} target="_blank" rel="noreferrer" className="transition-colors hover:text-cream">
                YouTube: {siteConfig.youtubeHandle}
              </a>
            </p>
            <p>
              <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-cream">
                Email: {siteConfig.email}
              </a>
            </p>
          </div>
        </div>
      </Container>

      <Container className="mt-10 border-t border-white/10 pt-6">
        <p className="text-sm text-cream/50">© 2026 The OldVerse. All Rights Reserved.</p>
      </Container>
    </footer>
  );
}
