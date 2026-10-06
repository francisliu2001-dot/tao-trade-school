"use client";

import { useEffect, useState } from "react";
import NextLink from "next/link";
import { Check, Copy, Download, ExternalLink, RotateCcw } from "lucide-react";
import { steps } from "@/lib/content";

const STORE = "tao-learn-progress-v1";

function readDone(): string[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(STORE) || "[]"); } catch { return []; }
}

export function LearnRoadmap() {
  const [done, setDone] = useState<string[]>([]);
  useEffect(() => { const timer=window.setTimeout(()=>setDone(readDone()),0); return ()=>window.clearTimeout(timer); }, []);
  const reset = () => { localStorage.removeItem(STORE); setDone([]); };
  return <>
    <div className="progress-panel"><div><strong>你的模拟订单进度</strong><span>{done.length} / 8 步完成 · 仅保存在本机浏览器</span></div><div className="progress-meter" aria-label={`已完成${done.length}步`}><i style={{width:`${done.length/8*100}%`}}/></div><button onClick={reset}><RotateCcw size={15}/>重置</button></div>
    <div className="road-groups"><span>拿到订单</span><span>完成交付</span></div>
    <ol className="roadmap">{steps.map((s,i)=><li key={s.slug} className={done.includes(s.slug)?"is-complete":""}><NextLink href={`/learn/${s.slug}`}><span className="road-index">{done.includes(s.slug)?<Check size={18}/>:String(i+1).padStart(2,"0")}</span><span><small>第 {i+1} 步 · {s.date}</small><strong>{s.title}</strong><em>{actions[s.slug].action}</em><b>{actions[s.slug].outcome}</b></span></NextLink></li>)}</ol>
  </>;
}

const actions:Record<string,{action:string,outcome:string}> = {
  prepare:{action:"行动：逐项确认出口准备",outcome:"完成后：知道哪些已具备、哪些要找谁办理"},
  "find-buyers":{action:"行动：筛选客户并写首封联系",outcome:"完成后：得到一份可跟进客户名单"},
  "qualify-inquiry":{action:"行动：把模糊询盘补成可报价信息",outcome:"完成后：得到中英文追问清单"},
  "quote-sample":{action:"行动：算出报价并生成正式单据",outcome:"完成后：得到报价单与PI"},
  "terms-contract-payment":{action:"行动：确认交付、付款和合同",outcome:"完成后：锁定风险、费用与到账节点"},
  "production-inspection":{action:"行动：排出生产与验货节点",outcome:"完成后：形成可跟踪的生产时间线"},
  "ship-customs":{action:"行动：交叉核对发货与申报资料",outcome:"完成后：知道哪里不一致、何时不能放行"},
  "documents-collection-tax":{action:"行动：把单据、收汇和归档配对",outcome:"完成后：形成完整证据链"},
};

const downloads:Record<string,{name:string,file:string}[]> = {
  prepare:[],
  "find-buyers":[{name:"客户开发名单",file:"客户开发名单.xlsx"}],
  "qualify-inquiry":[{name:"询盘处理表（含案例）",file:"询盘处理表.xlsx"}],
  "quote-sample":[{name:"报价单（空白+案例）",file:"报价单.xlsx"},{name:"PI形式发票（空白+案例）",file:"PI形式发票.xlsx"}],
  "terms-contract-payment":[],
  "production-inspection":[{name:"生产跟单表",file:"生产跟单表.xlsx"},{name:"验货记录表",file:"验货记录表.xlsx"}],
  "ship-customs":[{name:"商业发票",file:"商业发票.xlsx"},{name:"装箱单",file:"装箱单.xlsx"},{name:"发货核对清单",file:"发货核对清单.xlsx"}],
  "documents-collection-tax":[{name:"订单归档清单",file:"订单归档清单.xlsx"}],
};

