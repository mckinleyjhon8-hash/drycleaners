import type { MetadataRoute } from "next";

const base = "https://thegarmentconcierge.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${base}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/book`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/cookies`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
