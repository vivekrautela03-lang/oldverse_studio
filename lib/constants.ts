export const siteConfig = {
  name: "The OldVerse",
  tagline: "Stories Beyond The Screen",
  description:
    "The OldVerse is a production house and creative studio creating films, cinematic reels, web series, and music videos that people can genuinely connect with.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://theoldverse.vercel.app",
  email: "theoldverse@gmail.com",
  phone: "+91 9068850966",
  instagram: "https://instagram.com/theoldverse_",
  instagramHandle: "@theoldverse_",
  youtube: "https://youtube.com/@theoldverse_07",
  youtubeHandle: "@theoldverse_07"
} as const;

export const navigationItems = [
  { href: "/home", label: "Home" },
  { href: "/films", label: "Films" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" }
] as const;