export function StepWorkshop({slug}:{slug:string}) {
  return <section id="practice" className="content-section"><h2>跟着案例做一遍</h2><div className="workshop-shell">{slug==="prepare"&&<Prepare/>}{slug==="find-buyers"&&<FindBuyers/>}{slug==="qualify-inquiry"&&<Inquiry/>}{slug==="quote-sample"&&<Quote/>}{slug==="terms-contract-payment"&&<Terms/>}{slug==="production-inspection"&&<Production/>}{slug==="ship-customs"&&<Shipping/>}{slug==="documents-collection-tax"&&<Archive/>}</div><DownloadPanel slug={slug}/><StepComplete slug={slug}/></section>;
}

function StepComplete({slug}:{slug:string}) {
  const [done,setDone]=useState(false);
  useEffect(()=>{const timer=window.setTimeout(()=>setDone(readDone().includes(slug)),0);return()=>window.clearTimeout(timer)},[slug]);
  const toggle=()=>{const current=readDone(); const next=done?current.filter(x=>x!==slug):[...new Set([...current,slug])]; localStorage.setItem(STORE,JSON.stringify(next)); setDone(!done);};
  return <button className={done?"complete-step done":"complete-step"} onClick={toggle}>{done?<><Check/>已完成本步 · 点击取消</>:<>标记本步已完成</>}</button>;
}

function DownloadPanel({slug}:{slug:string}) {
  const files=downloads[slug]||[]; if(!files.length)return null;
  return <div className="download-panel"><div><strong>带走本步模板</strong><p>Excel 文件可直接打开编辑；案例页用于理解，正式使用请替换全部虚构信息。</p></div><div>{files.map(x=><a key={x.file} href={`/downloads/${encodeURIComponent(x.file)}`} download><Download size={16}/>{x.name}</a>)}</div></div>;
}

function StatusList({items}:{items:{title:string,detail:string,who:string}[]}) {
  const [states,setStates]=useState<Record<number,string>>({}); const choices=["待确认","已完成","不适用"];
  return <div className="status-list">{items.map((x,i)=><details key={x.title}><summary><span><b>{i+1}</b><strong>{x.title}</strong></span><span className="status-buttons">{choices.map(c=><button type="button" key={c} aria-pressed={(states[i]||"待确认")===c} onClick={e=>{e.preventDefault();setStates({...states,[i]:c});}}>{c}</button>)}</span></summary><p>{x.detail}</p><small>建议负责人：{x.who}</small></details>)}</div>;
}

function Prepare(){return <><p className="workshop-lead">逐项选择状态，再展开看“找谁、核什么、留下什么”。勾选仅表示你的自查记录，不代表取得任何资质或审批。</p><StatusList items={[
  {title:"企业与报关单位备案",detail:"核对主体信息和海关备案状态，保存受理或备案结果。",who:"负责人 / 单证"},
  {title:"首笔货物贸易外汇收支准备",detail:"按适用情形向境内银行确认名录登记和收款资料。不要沿用旧的逐票外汇核销说法。",who:"财务 / 经办银行"},
  {title:"产品资料与HS编码核验",detail:"用材质、用途、结构等客观资料判断归类；9617.00仅为本案例教学提示。",who:"工程 / 报关行"},
  {title:"目的国准入与标签",detail:"确认食品接触、材料、标签及测试要求来自哪里、适用于哪一批货。",who:"业务 / 合规 / 买方"},
]}/><NextLink className="inline-deep-link" href="/topics/export-readiness">查看“出口资质与准备”专题 →</NextLink></>}

