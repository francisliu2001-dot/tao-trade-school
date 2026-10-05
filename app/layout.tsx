import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "TAO的外贸学堂", template: "%s · TAO的外贸学堂" },
  description: "面向中国工厂老板和外贸新人的免费外贸自学与知识速查网站。",
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
