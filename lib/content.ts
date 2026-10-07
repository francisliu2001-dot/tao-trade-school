export type Topic = {
  slug: string;
  category: string;
  title: string;
  question: string;
  plain: string;
  details: string[];
  caseUse: string;
  keyPoints: string[];
  recap: string;
  related: string[];
  source: { label: string; url: string }[];
  updated: string;
  visual: "map" | "compare" | "flow" | "document" | "timeline";
  keywords: string[];
};

export type Step = {
  slug: string;
  title: string;
  date: string;
  happened: string;
  roles: string[];
  why: string;
  checks: string[];
  mistakes: string[];
  next: string;
  related: string[];
};

export const caseFacts = {
  factory: "宁波澄川不锈钢制品厂（虚构）",
  buyer: "NorthPeak Trading GmbH（虚构）",
  product: "600ml 双层真空不锈钢保温杯",
  quantity: "2,000 个",
  colors: "哑光黑 1,000 个、海军蓝 1,000 个",
  price: "USD 8.80 / 个",
  total: "USD 17,600",
  term: "FCA 宁波卖方仓库，Incoterms® 2020",
  payment: "30% T/T 定金（USD 5,280）+ 70% 发货前付清（USD 12,320）",
  package: "箱数、每箱数量、净重、毛重和体积均待包装完成后实测确认",
  hs: "9617.00（仅作教学示例，实际归类须按产品资料核定）",
};

