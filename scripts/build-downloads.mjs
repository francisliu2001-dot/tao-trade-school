import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outDir = path.resolve("public/downloads");
const previewDir = path.resolve(".template-previews");
await fs.mkdir(outDir, { recursive: true });
await fs.mkdir(previewDir, { recursive: true });

const C = { ink: "#11110F", yellow: "#FFE44D", blue: "#A9C8FF", cream: "#FBF7F0", line: "#D8D1C7", muted: "#68645D", white: "#FFFFFF", green: "#DDF4DE" };
const factory = "宁波澄川不锈钢制品厂（虚构）";
const buyer = "NorthPeak Trading GmbH（虚构）";
const note = "教学示例｜所有公司、地址和银行信息均为虚构占位；正式使用前请逐项核对。";

function baseSheet(wb, name, title, subtitle, cols = 8) {
  const s = wb.worksheets.add(name);
  s.showGridLines = false;
  s.mergeCells(`A1:${String.fromCharCode(64 + cols)}1`);
  s.getRange("A1").values = [[title]];
  s.getRange(`A1:${String.fromCharCode(64 + cols)}1`).format = { fill: C.ink, font: { color: C.white, bold: true, size: 20 }, rowHeight: 34, verticalAlignment: "center" };
  s.mergeCells(`A2:${String.fromCharCode(64 + cols)}2`);
  s.getRange("A2").values = [[subtitle]];
  s.getRange(`A2:${String.fromCharCode(64 + cols)}2`).format = { fill: C.yellow, font: { color: C.ink, bold: true }, rowHeight: 24, verticalAlignment: "center" };
  s.freezePanes.freezeRows(4);
  return s;
}

function styleTable(s, range, headerRange) {
  s.getRange(range).format.borders = { preset: "all", style: "thin", color: C.line };
  s.getRange(range).format.verticalAlignment = "center";
  s.getRange(range).format.wrapText = true;
  s.getRange(headerRange).format = { fill: C.blue, font: { color: C.ink, bold: true }, rowHeight: 30, verticalAlignment: "center", wrapText: true, borders: { preset: "all", style: "thin", color: C.ink } };
}

function addFooter(s, row, cols = 8) {
  const end = String.fromCharCode(64 + cols);
  s.mergeCells(`A${row}:${end}${row}`);
  s.getRange(`A${row}`).values = [[note]];
  s.getRange(`A${row}:${end}${row}`).format = { fill: C.cream, font: { color: C.muted, italic: true }, rowHeight: 30, verticalAlignment: "center", wrapText: true, borders: { preset: "outside", style: "thin", color: C.line } };
}

function setWidths(s, widths) {
  widths.forEach((w, i) => s.getRangeByIndexes(0, i, 1, 1).format.columnWidth = w);
}

async function save(wb, filename) {
  wb.recalculate();
  const result = await SpreadsheetFile.exportXlsx(wb);
  await result.save(path.join(outDir, filename));
  for (let i = 0; i < wb.worksheets.items.length; i++) {
    const sheet = wb.worksheets.getItemAt(i);
    const png = await wb.render({ sheetName: sheet.name, autoCrop: "all", scale: 1, format: "png" });
    await fs.writeFile(path.join(previewDir, `${filename.replace(/\.xlsx$/, "")}-${i + 1}.png`), new Uint8Array(await png.arrayBuffer()));
  }
}

