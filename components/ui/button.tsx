"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-cream text-charcoal shadow-glow hover:bg-white focus-visible:outline-charcoal/60",
  secondary:
    "border border-white/20 bg-white/8 text-cream backdrop-blur-md hover:border-white/30 hover:bg-white/12 focus-visible:outline-cream/40",
  ghost:
    "border border-transparent bg-transparent text-cream hover:border-white/10 hover:bg-white/5 focus-visible:outline-cream/40"
};

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
  external?: boolean;
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

function getButtonClasses(variant: ButtonVariant, className?: string) {
  return cn(
    "inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-medium tracking-[0.18em] uppercase transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    variantClasses[variant],
    className
  );
}

export function ButtonLink({
  href,
  children,
  className,
  variant = "primary",
  external = false
}: ButtonLinkProps) {
  const classes = getButtonClasses(variant, className);

  return (
    <motion.div whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.985 }} className="inline-flex">
      {external ? (
        <a href={href} target="_blank" rel="noreferrer" className={classes}>
          {children}
        </a>
      ) : (
        <Link href={href} className={classes}>
          {children}
        </Link>
      )}
    </motion.div>
  );
}

export function Button({
  children,
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <motion.div whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.985 }} className="inline-flex">
      <button type={type} className={getButtonClasses(variant, className)} {...props}>
        {children}
      </button>
    </motion.div>
  );
}