const channels=[
  ["Google 搜索","搜索产品+distributor/importer，先验证公司官网","https://www.google.com/"],
  ["Google Maps","找当地门店与公司线索，不把地图条目当成交证明","https://www.google.com/maps"],
  ["LinkedIn","核验公司和岗位关系，部分功能需登录","https://www.linkedin.com/"],
  ["Alibaba RFQ","查看公开采购需求；权限与可用性以平台当时页面为准","https://rfq.alibaba.com/"],
  ["Ambiente","从展会与参展商目录找线索，不等于对方正在采购","https://ambiente.messefrankfurt.com/"],
  ["Europages","按国家和行业筛选企业，仍需回到官网核验","https://www.europages.com/"],
  ["ImportYeti","用公开贸易数据找线索；覆盖和字段不等于完整采购事实","https://www.importyeti.com/"],
];
function FindBuyers(){const [copied,setCopied]=useState(false);const mail=`Subject: 600ml insulated bottle for your outdoor range\n\nHi [Name],\nI noticed your company carries outdoor drinkware in Germany. We manufacture 600ml double-wall stainless-steel bottles and can support two colours, laser logos and individual colour boxes.\n\nWould you like a short specification sheet and sample options for review?\n\nBest regards,\nTAO`; const copy=async()=>{await navigator.clipboard.writeText(mail);setCopied(true);};return <><p className="workshop-lead">先选渠道，再记录“为什么这个公司可能匹配”。这些入口只提供线索，不会自动证明对方是真实买家。</p><div className="channel-grid">{channels.map(([n,d,u])=><a href={u} target="_blank" rel="noreferrer" key={n}><strong>{n}<ExternalLink size={14}/></strong><span>{d}</span></a>)}</div><div className="fiction-list"><strong>练习名单（全部虚构）</strong>{["NorthPeak Trading GmbH · 户外饮具","Alpine Gear Haus · 露营用品","Nordlicht Retail · 生活方式零售","Rhein Outdoor Supply · 批发分销"].map((x,i)=><label key={x}><input type="checkbox"/> <span>{x}</span><small>{i===0?"产品、市场和渠道初步匹配":"待核验官网、联系人与采购计划"}</small></label>)}</div><div className="copy-card"><div><strong>首封开发邮件</strong><p><b>观察：</b>说明你看过对方业务。<b>匹配：</b>只写能兑现的能力。<b>行动：</b>问一个容易回答的问题。</p></div><pre>{mail}</pre><button onClick={copy}><Copy size={16}/>{copied?"已复制":"复制英文邮件"}</button></div></>}

function Inquiry(){const fields=[{n:"容量",v:"600ml",known:true},{n:"数量",v:"2,000个",known:true},{n:"颜色",v:"两色，各1,000个",known:true},{n:"Logo",v:"需要，工艺/位置待确认",known:false},{n:"包装",v:"单盒彩盒，稿件待确认",known:false},{n:"材质牌号",v:"未知",known:false},{n:"最晚到货日",v:"5月中旬到汉堡，具体日期未知",known:false}];const questions=fields.filter(x=>!x.known).map(x=>`请确认${x.n}：${x.n==="Logo"?"是否采用激光工艺？请提供尺寸、位置和矢量文件。":x.n==="包装"?"请提供彩盒稿件、印刷要求和条码信息。":x.n==="材质牌号"?"请确认杯身、内胆及食品接触部件要求。":"请提供可接受的最晚到货日期。"}`);const en=["Please confirm the logo process, size, position and vector artwork.","Please share the colour-box artwork, printing requirements and barcode details.","Please confirm the required material grades for the body, liner and food-contact parts.","Please confirm the latest acceptable arrival date in Hamburg."];return <><p className="workshop-lead">原则：已知的写来源；未知的明确标“待确认”，不能为了尽快报价而猜。</p><div className="inquiry-grid">{fields.map(x=><div key={x.n} className={x.known?"known":"unknown"}><small>{x.known?"已确认":"待确认"}</small><strong>{x.n}</strong><span>{x.v}</span></div>)}</div><div className="question-output"><strong>可直接发送的追问</strong><div><h4>中文</h4>{questions.map(x=><p key={x}>• {x}</p>)}</div><div><h4>English</h4>{en.map(x=><p key={x}>• {x}</p>)}</div></div></>}

