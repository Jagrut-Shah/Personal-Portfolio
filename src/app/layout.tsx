import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Cursor from "@/components/Cursor";
import BackgroundGlow from "@/components/BackgroundGlow";
import SmoothScrolling from "@/components/SmoothScrolling";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jagrut Shah | Software Engineer",
  description: "Portfolio of Jagrut Shah, Computer Science student and Full-Stack Developer passionate about AI-powered systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="bg-grid"></div>
        <div className="ambient-orb-2"></div>
        <ThemeProvider>
          <SmoothScrolling>
            <Cursor />
            <BackgroundGlow />
            {children}
          </SmoothScrolling>
        </ThemeProvider>
      </body>
    </html>
  );
}
