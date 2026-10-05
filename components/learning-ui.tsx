"use client";

import { useMemo, useState } from "react";
import { Search, Menu, X, ArrowLeft, ChevronLeft, ChevronRight, ExternalLink, Check, AlertTriangle, PackageCheck, Factory, Truck, Ship, Landmark, FileText, CircleDollarSign, BookOpen } from "lucide-react";
import { caseFacts, glossary, notes, steps, topics, type Step, type Topic } from "@/lib/content";

function Link({href,children,...props}:React.AnchorHTMLAttributes<HTMLAnchorElement>&{href:string}){
  return <a href={href} {...props}>{children}</a>;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <div className="nav-wrap">
      <Link className="brand" href="/"><span className="brand-mark">T</span><span>TAO的外贸学堂</span></Link>
      <nav className={open ? "top-nav open" : "top-nav"} aria-label="主导航">
        <Link href="/learn">外贸从0到1</Link><Link href="/topics">外贸进阶</Link><Link href="/notes">外贸笔记</Link><Link href="/glossary">术语表</Link>
        <Link className="search-link" href="/search"><Search size={17}/>知识搜索</Link>
      </nav>
      <button className="menu-button" aria-expanded={open} aria-label={open ? "关闭菜单" : "打开菜单"} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
    </div>
  </header>
}

export function SiteFooter() {
  return <footer className="site-footer"><div><strong>TAO的外贸学堂</strong><p>免费、免登录。把第一笔出口订单讲明白。</p></div><div className="footer-links"><Link href="/learn">从0到1</Link><Link href="/topics">进阶专题</Link><Link href="/notes">外贸笔记</Link><Link href="/glossary">术语表</Link></div><p className="footer-note">内容用于通识学习，不替代海关、税务、银行、律师或承运人的个案意见。规则核验：2026-10-05。</p></footer>
}

export function InlineTerm({ term }: { term: keyof typeof glossary }) {
  const [open, setOpen] = useState(false); const item = glossary[term];
  return <span className="term-wrap"><button className="term" aria-expanded={open} onClick={() => setOpen(!open)}>{term}<span aria-hidden>＋</span></button>{open && <span className="term-card"><strong>{item.title}</strong><span>{item.text}</span><Link href={`/topics/${item.topic}`}>查看详细说明</Link></span>}</span>
}

export function HomePage() {
  return <><SiteHeader/><main>
    <section className="home-hero"><div className="hero-copy"><span className="eyebrow">全部免费 · 免登录 · 随时速查</span><h1>看懂外贸，<br/><span>走通第一笔订单。</span></h1><p>为中国工厂老板和外贸新人准备：不绕术语，从一只保温杯的真实业务逻辑开始。</p></div><div className="route-sketch" aria-label="从工厂到海外买家的订单路线"><span className="sketch-node yellow"><Factory/>工厂</span><span className="sketch-line">询盘 · 报价 · 生产</span><span className="sketch-node"><Ship/>出运</span><span className="sketch-line">单证 · 收汇</span><span className="sketch-node black"><PackageCheck/>买家</span></div></section>
    <section className="two-choices" aria-label="学习入口"><article className="choice-card yellow-card"><span className="choice-number">01</span><div><h2>外贸从0到1</h2><p>跟着一个工厂出口案例，看懂第一笔订单的全过程。</p><Link className="button dark" href="/learn">从这里开始</Link></div></article><article className="choice-card blue-card"><span className="choice-number">02</span><div><h2>外贸进阶</h2><p>看懂交易细节，遇到问题随时查。</p><Link className="button light" href="/topics">查看知识专题</Link></div></article></section>
    <section className="home-note"><div><span className="eyebrow">外贸笔记</span><h2>把容易踩坑的细节，写成短笔记。</h2></div><Link href="/notes">查看最新笔记</Link></section>
  </main><SiteFooter/></>
}

export function LearnIndex() {
  return <><SiteHeader/><main className="wide-page"><div className="page-intro"><span className="eyebrow">教学示例 · 非真实经营成果</span><h1>一只保温杯的<br/>第一笔出口订单</h1><p>沿着8个节点阅读。桌面端像路线图，手机端自动变成纵向时间线。</p></div><CaseStrip/><ol className="roadmap">{steps.map((s,i)=><li key={s.slug}><Link href={`/learn/${s.slug}`}><span className="road-index">{String(i+1).padStart(2,"0")}</span><span><small>{s.date}</small><strong>{s.title}</strong><em>{s.happened.slice(0,54)}…</em></span></Link></li>)}</ol></main><SiteFooter/></>
}