export const steps: Step[] = [
  {
    slug: "prepare",
    title: "出口前需要准备什么",
    date: "准备期",
    happened: "澄川工厂决定直接出口保温杯，先完成主体、海关与收汇相关准备，并确认产品材质、食品接触要求、HS编码和目标市场准入条件。案例数据均为教学示例，不代表真实企业或市场价格。",
    roles: ["老板：决定产品、市场与风险边界", "单证/财务：准备海关备案、收汇和退税资料", "工程/质检：整理材质、检测和规格文件", "报关行：就归类与申报要素提供操作意见"],
    why: "出口不是把国内货直接寄出去。企业身份、产品合规、税则归类和收付款路径必须先能形成可验证的证据链。",
    checks: ["营业执照经营范围与实际业务", "海关报关单位备案状态", "首笔货物贸易外汇收支前的名录登记", "产品HS编码、监管条件和目的国准入", "报价中是否考虑税费、包装与合规成本"],
    mistakes: ["把货代说法当作最终归类结论", "只看国内能否出口，不查目的国能否进口", "把旧称‘外汇核销’当成仍需逐票核销的现行制度"],
    next: "形成一页产品资料包：规格、图片、包装、检测、最小起订量和可交期，然后开始寻找匹配客户。",
    related: ["export-readiness", "customs", "forex"],
  },
  {
    slug: "find-buyers",
    title: "怎样找到海外客户",
    date: "3月2日前",
    happened: "工厂把目标客户限定为德国户外用品进口商，通过B2B平台、展会名录和企业官网筛选，向NorthPeak发送包含规格与应用场景的短开发邮件。",
    roles: ["业务员：筛选、触达并记录客户回应", "技术人员：回答材质和检测问题", "潜在买家：说明渠道、市场与采购计划"],
    why: "精准客户画像能减少无效群发，也能让首封信息直接回答‘你为什么适合我’。",
    checks: ["客户公司、域名和联系人是否真实", "客户销售的产品与目标价位", "目标市场法规与认证", "邮件中的产品参数是否可兑现", "每次跟进是否带来新信息"],
    mistakes: ["只发价格表不说明适配场景", "把询价数量当成确定订单", "未经核实就接受可疑付款或更改收款账户"],
    next: "客户回复后，不急着报最低价，先把数量、用途、规格、包装、交期、目的地和付款偏好问清。",
    related: ["customer-development", "trade-basics"],
  },
  {
    slug: "qualify-inquiry",
    title: "收到询盘后先问清什么",
    date: "3月2日",
    happened: "NorthPeak询问2,000个600ml保温杯。业务员确认两种颜色各1,000个、激光Logo、单盒彩盒、德国销售、希望5月中旬到汉堡，并询问是否接受FCA与30/70 T/T。",
    roles: ["买家：给出真实需求和进口条件", "业务员：把模糊询盘变成可报价参数", "工厂计划员：判断产能与物料周期"],
    why: "价格由规格、数量、包装、交付地点、时间和付款条件共同决定；任何一个缺失都可能让报价失真。",
    checks: ["用途与销售国家", "尺寸、材质、颜色和Logo工艺", "数量、MOQ与包装", "希望到货时间而非只问出厂时间", "交货地点、付款方式与是否需要样品"],
    mistakes: ["只回复‘请看报价’", "未区分客户希望到货日与卖方交货日", "没有确认进口商负责的认证或标签"],
    next: "将确认结果写进报价基础，标明有效期、样品安排和未包含项目。",
    related: ["customer-development", "contracts"],
  },
  {
    slug: "quote-sample",
    title: "怎样报价与寄样",
    date: "3月5日",
    happened: "工厂在3月5日出具报价Q-TAO-260305与PI-TAO-260305：2,000个，USD 8.80/个，FCA宁波卖方仓库，货值USD 17,600，有效期10天。样品及快递费USD 80另收；PI阶段付款条件仍待双方协商。",
    roles: ["业务员：制作报价与形式发票（PI）", "财务：核对收款信息", "样品组：制作并留样", "快递承运人：完成样品运输"],
    why: "书面报价把商业条件冻结在同一版本；留样让量产验收有明确基准。",
    checks: ["单价、数量、总额和币种计算", "贸易术语后是否写明地点与版本", "模具、包装、测试、运费哪些已包含", "样品与量产差异", "公司收款账户变更的复核机制"],
    mistakes: ["只写FOB/CIF不写港口", "把PI当作所有法域下都等同正式合同", "样品未编号、未留存确认记录"],
    next: "样品确认后，把规格附件、检验标准、交付和付款条件写进合同。",
    related: ["invoice-packing", "incoterms", "contracts"],
  },
  {
    slug: "terms-contract-payment",
    title: "怎样确认贸易术语、合同与付款",
    date: "3月10–12日",
    happened: "双方签署SC-TAO-260310，采用FCA宁波卖方仓库 Incoterms® 2020。3月12日收到30% T/T定金USD 5,280，约定余款USD 12,320在承运人提货前付清。",
    roles: ["双方业务：确认商业条件", "法务/负责人：审合同与争议条款", "银行与财务：识别到账而非只看水单"],
    why: "费用、风险和单据控制是三条不同的线；合同必须把它们与付款节点连接起来。",
    checks: ["货物规格附件与验收方法", "FCA的准确交货地点", "交期起算条件", "付款比例、到账条件和银行费用", "违约、不可抗力、法律适用与争议解决"],
    mistakes: ["把CIF理解为风险到目的港才转移", "只凭付款截图开工", "合同与PI的版本、金额或收款账户不一致"],
    next: "定金确认到账后下达生产单，建立关键节点与变更记录。",
    related: ["incoterms", "contracts", "payments", "letters-of-credit"],
  },
  {
    slug: "production-inspection",
    title: "怎样安排生产与验货",
    date: "3月13日–4月8日",
    happened: "工厂按确认样生产25天。首件在3月18日确认，中期抽查在3月30日，4月8日按合同抽样验货：数量、外观、容量、保温性能、Logo、包装和唛头均记录。",
    roles: ["跟单员：维护生产时间线", "车间：按版本生产", "质检：做首件、巡检与终检", "买家/第三方：按约定抽检"],
    why: "验货不是最后一天找问题，而是把高风险变化提前暴露并留下可追溯记录。",
    checks: ["BOM、颜色和Logo文件版本", "关键物料到货与产能", "检验标准、AQL或双方约定方法", "不合格品处置与复验", "箱数、重量、体积和唛头"],
    mistakes: ["口头接受变更不更新文件", "只查外观不查功能", "临近交期才确认包装尺寸，造成舱位或运费变化"],
    next: "终检通过并收到余款后，与买方指定承运人确认提货和出口申报资料。",
    related: ["production", "invoice-packing"],
  },
  {
    slug: "ship-customs",
    title: "怎样订舱、发货与报关",
    date: "4月9–13日",
    happened: "4月9日余款USD 12,320到账。买方指定货代安排主运输；4月11日卡车在卖方仓库装货并接管货物，FCA风险在约定交付完成时转移。卖方负责出口清关，4月13日货物装船。",
    roles: ["买方/货代：订舱和主运输", "卖方：备货、装车、出口清关", "报关行：按授权申报", "海关：审核、查验与放行", "承运人：接收并运输"],
    why: "运输计划、交付节点和报关数据必须同步，否则会出现甩柜、改单、查验延误或费用争议。",
    checks: ["订舱委托与截单/截港时间", "发票、箱单、合同和申报要素", "HS编码、数量、价格、原产国与监管证件", "箱号、封号和毛重", "谁承担查验、滞箱、改单等异常费用"],
    mistakes: ["把‘装船日’误当FCA风险转移日", "报关资料与实际包装不一致", "未保留交承运人的签收证据"],
    next: "取得运输信息后核对单据、发送装运通知，并完成收汇与退税资料归档。",
    related: ["logistics", "customs", "bill-of-lading", "insurance"],
  },
  {
    slug: "documents-collection-tax",
    title: "怎样处理单证、收汇与退税",
    date: "4月14日起",
    happened: "工厂已在4月10日制作商业发票INV-TAO-260410和装箱单PL-TAO-260410；货值为USD 17,600，箱数、净重、毛重和体积必须用包装完成后的实测数据补齐，不能猜测。4月14日起核对、归档此前形成的报关、收汇、进项与业务单证，并按适用规则处理；余款已于4月9日到账。",
    roles: ["单证员：制作并交叉核对单据", "财务：确认收汇性质、账务与退税", "银行：办理贸易外汇收支审核", "税务机关：审核退（免）税", "买家：完成进口与提货"],
    why: "单据不是流程尾声的文书工作，而是证明交易、物流、收付款和税务处理相互吻合的证据链。",
    checks: ["合同、发票、箱单、报关与运输数据一致", "收款人、付款人和交易背景合理", "退税率与政策属性按当期HS查询", "零退税率究竟适用免税还是征税", "备案单证保存与异常说明"],
    mistakes: ["沿用旧的逐票‘外汇核销’说法", "认为0%一律只是没有退税", "把海运提单一概说成必然控制货权"],
    next: "复盘报价、质量、交期与异常，将可复用的资料沉淀为下一单模板。",
    related: ["invoice-packing", "origin-certificate", "tax-refund", "forex", "bill-of-lading"],
  },
];

