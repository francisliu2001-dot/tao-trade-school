"use client";
/* eslint-disable @next/next/no-html-link-for-pages */

import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, Check, ExternalLink, RotateCcw } from "lucide-react";

type FlowStep = {
  stage: string;
  title: string;
  action: string;
  people: string;
  docs: string;
  result: string;
  pitfall: string;
};

const shampooSteps: FlowStep[] = [
  {stage:"出货前准备",title:"确定谁出口",action:"确认Shampoo工厂A直接出口，还是通过正式外贸代理出口；同步核对备案、合同、收款、申报和税务分工。",people:"负责人、单证、财务、外贸代理",docs:"企业全称、统一社会信用代码、备案及委托资料",result:"已确认的出口主体与分工记录",pitfall:"临出货借抬头，或认为用了代理就不用提供真实信息。"},
  {stage:"出货前准备",title:"核对商品编码与监管要求",action:"把真实用途、形态、成分相关资料、品牌型号和包装规格交给单证与报关行，按当期税则和申报要素核对。",people:"技术、单证、报关行；疑难事项向海关咨询",docs:"产品说明、照片、配方相关资料、标签、规格与用途",result:"候选或申报编码、申报要素及手续依据",pitfall:"洗发水、护发素和精油共用猜测编码；普通网页查询不等于归类决定。"},
  {stage:"出货前准备",title:"确认检验检疫及产品资料",action:"按准确商品和现行适用范围，向主管海关核实是否需要出口前检验、产地办理及相关材料。",people:"生产、质检、单证、主管海关",docs:"按适用要求准备生产、质量、标签及翻译等材料",result:"适用手续、材料清单、办理结果与出货条件",pitfall:"把每一份资料说成每票都必须上传，或把尚未生效的新规当成现行规则。"},
  {stage:"出货前准备",title:"确认物流接货与订舱",action:"将SDS、每瓶容量、瓶数、箱数、外箱尺寸、实际重量、目的地及包装方式交承运人审核。",people:"业务、仓库、货代、承运人",docs:"SDS、包装资料、实测重量、运输目的地",result:"接货确认、运输安排和时间表",pitfall:"把“液体”或渠道所说“敏感货”直接等同危险品；SDS也不替代报关或目的国准入。"},
  {stage:"出货前准备",title:"制作报关资料包",action:"准备合同或订单、最终商业发票、装箱单、产品申报信息及运输委托资料，并交叉核对。",people:"业务、单证、技术、仓库、货代",docs:"合同、CI、PL、产品属性、运输及适用监管单证",result:"一套能对应实际货物的资料包",pitfall:"用早期PI代替最终出运信息，或把500ml容量当成500克重量。"},
  {stage:"申报与放行",title:"协同进仓与运输数据",action:"货代协调进仓或进港、舱单等运输数据；报关行确认满足申报条件。",people:"货代、仓库、报关行",docs:"进仓信息、舱单或提运单数据、截单截关时间",result:"可用于申报的货物与运输信息",pitfall:"把24小时申报时点误解为24小时必定放行；忽略提前申报等适用安排。"},
  {stage:"申报与放行",title:"Shampoo工厂A核对申报草稿",action:"逐项核对主体、商品、编码、数量单位、金额币种、成交方式、包装重量、目的国、运输和随附单证。",people:"业务、技术、单证、财务、报关行",docs:"草稿、合同、商业发票、装箱单和实际货物记录",result:"确认记录及正确申报版本",pitfall:"回复“你看着办”，或对未知价格、重量、编码和法定单位猜填。"},
  {stage:"申报与放行",title:"通过系统申报",action:"按办理权限通过单一窗口或海关政务平台录入并发送，经企业核对后提交。",people:"报关企业或具备办理条件的出口企业",docs:"报关单数据与按要求关联或提交的材料",result:"系统受理状态和可追踪申报记录",pitfall:"把“提交成功”当成“海关已经放行”。"},
  {stage:"申报与放行",title:"跟进审核、补件和查验",action:"按状态处理退单、补件、审核或查验；补件和查验后重新核对，再回到审核处理。",people:"单证、报关行、货代、仓库、海关",docs:"通知、补充资料、查验安排和处理记录",result:"异常处理记录及放行状态",pitfall:"反复提交同一错误资料；承诺必然当天放行；把查验自动等同违规。"},
  {stage:"实际出口与归档",title:"确认实际装运、出口与归档",action:"分别确认放行、装船、实际出境和客户收货；短装、取消或改船时依法处理变更并归档。",people:"业务、单证、货代、财务、境外进口商",docs:"最终CI/PL、申报与放行资料、运输单据、异常、收款记录",result:"实际出口状态和完整证据链",pitfall:"把放行等同装船或退税；中国出口放行不能替代马来西亚NPRA通报和进口销售要求。"},
];

