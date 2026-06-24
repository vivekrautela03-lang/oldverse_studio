"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { navigationItems, siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <Container className="pt-4">
        <div
          className={cn(
            "rounded-full border px-4 py-3 transition-all duration-300 md:px-6",
            scrolled || menuOpen
              ? "border-white/12 bg-[rgba(15,11,10,0.72)] shadow-panel backdrop-blur-2xl"
              : "border-white/8 bg-[rgba(15,11,10,0.32)] backdrop-blur-md"
          )}
        >
          <div className="flex items-center justify-between gap-4">
            <Link href="/home" className="group flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-semibold tracking-[0.25em] text-cream transition-transform duration-300 group-hover:scale-105">
                OV
              </div>
              <div className="min-w-0">
                <p className="truncate font-display text-2xl leading-none text-cream">{siteConfig.name}</p>
                <p className="truncate text-[0.65rem] uppercase tracking-[0.32em] text-cream/55">
                  {siteConfig.tagline}
                </p>
              </div>
            </Link>

            <nav className="hidden items-center gap-2 md:flex">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm transition-colors duration-300",
                      isActive ? "bg-white/10 text-cream" : "text-cream/70 hover:text-cream"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden md:block">
              <ButtonLink href="/contact" variant="secondary">
                Start a Project
              </ButtonLink>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-cream md:hidden"
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
          </div>

          <AnimatePresence initial={false}>
            {menuOpen ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden md:hidden"
              >
                <nav className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4">
                  {navigationItems.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "rounded-2xl px-4 py-3 text-sm transition-colors",
                          isActive ? "bg-white/10 text-cream" : "text-cream/70 hover:bg-white/5 hover:text-cream"
                        )}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                  <ButtonLink href="/contact" variant="secondary" className="mt-2 w-full justify-center">
                    Start a Project
                  </ButtonLink>
                </nav>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </Container>
    </header>
  );
}