function formalDocument(type, no, date, options = {}) {
  const wb = Workbook.create();
  const names = ["空白模板", "案例示例"];
  names.forEach((name) => {
    const isCase = name === "案例示例";
    const s = baseSheet(wb, name, type, isCase ? "600ml 保温杯模拟订单｜案例数据" : "填写后请与合同、邮件及其他单据交叉核对", 8);
    s.getRange("A4:H4").values = [["单据编号", isCase ? no : "", "日期", isCase ? date : "", "币种", isCase ? "USD" : "", "状态", isCase ? (options.status || "待确认") : ""]];
    s.getRange("A4:H4").format = { fill: C.cream, font: { bold: true }, rowHeight: 28, borders: { preset: "all", style: "thin", color: C.line }, verticalAlignment: "center" };
    s.getRange("A6:D6").merge(); s.getRange("E6:H6").merge();
    s.getRange("A6").values = [["SELLER / 卖方"]]; s.getRange("E6").values = [["BUYER / 买方"]];
    s.getRange("A6:H6").format = { fill: C.blue, font: { bold: true }, rowHeight: 24, borders: { preset: "all", style: "thin", color: C.ink } };
    s.getRange("A7:D9").merge(); s.getRange("E7:H9").merge();
    s.getRange("A7").values = [[isCase ? `${factory}\n地址：虚构教学地址\n联系人：TAO（教学占位）` : "公司全称：\n地址：\n联系人及联系方式："]];
    s.getRange("E7").values = [[isCase ? `${buyer}\n地址：虚构教学地址\n联系人：采购部（教学占位）` : "公司全称：\n地址：\n联系人及联系方式："]];
    s.getRange("A7:H9").format = { wrapText: true, verticalAlignment: "top", rowHeight: 25, borders: { preset: "all", style: "thin", color: C.line } };
    s.getRange("A11:H11").values = [["货物描述", "规格 / 颜色", "数量", "单位", "单价", "金额", "贸易术语", "备注"]];
    const row = [isCase ? "600ml 双层真空不锈钢保温杯" : "", isCase ? "两色各1000个；激光Logo；单盒彩盒" : "", isCase ? 2000 : "", isCase ? "个" : "", isCase ? 8.8 : "", null, isCase ? "FCA 宁波卖方仓库，Incoterms® 2020" : "", isCase ? (options.itemNote || "包装、箱数、重量待确认") : ""];
    s.getRange("A12:H12").values = [row];
    s.getRange("F12").formulas = [["=IF(OR(C12=\"\",E12=\"\"),\"\",C12*E12)"]];
    s.getRange("A13:E13").merge(); s.getRange("A13").values = [["合计 / TOTAL"]];
    s.getRange("F13").formulas = [["=SUM(F12:F12)"]]; s.getRange("G13:H13").merge(); s.getRange("G13").values = [[isCase ? "USD 17,600" : ""]];
    styleTable(s, "A11:H13", "A11:H11");
    s.getRange("C12:C12").format.numberFormat = "0";
    s.getRange("E12:F13").format.numberFormat = "$#,##0.00";
    const terms = options.terms || [];
    const termRows = terms.map(([k, v]) => [k, isCase ? v : "", "", "", "", "", "", ""]);
    if (termRows.length) {
      s.getRange(`A15:H${14 + termRows.length}`).values = termRows;
      s.getRange(`A15:A${14 + termRows.length}`).format = { fill: C.cream, font: { bold: true }, borders: { preset: "all", style: "thin", color: C.line } };
      s.getRange(`B15:H${14 + termRows.length}`).format = { borders: { preset: "all", style: "thin", color: C.line }, wrapText: true };
      termRows.forEach((_, i) => { s.mergeCells(`B${15 + i}:H${15 + i}`); });
    }
    const footerRow = 16 + termRows.length;
    addFooter(s, footerRow, 8);
    setWidths(s, [19, 22, 12, 10, 12, 14, 27, 24]);
  });
  return wb;
}

const quote = formalDocument("QUOTATION / 报价单", "Q-TAO-260305", "2026-03-05", { status: "有效期10天", terms: [["有效期", "10天"], ["样品", "样品及快递费 USD 80，另行收取"], ["包含/不包含", "包装细节、箱数和重量待确认；税率与退税不纳入本教学报价"]] });
await save(quote, "报价单.xlsx");

const pi = formalDocument("PROFORMA INVOICE / 形式发票", "PI-TAO-260305", "2026-03-05", { status: "付款条件待协商", terms: [["付款条件", "PI阶段仍待双方协商；后续合同约定30%定金、70%余款"], ["有效期", "10天"], ["收款信息", "银行名称 / SWIFT / 账号：教学占位，禁止用于真实付款"]] });
await save(pi, "PI形式发票.xlsx");

const ci = formalDocument("COMMERCIAL INVOICE / 商业发票", "INV-TAO-260410", "2026-04-10", { status: "发货单据", terms: [["合同号", "SC-TAO-260310"], ["原产国", "中国（教学示例）"], ["申报提醒", "品名、数量、金额和术语须与合同、箱单及报关资料一致"]] });
await save(ci, "商业发票.xlsx");

