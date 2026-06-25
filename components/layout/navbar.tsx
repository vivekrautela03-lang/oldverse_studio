"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Container } from "@/components/ui/container";
import { navigationItems, siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

// Custom Film Reel Logo SVG
const LogoIcon = ({ className }: { className?: string }) => (
  <svg className={cn("h-7 w-7 text-brand-gold", className)} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="7" />
    <circle cx="50" cy="50" r="22" stroke="currentColor" strokeWidth="4" />
    <path d="M50 38 L55 50 L50 62 L45 50 Z" fill="currentColor" />
    <circle cx="50" cy="22" r="4" fill="currentColor" />
    <circle cx="70" cy="30" r="4" fill="currentColor" />
    <circle cx="78" cy="50" r="4" fill="currentColor" />
    <circle cx="70" cy="70" r="4" fill="currentColor" />
    <circle cx="50" cy="78" r="4" fill="currentColor" />
    <circle cx="30" cy="70" r="4" fill="currentColor" />
    <circle cx="22" cy="50" r="4" fill="currentColor" />
    <circle cx="30" cy="30" r="4" fill="currentColor" />
  </svg>
);

const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const BellIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div
        className={cn(
          "border-b border-transparent py-4 transition-all duration-300",
          scrolled || menuOpen
            ? "border-brand-slate bg-brand-black/80 shadow-panel backdrop-blur-2xl"
            : "bg-gradient-to-b from-brand-black/60 to-transparent backdrop-blur-sm"
        )}
      >
        <Container className="flex items-center justify-between gap-4">
          {/* Logo Section */}
          <Link href="/home" className="group flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-brand-graphite/40 transition-transform duration-300 group-hover:scale-105">
              <LogoIcon />
            </div>
            <div>
              <p className="font-bebas text-2xl tracking-wider text-brand-ivory leading-none">{siteConfig.name}</p>
              <p className="text-[0.55rem] font-space uppercase tracking-[0.25em] text-brand-gold mt-1">
                {siteConfig.tagline}
              </p>
            </div>
          </Link>

          {/* Navigation Links - Centered */}
          <nav className="hidden items-center gap-1 md:flex">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative font-space rounded-full px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300",
                    isActive ? "text-brand-gold" : "text-brand-ivory/70 hover:text-brand-ivory"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavLine"
                      className="absolute bottom-0 inset-x-4 h-[2px] bg-brand-gold rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Section: Search, Notification, Profile */}
          <div className="hidden items-center gap-4 md:flex">
            <Link
              href="/search"
              aria-label="Search"
              className="flex h-10 w-10 items-center justify-center rounded-full text-brand-ivory/70 hover:bg-white/5 hover:text-brand-ivory transition-all"
            >
              <SearchIcon className="h-5 w-5" />
            </Link>
            
            <button
              aria-label="Notifications"
              className="flex h-10 w-10 items-center justify-center rounded-full text-brand-ivory/70 hover:bg-white/5 hover:text-brand-ivory transition-all"
            >
              <BellIcon className="h-5 w-5" />
            </button>

            {/* Profile Avatar */}
            <Link href="/creators" className="group flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-brand-gold/30 hover:border-brand-gold transition-all duration-300">
              <div className="h-full w-full bg-brand-gold/20 flex items-center justify-center text-xs font-semibold text-brand-gold">
                VR
              </div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-brand-graphite/40 text-brand-ivory md:hidden"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
          >
            <span className="relative block h-4 w-5">
              <span
                className={cn(
                  "absolute left-0 top-0.5 h-px w-full bg-current transition-transform duration-300",
                  menuOpen && "translate-y-[6px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-[7px] h-px w-full bg-current transition-opacity duration-300",
                  menuOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0.5 left-0 h-px w-full bg-current transition-transform duration-300",
                  menuOpen && "-translate-y-[6px] -rotate-45"
                )}
              />
            </span>
          </button>
        </Container>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence initial={false}>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="border-b border-brand-slate bg-brand-black overflow-hidden md:hidden shadow-xl"
          >
            <nav className="flex flex-col gap-1 px-6 pb-6 pt-2">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "font-space rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                      isActive ? "bg-brand-gold/10 text-brand-gold" : "text-brand-ivory/70 hover:bg-white/5 hover:text-brand-ivory"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              
              <div className="mt-4 flex items-center justify-between border-t border-brand-slate pt-4 px-4">
                <div className="flex gap-4 items-center">
                  <Link href="/search" aria-label="Search">
                    <SearchIcon className="h-5 w-5 text-brand-ivory/60 hover:text-brand-ivory" />
                  </Link>
                  <BellIcon className="h-5 w-5 text-brand-ivory/60" />
                </div>
                <Link href="/creators" className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-gold/20 text-xs font-semibold text-brand-gold border border-brand-gold/30">
                  VR
                </Link>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