export function CaseStrip() { return <div className="case-strip"><span><b>产品</b>{caseFacts.product}</span><span><b>数量</b>{caseFacts.quantity}</span><span><b>总额</b>{caseFacts.total}</span><span><b>交付</b>{caseFacts.term}</span></div> }

function MiniTOC({ ids }: { ids: [string,string][] }) { return <aside className="toc"><span>本页目录</span>{ids.map(([id,label],i)=><a href={`#${id}`} key={id}><b>{i+1}</b>{label}</a>)}</aside> }

export function StepPage({ step }: { step: Step }) {
  const index = steps.findIndex(s=>s.slug===step.slug); const prev=steps[index-1]; const next=steps[index+1];
  const toc: [string,string][] = [["happened","发生了什么"],["roles","谁负责什么"],["why","为什么这样做"],["checks","核对清单"],["mistakes","常见错误"],["next","下一步"]];
  return <><SiteHeader/><main className="article-layout"><MiniTOC ids={toc}/><article className="article"><Link className="back" href="/learn"><ArrowLeft size={16}/>返回路线图</Link><header className="article-head"><span className="eyebrow">第 {index+1} 步 · {step.date}</span><h1>{step.title}</h1><p>同一案例连续推进：{caseFacts.product}，{caseFacts.quantity}，{caseFacts.total}。</p></header><CaseTimeline current={index}/>
    <Section id="happened" title="此时发生了什么"><p>{step.happened}</p></Section>
    <Section id="roles" title="涉及哪些角色，谁负责什么"><div className="role-grid">{step.roles.map(x=>{const [a,b]=x.split("：");return <div key={x}><strong>{a}</strong><p>{b}</p></div>})}</div></Section>
    <Section id="why" title="为什么需要这样做"><p>{step.why}</p></Section>
    <Section id="checks" title="应该核对哪些信息"><Checklist items={step.checks}/></Section>
    <Section id="mistakes" title="常见错误"><div className="warning-box"><AlertTriangle/><ul>{step.mistakes.map(x=><li key={x}>{x}</li>)}</ul></div></Section>
    <Section id="next" title="下一步如何推进"><div className="next-box">{step.next}</div></Section>
    <Related slugs={step.related}/><nav className="prev-next">{prev?<Link href={`/learn/${prev.slug}`}><ChevronLeft/>上一步<span>{prev.title}</span></Link>:<span/>}{next?<Link className="next" href={`/learn/${next.slug}`}>下一步<ChevronRight/><span>{next.title}</span></Link>:<Link className="next" href="/topics">进入专题<ChevronRight/><span>外贸进阶</span></Link>}</nav>
  </article></main><SiteFooter/></>
}

function CaseTimeline({current}:{current:number}) { return <div className="mini-road" aria-label={`当前是第${current+1}步`}>{steps.map((s,i)=><Link className={i===current?"current":i<current?"done":""} key={s.slug} href={`/learn/${s.slug}`} title={s.title}><span>{i<current?<Check size={13}/>:i+1}</span></Link>)}</div> }

function Section({id,title,children}:{id:string,title:string,children:React.ReactNode}) { return <section id={id} className="content-section"><h2>{title}</h2>{children}</section> }
function Checklist({items}:{items:string[]}) { return <ul className="checklist">{items.map(x=><li key={x}><Check size={18}/><span>{x}</span></li>)}</ul> }

export function TopicsIndex() {
  const groups=[...new Set(topics.map(t=>t.category))];
  return <><SiteHeader/><main className="wide-page"><div className="page-intro topic-intro"><span className="eyebrow">{topics.length}个专题 · 可直接访问</span><h1>遇到问题，<br/>直接查答案。</h1><p>不必按顺序学习。每个专题都从一个实际问题开始，并标明核验来源与日期。</p><Link className="search-cta" href="/search"><Search size={18}/>搜索中文名词或英文缩写</Link></div>{groups.map(g=><section className="topic-group" key={g}><div className="group-label"><span>{g}</span><i>{topics.filter(t=>t.category===g).length}</i></div><div className="topic-list">{topics.filter(t=>t.category===g).map(t=><Link href={`/topics/${t.slug}`} key={t.slug}><span>{t.title}</span><small>{t.question}</small><ChevronRight/></Link>)}</div></section>)}</main><SiteFooter/></>
}