const docsChecklist = ["出口主体及正式委托","合同或订单","最终商业发票 Commercial Invoice","装箱单 Packing List","产品说明、标签与配方相关资料","经核对的编码和申报要素","SDS及承运审核资料","实测箱数、净重与毛重","运输、舱单或提运单数据","适用许可证件、检验检疫及其他随附单证"];
const draftChecklist = ["出口主体、生产销售单位、境外收货人","商品名称、编码、品牌型号与500ml规格","数量2,000瓶及法定计量单位","金额、币种、成交方式及运保杂费","100箱×20瓶与总瓶数相符","净重和毛重来自实际称量","目的国、运输方式与适用随附单证","草稿、合同、发票、箱单与实货一致"];
const statuses = ["待确认","已完成","不适用"] as const;

function useSavedChecklist(key:string, length:number){
  const [values,setValues]=useState<string[]>(()=>Array(length).fill("待确认"));
  useEffect(()=>{const timer=window.setTimeout(()=>{try{const saved=JSON.parse(localStorage.getItem(key)||"null");if(Array.isArray(saved)&&saved.length===length)setValues(saved)}catch{}},0);return()=>window.clearTimeout(timer)},[key,length]);
  const set=(i:number,value:string)=>{const next=values.map((x,j)=>j===i?value:x);setValues(next);localStorage.setItem(key,JSON.stringify(next))};
  const reset=()=>{const next=Array(length).fill("待确认");setValues(next);localStorage.removeItem(key)};
  return {values,set,reset,unconfirmed:values.filter(x=>x==="待确认").length};
}

function TriChecklist({title,items,storageKey}:{title:string,items:string[],storageKey:string}){
  const model=useSavedChecklist(storageKey,items.length);
  return <section className="customs-check"><header><div><strong>{title}</strong><span>{model.unconfirmed} 项待确认</span></div><button onClick={model.reset}><RotateCcw size={14}/>清除</button></header><div>{items.map((item,i)=><article key={item}><p>{item}</p><div>{statuses.map(status=><button key={status} aria-pressed={model.values[i]===status} onClick={()=>model.set(i,status)}>{status}</button>)}</div></article>)}</div><small>完成率只是本机自查记录，不代表取得法律、检验或海关资格。</small></section>
}

function BottleExercise(){
  const [answer,setAnswer]=useState<string>();
  const options=["草稿正确：2,000公斤就是2,000瓶","草稿错误：瓶数和重量单位混淆","可以先报，放行后再称重"];
  return <section className="customs-exercise"><span>互动练习</span><h3>发票写2,000瓶，箱单写100箱×20瓶，申报草稿却写2,000公斤。哪里有问题？</h3><div>{options.map(x=><button key={x} aria-pressed={answer===x} onClick={()=>setAnswer(x)}>{x}</button>)}</div>{answer&&<p className={answer===options[1]?"correct":"incorrect"}>{answer===options[1]?<><Check size={17}/><span><b>判断正确。</b> 500ml是容量，2,000瓶是包装数量，法定计量单位要按编码要求核对，净重和毛重必须来自实际称量，不能从容量推算。</span></>:<><AlertTriangle size={17}/><span><b>再想一下。</b> 2,000瓶与100箱×20瓶可以相互验证，但都不能证明重量是2,000公斤。未知重量应先称量并核对法定单位。</span></>}</p>}</section>
}

