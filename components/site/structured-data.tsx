import { siteConfig } from "@/lib/constants";

export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    email: siteConfig.email,
    sameAs: [siteConfig.instagram, siteConfig.youtube],
    foundingDate: "2026",
    slogan: siteConfig.tagline
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data)
      }}
    />
  );
}