function Quote(){const [qty,setQty]=useState(2000),[cost,setCost]=useState(6.4),[pack,setPack]=useState(.45),[logo,setLogo]=useState(.18),[local,setLocal]=useState(.12),[one,setOne]=useState(80),[rate,setRate]=useState(7.1),[mode,setMode]=useState<"markup"|"margin">("margin"),[profit,setProfit]=useState(20);const unit=cost+pack+logo+local+one/Math.max(1,qty);const valid=qty>0&&rate>0&&(mode==="markup"||profit<100);const usd=valid?(mode==="markup"?unit*(1+profit/100):unit/(1-profit/100))/rate:0;return <><p className="workshop-lead">这是教学测算，不接入实时汇率或退税率。未知退税不计入，避免把不确定收益先当成利润。</p><div className="calc-grid"><label>数量<input type="number" value={qty} onChange={e=>setQty(+e.target.value)}/></label><label>产品成本 CNY<input type="number" step=".01" value={cost} onChange={e=>setCost(+e.target.value)}/></label><label>包装 CNY<input type="number" step=".01" value={pack} onChange={e=>setPack(+e.target.value)}/></label><label>Logo CNY<input type="number" step=".01" value={logo} onChange={e=>setLogo(+e.target.value)}/></label><label>国内费用/个 CNY<input type="number" step=".01" value={local} onChange={e=>setLocal(+e.target.value)}/></label><label>一次性费用 CNY<input type="number" step="1" value={one} onChange={e=>setOne(+e.target.value)}/></label><label>教学汇率 CNY/USD<input type="number" step=".01" value={rate} onChange={e=>setRate(+e.target.value)}/></label><label>目标比例 %<input type="number" value={profit} onChange={e=>setProfit(+e.target.value)}/></label></div><div className="calc-mode"><button aria-pressed={mode==="markup"} onClick={()=>setMode("markup")}>加价率</button><button aria-pressed={mode==="margin"} onClick={()=>setMode("margin")}>毛利率</button></div>{valid?<div className="calc-result"><span>单位总成本 <b>CNY {unit.toFixed(2)}</b></span><span>测算报价 <b>USD {usd.toFixed(2)} / 个</b></span><span>总额 <b>USD {(usd*qty).toLocaleString(undefined,{maximumFractionDigits:2})}</b></span><small>{mode==="markup"?"售价=成本×(1+加价率)":"售价=成本÷(1-毛利率)"}</small></div>:<div className="calc-error">数量和汇率必须大于0，毛利率必须小于100%。</div>}<div className="case-anchor"><strong>案例正式报价仍采用</strong><span>USD 8.80 × 2,000 = USD 17,600</span><small>FCA宁波卖方仓库；有效期10天；样品及快递USD 80另收。PI阶段付款方式仍待协商。</small></div><button className="print-button" onClick={()=>window.print()}>打印 / 另存为 PDF</button></>}

function Terms(){const [term,setTerm]=useState("FCA"),[pct,setPct]=useState(30);const paid=17600*pct/100;const terms:{[k:string]:string[] }={FCA:["卖方仓库交承运人","交付时风险转移","买方安排主运输","无强制投保义务"],FOB:["装运港装上船","装船时风险转移","买方承担主运费","仅海运/内河"],CIF:["装运港装上船","装船时风险转移","卖方付运费到目的港","卖方安排最低范围保险"]};return <><div className="mini-switch">{Object.keys(terms).map(x=><button key={x} aria-pressed={x===term} onClick={()=>setTerm(x)}>{x}</button>)}</div><div className="term-four">{terms[term].map((x,i)=><div key={x}><small>{["交付","风险","费用","保险"][i]}</small><strong>{x}</strong></div>)}</div><NextLink className="inline-deep-link" href="/topics/incoterms">打开11项术语完整交互图 →</NextLink><div className="payment-slider"><label>定金比例：<b>{pct}%</b><input type="range" min="0" max="100" value={pct} onChange={e=>setPct(+e.target.value)}/></label><div><span>定金 <b>USD {paid.toLocaleString()}</b></span><span>余款 <b>USD {(17600-paid).toLocaleString()}</b></span></div><p>本案例合同最终确定30%定金（USD 5,280）+ 70%余款（USD 12,320），以银行实际到账为准。</p></div><StatusList items={[{title:"规格、确认样和包装附件",detail:"版本号、验收方法和变更流程都写清。",who:"业务/质检"},{title:"FCA宁波卖方仓库",detail:"地点要具体到可执行位置，并明确来车与装货安排。",who:"双方业务/货代"},{title:"付款与开工条件",detail:"3月12日定金实际到账后开工；4月9日余款实际到账。",who:"财务"},{title:"法律适用与争议解决",detail:"不要只写“友好协商”，应明确机制与文本优先级。",who:"负责人/法务"}]}/></>}