function packingWorkbook() {
  const wb = Workbook.create();
  ["空白模板", "案例示例"].forEach(name => {
    const isCase = name === "案例示例";
    const s = baseSheet(wb, name, "PACKING LIST / 装箱单", isCase ? "案例：箱数、净重、毛重和体积尚未取得，保持待确认" : "包装完成后再填写实测数据，不用估算值代替", 8);
    s.getRange("A4:H4").values = [["装箱单号", isCase ? "PL-TAO-260410" : "", "日期", isCase ? "2026-04-10" : "", "合同号", isCase ? "SC-TAO-260310" : "", "发票号", isCase ? "INV-TAO-260410" : ""]];
    s.getRange("A4:H4").format = { fill: C.cream, font: { bold: true }, borders: { preset: "all", style: "thin", color: C.line }, rowHeight: 28 };
    s.getRange("A6:H6").values = [["货物描述", "颜色/规格", "数量", "箱数", "每箱数量", "净重(kg)", "毛重(kg)", "体积(m³)"]];
    s.getRange("A7:H7").values = [[isCase ? "600ml 双层真空不锈钢保温杯" : "", isCase ? "黑/蓝；Logo；彩盒" : "", isCase ? 2000 : "", isCase ? "待确认" : "", isCase ? "待确认" : "", isCase ? "待确认" : "", isCase ? "待确认" : "", isCase ? "待确认" : ""]];
    styleTable(s, "A6:H8", "A6:H6");
    s.getRange("A9:B9").merge(); s.getRange("A9").values = [["唛头 / SHIPPING MARK"]]; s.getRange("C9:H9").merge(); s.getRange("C9").values = [[isCase ? "待买方确认" : ""]];
    s.getRange("A9:H9").format = { borders: { preset: "all", style: "thin", color: C.line }, fill: C.cream, font: { bold: true } };
    addFooter(s, 11, 8); setWidths(s, [24, 22, 11, 11, 12, 12, 12, 12]);
  }); return wb;
}
await save(packingWorkbook(), "装箱单.xlsx");

function tableWorkbook(title, filename, headers, blankRows, caseRows, widths, statusCol = -1) {
  const wb = Workbook.create();
  [["空白模板", blankRows], ["案例示例", caseRows]].forEach(([name, rows]) => {
    const s = baseSheet(wb, name, title, name === "案例示例" ? "模拟订单示例，可复制后改为真实数据" : "建议每一条事实都保留来源和更新时间", headers.length);
    const start = 4;
    s.getRangeByIndexes(start - 1, 0, 1, headers.length).values = [headers];
    s.getRangeByIndexes(start, 0, rows.length, headers.length).values = rows;
    const end = start + rows.length;
    styleTable(s, `A${start}:${String.fromCharCode(64 + headers.length)}${end}`, `A${start}:${String.fromCharCode(64 + headers.length)}${start}`);
    s.getRangeByIndexes(start, 0, rows.length, headers.length).format.rowHeight = 34;
    if (statusCol >= 0) s.getRangeByIndexes(start, statusCol, Math.max(rows.length, 30), 1).dataValidation = { rule: { type: "list", values: ["待确认", "进行中", "已完成", "不适用", "异常"] } };
    addFooter(s, end + 2, headers.length); setWidths(s, widths);
  });
  return save(wb, filename);
}

await tableWorkbook("CUSTOMER PROSPECT LIST / 客户开发名单", "客户开发名单.xlsx",
  ["公司", "国家", "渠道", "网址", "产品匹配", "联系人", "邮箱", "依据/来源", "最后核验", "下一步"],
  Array.from({length:5},()=>Array(10).fill("")),
  [["NorthPeak Trading GmbH（虚构）","德国","企业官网","示例地址，不可访问","户外饮具","采购部（虚构）","buyer@example.invalid","官网产品页（教学占位）","2026-03-02","发送首封邮件"],["Alpine Gear Haus（虚构）","德国","展会目录","示例地址，不可访问","露营用品","待确认","","展会名录仅是线索","2026-03-02","核验官网"],["Nordlicht Retail（虚构）","德国","Google Maps","示例地址，不可访问","零售渠道","待确认","","地图信息仅是线索","2026-03-02","查注册信息"]],
  [24,12,16,26,19,18,27,28,14,20]);

await tableWorkbook("INQUIRY QUALIFICATION / 询盘处理表", "询盘处理表.xlsx",
  ["字段组", "字段", "客户原话/数据", "状态", "需追问", "回答来源", "最后更新"],
  Array.from({length:12},()=>Array(7).fill("")),
  [["产品","容量","600ml","已确认","","客户询盘","2026-03-02"],["产品","材质","待确认","待确认","杯身与内胆具体牌号？","待客户回复","2026-03-02"],["数量","总数量","2000个","已确认","","客户询盘","2026-03-02"],["外观","颜色","两色，各1000个","已确认","具体色号？","客户询盘","2026-03-02"],["定制","Logo","需要","待确认","激光Logo尺寸、位置和文件？","客户询盘","2026-03-02"],["包装","单盒彩盒","需要","待确认","彩盒稿件和印刷要求？","客户询盘","2026-03-02"],["交期","期望到货","5月中旬到汉堡","待确认","允许最晚到货日？","客户询盘","2026-03-02"],["交易","贸易术语","FCA建议","待确认","是否接受FCA宁波卖方仓库？","卖方建议","2026-03-02"]],
  [16,18,25,14,36,22,16],3);