function CustomsStatus(){
  const states=["待核对","已提交","补件/查验","放行","实际出口"];
  const [state,setState]=useState("待核对");
  return <section className="customs-status"><div className="status-title"><strong>申报状态模拟</strong><span>教学演示，不是真实海关状态</span></div><div className="status-track">{states.map((x,i)=><button key={x} aria-pressed={state===x} onClick={()=>setState(x)}><b>{i+1}</b>{x}</button>)}</div><div className="status-message">{state==="补件/查验"?<><AlertTriangle size={18}/><p><b>进入处理分支：</b>看清原因 → 补充材料或配合查验 → 重新核对资料与实货 → 返回审核。不要把异常节点画成单向终点。</p></>:state==="放行"?<p><b>放行不等于装船。</b>继续核对运输计划、实际装运和出口状态。</p>:state==="实际出口"?<p><b>确认实际出口后再归档。</b>报关不是自动退税，目的国进口与NPRA要求也仍需另行办理。</p>:<p>当前：<b>{state}</b>。选择不同状态查看下一步应关注的事项。</p>}</div></section>
}

function CupCase(){
  const issues=[{x:"商业发票数量2,000个；装箱单数量2,000个",ok:true},{x:"商业发票总额USD 17,600；报关草单USD 17,060",ok:false},{x:"箱单毛重待确认；订舱委托却填写760kg",ok:false},{x:"合同为FCA宁波卖方仓库；买方指定货代提货",ok:true}];
  const [picked,setPicked]=useState<number[]>([]);
  return <div className="customs-case-body"><div className="case-scope cup"><strong>原保温杯订单</strong><p>2,000个，USD 17,600，FCA宁波卖方仓库。包装箱数和重量尚未取得时必须保持待确认。</p></div><p className="workshop-lead">找出不能直接放行的差异。FCA案例中，买方安排主运输，卖方仍负责出口清关。</p><div className="mismatch-list">{issues.map((a,i)=><button key={a.x} onClick={()=>setPicked(picked.includes(i)?picked.filter(x=>x!==i):[...picked,i])} aria-pressed={picked.includes(i)}><span>{picked.includes(i)?"已选择":"选择"}</span>{a.x}{picked.includes(i)&&<b className={a.ok?"okay":"bad"}>{a.ok?"可以解释一致":"必须暂停核对"}</b>}</button>)}</div></div>
}

