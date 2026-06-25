export const siteConfig = {
  name: "The OldVerse",
  tagline: "Every Story Deserves A Stage.",
  description:
    "The OldVerse is a platform where creators can share their vision with the world. We provide the tools, the community, and the audience to help stories grow beyond boundaries.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://theoldverse.vercel.app",
  email: "hello@theoldverse.com",
  phone: "+91 9068850966",
  instagram: "https://instagram.com/theoldverse_",
  instagramHandle: "@theoldverse_",
  youtube: "https://youtube.com/@theoldverse_07",
  youtubeHandle: "@theoldverse_07"
} as const;

export const navigationItems = [
  { href: "/home", label: "Home" },
  { href: "/creators", label: "Creators" },
  { href: "/categories", label: "Categories" },
  { href: "/community", label: "Community" },
  { href: "/studio", label: "Studio" }
] as const;
