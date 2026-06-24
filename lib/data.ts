import { siteConfig } from "@/lib/constants";

export const service = {
  title: "Film Production",
  description:
    "We bring stories to life through short films, cinematic reels, web series, and music videos."
};

export const filmCategories = [
  {
    title: "Short Films",
    hook: "Intimate narratives shaped for an emotional aftertaste.",
    accent: "from-[#b98c64]/75 via-[#4a382d]/65 to-[#17110d]",
    badge: "Character-led"
  },
  {
    title: "Cinematic Reels",
    hook: "Fast, immersive visuals built to leave a premium impression.",
    accent: "from-[#d4a06b]/70 via-[#52351f]/70 to-[#15110f]",
    badge: "High-impact"
  },
  {
    title: "Web Series",
    hook: "Longer arcs designed for story worlds that keep unfolding.",
    accent: "from-[#866b52]/80 via-[#2d221b]/75 to-[#100d0b]",
    badge: "Episodic"
  },
  {
    title: "Music Videos",
    hook: "Rhythm-led imagery with texture, movement, and identity.",
    accent: "from-[#b46e42]/75 via-[#462719]/70 to-[#120e0d]",
    badge: "Mood-driven"
  }
] as const;

export const filmRows = [
  {
    title: "Short Films",
    description: "Stories where silence, detail, and emotion carry the frame.",
    items: [
      { title: "Afterglow", note: "An intimate character study.", accent: "from-[#b98c64]/75 via-[#4a382d]/65 to-[#17110d]" },
      { title: "Between Frames", note: "Quiet tension, cinematic pacing.", accent: "from-[#8f7559]/80 via-[#3b2a1f]/65 to-[#120e0d]" },
      { title: "The Last Light", note: "A film built on memory and warmth.", accent: "from-[#d4a06b]/75 via-[#6a4731]/65 to-[#1a1512]" }
    ]
  },
  {
    title: "Cinematic Reels",
    description: "Premium short-form visuals cut with movement and texture.",
    items: [
      { title: "Velvet Motion", note: "Editorial energy for modern brands.", accent: "from-[#d4a06b]/80 via-[#52351f]/70 to-[#15110f]" },
      { title: "Night Cut", note: "Punchy framing and rich atmosphere.", accent: "from-[#9b7656]/80 via-[#3d261a]/70 to-[#120f0d]" },
      { title: "Monarch", note: "A reel shaped like a trailer moment.", accent: "from-[#b4845a]/70 via-[#5c341e]/65 to-[#140f0d]" }
    ]
  },
  {
    title: "Web Series",
    description: "Character worlds designed to unfold episode by episode.",
    items: [
      { title: "Parallel Roads", note: "An evolving city story.", accent: "from-[#866b52]/80 via-[#2d221b]/75 to-[#100d0b]" },
      { title: "Still Burning", note: "Relationship drama with cinematic weight.", accent: "from-[#705744]/80 via-[#251d18]/75 to-[#0f0c0a]" },
      { title: "Signals", note: "Tension built through mood and rhythm.", accent: "from-[#a27b60]/75 via-[#382920]/70 to-[#120f0d]" }
    ]
  },
  {
    title: "Music Videos",
    description: "Performance, narrative, and visual identity in one frame.",
    items: [
      { title: "Echo Bloom", note: "A lyrical mood piece.", accent: "from-[#b46e42]/75 via-[#462719]/70 to-[#120e0d]" },
      { title: "Static Heart", note: "Performance-led with bold pacing.", accent: "from-[#9e613d]/80 via-[#3b2216]/70 to-[#120e0d]" },
      { title: "Golden Noise", note: "Texture-heavy, rhythm-first imagery.", accent: "from-[#d1935f]/75 via-[#61361f]/70 to-[#140e0c]" }
    ]
  }
] as const;

export const timeline = [
  {
    year: "The Belief",
    title: "Stories should feel personal",
    description:
      "The OldVerse began with one shared belief: stories are strongest when they create genuine human connection rather than just visual spectacle."
  },
  {
    year: "The Beginning",
    title: "Founded by Vivek Rautela and Shivanshi",
    description:
      "Built as a production house and creative studio, The OldVerse was created to shape meaningful films and visual experiences with emotional depth."
  },
  {
    year: "The Direction",
    title: "A cinematic universe in motion",
    description:
      "Today, the studio focuses on short films, cinematic reels, web series, and music videos that feel warm, polished, and memorable long after the screen fades."
  }
] as const;

export const founders = [
  {
    name: "Vivek Rautela",
    roles: ["Founder", "Writer", "Director", "Cinematographer"],
    description:
      "Vivek shapes the emotional grammar of The OldVerse through writing, visual direction, and image-making rooted in story-first cinematography.",
    initials: "VR",
    accent: "from-[#d0a176]/75 via-[#5b3e2c]/70 to-[#16110f]"
  },
  {
    name: "Shivanshi",
    roles: ["Co-Founder", "Director", "Producer", "Creative Lead", "Editor"],
    description:
      "Shivanshi brings structure, tone, and momentum to each project, bridging creative vision with polished execution across the full production flow.",
    initials: "S",
    accent: "from-[#c69069]/75 via-[#503428]/70 to-[#14100e]"
  }
] as const;

export const galleryItems = [
  { title: "Scene One", size: "h-72", accent: "from-[#3b2a1f] via-[#a97852] to-[#1a1512]" },
  { title: "Warm Cut", size: "h-96", accent: "from-[#201814] via-[#7b5b45] to-[#17110d]" },
  { title: "Frame Study", size: "h-80", accent: "from-[#4c3426] via-[#ba8c65] to-[#1c1512]" },
  { title: "Stillness", size: "h-64", accent: "from-[#2a1f19] via-[#8c6d57] to-[#100d0b]" },
  { title: "Night Texture", size: "h-[26rem]", accent: "from-[#1b1512] via-[#654936] to-[#221813]" },
  { title: "Cinematic Grain", size: "h-72", accent: "from-[#5f4431] via-[#c79a6f] to-[#18120f]" },
  { title: "Motion Study", size: "h-96", accent: "from-[#2e211a] via-[#946f53] to-[#130f0d]" },
  { title: "Golden Shadows", size: "h-80", accent: "from-[#4a3427] via-[#b8875d] to-[#18110e]" }
] as const;

export const contactMethods = [
  {
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    description: "For scripts, collaborations, and production briefs."
  },
  {
    label: "WhatsApp",
    value: siteConfig.phone,
    href: `https://wa.me/${siteConfig.phone.replace(/\D/g, "")}`,
    description: "For quick conversations and real-time project discussions."
  },
  {
    label: "Instagram",
    value: siteConfig.instagramHandle,
    href: siteConfig.instagram,
    description: "See the latest mood, reels, and behind-the-scenes moments."
  }
] as const;

export const projectTypes = [
  "Short Film",
  "Cinematic Reel",
  "Web Series",
  "Music Video",
  "Brand Story",
  "Creative Collaboration"
] as const;

export const budgetOptions = [
  "Below ₹25K",
  "₹25K - ₹50K",
  "₹50K - ₹1L",
  "₹1L - ₹3L",
  "Above ₹3L"
] as const;