await tableWorkbook("PRODUCTION TRACKER / 生产跟单表", "生产跟单表.xlsx",
  ["订单号","节点","计划日期","实际日期","负责人","检查内容","完成证据","异常/措施","状态"],
  Array.from({length:10},()=>Array(9).fill("")),
  [["SC-TAO-260310","定金到账","2026-03-12","2026-03-12","财务","确认实际到账USD 5,280","银行入账记录","","已完成"],["SC-TAO-260310","生产启动","2026-03-13","2026-03-13","跟单","版本与物料齐套","生产单","","已完成"],["SC-TAO-260310","首件确认","2026-03-18","","质检","外观、功能、Logo和包装","首件记录","","待确认"],["SC-TAO-260310","中期检查","2026-03-30","","质检","数量进度与关键缺陷","巡检记录","","待确认"],["SC-TAO-260310","终检","2026-04-08","","质检/买方","按合同约定方法验货","验货报告","","待确认"]],
  [20,18,15,15,16,30,24,28,14],8);

await tableWorkbook("INSPECTION RECORD / 验货记录表", "验货记录表.xlsx",
  ["订单号","检验阶段","日期","检查项目","标准/依据","抽检数量","结果","缺陷记录","处理措施","证据","状态"],
  Array.from({length:10},()=>Array(11).fill("")),
  [["SC-TAO-260310","首件","2026-03-18","外观/容量/Logo","确认样与合同附件","待约定","待检","","异常先停产确认","照片+签字记录","待确认"],["SC-TAO-260310","中期","2026-03-30","关键尺寸/功能/进度","合同与检验约定","待约定","待检","","隔离并记录","巡检记录","待确认"],["SC-TAO-260310","终检","2026-04-08","数量/外观/保温/包装/唛头","合同约定方法","待约定","待检","","复验后放行","验货报告","待确认"]],
  [19,15,14,25,27,13,13,25,26,22,14],10);

await tableWorkbook("SHIPPING CHECKLIST / 发货核对清单", "发货核对清单.xlsx",
  ["类别","核对项","应与何处一致","责任人","截止时间","证据/链接","状态","异常说明"],
  Array.from({length:12},()=>Array(8).fill("")),
  [["货物","品名/规格/数量","合同、发票、箱单、报关","单证","截单前","文件版本","待确认",""],["包装","箱数/净重/毛重/体积","实测、箱单、订舱","仓库","装车前","称重记录","待确认","不可猜测"],["交付","FCA指定地点与提货人","合同、货代指示","业务","提货前","提货委托","待确认",""],["报关","HS编码与申报要素","产品资料、报关单","报关行/单证","申报前","申报草单","待确认",""],["收款","余款USD 12,320到账","合同、银行入账","财务","提货前","入账记录","已完成","2026-04-09到账"]],
  [16,27,29,17,16,23,14,25],6);

await tableWorkbook("ORDER ARCHIVE CHECKLIST / 订单归档清单", "订单归档清单.xlsx",
  ["资料类别","文件/记录","对应编号","形成日期","责任人","保存位置","核对结果","状态"],
  Array.from({length:12},()=>Array(8).fill("")),
  [["交易","报价单","Q-TAO-260305","2026-03-05","业务","待填写","与PI/合同一致","已完成"],["交易","形式发票","PI-TAO-260305","2026-03-05","业务","待填写","付款条件当时待协商","已完成"],["交易","销售合同","SC-TAO-260310","2026-03-10","业务","待填写","FCA地点明确","已完成"],["资金","定金入账","USD 5,280","2026-03-12","财务","待填写","实际到账","已完成"],["资金","余款入账","USD 12,320","2026-04-09","财务","待填写","实际到账","已完成"],["单证","商业发票/装箱单","INV/PL-TAO-260410","2026-04-10","单证","待填写","重量箱数仍待确认","待确认"],["监管","报关/收汇/进项资料","待补","2026-04-14","财务/单证","待填写","按适用规则核验","待确认"]],
  [17,24,24,15,17,22,29,14],7);

console.log(`Created 10 workbooks in ${outDir}`);
