import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://tao-trade-school.pages.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "TAO的外贸学堂", template: "%s · TAO的外贸学堂" },
  description: "面向中国工厂老板和外贸新人的免费外贸自学与知识速查网站。从一只保温杯的真实业务逻辑开始，走通第一笔出口订单。",
  keywords: ["外贸", "国际贸易", "出口", "Incoterms", "FOB", "CIF", "FCA", "信用证", "出口退税", "报关", "HS编码", "提单", "外贸学习"],
  authors: [{ name: "TAO的外贸学堂" }],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: siteUrl,
    siteName: "TAO的外贸学堂",
    title: "TAO的外贸学堂 · 看懂外贸，走通第一笔订单",
    description: "面向中国工厂老板和外贸新人的免费外贸自学与知识速查网站。从一只保温杯的真实业务逻辑开始，走通第一笔出口订单。",
  },
  twitter: {
    card: "summary_large_image",
    title: "TAO的外贸学堂",
    description: "面向中国工厂老板和外贸新人的免费外贸自学与知识速查网站。",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
