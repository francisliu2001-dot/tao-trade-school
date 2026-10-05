import type { MetadataRoute } from "next";
import { steps, topics, notes } from "@/lib/content";

const baseUrl = "https://tao-trade-school.pages.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: `${baseUrl}`, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/learn`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/topics`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/notes`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/search`, priority: 0.6, changeFrequency: "yearly" as const },
    { url: `${baseUrl}/glossary`, priority: 0.7, changeFrequency: "monthly" as const },
  ];

  const stepPages = steps.map((s) => ({
    url: `${baseUrl}/learn/${s.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  const topicPages = topics.map((t) => ({
    url: `${baseUrl}/topics/${t.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  const notePages = notes.map((n) => ({
    url: `${baseUrl}/notes/${n.slug}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  }));

  return [...staticPages, ...stepPages, ...topicPages, ...notePages];
}
