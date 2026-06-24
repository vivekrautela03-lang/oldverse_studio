"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function Preloader() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wordmarkRef = useRef<HTMLDivElement | null>(null);
  const taglineRef = useRef<HTMLParagraphElement | null>(null);
  const progressWrapperRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(true);

  // Frame preloader progress states
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Initializing...");
  const [isComplete, setIsComplete] = useState(false);
  const [isControlled, setIsControlled] = useState(false);

  const animTriggered = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const wordmark = wordmarkRef.current;
    const tagline = taglineRef.current;
    const progressWrapper = progressWrapperRef.current;

    if (!container || !wordmark || !tagline || !progressWrapper) {
      return;
    }

    document.body.style.overflow = "hidden";

    // Intro Animation
    const introTimeline = gsap.timeline({
      defaults: { ease: "power3.out" }
    });

    introTimeline
      .fromTo(wordmark, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
      .fromTo(tagline, { y: 12, opacity: 0 }, { y: 0, opacity: 0.6, duration: 0.6 }, "-=0.4")
      .fromTo(progressWrapper, { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.3");

    // Standard Exit Timeline (Fallback if not controlled by frame loader)
    const fallbackTimeout = setTimeout(() => {
      if (!isControlled && !animTriggered.current) {
        animTriggered.current = true;
        gsap.to(container, {
          yPercent: -100,
          duration: 1.0,
          ease: "power4.inOut",
          onComplete: () => {
            document.body.style.overflow = "";
            setVisible(false);
          }
        });
      }
    }, 2000); // Wait 2 seconds for typical static loads before sliding up

    // Progress updates from the React Frame preloader
    const handleProgress = (e: Event) => {
      const customEvent = e as CustomEvent;
      setIsControlled(true);
      
      const { progress: p, statusText: s, isComplete: c } = customEvent.detail;
      if (p !== undefined) setProgress(p);
      if (s !== undefined) setStatusText(s);
      if (c !== undefined) setIsComplete(c);
    };

    window.addEventListener("frame-loader-progress", handleProgress);

    return () => {
      introTimeline.kill();
      clearTimeout(fallbackTimeout);
      window.removeEventListener("frame-loader-progress", handleProgress);
      document.body.style.overflow = "";
    };
  }, [isControlled]);

  // Watch for isComplete to trigger slide-up exit transition
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isComplete || animTriggered.current) return;
    
    animTriggered.current = true;

    gsap.to(container, {
      yPercent: -100,
      duration: 1.0,
      ease: "power4.inOut",
      onComplete: () => {
        document.body.style.overflow = "";
        setVisible(false);
      }
    });
  }, [isComplete]);

  if (!visible) {
    return null;
  }

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0807]">
      <div className="flex w-[90%] max-w-[400px] flex-col items-center text-center">
        <div className="font-serif text-sm tracking-[0.4em] text-cream/70 mb-2 uppercase">
          Memory Registry
        </div>

        <div ref={wordmarkRef} className="font-display text-4xl text-cream sm:text-5xl tracking-wide">
          The OldVerse
        </div>
        
        <p ref={taglineRef} className="mt-3 text-[0.65rem] uppercase tracking-[0.35em] text-cream/45 sm:text-xs">
          Stories Beyond The Screen
        </p>

        {/* Loading Progress display */}
        <div 
          ref={progressWrapperRef} 
          className="mt-12 w-full transition-opacity duration-300"
          style={{ opacity: isControlled ? 1 : 0 }}
        >
          <div className="relative h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-transparent via-[#e0a96d] to-[#e0a96d] shadow-[0_0_8px_rgba(224,169,109,0.5)] transition-[width] duration-150 ease-out" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-4 flex items-center justify-between text-[0.7rem] tracking-wider text-cream/40 uppercase">
            <span>{statusText}</span>
            <span className="font-medium text-cream/70">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
