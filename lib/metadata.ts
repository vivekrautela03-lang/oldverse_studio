import type { Metadata } from "next";

import { siteConfig } from "@/lib/constants";

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
};

export function createMetadata({
  title,
  description,
  path = "/"
}: MetadataInput): Metadata {
  const shareTitle = title === siteConfig.name ? title : `${title} | ${siteConfig.name}`;
  const url = `${siteConfig.siteUrl}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: path
    },
    openGraph: {
      title: shareTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: "en_IN",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description
    }
  };
}
