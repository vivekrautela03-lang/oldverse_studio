"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

interface StoryChapter {
  chapter: string;
  title: string;
  body: string;
}

interface HeroSectionProps {
  storyData: StoryChapter[];
}

const FRAME_COUNT = 945;
const STEP = 3; // Load every 3rd frame for high performance
const LOAD_COUNT = Math.ceil(FRAME_COUNT / STEP); // 315 frames

export function HeroSection({ storyData }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Dispatch events to global preloader
  const dispatchLoaderState = (progress: number, statusText: string, isComplete: boolean) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("frame-loader-progress", {
          detail: { progress, statusText, isComplete }
        })
      );
    }
  };

  // Generate padded frame filename
  const getFramePath = (index: number) => {
    const originalFrameNum = Math.min(FRAME_COUNT - 1, index * STEP);
    const padded = originalFrameNum.toString().padStart(4, "0");
    return `/frames/frame_${padded}.jpg`;
  };

  // 1. Image Preloading Effect
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadCounter = 0;
    const INITIAL_PRELOAD_COUNT = Math.min(12, LOAD_COUNT);

    const safetyTimeout = setTimeout(() => {
      if (loadCounter < INITIAL_PRELOAD_COUNT) {
        console.warn("Initial frame preloader safety timeout triggered.");
        dispatchLoaderState(100, "Finalizing memory load...", true);
        setLoaded(true);
      }
    }, 8000);

    dispatchLoaderState(0, "Initializing visual stream...", false);

    // Progressive loading logic:
    // First, load initial critical frames (indices 0 to 11) to get the page showing instantly
    let initialLoaded = 0;
    for (let i = 0; i < INITIAL_PRELOAD_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      
      img.onload = () => {
        loadedImages[i] = img;
        loadCounter++;
        initialLoaded++;
        
        const percentage = (initialLoaded / INITIAL_PRELOAD_COUNT) * 100;
        let status = "Synchronizing memory...";
        if (percentage < 40) status = "Retrieving frame layers...";
        else if (percentage < 80) status = "Rebuilding spatial memory...";
        
        dispatchLoaderState(percentage * 0.8, status, false); // scaled down since it's initial load

        if (initialLoaded === INITIAL_PRELOAD_COUNT) {
          clearTimeout(safetyTimeout);
          setImages([...loadedImages]);
          setLoaded(true);
          dispatchLoaderState(100, "Synchronization complete", true);
          
          // Start background loading of all other frames in batches of 5 to avoid network congestion
          loadRemaining();
        }
      };

      img.onerror = () => {
        console.error(`Failed to load critical frame ${i}`);
        loadCounter++;
        initialLoaded++;
        if (initialLoaded === INITIAL_PRELOAD_COUNT) {
          clearTimeout(safetyTimeout);
          setImages([...loadedImages]);
          setLoaded(true);
          dispatchLoaderState(100, "Synchronization complete", true);
          loadRemaining();
        }
      };
    }

    const loadRemaining = async () => {
      const batchSize = 5;
      for (let i = INITIAL_PRELOAD_COUNT; i < LOAD_COUNT; i += batchSize) {
        const promises = [];
        for (let j = 0; j < batchSize && (i + j) < LOAD_COUNT; j++) {
          const idx = i + j;
          promises.push(new Promise<void>((resolve) => {
            const img = new Image();
            img.src = getFramePath(idx);
            img.onload = () => {
              loadedImages[idx] = img;
              loadCounter++;
              resolve();
            };
            img.onerror = () => {
              loadCounter++;
              resolve();
            };
          }));
        }
        await Promise.all(promises);
        // Periodically update the state so images render on scroll
        setImages([...loadedImages]);
      }
    };

    return () => {
      clearTimeout(safetyTimeout);
    };
  }, []);

  // 2. Responsive Canvas Sizing (fitting portrait screens completely and covering landscape screens)
  const drawImageProp = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, canvas: HTMLCanvasElement) => {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.width;
    const imgHeight = img.height;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Mobile / Portrait Mode: fit the complete screen width (contain) to prevent cropping
    if (canvasWidth < canvasHeight) {
      const scale = canvasWidth / imgWidth;
      const nw = canvasWidth;
      const nh = imgHeight * scale;
      const dy = (canvasHeight - nh) * 0.5; // Center vertically
      ctx.drawImage(img, 0, 0, imgWidth, imgHeight, 0, dy, nw, nh);
    } else {
      // Desktop / Landscape Mode: fill the container (cover)
      const r = Math.min(canvasWidth / imgWidth, canvasHeight / imgHeight);
      let nw = imgWidth * r;
      let nh = imgHeight * r;
      let ar = 1;

      if (nw < canvasWidth) ar = canvasWidth / nw;
      if (Math.abs(ar - 1) < 1e-14 && nh < canvasHeight) ar = canvasHeight / nh;
      
      nw *= ar;
      nh *= ar;

      const cw = imgWidth / (nw / canvasWidth);
      const ch = imgHeight / (nh / canvasHeight);

      const cx = (imgWidth - cw) * 0.5;
      const cy = (imgHeight - ch) * 0.5;

      ctx.drawImage(img, cx, cy, cw, ch, 0, 0, canvasWidth, canvasHeight);
    }
  };

  // 3. Canvas Resizing Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * pixelRatio;
      canvas.height = window.innerHeight * pixelRatio;
      
      let activeImg = images[currentFrame];
      if (!activeImg) {
        // Fallback to nearest loaded frame
        let prevIdx = currentFrame - 1;
        let nextIdx = currentFrame + 1;
        while (prevIdx >= 0 || nextIdx < LOAD_COUNT) {
          if (prevIdx >= 0 && images[prevIdx]) {
            activeImg = images[prevIdx];
            break;
          }
          if (nextIdx < LOAD_COUNT && images[nextIdx]) {
            activeImg = images[nextIdx];
            break;
          }
          prevIdx--;
          nextIdx++;
        }
      }
      if (activeImg) {
        drawImageProp(ctx, activeImg, canvas);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial sizing

    return () => window.removeEventListener("resize", handleResize);
  }, [images, currentFrame]);

  // 4. GSAP Scroll Trigger Mapping
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || images.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        setScrollProgress(progress);
        
        const frameIndex = Math.min(LOAD_COUNT - 1, Math.floor(progress * LOAD_COUNT));
        setCurrentFrame(frameIndex);

        let img = images[frameIndex];
        if (!img) {
          // Fallback to nearest loaded frame
          let prevIdx = frameIndex - 1;
          let nextIdx = frameIndex + 1;
          while (prevIdx >= 0 || nextIdx < LOAD_COUNT) {
            if (prevIdx >= 0 && images[prevIdx]) {
              img = images[prevIdx];
              break;
            }
            if (nextIdx < LOAD_COUNT && images[nextIdx]) {
              img = images[nextIdx];
              break;
            }
            prevIdx--;
            nextIdx++;
          }
        }
        if (img) {
          drawImageProp(ctx, img, canvas);
        }
      }
    });

    return () => trigger.kill();
  }, [images]);

  // 5. Scrubber Scroll Dispatcher
  const handleScrubberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetFrame = parseInt(e.target.value);
    const progress = targetFrame / (LOAD_COUNT - 1);
    
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: progress * maxScroll,
      behavior: "auto"
    });
  };

  const handleReplayClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // 6. Section Progress Checks using the original frame index (0 to 944)
  const originalFrame = currentFrame * STEP;

  // Hero text overlay: starts after frame 30, fades out by frame 160
  const isHeroActive = originalFrame >= 30 && originalFrame <= 160;
  
  let heroOpacity = 0;
  if (originalFrame >= 30 && originalFrame <= 60) {
    // Smooth fade in (frames 30 to 60)
    heroOpacity = (originalFrame - 30) / 30;
  } else if (originalFrame > 60 && originalFrame < 130) {
    // Fully visible (frames 60 to 130)
    heroOpacity = 1;
  } else if (originalFrame >= 130 && originalFrame <= 160) {
    // Smooth fade out (frames 130 to 160)
    heroOpacity = (160 - originalFrame) / 30;
  }

  // Chapters frame ranges (starting after the hero sections ends at 160, running up to 880)
  const getChapterIntervals = () => {
    const chaptersCount = storyData.length;
    const start = 180;
    const end = 880;
    const intervalSize = (end - start) / chaptersCount;
    return storyData.map((_, index) => {
      const chStart = start + index * intervalSize;
      return { start: chStart, end: chStart + intervalSize };
    });
  };

  const intervals = getChapterIntervals();
  
  // Outro Memorandum starts after frame 900
  const isMemorandumActive = originalFrame >= 900 && originalFrame <= 944;

  return (
    <div ref={containerRef} className="relative w-full h-[650vh] bg-[#0a0807]">
      {/* Sticky Viewport Wrapper */}
      <div ref={stickyRef} className="sticky top-0 left-0 w-full h-[100svh] overflow-hidden">
        {/* Canvas Render Layer */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />
        
        {/* Visual Vignette & Scanlines filters */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(10,8,7,0.72)_82%,rgba(10,8,7,0.92)_100%)] pointer-events-none z-10" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.12)_50%)] bg-[size:100%_4px] opacity-50 pointer-events-none z-10" />

        {/* Content Overlays */}
        <div className="relative z-20 w-full h-full flex items-end">
          
          {/* SECTION A: Hero Card Overlay */}
          {isHeroActive && (
            <div 
              className="absolute inset-0 flex items-center justify-start pb-12 pt-32 transition-opacity duration-300 pointer-events-auto"
              style={{ opacity: heroOpacity }}
            >
              <Container>
                <div className="max-w-4xl">
                  <p className="mb-5 inline-flex rounded-full border border-white/12 bg-[rgba(255,255,255,0.06)] px-4 py-2 text-[0.72rem] uppercase tracking-[0.35em] text-[#f5e6d3]/85 backdrop-blur-md">
                    Production House • Creative Studio
                  </p>

                  <h1 className="max-w-3xl font-display text-5xl leading-[0.94] text-[#f5e6d3] sm:text-6xl lg:text-[6.3rem]">
                    Stories Beyond The Screen
                  </h1>

                  <p className="mt-6 max-w-2xl text-base leading-8 text-[#f5e6d3]/80 sm:text-lg font-light">
                    We create films, stories, and visual experiences that connect with people through emotion,
                    creativity, and cinematic storytelling.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <ButtonLink href="https://instagram.com/theoldverse_" external>
                      Watch Films
                    </ButtonLink>
                    <ButtonLink href="/home#what-we-do" variant="secondary">
                      Explore The OldVerse
                    </ButtonLink>
                  </div>

                  <div className="mt-16 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-[#f5e6d3]/55">
                    <span className="h-px w-12 bg-cream/35" />
                    Scroll for the story
                  </div>
                </div>
              </Container>
            </div>
          )}

          {/* SECTION B: Dynamic Chapters Overlay */}
          {storyData.map((item, index) => {
            const range = intervals[index];
            const isActive = originalFrame >= range.start && originalFrame <= range.end;
            const isAlternate = index % 2 !== 0;

            return (
              isActive && (
                <div 
                  key={index}
                  className={`absolute inset-x-0 bottom-[18vh] flex px-[8%] transition-all duration-700 ${
                    isAlternate ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className="bg-[rgba(13,13,16,0.52)] border border-white/10 rounded-2xl p-8 sm:p-10 max-w-[480px] w-full backdrop-blur-2xl shadow-panel animate-[fadeInUp_0.6s_ease-out_forwards]">
                    <span className="font-serif text-sm font-semibold text-[#e0a96d] tracking-[0.2em] block mb-4">
                      {item.chapter || (index + 1)}
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#f5e6d3] mb-4 tracking-wide leading-tight">
                      {item.title}
                    </h2>
                    <p className="text-sm sm:text-base leading-relaxed text-[#f5e6d3]/70 font-light">
                      {item.body}
                    </p>
                  </div>
                </div>
              )
            );
          })}

          {/* SECTION C: Outro Stamp Card Overlay */}
          {isMemorandumActive && (
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="bg-[rgba(10,10,12,0.8)] border border-white/10 rounded-2xl p-10 sm:p-12 max-w-[500px] w-full text-center backdrop-blur-2xl shadow-[0_15px_50px_rgba(0,0,0,0.6)] animate-[scaleInUp_0.8s_ease-out_forwards]">
                <h3 className="text-xs tracking-[0.4em] text-[#f5e6d3]/50 font-medium mb-6 uppercase">
                  MEMORANDUM
                </h3>
                <h1 className="font-serif text-5xl sm:text-6xl font-light text-[#e0a96d] tracking-[0.1em] mb-6 drop-shadow-[0_0_12px_rgba(224,169,109,0.3)]">
                  04.07.25
                </h1>
                <p className="text-sm sm:text-base text-[#f5e6d3]/70 font-light mb-10">
                  The day we met. Forever recorded.
                </p>
                <button 
                  onClick={handleReplayClick}
                  className="inline-flex items-center gap-3 border border-[#e0a96d] text-[#e0a96d] px-8 py-3 rounded-full text-xs uppercase tracking-widest hover:bg-[#e0a96d] hover:text-charcoal transition-all duration-300 font-semibold shadow-md"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Relive Memory
                </button>
              </div>
            </div>
          )}

          {/* SECTION D: Floating Navigation Bar (Scrubber) */}
          {loaded && (
            <nav className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-[700px] bg-[rgba(18,18,22,0.65)] border border-white/10 rounded-full py-3 px-6 backdrop-blur-xl shadow-panel transition-all duration-500 animate-[fadeInNavbar_0.8s_ease-out_forwards] z-30">
              <div className="flex items-center justify-between gap-6">
                
                {/* Timeline Scrubber */}
                <div className="flex items-center gap-4 flex-grow">
                  <span className="text-[0.65rem] font-bold text-[#f5e6d3]/60 tracking-wider">
                    {Math.min(945, currentFrame * STEP + 1).toString().padStart(3, "0")}
                  </span>
                  
                  <div className="relative flex-grow h-4 flex items-center">
                    <input 
                      type="range" 
                      min="0" 
                      max={LOAD_COUNT - 1} 
                      value={currentFrame} 
                      onChange={handleScrubberInput}
                      className="w-full h-[3px] bg-white/10 rounded-full appearance-none cursor-pointer outline-none slider-thumb-gold z-10"
                    />
                    <div 
                      className="absolute left-0 top-[6.5px] h-[3px] bg-[#e0a96d] shadow-[0_0_8px_rgba(224,169,109,0.5)] rounded-full pointer-events-none"
                      style={{ width: `${(currentFrame / (LOAD_COUNT - 1)) * 100}%` }}
                    />
                  </div>

                  <span className="text-[0.65rem] font-bold text-[#f5e6d3]/60 tracking-wider">
                    945
                  </span>
                </div>

                {/* Status Indicator */}
                <div className="border-l border-white/10 pl-5 flex items-center hidden sm:flex">
                  <span className="text-[0.65rem] font-medium text-[#e0a96d] tracking-[0.15em] whitespace-nowrap">
                    SCROLL INTERACTIVE
                  </span>
                </div>

              </div>
            </nav>
          )}

          {/* SECTION E: Vertical Progress Trail on Right edge */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 w-[1px] h-[120px] bg-white/8 rounded-full pointer-events-none hidden sm:block z-30">
            <div 
              className="w-full bg-[#e0a96d] shadow-[0_0_8px_rgba(224,169,109,0.5)] rounded-full transition-all duration-75"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