export function TopicPage({ topic }: { topic: Topic }) {
  const toc: [string,string][] = [["plain","一句话解释"],["visual","核心图解"],["details","详细说明"],["case","案例应用"],["pitfalls","关键点与误区"],["recap","复习摘要"],["sources","来源与范围"]];
  return <><SiteHeader/><main className="article-layout"><MiniTOC ids={toc}/><article className="article"><Link className="back" href="/topics"><ArrowLeft size={16}/>返回进阶专题</Link><header className="article-head"><span className="eyebrow">{topic.category} · 核验于 {topic.updated}</span><h1>{topic.title}</h1><p>{topic.question}</p></header>
    <Section id="plain" title="一句话白话解释"><div className="plain-answer">{topic.plain}</div></Section>
    <Section id="visual" title="核心可视化图"><Visual topic={topic}/></Section>
    <Section id="details" title="必要的详细说明"><div className="detail-stack">{topic.details.map((d,i)=><div key={d}><span>{String(i+1).padStart(2,"0")}</span><p>{renderTerms(d)}</p></div>)}</div></Section>
    <Section id="case" title="工厂案例中的应用"><div className="case-use"><Factory/><div><strong>{caseFacts.factory}</strong><p>{topic.caseUse}</p></div></div></Section>
    <Section id="pitfalls" title="关键点与常见误区"><div className="warning-box"><AlertTriangle/><ul>{topic.keyPoints.map(x=><li key={x}>{x}</li>)}</ul></div></Section>
    <Section id="recap" title="30秒复习"><div className="recap"><strong>只记这一句</strong><p>{topic.recap}</p></div></Section>
    <Related slugs={topic.related}/>
    <Section id="sources" title="适用范围与来源"><p className="scope">面向中国大陆一般B2B货物出口的通识说明。具体商品、口岸、合同、银行和目的国规则可能不同；操作前请以当期官方系统和经办机构要求为准。</p>{topic.source.length?<div className="source-list">{topic.source.map(s=><a key={s.url} href={s.url} target="_blank" rel="noreferrer">{s.label}<ExternalLink size={15}/></a>)}</div>:<p className="scope">本页为流程与实务组织，暂无可直接覆盖全部情形的单一官方来源；涉及个案请向主管机构或专业人士核实。</p>}</Section>
  </article></main><SiteFooter/></>
}

function renderTerms(text:string){ const terms=Object.keys(glossary); const term=terms.find(t=>text.includes(t)); if(!term) return text; const [before,after]=text.split(term); return <>{before}<InlineTerm term={term}/>{after}</> }

function Visual({topic}:{topic:Topic}) {
  if(topic.slug==="incoterms") return <IncotermsVisual/>;
  if(topic.slug==="payments") return <PaymentVisual/>;
  if(topic.visual==="document") return <div className="document-visual"><div className="paper"><span>DOCUMENT CHECK</span><b>{topic.slug==="bill-of-lading"?"BILL OF LADING":"COMMERCIAL DATA"}</b><i>01 · 主体与编号</i><i>02 · 货名与数量</i><i>03 · 金额 / 重量 / 路线</i><i>04 · 日期与签发人</i></div><div className="annotations"><span>同一事实来源</span><span>逐项交叉核对</span><span>差异先查原因</span></div></div>;
  if(topic.visual==="timeline") return <div className="visual-timeline">{["确认输入","锁定节点","执行与留证","复核异常"].map((x,i)=><div key={x}><span>{i+1}</span><strong>{x}</strong></div>)}</div>;
  return <div className="flow-visual"><div><Factory/><span>卖方</span></div><i>货物 / 单据</i><div><Truck/><span>承运与口岸</span></div><i>单据 / 资金</i><div><Landmark/><span>银行与监管</span></div><i>交付</i><div><PackageCheck/><span>买方</span></div></div>;
}