export const topics: Topic[] = [
  {
    slug: "trade-basics", category: "起点", title: "一笔出口订单里，谁在做什么？", question: "先看懂交易、物流、资金和监管四条线。", plain: "国际贸易不是一条直线，而是买卖双方、承运人、银行和监管机构在不同时间完成各自承诺。",
    details: ["交易线：询盘、报价、合同、生产与验收。", "物流线：交承运人、出口申报、国际运输、进口清关与交付。", "资金线：定金、尾款、托收或信用证项下付款。", "监管线：海关、税务、外汇和产品合规资料共同证明业务真实。"],
    caseUse: "案例用FCA：卖方在宁波仓库完成约定交付并负责出口手续，买方安排主运输。付款采用30/70 T/T。", keyPoints: ["贸易术语不替代销售合同", "报关行代理申报不等于承担货物真实性责任", "银行审核单据或交易背景，不替买家验货"], recap: "把每个问题先归到交易、物流、资金或监管，再找对应责任人。", related: ["export-readiness", "incoterms", "payments"], visual: "map", keywords: ["国际贸易", "角色", "流程", "出口商", "进口商"], updated: "2026-10-05",
    source: [{label:"海关报关单位备案办事指南",url:"https://online.customs.gov.cn/static/pages/guides/000729014000/000729014000.html"}]
  },
  {
    slug: "export-readiness", category: "起点", title: "工厂第一次出口，要先办哪些准备？", question: "企业能出口、产品能出口、目的国能进口，三层都要过。", plain: "先确认企业备案与收汇路径，再用准确产品资料核对HS编码、监管条件和目的市场准入。",
    details: ["报关单位备案可通过国际贸易‘单一窗口’或海关政务服务平台办理。", "开展首笔货物贸易外汇收支前，一般需在境内银行办理名录登记；小微跨境电商等例外须按适用规则判断。", "电子口岸操作介质、退（免）税备案与银行账户按实际业务准备。", "食品接触材料、标签、认证与测试应按销售国家、材质和用途核查。"], caseUse: "保温杯先整理304不锈钢、涂层、密封件和食品接触测试资料；HS 9617.00仅作教学示例，不可直接复制报关。", keyPoints: ["经营资格不等于产品当然合规", "HS编码取决于客观商品属性", "买家要求不是目的国法规的唯一来源"], recap: "先做身份、商品、目的国三张清单，再报价。", related: ["customs", "origin-certificate", "forex"], visual: "timeline", keywords: ["进出口权", "海关备案", "单一窗口", "电子口岸", "HS编码"], updated: "2026-10-06", source: [{label:"海关进出口货物收发货人备案办事指南",url:"https://online.customs.gov.cn/static/pages/guides/000729011000/000729011000.html"},{label:"国家外汇管理局优化贸易外汇业务通知",url:"https://www.safe.gov.cn/safe/2024/0407/24204.html"}]
  },
  {
    slug: "customer-development", category: "成交", title: "怎样开发客户，又不把询盘当订单？", question: "先筛选匹配度，再用问题把需求变成可报价信息。", plain: "有效开发不是广撒网，而是找到可能采购这类产品的人，并逐步验证公司、需求、预算、时点和决策权。", details: ["渠道可以是B2B平台、展会、搜索引擎、行业名录、社媒与老客转介。", "首封联系说明你看到了什么、能解决什么，并提出一个容易回答的问题。", "询盘至少确认产品用途、规格、数量、包装、目的地、交期和付款偏好。", "客户背景核验包含企业注册、域名、公开业务、收货与付款主体是否合理。"], caseUse: "案例客户销售户外用品，询盘经过规格、数量、德国市场和到货时间验证后，才进入报价。", keyPoints: ["回复快不等于草率报价", "不要仅凭WhatsApp头像判断身份", "收款账户变更要走独立复核"], recap: "好的询盘处理，是用七个关键问题减少后续返工。", related: ["trade-basics", "contracts"], visual: "flow", keywords: ["客户开发", "询盘", "谈判", "B2B", "RFQ", "MOQ"], updated: "2026-10-05", source: []
  },
  {
    slug: "incoterms", category: "成交", title: "FOB和CIF有什么区别？", question: "费用、风险、保险分别看，不能用‘到岸/离岸’一句话代替。", plain: "Incoterms® 2020规定交付、风险、费用和进出口手续分工，但不规定货权、付款或违约责任。", details: ["三个维度不能混为一谈：责任（谁来安排）、费用（谁付钱）、风险（货物损坏何时转移）相互独立。CIF的典型陷阱就是卖方付运费和保险至目的港，但风险在装运港装船时已转移。", "FOB：仅适用于海运/内河运输；货物装上买方指定船舶时交付并转移风险，卖方不承担主运费，无强制投保义务。", "CIF：卖方支付至目的港的运费并按规则投保最低范围（通常ICC(C)），但风险仍在装运港货物装上船时转移——费用终点晚于风险转移点。", "FCA：适用任何运输方式；在约定地点交给买方指定承运人，通常更适合集装箱或多式联运。", "CIP：卖方付运费并承担较高范围的保险义务（通常ICC(A)），风险仍在货交承运人时转移。"], caseUse: "案例选择FCA宁波卖方仓库：卖方装上买方安排的来车并交给承运人时完成交付；卖方仍负责出口清关。", keyPoints: ["2020规则下FOB/CIF用‘装上船’，不是‘越过船舷’", "C类术语的费用终点晚于风险转移点", "集装箱货常优先考虑FCA而非机械套用FOB"], recap: "先选运输方式，再分别画交付/风险、费用、保险三条线。", related: ["logistics", "insurance", "contracts"], visual: "compare", keywords: ["FOB", "CIF", "FCA", "CIP", "EXW", "DDP", "风险转移", "Incoterms"], updated: "2026-10-05", source: [{label:"ICC Incoterms® 2020选择清单",url:"https://library.iccwbo.org/content/clp/Others/incoterms_2020_checklist_2024-update.pdf"},{label:"ICC FCA规则说明",url:"https://library.iccwbo.org/content/tfb/BOOKS/BK_0049/BK_0049_04_RulesAny.htm"},{label:"DHL Incoterms 2020国际贸易术语完整指南",url:"https://www.dhl.com/discover/zh-cn/logistics-advice/essential-guides/what-are-incoterms"}]
  },
  {
    slug: "contracts", category: "成交", title: "外贸合同至少要写清什么？", question: "把货、钱、时间、证据和出问题后的处理写到同一版本。", plain: "合同的价值不是格式正式，而是让双方能判断是否履约，并在争议时找到证据与处理路径。", details: ["主体：完整公司名、地址、签署权限与通知方式。", "货物：规格、图纸、样品编号、数量允差、包装和验收。", "商业：价格、币种、术语地点与版本、税费和付款节点。", "风险：延期、质量异议、不可抗力、制裁合规、法律适用和争议解决。"], caseUse: "案例合同把PI、确认样和包装唛头作为附件，并写明FCA宁波卖方仓库、Incoterms® 2020及余款到账后提货。", keyPoints: ["PI可以承载交易条件，但不要假定它天然覆盖所有合同风险", "术语必须跟准确地点", "变更要留书面版本和生效规则"], recap: "能验收、能计算、能追责，才是可执行的合同。", related: ["incoterms", "payments", "production"], visual: "document", keywords: ["合同", "销售合同", "形式发票", "PI", "争议解决"], updated: "2026-10-05", source: []
  },
  {
    slug: "payments", category: "收款", title: "T/T、L/C、D/P和D/A怎样区分？", question: "看谁先交货、谁先付款，以及银行是否承担付款承诺。", plain: "四种方式的核心差别，是货物、单据和资金流动的先后，以及银行扮演结算通道还是独立承诺人。", details: ["T/T：银行电汇；风险取决于预付比例和发货前是否到账。", "L/C：满足信用证条件的单据提示后，开证行按信用证承担付款责任；银行不验货。", "D/P：托收项下付款交单，银行通常不承诺买方一定付款。", "D/A：买方承兑远期汇票后即可取得单据，卖方承担更高到期不付款风险。"], caseUse: "案例采用30%定金+70%发货前到账，避免首单在交付后形成大额买方信用敞口。", keyPoints: ["水单不是到账", "托收银行通常只是代收", "信用证降低买方信用风险但引入单证和银行/国家风险"], recap: "画出货、单、钱三条箭头，就能看清谁在给谁信用。", related: ["letters-of-credit", "bill-of-lading", "forex"], visual: "flow", keywords: ["T/T", "L/C", "D/P", "D/A", "OA", "电汇", "托收", "付款"], updated: "2026-10-05", source: [{label:"ICC UCP 600规则",url:"https://library.iccwbo.org/content/tfb/RULES/tfb-ucp600-rules.htm"}]
  },
  {
    slug: "letters-of-credit", category: "收款", title: "信用证单据必须逐字一致吗？", question: "不是机械逐字相同，而是按信用证、UCP 600和国际标准银行实务判断是否相符且不冲突。", plain: "信用证是独立于销售合同的单据交易；银行在表面上审查规定单据，不检查货物实际质量。", details: ["UCP 600第14条：数据不必完全相同，但不得与信用证、同一单据或其他规定单据冲突。", "商业发票的货物描述通常要求更贴近信用证；其他单据可用不冲突的概括描述。", "运输单据通常应在装运日起21个日历日内提示，且不得晚于信用证到期日，除非信用证另有规定。", "开证前应审查软条款、不可控制单据、最迟装运日、交单期和银行风险。"], caseUse: "若案例改用L/C，工厂会先做条款预审清单，再按同一数据源制作发票、箱单、运输与原产地单据。", keyPoints: ["资料原文‘一字不差’和‘镜像一致’过度绝对化", "拼写差异不必然构成不符点", "相符交单不等于买家认可货物"], recap: "信用证审单追求不冲突和满足功能，不是无条件逐字复制。", related: ["payments", "invoice-packing", "bill-of-lading"], visual: "flow", keywords: ["信用证", "L/C", "UCP600", "不符点", "开证行", "交单"], updated: "2026-10-05", source: [{label:"ICC UCP 600 Article 14",url:"https://library.iccwbo.org/content/tfb/RULES/tfb-ucp600-rules.htm"},{label:"ICC ISBP原则",url:"https://library.iccwbo.org/content/tfb/RULES/tfb-isbp-2013-02.htm"}]
  },
  {
    slug: "production", category: "履约", title: "生产跟单要盯哪些节点？", question: "围绕版本、物料、质量和交期建立能提前暴露风险的节点。", plain: "跟单不是每天问‘好了没有’，而是用明确输入、里程碑和异常升级机制把承诺变成可控计划。", details: ["开工前冻结BOM、图稿、颜色、包装与检验标准。", "首件确认解决‘做得对不对’，中期巡检解决‘批量是否跑偏’，终检解决‘能否放行’。", "进度表至少含物料、关键工序、包装、验货、最晚交承运人日期。", "变更需评估价格、交期、库存与合规影响后书面确认。"], caseUse: "案例用确认样编号S-260305作为验货基准，4月8日终检通过后才允许进入交付。", keyPoints: ["到货日不等于交货日", "检验标准要在生产前确定", "发现延误要给影响和恢复计划"], recap: "好跟单让问题在还能修正时被看见。", related: ["contracts", "logistics", "invoice-packing"], visual: "timeline", keywords: ["跟单", "生产", "验货", "AQL", "样品"], updated: "2026-10-05", source: []
  },
  {
    slug: "logistics", category: "运输", title: "海运订舱到离港，关键节点是什么？", question: "倒排截单、进港、报关、装船与单据时间，并预留查验和甩柜缓冲。", plain: "海运计划要把商业交期转成承运人和口岸的多个截止时间，任何一项错过都可能滚到下一航次。", details: ["确认起运港、目的港、箱型/体积、危险属性、贸易术语和谁订舱。", "取得SO后核对船名航次、ETD/ETA、截补料、截VGM、截港和免用箱期。", "装箱时记录箱号、封号、件数、重量和照片。", "装船后获取运输单据草稿并发送装运通知。"], caseUse: "案例FCA由买家货代订舱，卖方仍提供100箱、760kg、4.8m³与提货窗口，确保来车和报关衔接。", keyPoints: ["ETD/ETA是计划，不是保证", "拼箱与整箱的交接节点不同", "滞箱、滞港、堆存是不同费用"], recap: "先锁责任人，再倒排所有截止时间。", related: ["incoterms", "customs", "bill-of-lading"], visual: "timeline", keywords: ["海运", "订舱", "SO", "ETD", "ETA", "VGM", "截关"], updated: "2026-10-05", source: []
  },
  {
    slug: "customs", category: "运输", title: "出口报关前需要核对哪些资料？", question: "申报的是实际货物事实，合同、发票、箱单和申报要素必须能相互解释。", plain: "报关是向海关如实说明谁出口、出口什么、数量价值是多少、运到哪里，以及需要办理哪些监管手续；报关行负责专业申报，企业仍须提供并核实真实信息。", details: ["用产品客观属性、功能、用途、形态和品牌资料判断HS归类，不只看商品俗名。洗发水、护发素和精油要分别判断。", "核对合同、最终商业发票、装箱单、运输单据、报关委托、申报要素与适用许可证件；资料齐备不等于每份文件每票都必须上传。", "一般出口申报规则涉及货物运抵监管区后、装货24小时以前的申报时点，符合条件的提前申报等安排需另行判断；这不是24小时放行承诺。", "放行、装船、实际出境和客户收货是不同状态。补件或查验后要回到核对与审核流程，并保留处理记录。"], caseUse: "页面保留2,000个保温杯案例，并新增泛华向马来西亚出口2,000瓶500ml洗发水的虚构案例。两套案例数据完全隔离；洗发水的价格、重量、配方和HS编码不预设。", keyPoints: ["委托报关不转移申报真实性责任", "500ml容量不能换算成500克毛重", "第284号令到2026-12-01才施行，届时需重新核验", "中国出口放行不替代马来西亚NPRA通报与进口销售要求"], recap: "先确认主体、商品、单据与运输事实，再核草稿、跟状态、确认实际出口。", related: ["export-readiness", "invoice-packing", "tax-refund"], visual: "document", keywords: ["报关", "清关", "HS编码", "申报要素", "查验", "海关", "洗发水", "化妆品", "SDS"], updated: "2026-10-07", source: [{label:"海关货物申报办事指南",url:"https://online.customs.gov.cn/static/pages/guides/000629002001/000629002001.html"},{label:"海关总署第277号令（2025-05-01施行）",url:"https://www.mofcom.gov.cn/zcfb/zgdwjjmywg/art/2025/art_703b3595d0b540a3aec57766577e5481.html"},{label:"单一窗口货物申报用户手册（2024版）",url:"https://www.singlewindow.cn/fs/STADOCROOT/F8/9B/53/7D52670F45AD7E4C9F12D61D26.pdf"},{label:"海关总署第284号令（2026-12-01起施行）",url:"https://www.singlewindow.cn/fs/STADOCROOT/31/EA/49/0C6D02129200CF030D96AD6073.pdf"},{label:"马来西亚NPRA化妆品监管入口",url:"https://www.npra.gov.my/index.php/my/cosmetic-main-page.html"}]
  },
  {
    slug: "insurance", category: "运输", title: "货运保险由谁买，保什么？", question: "先看合同和术语中的投保义务，再看保险条款实际承保范围。", plain: "保险义务、费用承担与运输风险转移不是同一件事；有投保不等于所有损失都赔。", details: ["CIF与CIP要求卖方投保，但默认承保范围不同；其他术语可由双方另约。", "投保要核对被保险人、货物、运输区间、保险金额、险别、免赔与除外责任。", "包装不良、迟延、自然损耗等常见情形可能属于除外或受限。", "出险后立即通知保险人/检验代理、减损并向责任方保留追偿。"], caseUse: "案例FCA下由买方安排主运输保险；卖方仍应提供准确包装、重量和交付记录。", keyPoints: ["风险已转移不代表卖方当然免责", "一切险不等于一切都赔", "110%是常见做法，不应脱离合同和保险条款机械套用"], recap: "看谁必须买、保到哪里、哪些损失不赔。", related: ["incoterms", "logistics", "bill-of-lading"], visual: "compare", keywords: ["货运保险", "CIF", "CIP", "一切险", "免赔额", "索赔"], updated: "2026-10-05", source: [{label:"ICC Incoterms® 2020海运规则",url:"https://library.iccwbo.org/content/tfb/BOOKS/BK_0049/BK_0049_05_RulesSea.htm"}]
  },
  {
    slug: "invoice-packing", category: "单证", title: "商业发票和形式发票有什么区别？", question: "PI用于磋商或预先确认条件；商业发票记录实际销售并用于履约与申报。", plain: "形式发票（Proforma Invoice, PI）通常是报价/预确认文件，商业发票（Commercial Invoice）则围绕已经发生或执行中的销售开具。", details: ["发票核对卖买方、编号日期、合同、货物描述、数量、单价、总额、币种和贸易术语。", "箱单按包装层级列件数、每箱数量、净重、毛重、体积和唛头。", "净重是货物本身，毛重包含包装；体积按最长×最宽×最高并统一单位。", "信用证项下按信用证、UCP和ISBP要求制单，单据数据需不冲突。"], caseUse: "案例商业发票USD 17,600；装箱单100箱、净重620kg、毛重760kg、4.8m³，与报关和运输数据交叉核对。", keyPoints: ["PI不是当然等同报关用商业发票", "箱单一般不列价格", "重量/体积不是估个整数就行"], recap: "发票讲价值，箱单讲怎么装；两者必须描述同一批货。", related: ["letters-of-credit", "customs", "bill-of-lading"], visual: "document", keywords: ["商业发票", "形式发票", "Commercial Invoice", "Proforma Invoice", "装箱单", "Packing List"], updated: "2026-10-06", source: [{label:"ICC UCP 600",url:"https://library.iccwbo.org/content/tfb/RULES/tfb-ucp600-rules.htm"},{label:"FedEx官方空白商业发票模板",url:"https://www.fedex.com/content/dam/fedex/eu-europe/downloads/FedEx-Commercial-Invoice.pdf"}]
  },
  {
    slug: "bill-of-lading", category: "单证", title: "电放是什么意思？提单一定能控制货权吗？", question: "电放是承运人按托运人指示在目的港免交正本放货；提单的控制效果取决于单据类型、适用法律与实际操作。", plain: "海运提单可证明承运人收货/装船与运输合同，并在特定类型和法律下具有权利凭证功能，但不能简单理解为任何情况下都‘拿单就控制货物’。", details: ["正本提单通常需交回承运人或按规则处理后放货。", "电放前应由有权指示方提交申请，并确认收款与合同条件。", "海运单（Sea Waybill）通常不是可转让权利凭证，常凭身份放货。", "记名提单是否须凭正本提货受签发条款、目的地法律和承运人操作影响。"], caseUse: "案例采用FCA且发货前收清款，单据用途主要是运输与进口协作，不把提单作为尾款控制工具。", keyPoints: ["资料原文‘提货唯一凭证’过度绝对", "House B/L与Master B/L要分清签发人", "未收款不要草率发出电放指示"], recap: "先识别单据类型、签发人、放货规则和适用法律。", related: ["logistics", "payments", "insurance"], visual: "document", keywords: ["提单", "B/L", "电放", "Telex Release", "Sea Waybill", "无单放货"], updated: "2026-10-05", source: []
  },
  {
    slug: "origin-certificate", category: "单证", title: "客户要原产地证，先判断哪一种？", question: "根据进口国、适用协定、产品原产资格和进口优惠要求选择证书。", plain: "原产地证书证明货物的经济国籍；优惠原产地证还要满足相应贸易协定的原产规则。", details: ["一般原产地证主要证明来源；优惠证用于申请协定税率。", "选择证书不能只看客户口头说FORM E或FORM A，要看当前协定和进口要求。", "原产资格可能基于完全获得、税则归类改变、区域价值成分或特定加工。", "申请时核对发票、运输、生产和原材料信息，留存证明原产资格的资料。"], caseUse: "案例若德国买家要求一般原产地证，工厂通过相应签证渠道申办；是否享受优惠税率另按欧盟适用安排核实。", keyPoints: ["从中国发货不必然等于中国原产", "证书名称和协定会变化", "不能为了优惠随意填写原产标准"], recap: "国家+协定+原产规则三项一起判断。", related: ["customs", "export-readiness", "invoice-packing"], visual: "flow", keywords: ["原产地证", "CO", "FORM E", "优惠原产地", "RCEP"], updated: "2026-10-05", source: [{label:"海关原产地证书签发办事指南",url:"https://online.customs.gov.cn/static/pages/guides/000729003002/000729003002.html"}]
  },
  {
    slug: "tax-refund", category: "收尾", title: "出口退税怎么理解，0%就是不能退吗？", question: "退税率为0还要区分适用出口免税还是出口征税，不能只按‘没有退税’处理。", plain: "出口退（免）税是对符合条件的出口业务按现行制度免征并退还或抵扣国内环节相关税额，不是凭出口额额外奖励。", details: ["外贸企业免退税与生产企业免抵退税的计算路径不同。", "退税额受合法有效进货凭证、计税依据、退税率、商品政策属性和申报数据影响。", "2020年后，未在原规定期限申报或收汇的，符合规定时可在凭证、信息收齐或收汇后申报；不要机械沿用‘次年4月30日后绝对不能申报’。", "0%商品需查询系统提示与适用政策，区分免税与视同内销征税等情形。"], caseUse: "案例不写死保温杯退税率；财务在实际出口当期按HS与政策属性查询，并基于真实进项和报关数据测算。", keyPoints: ["资料中的13%/9%/0%只是情景测算", "2–4个月不是统一法定退税周期", "退税与利润不能脱离进项税和企业类型"], recap: "先确认企业类型、商品政策属性、凭证和当期税率，再计算。", related: ["customs", "invoice-packing", "forex"], visual: "flow", keywords: ["出口退税", "免抵退", "免退税", "零退税率", "进项税"], updated: "2026-10-05", source: [{label:"国家税务总局出口退税申报期限答复",url:"https://www.chinatax.gov.cn/chinatax/c102449/c5232652/content.html"},{label:"国家税务总局新退（免）税管理办法说明",url:"https://www.chinatax.gov.cn/chinatax/n810219/n810724/c5247479/content.html"}]
  },
  {
    slug: "forex", category: "收尾", title: "现在还要逐票做'外汇核销'吗？", question: "旧式逐笔核销已退出，现行重点是银行真实性审核、名录管理和外汇局总量监测与异常核查。", plain: "企业通过银行办理货物贸易外汇收支，并对真实合法交易背景负责；外汇局运用报关与收付款等数据开展监测。", details: ["自2024年6月1日起，企业原则上在首笔货物贸易外汇收支前到境内银行办理名录登记。", "银行按展业原则审核交易背景、主体和收付汇信息。", "预收、延收、退款、第三方付款等特殊情形要按适用规则准备解释与报告。", "企业应让合同、发票、报关、物流与收付款形成合理匹配，但并非所有业务机械逐票一对一。"], caseUse: "案例两笔T/T共USD 17,600，付款方、合同买方和报关交易背景一致；财务保留定金与尾款对应说明。", keyPoints: ["资料中的'必须一对一或多对多匹配'过度绝对", "名录登记已由银行直接办理", "汇率套保是风险管理，不是保证额外收益"], recap: "不再是老式核销单逻辑，核心是真实、可解释、可追溯。", related: ["payments", "tax-refund", "trade-basics"], visual: "flow", keywords: ["外汇核销", "收汇", "名录登记", "数字外管", "预收货款", "延期收款"], updated: "2026-10-05", source: [{label:"国家外汇管理局优化贸易外汇业务通知",url:"https://www.safe.gov.cn/sichuan/2024/0407/2784.html"},{label:"货物贸易外汇名录登记说明",url:"https://www.safe.gov.cn/beijing/2024/0607/2394.html"}]
  },
  {
    slug: "trade-risks", category: "风控", title: "外贸常见风险有哪些，怎样提前防范？", question: "从信用、汇率、合规、物流和知识产权五个维度建立风险清单。", plain: "外贸风险不是'出事了才处理'，而是在接单、报价、生产和交付的每个节点提前识别并设置防线。", details: ["信用风险：买方违约或拒付；用预付比例、信用证或信保工具控制敞口。", "汇率风险：报价与收款之间的汇率波动；用远期、期权或合同汇率条款对冲。", "合规风险：产品不符合目的国准入、被限制或制裁；提前查认证、标签和管制清单。", "物流风险：灭失、延误、甩柜和滞期；选对术语、保险和承运人并保留签收证据。", "知识产权风险：产品在目的国被抢注商标或专利侵权；做FTO排查并注册自有商标。"], caseUse: "案例用30/70 T/T把发货前敞口控制在70%尾款；FCA让买方承担主运输风险。如改用L/C或出口信用保险，可进一步覆盖买方信用。", keyPoints: ["风险不是用一种工具消除全部", "预付不是越多越好，要匹配买方关系", "出口信用保险是工具而非万能盾牌"], recap: "先列出风险类型和金额敞口，再为每个风险选至少一道防线。", related: ["payments", "insurance", "contracts", "forex"], visual: "flow", keywords: ["外贸风险", "信用风险", "汇率风险", "出口信用保险", "合规风险", "知识产权"], updated: "2026-10-05", source: [{label:"中国出口信用保险公司",url:"https://www.sinosure.com.cn/"}]
  },
  {
    slug: "e-commerce-export", category: "风控", title: "跨境电商B2B出口和传统外贸有什么不同？", question: "报关方式、收汇路径和平台角色都有变化，但合规底线不变。", plain: "跨境电商出口通过平台连接买卖双方，报关和物流常由平台或综合服务商代办，但企业仍对申报真实性和交易背景负责。", details: ["B2B直接出口（9710）和B2B海外仓出口（9810）是海关监管代码，适用跨境电商B2B。", "收汇可通过平台收单后结汇到企业账户，或通过第三方支付机构；仍需符合外汇真实性要求。", "平台规则不替代贸易术语和合同；平台纠纷处理有其时效和规则限制。", "食品、医疗器械等特殊品类即使走跨境电商也需满足准入和标签要求。"], caseUse: "如案例产品改为通过亚马逊或B2B平台出口，需按平台仓库要求备货和贴标，报关可走9710监管方式，收汇通过平台收单后结汇。", keyPoints: ["9710/9810是监管代码，不是免税通道", "平台代报关不转移企业申报责任", "跨境电商退税条件与传统贸易一致，须有合规进货凭证和报关数据"], recap: "平台改变的是通道和效率，不是合规底线。", related: ["customs", "tax-refund", "forex", "trade-basics"], visual: "flow", keywords: ["跨境电商", "9710", "9810", "B2B出口", "海外仓", "亚马逊", "平台"], updated: "2026-10-05", source: [{label:"海关跨境电商监管方式说明",url:"https://online.customs.gov.cn/"}]
  },
  {
    slug: "trade-finance", category: "风控", title: "出口贸易融资有哪些常见工具？", question: "融资是用未来应收款或单据换取当下资金，关键是成本、控制和还款来源。", plain: "贸易融资让企业在等待收款期间获得流动资金，但不同工具的担保方式、成本和风险转移程度不同。", details: ["打包贷款：以信用证为依据在生产前获得融资，通常需开证行确认。", "出口押汇/贴现：交单后以单据或应收款为质押获得预付资金。", "福费廷（Forfaiting）：无追索权地买断远期信用证项下应收款，卖方将信用风险转移给融资方。", "出口保理：保理商提供应收款管理、催收和坏账担保，可带追索或不带追索。"], caseUse: "若案例改用60天远期L/C，工厂可考虑押汇或福费廷提前获得资金，但需比较融资成本与订单利润是否匹配。", keyPoints: ["有无追索权决定坏账由谁承担", "融资成本不是只有利率", "福费廷转移信用风险但通常需信用证项下"], recap: "先确认还款来源和追索权，再比较融资成本与订单利润。", related: ["payments", "letters-of-credit", "forex", "trade-risks"], visual: "flow", keywords: ["贸易融资", "打包贷款", "押汇", "福费廷", "保理", "Forfaiting", "应收账款"], updated: "2026-10-05", source: []
  },
];

