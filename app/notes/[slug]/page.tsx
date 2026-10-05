import { NotePage } from "@/components/learning-ui";
import { noteBySlug, notes } from "@/lib/content";
import { notFound } from "next/navigation";
export function generateStaticParams(){ return notes.map(n=>({slug:n.slug})) }
export default async function Page({params}:{params:Promise<{slug:string}>}){ const {slug}=await params; const note=noteBySlug(slug); if(!note) notFound(); return <NotePage note={note}/> }
