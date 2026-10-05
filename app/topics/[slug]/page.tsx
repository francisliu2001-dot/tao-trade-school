import { TopicPage } from "@/components/learning-ui";
import { topicBySlug, topics } from "@/lib/content";
import { notFound } from "next/navigation";
export function generateStaticParams(){ return topics.map(t=>({slug:t.slug})) }
export default async function Page({params}:{params:Promise<{slug:string}>}){ const {slug}=await params; const topic=topicBySlug(slug); if(!topic) notFound(); return <TopicPage topic={topic}/> }