function ShampooCase(){
  const groups=useMemo(()=>["出货前准备","申报与放行","实际出口与归档"].map(stage=>({stage,steps:shampooSteps.filter(x=>x.stage===stage)})),[]);
  return <div className="customs-case-body"><div className="case-scope shampoo"><div><strong>Shampoo工厂A：报关实际怎么做</strong><span>核验日期：2026-10-07</span></div><p>中国大陆一般B2B出口、委托报关企业、海运场景。500ml瓶装洗发水2,000瓶；假设每箱20瓶，共100箱。客户、价格、配方、重量、日期及HS编码均未预设。</p><small>500ml是体积，不是500克毛重。Shampoo工厂A为虚构教学代称，不代表任何真实企业或订单。</small></div><div className="future-rule"><AlertTriangle size={18}/><div><strong>法规时点提醒</strong><p>海关总署第284号令已公布，但到2026-12-01才施行；在此之前不能把其中的新要求写成现行规则。届时需重新核验本页。</p></div></div><div className="customs-phases">{groups.map((group,g)=><section key={group.stage}><header><span>{g+1}</span><strong>{group.stage}</strong><small>{group.steps.length}步</small></header><div>{group.steps.map((step,i)=><details key={step.title} open={i===0&&g===0}><summary><b>{shampooSteps.indexOf(step)+1}</b><strong>{step.title}</strong><span>展开</span></summary><dl><div><dt>动作</dt><dd>{step.action}</dd></div><div><dt>找谁</dt><dd>{step.people}</dd></div><div><dt>资料</dt><dd>{step.docs}</dd></div><div><dt>成果</dt><dd>{step.result}</dd></div><div className="pitfall"><dt>误区</dt><dd>{step.pitfall}</dd></div></dl></details>)}</div></section>)}</div><TriChecklist title="报关资料包" items={docsChecklist} storageKey="tao-shampoo-docs-v1"/><TriChecklist title="申报草稿核对" items={draftChecklist} storageKey="tao-shampoo-draft-v1"/><BottleExercise/><CustomsStatus/><section className="ask-broker"><strong>可以直接问报关行的8个问题</strong><ol>{["这款产品还需要哪些资料才能核对编码和申报要素？","适用的出口检验检疫手续、材料和办理地点是什么？","本票出口主体及正式委托怎么确认？","商业发票和装箱单的数量、重量口径是否符合本票要求？","运输与申报的截止节点分别是什么？","能否先给申报草稿供我们核对？","报价包含什么？查验、仓储、搬移、改单如何计费？","放行及实际出口后提供什么记录给单证和财务？"].map(x=><li key={x}>{x}</li>)}</ol></section></div>
}

const sources=[
  ["海关货物申报办事指南","https://online.customs.gov.cn/static/pages/guides/000629002001/000629002001.html","现行办理入口与材料"],
  ["海关总署第277号令","https://www.mofcom.gov.cn/zcfb/zgdwjjmywg/art/2025/art_703b3595d0b540a3aec57766577e5481.html","2025-05-01施行"],
  ["海关货物查检指南","https://online.customs.gov.cn/static/pages/guides/000629011000/000629011000.html","现行查验导航"],
  ["海关总署第284号令PDF","https://www.singlewindow.cn/fs/STADOCROOT/31/EA/49/0C6D02129200CF030D96AD6073.pdf","2026-12-01起施行，当前尚未生效"],
  ["国际贸易单一窗口","https://www.singlewindow.cn/","系统入口"],
  ["海关政务服务平台","https://online.customs.gov.cn/","系统入口"],
  ["马来西亚NPRA化妆品页面","https://www.npra.gov.my/index.php/my/cosmetic-main-page.html","目的国通报与监管要求"],
];

export function CustomsCases({defaultCase="cup",showSources=false}:{defaultCase?:"cup"|"shampoo",showSources?:boolean}){
  const [active,setActive]=useState<"cup"|"shampoo">(defaultCase);
  return <div className="customs-cases"><div className="case-tabs" role="tablist" aria-label="切换教学案例"><button role="tab" aria-selected={active==="cup"} onClick={()=>setActive("cup")}><span>案例A</span>保温杯出口</button><button role="tab" aria-selected={active==="shampoo"} onClick={()=>setActive("shampoo")}><span>案例B · 新增</span>Shampoo工厂A</button></div>{active==="cup"?<CupCase/>:<ShampooCase/>}<div className="official-links"><a href="/topics/customs#materials">查看2024版官方界面截图与字段说明</a><a href="https://www.singlewindow.cn/" target="_blank" rel="noreferrer">单一窗口<ExternalLink size={14}/></a><a href="https://online.customs.gov.cn/" target="_blank" rel="noreferrer">海关政务服务<ExternalLink size={14}/></a></div>{showSources&&<section className="customs-sources"><h3>适用范围与核验来源</h3><p>页面核验于2026-10-07。查询入口用于查找现行信息，不等于个案归类裁定；具体商品、口岸、运输和目的国要求仍须按本票核验。</p><div>{sources.map(([name,url,note])=><a key={url} href={url} target="_blank" rel="noreferrer"><strong>{name}</strong><span>{note}</span><ExternalLink size={14}/></a>)}</div></section>}</div>
}