function IncotermsVisual(){
  const [term,setTerm]=useState("FCA");
  const data:{[k:string]:{en:string,zh:string,risk:number,cost:number,insurance:string,mode:string,note:string}}={
    EXW:{en:"Ex Works",zh:"工厂交货（指定交货地点）",risk:0,cost:0,insurance:"无强制投保义务",mode:"任何运输方式",note:"卖方在指定场所将货物置于买方处置，不负责装上买方车辆或出口清关"},
    FCA:{en:"Free Carrier",zh:"货交承运人（指定交货地点）",risk:1,cost:1,insurance:"无强制投保义务",mode:"任何运输方式",note:"案例采用：卖方仓库装上买方来车并交承运人；卖方负责出口清关"},
    CPT:{en:"Carriage Paid To",zh:"运费付至（指定目的地）",risk:1,cost:8,insurance:"无强制投保义务",mode:"任何运输方式",note:"卖方付运费到指定目的地，但风险在货交第一承运人时已经转移"},
    CIP:{en:"Carriage and Insurance Paid To",zh:"运费及保险费付至（指定目的地）",risk:1,cost:8,insurance:"卖方须投保较高范围（通常ICC(A)）",mode:"任何运输方式",note:"风险早于费用终点转移；保险义务通常高于CIF"},
    DAP:{en:"Delivered at Place",zh:"目的地交货（指定目的地，未卸货）",risk:8,cost:8,insurance:"无强制投保义务",mode:"任何运输方式",note:"卖方把货物运至指定目的地，在到达运输工具上备妥卸货；买方负责卸货与进口清关"},
    DPU:{en:"Delivered at Place Unloaded",zh:"目的地卸货后交货（指定目的地）",risk:9,cost:9,insurance:"无强制投保义务",mode:"任何运输方式",note:"唯一要求卖方在目的地完成卸货后再交付的术语"},
    DDP:{en:"Delivered Duty Paid",zh:"完税后交货（指定目的地）",risk:8,cost:8,insurance:"无强制投保义务",mode:"任何运输方式",note:"卖方负责出口、运输和进口清关及税费，在指定目的地备妥卸货"},
    FAS:{en:"Free Alongside Ship",zh:"船边交货（指定装运港）",risk:3,cost:3,insurance:"无强制投保义务",mode:"仅海运/内河运输",note:"货物置于指定船舶船边时交付，买方负责装船与主运输"},
    FOB:{en:"Free On Board",zh:"船上交货（指定装运港）",risk:4,cost:4,insurance:"无强制投保义务",mode:"仅海运/内河运输",note:"装运港货物装上买方指定船舶时交付；不再使用‘越过船舷’表述"},
    CFR:{en:"Cost and Freight",zh:"成本加运费（指定目的港）",risk:4,cost:6,insurance:"无强制投保义务",mode:"仅海运/内河运输",note:"卖方付运费到目的港，但风险在装运港货物装上船时转移"},
    CIF:{en:"Cost, Insurance and Freight",zh:"成本、保险费加运费（指定目的港）",risk:4,cost:6,insurance:"卖方须投保最低范围（通常ICC(C)）",mode:"仅海运/内河运输",note:"风险在装运港转移，费用和最低保险安排延伸到目的港"}
  };
  const d=data[term];
  const commonTerms=new Set(["FCA","FOB","CIF","DDP"]);
  const labels=["卖方场所","交首程承运人","国内运输","出口通关 / 船边","装船","国际运输","目的港","进口清关","指定目的地待卸","卸货完成"];
  return <div className="incoterms">
    <div className="switcher term-switcher" role="tablist" aria-label="选择贸易术语">{Object.keys(data).map(k=><button role="tab" aria-selected={term===k} key={k} onClick={()=>setTerm(k)}><span>{k}</span>{commonTerms.has(k)&&<small>常用</small>}</button>)}</div>
    <div className="selected-term"><strong>{term} · {d.en}</strong><span>{d.zh}</span><small>{d.mode}</small></div>
    <div className="transport-line route-road" aria-label="从卖方场所到卸货完成的运输路线">{labels.map((x,i)=><div key={x} className={i===d.risk?"risk-point":""}><span>{i===d.risk?"风险转移":""}</span><b>{i+1}</b><small>{x}</small></div>)}</div>
    <div className="three-lines"><p><span className="risk-dot"/>风险：第 {d.risk+1} 节点转移</p><p><span className="cost-dot"/>卖方费用：至第 {d.cost+1} 节点</p><p><span className="insurance-dot"/>保险：{d.insurance}</p></div>
    <div className="visual-note"><b>{term} · {d.mode}</b><span>{d.note}</span></div>
    <div className="terms-table" aria-label="Incoterms 2020全部11项术语"><div className="terms-head"><b>术语</b><b>英文全称</b><b>中文名称</b></div>{Object.entries(data).map(([key,item])=><button key={key} onClick={()=>setTerm(key)} aria-current={term===key?"true":undefined}><b>{key}{commonTerms.has(key)&&<small className="common-tag">常用</small>}</b><span>{item.en}</span><span>{item.zh}</span></button>)}</div>
  </div>
}

