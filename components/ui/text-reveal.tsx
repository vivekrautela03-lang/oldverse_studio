"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

type TextRevealProps = {
  text: string;
  className?: string;
  delay?: number;
};

export function TextReveal({ text, className, delay = 0 }: TextRevealProps) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  if (reduceMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={cn("inline-block", className)} aria-label={text}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        className="inline-block"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.8 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.08,
              delayChildren: delay
            }
          }
        }}
      >
        {words.map((word, index) => (
          <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
            <motion.span
              className="inline-block pr-[0.3em]"
              variants={{
                hidden: { y: "115%", opacity: 0 },
                visible: {
                  y: "0%",
                  opacity: 1,
                  transition: {
                    duration: 0.85,
                    ease: [0.16, 1, 0.3, 1]
                  }
                }
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </span>
  );
}