function Production(){const [dates,setDates]=useState(["2026-03-13","2026-03-18","2026-03-30","2026-04-08","2026-04-11"]);const labels=["生产启动","首件确认","中期检查","终检","交承运人"];const conflict=dates.some((x,i)=>i>0&&x<dates[i-1]);return <><p className="workshop-lead">拖动日期不是必需；直接选择日期即可。每个节点展开后都应能回答：谁做、查什么、留下什么证据、异常怎么办。</p><div className="date-timeline">{dates.map((d,i)=><label key={labels[i]}><span>{i+1}</span><strong>{labels[i]}</strong><input type="date" value={d} onChange={e=>setDates(dates.map((x,j)=>j===i?e.target.value:x))}/><small>{["跟单：版本与物料齐套","质检：确认样与首件记录","质检：进度与关键缺陷","质检/买方：按合同约定方法","业务/仓库：签收证据"][i]}</small></label>)}</div>{conflict&&<div className="calc-error">日期顺序冲突：后一个节点不能早于前一个节点。</div>}<p className="scope-note">25天是本案例计划，不是通用生产周期；抽样方式、接受标准和第三方验货应由合同或书面约定确定。</p></>}

function Shipping(){const issues=[{x:"商业发票数量2,000个；装箱单数量2,000个",ok:true},{x:"商业发票总额USD 17,600；报关草单USD 17,060",ok:false},{x:"箱单毛重待确认；订舱委托写760kg",ok:false},{x:"合同为FCA宁波卖方仓库；货代指示由买方安排提货",ok:true}];const [picked,setPicked]=useState<number[]>([]);return <><p className="workshop-lead">找出不能直接放行的差异。FCA案例中，买方安排主运输，卖方仍负责出口清关；4月11日在约定仓库完成交承运人。</p><div className="mismatch-list">{issues.map((a,i)=><button key={a.x} onClick={()=>setPicked(picked.includes(i)?picked.filter(x=>x!==i):[...picked,i])} aria-pressed={picked.includes(i)}><span>{picked.includes(i)?"已选择":"选择"}</span>{a.x}{picked.includes(i)&&<b className={a.ok?"okay":"bad"}>{a.ok?"可以解释一致":"必须暂停核对"}</b>}</button>)}</div><div className="official-links"><NextLink href="/topics/customs">查看报关资料图解</NextLink><a href="https://www.singlewindow.cn/" target="_blank" rel="noreferrer">中国国际贸易单一窗口<ExternalLink size={14}/></a><a href="https://online.customs.gov.cn/" target="_blank" rel="noreferrer">海关政务服务平台<ExternalLink size={14}/></a></div></>}

function Archive(){const pairs=["报价/PI/合同 ↔ 商业条件与版本","商业发票 ↔ 货值与交易事实","装箱单 ↔ 箱数、重量、体积","报关资料 ↔ 商品与申报事实","银行入账 ↔ 定金与余款","进项与备案资料 ↔ 税务处理依据"];return <><p className="workshop-lead">4月14日起做的是核对、归档此前形成的单据；余款已在4月9日到账，不在这里重复写成“首次收汇”。</p><div className="purpose-grid">{pairs.map(x=>{const [a,b]=x.split(" ↔ ");return <div key={x}><strong>{a}</strong><span>{b}</span><label><input type="checkbox"/> 已找到并交叉核对</label></div>})}</div><div className="tax-note"><strong>退税不是订单完成后的自动奖励</strong><p>是否适用退（免）税取决于经营主体、出口业务、商品政策属性、进项凭证、申报和备案资料等条件。零退税率也不能简单等同“什么都不用处理”，应按当期HS和适用规则判断免税或征税。</p></div></>}