function PaymentVisual(){ const [mode,setMode]=useState("T/T"); const flow:{[k:string]:string[]}={"T/T":["买方向银行发出汇款指令","资金经银行到卖方账户","卖方按约定节点安排生产/交付"],"L/C":["买方申请开证","卖方发货并提示单据","银行审单后付款或承兑"],"D/P":["卖方发货后委托银行收款","买方付款","代收行交出单据"],"D/A":["卖方发货后委托银行托收","买方承兑远期汇票并取单","到期日才应付款"]}; return <div className="payment-visual"><div className="switcher">{Object.keys(flow).map(k=><button aria-pressed={mode===k} key={k} onClick={()=>setMode(k)}>{k}</button>)}</div><div className="payment-flow">{flow[mode].map((x,i)=><div key={x}><span>{i+1}</span><p>{x}</p>{i<2&&<ChevronRight/>}</div>)}</div><p className="visual-note">点击方式，看货、单、钱的先后。银行是否承诺付款，是L/C与托收的关键区别。</p></div> }

function Related({slugs}:{slugs:string[]}) { const items=slugs.map(topicSlug=>topics.find(t=>t.slug===topicSlug)).filter(Boolean) as Topic[]; return <section className="related"><h2>相关知识</h2><div>{items.map(t=><Link key={t.slug} href={`/topics/${t.slug}`}><span>{t.title}</span><ChevronRight/></Link>)}</div></section> }

export function NotesIndex(){return <><SiteHeader/><main className="wide-page"><div className="page-intro"><span className="eyebrow">外贸笔记 · 持续更新</span><h1>短一点，<br/>但讲透一个坑。</h1><p>第一版文章均由本次建站整理发布，不展示虚构作者、阅读量或占位内容。</p></div><div className="notes-grid">{notes.map(n=><Link href={`/notes/${n.slug}`} key={n.slug}><small>{n.category} · {n.date}</small><h2>{n.title}</h2><p>{n.summary}</p><span>阅读全文</span></Link>)}</div></main><SiteFooter/></>}

export function NotePage({note}:{note:(typeof notes)[number]}){return <><SiteHeader/><main className="article-layout"><aside className="toc"><span>文章信息</span><b>{note.category}</b><small>{note.date}</small></aside><article className="article note-article"><Link className="back" href="/notes"><ArrowLeft size={16}/>返回外贸笔记</Link><header className="article-head"><span className="eyebrow">{note.category} · {note.date}</span><h1>{note.title}</h1><p>{note.summary}</p></header>{note.body.map((p,i)=><p className="note-p" key={p}>{i===0?<strong>{p}</strong>:p}</p>)}<Related slugs={note.related}/></article></main><SiteFooter/></>}

export function GlossaryIndex(){
  const entries=Object.entries(glossary).sort((a,b)=>a[0].localeCompare(b[0]));
  return <><SiteHeader/><main className="wide-page"><div className="page-intro"><span className="eyebrow"><BookOpen size={14}/>术语表 · {entries.length} 个</span><h1>外贸名词，<br/>一句话讲清。</h1><p>点击任意术语查看简短解释，并跳转至对应专题深入了解。</p></div>
  <div className="glossary-grid">
    {entries.map(([key,item])=>
      <Link href={`/topics/${item.topic}`} key={key} className="glossary-card">
        <div className="glossary-head"><strong>{key}</strong><ChevronRight size={16}/></div>
        <span className="glossary-title">{item.title}</span>
        <p className="glossary-text">{item.text}</p>
      </Link>
    )}
  </div>
  </main><SiteFooter/></>
}

export function SearchPage(){ const [q,setQ]=useState(""); const results=useMemo(()=>{const s=q.trim().toLowerCase(); if(!s)return[]; return topics.filter(t=>[t.title,t.question,t.plain,...t.keywords,...t.details].join(" ").toLowerCase().includes(s))},[q]); return <><SiteHeader/><main className="search-page"><div className="search-title"><span className="eyebrow">站内知识搜索</span><h1>你想查什么？</h1><p>支持中文名词和FOB、CIF、T/T、L/C、HS等常用缩写。</p></div><label className="search-box"><Search/><input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="例如：电放、退税、FOB、信用证"/><kbd>/</kbd></label>{q.trim()===""?<div className="quick-search"><span>常见搜索</span>{["FOB","信用证","电放","出口退税","HS编码"].map(x=><button key={x} onClick={()=>setQ(x)}>{x}</button>)}</div>:results.length?<div className="search-results"><p>找到 {results.length} 个专题</p>{results.map(t=><Link href={`/topics/${t.slug}`} key={t.slug}><div><small>{t.category}</small><h2>{t.title}</h2><p>{t.plain}</p></div><ChevronRight/></Link>)}</div>:<div className="empty-result"><Search/><h2>没有找到“{q}”</h2><p>试试缩短关键词，或改用“海运”“付款”“单证”等更宽的词。</p><Link href="/topics">浏览全部{topics.length}个专题</Link></div>}</main><SiteFooter/></>}