export const notes = [
  { slug: "three-lines-of-incoterms", title: "别再只问‘运费谁付’：贸易术语要画三条线", summary: "用费用、风险、保险三条线拆开FOB、CIF与FCA，避免把目的港和风险终点混在一起。", date: "2026-10-05", category: "贸易术语", related: ["incoterms", "insurance"], body: ["很多争议来自把三个问题说成一个问题：谁付运费、货物灭失风险何时转移、谁有义务投保。它们可能在不同节点分开。", "CIF中卖方支付到目的港的主运费并投保，但风险通常在装运港货物装上船时转移；FCA则在约定地点交承运人时转移风险。", "实务中先写完整地点和规则版本，再把三条线分别标出。合同还要另行解决付款、货权和违约。"] },
  { slug: "first-inquiry-seven-questions", title: "第一次收到询盘，先问这7个问题", summary: "在报价格前确认用途、规格、数量、包装、目的地、到货时间和付款偏好。", date: "2026-10-05", category: "客户沟通", related: ["customer-development", "contracts"], body: ["询盘里常只有一张图片和一句‘best price’。直接报最低价，会把所有未知风险都塞进数字。", "依次确认用途与市场、规格材质、数量、包装、交付地点、期望到货时间、付款方式。客户答不全也没关系，先标出报价基于哪些假设。", "回复要短而具体：先复述已知需求，再一次提出三到四个最影响价格的问题，并说明得到答案后何时给正式报价。"] },
  { slug: "document-cross-check", title: "发货前10分钟：用一张表交叉核对单据", summary: "把合同、发票、箱单、报关资料和运输补料放到同一数据源检查。", date: "2026-10-05", category: "单证", related: ["invoice-packing", "customs", "bill-of-lading"], body: ["单据错误往往不是不会填，而是多个人从不同版本复制。最有效的做法是建立一张主数据表。", "逐项检查主体名称、发票号、合同号、货名、数量、单位、币种、金额、箱数、毛净重、体积、唛头、箱号封号、港口和日期。", "发现差异先回到实际货物与合同，而不是让所有单据盲目互相抄成同一个错误。"] },
  { slug: "container-loading-photo", title: "装柜前到离港：拍这6类照片留证据", summary: "空柜、装半、满柜、封条、箱号和唛头，每类拍至少一张。", date: "2026-10-05", category: "物流", related: ["logistics", "bill-of-lading", "insurance"], body: ["装柜照片不是发朋友圈，是出险索赔、责任划分和异常说明的证据。", "六类关键照片：空柜内壁（确认无破损）、装半（展示码放方式）、满柜（确认填满方式）、封条号特写、箱号特写、唛头特写。", "照片要带时间戳，存入项目文件夹并同步给货代和买方指定人。出险时这些照片能快速说明货物状态和交接节点。"] },
  { slug: "price-validity-reminder", title: "报价有效期：不是写个数，是管住风险", summary: "有效期覆盖汇率、原材料和运费的波动窗口，到期前主动复盘。", date: "2026-10-05", category: "报价", related: ["customer-development", "contracts", "forex"], body: ["很多业务员把报价有效期当格式项随手填30天，但有效期的本质是给报价设定一个风险可控的时间窗口。", "汇率、原材料和海运费都在波动。如果报价后30天内汇率跳了3%，而有效期又写得过长，利润就可能被吃掉。", "合理做法：根据产品成本结构和市场波动确定有效期，在到期前2-3天主动联系客户提醒复盘，而不是等客户在你过期报价上直接下单。"] },
];

