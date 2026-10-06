export type MaterialCard = {
  title: string;
  who: string;
  prepare: string;
  result: string;
  url: string;
  linkLabel: string;
};

export type MaterialMedia = {
  src: string;
  alt: string;
  title: string;
  note: string;
  sourceLabel: string;
  sourceUrl: string;
};

export type MaterialGuide = {
  title: string;
  intro: string;
  cards: MaterialCard[];
  media?: MaterialMedia[];
  caseNote: string;
  invoiceExample?: boolean;
};

export const materialGuides: Record<string, MaterialGuide> = {
  "export-readiness": {
    title: "三个准备动作，分别找谁办理？",
    intro: "企业身份、商品归类和收汇路径是三件事。先分开准备，再让单证、财务与产品人员互相核对。",
    cards: [
      {
        title: "海关备案",
        who: "所在地海关；企业负责人或单证人员办理。",
        prepare: "企业基本信息与《报关单位备案信息表》；上传方式取决于登录方式。",
        result: "备案信息可查询；确需纸质证明时可向所在地海关申请。",
        url: "https://online.customs.gov.cn/static/pages/guides/000729011000/000729011000.html",
        linkLabel: "海关办事指南",
      },
      {
        title: "HS编码核对",
        who: "单证人员与产品人员整理资料，报关行协助核对；疑难事项向海关咨询。",
        prepare: "材质、结构、用途、工作原理、型号、图片与规格书。",
        result: "形成候选编码与归类依据；普通网页查询结果不等于最终归类裁定。",
        url: "https://online.customs.gov.cn/mySearch/",
        linkLabel: "海关综合查询入口",
      },
      {
        title: "贸易外汇名录登记",
        who: "境内银行国际业务或跨境结算人员。",
        prepare: "《贸易外汇收支企业名录申请表》及银行核验企业基本信息所需资料。",
        result: "完成名录登记，并可按官方通知在数字外管平台查询结果。",
        url: "https://www.safe.gov.cn/safe/2024/0407/24204.html",
        linkLabel: "外汇局政策通知",
      },
    ],
    media: [
      {
        src: "/materials/fx-registration-preview.png",
        alt: "贸易外汇收支企业名录申请表空白样表",
        title: "贸易外汇收支企业名录申请表",
        note: "官方空白表预览。重点认识统一社会信用代码、企业名称、联系人等字段；不要在公开页面展示真实身份证号或平台初始密码。",
        sourceLabel: "国家外汇管理局附件1",
        sourceUrl: "https://www.safe.gov.cn/safe/file/file/20240407/30588576a38d445cb43eb95247dcd881.pdf",
      },
    ],
    caseNote: "保温杯案例先整理是否真空、内外层材质、容量、结构和用途，再核对归类；本站不在产品资料不足时写死具体HS编码。",
  },
  customs: {
    title: "从进入申报到核对关键字段",
    intro: "报关单位备案解决企业申报身份；每笔货物申报解决这一票货物的事实。提交申报不等于已经放行。",
    cards: [
      {
        title: "每笔货物申报",
        who: "备案出口企业自行申报，或委托报关企业办理。",
        prepare: "合同、商业发票、装箱单、运输单据，以及货物所需许可证件和随附单证。",
        result: "形成申报数据与海关处理状态；继续确认审核、查验与放行结果。",
        url: "https://online.customs.gov.cn/static/pages/guides/000629002001/000629002001.html",
        linkLabel: "海关货物申报指南",
      },
    ],
    media: [
      {
        src: "/materials/customs-export-menu.png",
        alt: "国际贸易单一窗口出口整合申报菜单历史界面",
        title: "先找到“出口整合申报”入口",
        note: "2024版用户手册历史界面，仅用于认识入口位置；当前菜单与操作以现行系统为准。",
        sourceLabel: "单一窗口标准版用户手册（页内85）",
        sourceUrl: "https://www.singlewindow.cn/fs/STADOCROOT/F8/9B/53/7D52670F45AD7E4C9F12D61D26.pdf",
      },
      {
        src: "/materials/customs-export-form.png",
        alt: "国际贸易单一窗口出口报关单整合申报历史界面",
        title: "申报界面要核对哪些字段",
        note: "重点看境内收发货人、合同协议号、成交方式、商品编号、品名、数量、金额、毛重/净重、原产国与最终目的国。",
        sourceLabel: "单一窗口标准版用户手册（页内86）",
        sourceUrl: "https://www.singlewindow.cn/fs/STADOCROOT/F8/9B/53/7D52670F45AD7E4C9F12D61D26.pdf",
      },
    ],
    caseNote: "案例数据应统一为2,000个保温杯、USD 17,600、100箱、净重620kg、毛重760kg；HS编码仍须以实际商品资料核定。",
  },
  "invoice-packing": {
    title: "商业发票要让同一批货说同一种语言",
    intro: "模板没有全球统一强制格式，但交易双方、货物、数量、价值、币种、原产地和交付条款等核心事实必须准确，并与合同、装箱单和报关资料相互解释。",
    cards: [
      {
        title: "Commercial Invoice",
        who: "卖方业务员或单证人员制作，财务核对金额。",
        prepare: "双方名称地址、编号日期、品名、数量、单价、币种、总价、原产地、交付条款及必要运输信息。",
        result: "形成商业发票，用于描述货物和交易金额；它不是中国增值税发票。",
        url: "https://www.fedex.com/content/dam/fedex/eu-europe/downloads/FedEx-Commercial-Invoice.pdf",
        linkLabel: "查看FedEx官方空白模板",
      },
    ],
    caseNote: "以下填表示例全部为虚构教学数据，不代表真实客户、地址、市场价格或可直接用于报关的商品编码。",
    invoiceExample: true,
  },
};
