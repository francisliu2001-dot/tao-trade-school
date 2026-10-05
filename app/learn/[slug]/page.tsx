import { StepPage } from "@/components/learning-ui";
import { stepBySlug, steps } from "@/lib/content";
import { notFound } from "next/navigation";
export function generateStaticParams(){ return steps.map(s=>({slug:s.slug})) }
export default async function Page({params}:{params:Promise<{slug:string}>}){ const {slug}=await params; const step=stepBySlug(slug); if(!step) notFound(); return <StepPage step={step}/> }
