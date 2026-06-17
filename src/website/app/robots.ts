import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://thegarmentconcierge.co.uk/sitemap.xml",
    host: "https://thegarmentconcierge.co.uk",
  };
}