export const glossary: Record<string, { title: string; text: string; topic: string }> = {
  MOQ: { title: "MOQ · Minimum Order Quantity", text: "最小起订量：供应商愿意接受的最低订单数量；可以按颜色、型号或整单分别设定。", topic: "customer-development" },
  "HS编码": { title: "HS编码 · Harmonized System Code", text: "商品归类编码。归类依据商品的材质、结构、功能和用途等客观属性，不应只凭商品俗名。", topic: "customs" },
  "提单": { title: "提单 · Bill of Lading (B/L)", text: "承运人签发的运输单据，可证明收货/装船和运输合同；部分类型在适用法律下具有权利凭证功能。", topic: "bill-of-lading" },
  "信用证": { title: "信用证 · Letter of Credit (L/C)", text: "银行按信用证条件对相符交单承担付款承诺的独立安排；银行审单，不替买家验货。", topic: "letters-of-credit" },
  "报关": { title: "报关 · Customs Declaration", text: "向海关申报进出口货物事实并接受审核、查验和放行管理的过程。", topic: "customs" },
  "电放": { title: "电放 · Telex Release", text: "托运人指示承运人在目的港免交正本提单即放货的方式；需确认收款条件后再指示。", topic: "bill-of-lading" },
  "退税": { title: "退税 · Export Tax Refund", text: "对符合条件的出口业务按现行制度免征并退还或抵扣国内环节相关税额，不是凭出口额额外奖励。", topic: "tax-refund" },
  "FOB": { title: "FOB · Free On Board", text: "装运港货物装上买方指定船舶时交付并转移风险；仅适用于海运/内河运输。", topic: "incoterms" },
  "CIF": { title: "CIF · Cost, Insurance and Freight", text: "卖方付运费和最低保险至目的港，但风险在装运港装船时转移。", topic: "incoterms" },
  "FCA": { title: "FCA · Free Carrier", text: "卖方在指定地点将货物交给买方指定的承运人即完成交付；适用任何运输方式。", topic: "incoterms" },
  "DDP": { title: "DDP · Delivered Duty Paid", text: "卖方负责出口、运输、进口清关及所有税费，在指定目的地交付；卖方风险和成本最大。", topic: "incoterms" },
  "EXW": { title: "EXW · Ex Works", text: "卖方在指定场所将货物置于买方处置即完成交付；卖方不负责装车或出口清关。", topic: "incoterms" },
  "T/T": { title: "T/T · Telegraphic Transfer", text: "银行电汇付款方式；风险取决于预付比例和发货前是否到账。", topic: "payments" },
  "D/P": { title: "D/P · Documents against Payment", text: "托收项下付款交单：买方付款后银行才交出单据；银行通常不承诺买方一定付款。", topic: "payments" },
  "D/A": { title: "D/A · Documents against Acceptance", text: "买方承兑远期汇票后取得单据，到期才付款；卖方承担更高到期不付款风险。", topic: "payments" },
  "唛头": { title: "唛头 · Shipping Mark", text: "运输包装上的标识，通常含收货人、目的港、箱号和件数等信息，用于识别和清点货物。", topic: "invoice-packing" },
  "VGM": { title: "VGM · Verified Gross Mass", text: "集装箱核实的总重量，含货物和包装；发货人需在截VGM前向承运人申报。", topic: "logistics" },
  "AQL": { title: "AQL · Acceptable Quality Limit", text: "可接受质量限：抽样检验中允许的不合格品比例上限，常用于终检判定。", topic: "production" },
  "原产地证": { title: "原产地证 · Certificate of Origin", text: "证明货物经济国籍的文件；优惠原产地证还需满足相应贸易协定的原产规则。", topic: "origin-certificate" },
  "福费廷": { title: "福费廷 · Forfaiting", text: "无追索权地买断远期信用证项下应收款，卖方将信用风险转移给融资方。", topic: "trade-finance" },
};

export function topicBySlug(slug: string) { return topics.find((item) => item.slug === slug); }
export function stepBySlug(slug: string) { return steps.find((item) => item.slug === slug); }
export function noteBySlug(slug: string) { return notes.find((item) => item.slug === slug); }
